const openAiPrompt = (level: string, words: string, expressions: string, grammarRule: string, nbLines: number) =>  {
    const prompt = `Create a ${nbLines} lines interesting story in the Turkish language of a ${level} level containing the following words: ${words}, 
    the following expressions: ${expressions} and employing some usages of the following rule: ${grammarRule}. 
    Use this rule around 4 times. Give also the english translation for each sentence. 
    Give a title to that story and translate it. Give a nice introduction to that story/lesson in English by introducing with a few words the story and 
    give to the reader a short tip to understand the focused rule. Use the english name of the rule in the introduction, not the Turkish name.
    The intro should not be longer than 3 or 4 sentences and shouldn't be too marketing or salesy: avoid sentences like 'in this amazing story', 
    'in this captivating story', give a realistic introduction. For each sentence, write a "tip": a note explaining the grammar rule used in the sentence if the rule is
    used in the sentence and any note to explain anything relevant in the sentence that requires explanation.
    The story should be written in a way that is easy to understand and follow. The story should make sense and be coherent.
    Respect the level of the story: if the level is "very easy", the story should be very easy to follow and contains very simple words and sentences.
    If the level is "easy", the story should be still simple to follow and slightly more complex than "very easy".
    If the level is "intermediate", the story should be more complex and contains more complex words and sentences.
    If the level is "advanced", the story should be the most complex and contains the most complex words and sentences.
    Use connecting words between sentences to make the story more fluid and natural.
    The story can be about anything: it can be exciting, adventurous, sad, funny, nostalgic, romantic, etc.
    `
    return prompt
}


export const getPromptForStoryGeneration = (grammarRule: string, listWords: string[], listExpressions: string[], level: string, nbLines: number) => {
    const words = listWords.join(", ")
    const expressions = listExpressions.join(', ')
    return openAiPrompt(level, words, expressions, grammarRule, nbLines)
}

