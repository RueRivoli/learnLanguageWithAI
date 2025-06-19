import { defineEventHandler } from "h3";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_SUPABASE_KEY,
);

const parseModelResponse = (text: string, ruleId: number) => {
  const newLesson = JSON.parse(text)
  return { user_id: "502a892f-8e9c-4a73-8635-b932f595d68a", grammar_rule_id: ruleId, ...newLesson }
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

const saveNewLesson = async (content: string, ruleId: number) => {
  console.log("content >> ", content)
  const newLessonRow = parseModelResponse(content, ruleId)
      console.log("newLessonRow", newLessonRow)
      // Save new lesson
      const { data: newLesson, error: errorLessons } = await supabase
      .from("turkish_lessons")
      .insert(newLessonRow).select()
      console.log("new lesson", newLesson)
      if (errorLessons) throw(errorLessons)
      return newLesson
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    if (!body.message) {
      throw new Error('Missing prompt')
    }
    const result = await $fetch(process.env.OPENAI_API_URL, {
      method: 'POST',
      headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
      },
      body: {
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'You are a native experimented turkish teacher. Create a clear, helpful story to learn Turkish' },
          { role: 'user', content: body.message }
        ],
        response_format: lessonFormat,
        temperature: 0.7,
        max_tokens: 1000
      }
    })
     
    if (result && result.choices[0].message.content) {
      console.log("cont", result.choices[0].message.content)
      const lesson = await saveNewLesson(result.choices[0].message.content, body.ruleId)
      console.log("body.expressionIds", body.expressionIds)
      if (lesson) {
        linkWordsToLesson(body.wordIds, lesson[0].id)
        linkExpressionsToLesson(body.expressionIds, lesson[0].id)
      }
        return lesson[0].id
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