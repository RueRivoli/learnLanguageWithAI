import type { Database } from "~/supabase/types";
import type { WordContent } from "~/types/vocabulary/word";
import type { GrammarQuizQuestion } from "~/types/quizzes/quiz";

const createNounTypeQuestion = (
  wordList: Array<WordContent>,
  word: WordContent,
): any => {};
const createVerbTypeQuestion = (
  wordList: Array<WordContent>,
  word: WordContent,
): any => {};
export const createWordListQuiz = (
  wordList: Array<WordContent>,
): Array<GrammarQuizQuestion> => {
  const quizQuestions: Array<GrammarQuizQuestion> = [];
  const questionIndex = 1;
  for (const word of wordList) {
    let newQuestion;
    if (word.role === "v") {
      newQuestion = createVerbTypeQuestion(wordList, word);
    } else if (word.role === "n") {
      newQuestion = createNounTypeQuestion(wordList, word);
    } else if (word.role === "adj") {
      newQuestion = createAdjectiveTypeQuestion(wordList, word);
    } else if (word.role === "post") {
      newQuestion = createPostPositionTypeQuestion(wordList, word);
    } else if (word.role === "det") {
    } else if (word.role === "adv") {
    } else if (word.role === "conj") {
    } else if (word.role === "qp") {
    } else if (word.role === "pron") {
    } else if (word.role === "sub") {
    }
    quizQuestions.push({
      id: questionIndex,
      type: 1,
      difficulty: "easy",
      grammarRuleId: 0,
      correctAnswer: word.translation,
      question: word.text,
      translation: word.translation,
      option1: word.translation,
      option2: word.translation,
      option3: word.translation,
      option4: word.translation,
    });
    questionIndex++;
  }
};

export const lessonFirstTab = { title: "Lesson", icon: "book" };
export const lessonSecondTab = { title: "Rule", icon: "language" };
