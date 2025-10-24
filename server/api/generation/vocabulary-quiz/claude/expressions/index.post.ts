import { defineEventHandler, readBody } from "h3";
import { systemPromptVocabularyQuiz } from "../../../prompts/index";
import { quizFormat } from "../../../formats/expressions";

/**
 * Extracts JSON content from Claude's response, removing markdown code blocks if present
 */
const extractJSON = (content: string): string => {
  const trimmed = content.trim();
  
  // Check if content starts with markdown code block
  if (trimmed.startsWith('```')) {
    // Find the end of the first line (the opening ```)
    const firstLineEnd = trimmed.indexOf('\n');
    // Find the last occurrence of ``` (the closing one)
    const lastBackticks = trimmed.lastIndexOf('```');
    
    if (firstLineEnd !== -1 && lastBackticks > firstLineEnd) {
      // Extract content between opening and closing ```
      return trimmed.substring(firstLineEnd + 1, lastBackticks).trim();
    }
  }
  
  // If no markdown blocks, return as is
  return trimmed;
};

const jsonSchemaInstruction = `
You must respond with a valid JSON object following this exact structure:
{
  "question1": {
    "option1": "string",
    "option2": "string",
    "option3": "string",
    "option4": "string",
    "correctAnswer": number (1-4),
    "question": "string",
    "translation": "string"
  },
  "question2": { ... same structure ... },
  "question3": { ... same structure ... },
  "question4": { ... same structure ... },
  "question5": { ... same structure ... }
}

Respond ONLY with the JSON object, no additional text or explanations.
`;

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    if (!body.message) {
      throw new Error('Missing prompt for expressions quiz')
    }
    
    const result = await $fetch(process.env.ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY || '',
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: {
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 1024,
        temperature: 0.7,
        system: systemPromptVocabularyQuiz + '\n\n' + jsonSchemaInstruction,
        messages: [
          { 
            role: 'user', 
            content: body.message 
          }
        ]
      }
    })
    if (result && result.content && result.content[0]?.text) {
      const rawContent = result.content[0].text;
      const cleanContent = extractJSON(rawContent);
      return cleanContent;
    }
    
    throw new Error('Invalid response from Claude API');
  } catch (error) {
    console.error('Error API Claude For Expressions Quiz:', error);
    return {
      success: false,
      error: error?.message ?? 'Unknown error'
    }
  }
});
