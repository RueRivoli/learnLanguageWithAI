import { defineEventHandler, readBody } from "h3";
import { createServiceRoleClient, createSupabaseClientWithUserAuthTokenFromHeader } from "../../../../utils/auth/supabaseClient";
import { lessonFormat } from "../../formats/lesson";

const supabase = createServiceRoleClient()

const parseModelResponse = (text: string, ruleId: number, userId: string) => {
  const newLesson = JSON.parse(text)
  return { user_id: userId, grammar_rule_id: ruleId, ...newLesson }
}

const linkWordsToLesson = async (wordIds: number[], lessonId: number) => {
  const inserts = wordIds.map((wordId) => ({
    lesson_id: lessonId,
    word_id: wordId,
  }));
  // Link words to that lesson
  const { error: errorWords } = await supabase
    .from("turkish_lesson_words")
    .insert(inserts);
  
  if (errorWords) {
    console.error("Insert error words:", errorWords);
    throw(errorWords)
  }
}

const linkExpressionsToLesson = async (expressionIds: number[], lessonId: number) => {
  const inserts = expressionIds.map((expId) => ({
    lesson_id: lessonId,
    expression_id: expId,
  }));
  // Link expressions to that lesson
  const { error: errorExpressions } = await supabase
    .from("turkish_lesson_expressions")
    .insert(inserts);
  
  if (errorExpressions) {
    console.error("Insert error expressions:", errorExpressions);
    throw(errorExpressions)
  }
}

const saveNewLesson = async (content: string, ruleId: number, userId: string) => {
  console.log('saveNewLesson', content, ruleId)
  const newLessonRow = parseModelResponse(content, ruleId, userId)
      // Save new lesson
      const { data: newLesson, error: errorLessons } = await supabase
      .from("turkish_lessons")
      .insert(newLessonRow).select()
      if (errorLessons) throw(errorLessons)
      return newLesson
}

export default defineEventHandler(async (event) => {
  const supabaseAuthToken = createSupabaseClientWithUserAuthTokenFromHeader(event)
  try {
    const body = await readBody(event);
    if (!body.message) {
      throw new Error('Missing prompt')
    }

    const { data: { user }, error: userError } = await supabaseAuthToken.auth.getUser()
    if (userError) throw userError
    if (!user?.id) {
      throw new Error('Unable to resolve authenticated user')
    }

    // CHECK TOKEN BALANCE
    const { data: profile } = await supabaseAuthToken
      .from('profiles')
      .select('tokens_available')
      .eq('id', user.id)
      .single();

    if (!profile || (profile.tokens_available || 0) < 1) {
      console.log('Insufficient tokens. Please purchase more tokens to generate stories.');
      throw new Error('Insufficient tokens. Please purchase more tokens to generate stories.');
    }

    const result = await fetch(process.env.OPENAI_API_URL as string, {
      method: 'POST',
      headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'You are a native experimented turkish teacher. Create a clear, captivating and helpful story to learn Turkish' },
          { role: 'user', content: body.message }
        ],
        response_format: lessonFormat,
        temperature: 0.7,
        max_tokens: 2000
      })
    })
    const json = await result.json()
    console.log('result', json, json.choices?.[0]?.message?.content)
    if (json && json.choices?.[0]?.message?.content) {
      const lesson = await saveNewLesson(json.choices[0].message.content, body.ruleId, user.id)
      if (lesson) {
        // DEDUCT TOKEN AFTER SUCCESSFUL GENERATION
        await supabaseAuthToken
          .from('profiles')
          .update({ tokens_available: profile.tokens_available! - 1 })
          .eq('id', user.id);

        linkWordsToLesson(body.wordIds, lesson[0].id)
        linkExpressionsToLesson(body.expressionIds, lesson[0].id)
      }
        return lesson[0]
      }
    } catch (error) {
      console.error('Error API OpenAI:', error)
      return {
        success: false,
        error: error?.message ?? 'Unknown error'
    }
  }
});
