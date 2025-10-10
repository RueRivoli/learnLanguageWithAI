import { defineEventHandler, readBody, getHeader } from "h3";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_SUPABASE_KEY,
);


const parseModelResponse = (text: string, ruleId: number, userId: string) => {
  const newLesson = JSON.parse(text)
  return { user_id: userId, grammar_rule_id: ruleId, ...newLesson }
}

const lessonFormat = { "type": "json_schema", "json_schema": {
  "name": "lesson",
  "schema": {
    "type":"object",
    "properties": {
      "title": {
        "type": "string"
      },
      "title_en": {
        "type": "string"
      },
      "introduction": {
        "type": "string"
      },
      "promptForImageGeneration": {
        "type": "string"
      },
      "sentence_1": {
        "type": "string"
      },
      "sentence_1_en": {
        "type": "string"
      },
      "sentence_2": {
        "type": "string"
      },
      "sentence_2_en": {
        "type": "string"
      },
      "sentence_3": {
        "type": "string"
      },
      "sentence_3_en": {
        "type": "string"
      },
      "sentence_4": {
        "type": "string"
      },
      "sentence_4_en": {
        "type": "string"
      },
      "sentence_5": {
        "type": "string"
      },
      "sentence_5_en": {
        "type": "string"
      },
      "sentence_6": {
        "type": "string"
      },
      "sentence_6_en": {
        "type": "string"
      },
      "sentence_7": {
        "type": "string"
      },
      "sentence_7_en": {
        "type": "string"
      },
      "sentence_8": {
        "type": "string"
      },
      "sentence_8_en": {
        "type": "string"
      },
      "sentence_9": {
        "type": "string"
      },
      "sentence_9_en": {
        "type": "string"
      },
      "sentence_10": {
        "type": "string"
      },
      "sentence_10_en": {
        "type": "string"
      },
    }
  }
}
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
  try {
    const body = await readBody(event);
    if (!body.message) {
      throw new Error('Missing prompt')
    }
    // Resolve current user from Authorization header
    const authHeader = getHeader(event, 'authorization')
    if (!authHeader) {
      throw new Error('Authorization header required')
    }
    const supabaseAuth = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY,
      {
        global: {
          headers: {
            Authorization: authHeader
          }
        }
      }
    )
    const { data: { user }, error: userError } = await supabaseAuth.auth.getUser()
    if (userError) throw userError
    if (!user?.id) {
      throw new Error('Unable to resolve authenticated user')
    }

    // CHECK TOKEN BALANCE
    const { data: profile } = await supabase
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
      console.log('test')
      const lesson = await saveNewLesson(json.choices[0].message.content, body.ruleId, user.id)
      console.log('lesson', lesson)
      if (lesson) {
        // DEDUCT TOKEN AFTER SUCCESSFUL GENERATION
        await supabase
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


// Data
// model: "gpt-4.1",
//     messages: [
//         {
//             role: "user",
//             content: "Write a one-sentence bedtime story about a unicorn.",
//         },
//     ],

// gpt-4.1 works
// const result = $fetch(process.env.OPENAI_API_URL, {
//     method: 'POST',
//     headers: {
//         Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       model: "gpt-4.1",
//       messages: [ { role: 'user', content: body.message }],
//     }),
//   })

// gpt-4.1
    // const result = fetch(process.env.OPENAI_API_URL, {
    //     method: 'POST',
    //     headers: {
    //         Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       model: "gpt-4.1",
    //       messages: [ { role: 'system', content: 'You are a helpful turkish teacher.' }, { role: 'user', content: 'create a text in turkish' }],
    //       response_format: {
    //         "type": "text"
    //       },
    //       temperature: 1,
    //       max_completion_tokens: 548,
    //       top_p:1,
    //       frequency_penalty:0,
    //       presence_penalty:0
    //     }),
    //   })

    //   const result = $fetch(process.env.OPENAI_API_URL, {
//       method: 'POST',
//       headers: {
//           Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//           'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         model: "gpt-4o",
//         messages: [ { role: 'system', content: 'You are a helpful turkish teacher.' }, { role: 'user', content: body.message }],
//         // response_format: {
//         //   "type": "text"
//         // },
//         temperature: 1,
//         max_tokens: 548,
//         top_p:1,
//         frequency_penalty:0,
//         presence_penalty:0
//       }),
//     })


// reponse: 
// { id: 'chatcmpl-Bhy9YUfYelhceikpPMCTQn7AAKrR6',
//   object: 'chat.completion',
//   created: 1749819032,
//   model: 'gpt-4o-2024-08-06',
//   choices: [ { index: 0, message: [Object], logprobs: null, finish_reason: 'stop' } ],
//   usage:
//    { prompt_tokens: 433,
//      completion_tokens: 479,
//      total_tokens: 912,
//      prompt_tokens_details: { cached_tokens: 0, audio_tokens: 0 },
//      completion_tokens_details:
//       { reasoning_tokens: 0,
//         audio_tokens: 0,
//         accepted_prediction_tokens: 0,
//         rejected_prediction_tokens: 0 } },
//   service_tier: 'default',
//   system_fingerprint: 'fp_a288987b44' }