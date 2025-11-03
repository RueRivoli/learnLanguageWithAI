import type { VocabularyQuizQuestion } from "~/types/quizzes/vocabulary-quiz";

export const parseVocabularyGeneratedQuiz = (
  data: any,
): VocabularyQuizQuestion[] => {
  const parsedData = JSON.parse(data);
  // const parsedData = data;
  const finalQuiz: VocabularyQuizQuestion[] = [];
  let i = 1;
  while (parsedData[`question${i}`]) {
    const questionKey = `question${i}`;
    if (parsedData[questionKey]) {
      finalQuiz.push({
        id: i,
        type: 1,
        difficulty: 1,
        question: parsedData[questionKey].question,
        translation: parsedData[questionKey].translation,
        correctAnswer: parsedData[questionKey].correctAnswer,
        option1: parsedData[questionKey].option1,
        option2: parsedData[questionKey].option2,
        option3: parsedData[questionKey].option3,
        option4: parsedData[questionKey].option4,
        note: null,
      });
    }
    i++;
  }
  return finalQuiz;
};
