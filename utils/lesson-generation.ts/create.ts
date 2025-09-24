import { getPromptForStoryGeneration } from "../prompts/openai"

const getPromptForImageGeneration = (prompt: string) => {
  const imagePrompt = `Create a very nice image of illustration of the following story: ${prompt}`
  return imagePrompt
}
const generateStory = async (userId: string, ruleId: number, prompt: string, wordIds: number[], expressionIds: number[]) => {
  // Attach Authorization header from Supabase session for secure server-side auth
  const { data: { session } } = await useSupabaseClient().auth.getSession()
  const headers: Record<string, string> = {}
  if (session?.access_token) headers['Authorization'] = `Bearer ${session.access_token}`
  const { data } = await useFetch("/api/generation/story/gpt", {
    method: 'POST',
    headers,
    body: { message: prompt, ruleId, wordIds, expressionIds}
   })
   console.log('X', data.value)
   if (data && data.value) return data.value
}

export const generateAIPoweredStoryWithParameters = async (userId: string, grammarRuleId: number, grammarRule: string, listWords: any[], listExpressions: any[], level: string, nbLines: number) => {
    const prompt = getPromptForStoryGeneration(grammarRule, listWords.map((w) => w.text), listExpressions.map((e) => e.text), level, nbLines)
    return generateStory(userId, grammarRuleId, prompt, listWords.map((w) => w.id), listExpressions.map((e) => e.id))
}


export const generateImageWithPrompt = async (prompt: string, storyId: number) => {
  const promptForImageGeneration = getPromptForImageGeneration(prompt)
  console.log('promptForImageGeneration', promptForImageGeneration)
  console.log('storyId', storyId)
  await $fetch("/api/replicate/generate", {
      method: 'POST',
      body: { prompt: promptForImageGeneration, storyId: storyId}
     })
}
