import { getAuthToken } from "../auth/auth";
import { getPromptForStoryGeneration } from "../prompts/openai";
import { lessonUpdateBus } from "~/composables/useLessonUpdates";

// const getPromptForImageGeneration = (prompt: string) => {
//   const imagePrompt = `Create a very nice image of illustration of the following story: ${prompt}`
//   return imagePrompt
// }
const generateStory = async (
  userId: string,
  ruleId: number,
  prompt: string,
  wordIds: number[],
  expressionIds: number[],
) => {
  // Attach Authorization header from Supabase session for secure server-side auth
  const headers = await getAuthToken();
  const { data } = await useFetch("/api/generation/story/gpt", {
    method: "POST",
    headers,
    body: {
      message: prompt,
      ruleId,
      wordIds,
      expressionIds,
    },
  });
  if (data && data.value) return data.value;
};

export const generateAIPoweredStoryWithParameters = async (
  userId: string,
  grammarRuleId: number,
  grammarRule: string,
  listWords: any[],
  listExpressions: any[],
  level: string,
  nbLines: number,
) => {
  const prompt = getPromptForStoryGeneration(
    grammarRule,
    listWords.map((w) => w.text),
    listExpressions.map((e) => e.text),
    level,
    nbLines,
  );
  return generateStory(
    userId,
    grammarRuleId,
    prompt,
    listWords.map((w) => w.id),
    listExpressions.map((e) => e.id),
  );
};

export const generateImageWithPrompt = async (
  prompt: string,
  storyId: number,
  model: string,
  userId: string,
) => {
  const headers = await getAuthToken();
  switch (model) {
    case "gpt-4.1":
      const output = await $fetch("/api/gpt/generation/image", {
        method: "POST",
        headers,
        body: { prompt, storyId: storyId, userId: userId },
      });

      lessonUpdateBus.notifyImageAdded(String(storyId), {
        imgUrl: output.image_url,
      });
      break;
    case "replicate":
      await $fetch("/api/replicate/generate", {
        method: "POST",
        headers,
        body: { prompt, storyId: storyId },
      });
      break;
  }
};
