const openAiPrompt = (level: string, words: string, expressions: string, grammarRule: string, nbLines: number) =>  {
    const prompt = `Create a ${nbLines} lines interesting story in the Turkish language of a ${level} level containing the following words: ${words}, the following expressions: ${expressions} and employing some usages of the following rule: ${grammarRule}. Don't use this rule too often but use it at least 3 or 4 times. Give also the english translation for each sentence. Give it a title to that story and translate it. Give it a nice introduction to that story/lesson in English by introducing in a few words the story and give to the reader a short tip to understand the focused rule. The intro should not be longer than 3 or 4 sentences and shouldn't be too marketing or salesy: avoid sentences like 'in this amazing story', 'in this captivating story', give a realistic introduction. The story should be written in a way that is easy to understand and follow.`
    return prompt
}


export const getPromptForStoryGeneration = (grammarRule: string, listWords: string[], listExpressions: string[], level: string, nbLines: number) => {
    const words = listWords.join(",")
    const expressions = listExpressions.join(',')
    return openAiPrompt(level, words, expressions, grammarRule, nbLines)
}

