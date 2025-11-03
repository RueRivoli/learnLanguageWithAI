export const promptGeneratedVocabularyQuiz = (
  wordsForQuiz: any,
  expressionsForQuiz: any,
) => {
  return `Generate a vocabulary quiz for the following words: 
    ${wordsForQuiz.map((word: any) => word.text).join(", ")} : ${wordsForQuiz.length} questions, one for each word, 
    and the following expressions: ${expressionsForQuiz.map((expression: any) => expression.text).join(", ")} : ${expressionsForQuiz.length} questions, one for each expression.
    You should generate first one question per word and then one question per expression.
    For each question, ask something like "Which of these words/expressions means "the food" in Turkish?" or 
    "Which of these expressions means "to complain" in Turkish?
    Provide 4 possible answers: 3 incorrect answers and the correct answer. 
    If possible, make that the incorrect answers are almost similar to the correct answer but not the same: for example change just letter or something else. Sometimes you can propose totally different answers.
    Please place the correct answer in a random position, it shouldn't be always 
    the same position"`;
};

export const promptGeneratedWordQuiz = (wordsForQuiz: any) => {
  return `Generate a vocabulary quiz for the following words: 
    ${wordsForQuiz.map((word: any) => word.text).join(", ")} : ${wordsForQuiz.length} questions, one for each word, 
    You should generate first one question per word.
    For each question, ask something like "Which of these words means "the food" in Turkish?"
    Provide 4 possible answers: 3 incorrect answers and the correct answer. Each answer has to be different from ALL the other answers !
    Please place the correct answer in a random position, it shouldn't be always the same position"`;
};

export const promptGeneratedExpressionQuiz = (expressionsForQuiz: any) => {
  return `Generate a vocabulary quiz for the following expressions: ${expressionsForQuiz.map((expression: any) => expression.text).join(", ")} : ${expressionsForQuiz.length} questions, one for each expression.
    You should generate one question per expression.
    For each question, ask something like "Which of these expressions means "Which of these expressions means "to complain" in Turkish?
    Provide 4 possible answers: 3 incorrect answers and the correct answer. Make sure that every answer is different from the other answers, that is very important.
    If possible, make that the incorrect answer are almost similar to the correct answer but not the same: for example change just letter . Sometimes you can propose totally different answers.
    Please place the correct answer in a random position, it shouldn't be always 
    the same position"`;
};
