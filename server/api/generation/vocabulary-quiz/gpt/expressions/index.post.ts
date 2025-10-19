import { defineEventHandler, readBody } from "h3";
import { quizFormat } from "../../../formats/expressions";
import { systemPromptVocabularyQuiz } from "../../../prompts/index";


export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    if (!body.message) {
      throw new Error('Missing prompt for words quiz')
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
          { role: 'system', content: systemPromptVocabularyQuiz },
          { role: 'user', content: body.message }
        ],
        response_format: quizFormat,
        temperature: 0.7,
        max_tokens: 1000
      }
    })
    if (result && result.choices[0].message.content) {
        return result.choices[0].message.content
      }
    } catch (error) {
      console.error('Error API OpenAI For Words Quiz:', error)
      return {
        success: false,
        error: error?.message ?? 'Unknown error'
    }
  }
});
