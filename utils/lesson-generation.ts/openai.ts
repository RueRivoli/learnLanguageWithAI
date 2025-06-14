const getPromptForStoryGeneration = (grammarRule: string, listWords: string[], listExpressions: string[], level: string, nbLines: number) => {
  console.log("listwords", listWords)
  const words = listWords.join(",")
  console.log("words", words)
  const expressions = listExpressions.join(',')
  return `Create a ${nbLines} lines interesting story in the Turkish language of a ${level} level containing the following words: ${words}, the following expressions: ${expressions} and employing at least 3 usages of the following rule: ${grammarRule}. Give also the english translation for each sentence. Give it a title and translate it.`
}

const generateStory = async (ruleId: number, prompt: string, wordIds: number[], expressionIds: number[]) => {
  console.log('prompt', prompt)
  const { data } = await useFetch("/api/gpt/generate", {
    method: 'POST',
    body: { message: prompt, ruleId, wordIds, expressionIds}
   })
   console.log("generatedStory", data.value)
}

export const generateAIPoweredStoryWithParameters = async (grammarRuleId: number, grammarRule: string, listWords: any[], listExpressions: any[], level: string, nbLines: number) => {
    const prompt = getPromptForStoryGeneration(grammarRule, listWords.map((w) => w.text), listExpressions.map((e) => e.text), level,nbLines)
    return generateStory(grammarRuleId, prompt, listWords.map((w) => w.id), listExpressions.map((e) => e.id))
}


// Put the result in the following format: 
// {
//   "title": "Lesson title in Turkish",
//   "titleEn": "Lesson title in english",
//   "sentence1": "First sentence",
//   "sentence1En": "First sentence translated in English",
//   "sentence2": "Second sentence",
//   "sentence2En": "Second sentence translated in English",
//   "sentence3": "Third sentence",
//   "sentence3En": "Third sentence translated in English",
//   "sentence4": "Fourth sentence",
//   "sentence4En": "Fourth sentence translated in English",
//   "sentence5": "Fifth sentence",
//   "sentence5En": "Fifth sentence translated in English",
//   "sentence6": "Sixth sentence",
//   "sentence6En": "Sixth sentence translated in English",
//   "sentence7": "Seventh sentence",
//   "sentence7En": "Seventh sentence translated in English",
//   "sentence8": "Eightth sentence",
//   "sentence8En": "Eightth sentence translated in English",
//   "sentence9": "Nineth sentence",
//   "sentence9En": "Nineth sentence translated in English",
//   "sentence10": "Tenth sentence",
//   "sentence10En": "Tenth sentence translated in English",
// }