import type { WordContent } from "~/types/vocabulary/word";
import type { GrammarQuizQuestion } from "~/types/quizzes/quiz";

const slightVowelChangeNoun = (noun: string) => {
  const match = noun.match(/[aeıioöuü]/i);
  const firstVowel = match ? match[0] : null;
  const secondVowel = match ? match[1] : null;
  if (secondVowel) {
    const falseVowel =
      vowelChangeMap[firstVowel as keyof typeof vowelChangeMap][
        Math.floor(
          Math.random() *
            vowelChangeMap[firstVowel as keyof typeof vowelChangeMap].length,
        )
      ];
    return noun.replace(secondVowel, falseVowel);
  }
  if (firstVowel) {
    const falseVowel =
      vowelChangeMap[firstVowel as keyof typeof vowelChangeMap][
        Math.floor(
          Math.random() *
            vowelChangeMap[firstVowel as keyof typeof vowelChangeMap].length,
        )
      ];
    return noun.replace(firstVowel, falseVowel);
  }
  return noun;
};
const slightConsonantChangeNoun = (noun: string) => {
  const match = noun.match(/[aeıioöuü]/i);
  const firstVowel = match ? match[0] : null;
};
const createIncorrectNoun = (noun: string) => {
  const random = Math.floor(Math.random() * 2) + 1;
  if (random === 1) {
    return slightVowelChangeNoun(noun);
  } else {
    return slightConsonantChangeNoun(noun);
  }
};

const createNounTypeSingleQuestion = (
  nounList: Array<WordContent>,
  word: WordContent,
  index: number,
) => {
  const incorrectAnswer1 = createIncorrectNoun(word.text);
};
const createNounTypeQuestion = (
  nounList: Array<WordContent>,
  word: WordContent,
  index: number,
): any => {
  const falseOptions = nounList.filter((noun) => noun.id !== word.id);
  if (nounList.length > 3) {
    const correctAnswerIndex = Math.floor(Math.random() * 4) + 1;
    return {
      id: index,
      type: 1,
      correctAnswer: correctAnswerIndex,
      question:
        "Which of the following words is the correct translation of " +
        word.translation +
        " ?",
      translation: word.translation,
      option1: correctAnswerIndex === 1 ? word.text : falseOptions[0].text,
      option2: correctAnswerIndex === 2 ? word.text : falseOptions[0].text,
      option3: correctAnswerIndex === 3 ? word.text : falseOptions[1].text,
      option4: correctAnswerIndex === 4 ? word.text : falseOptions[2].text,
    };
  } else if (nounList.length > 1) {
    const correctAnswerIndex = Math.floor(Math.random() * 4) + 1;
    const incorrectAnswer1 = createIncorrectNoun(word.text);
    const incorrectAnswer2 = createIncorrectNoun(falseOptions[0].text);
    let incorrectAnswer3 = createIncorrectNoun(falseOptions[0].text);
    if (
      incorrectAnswer3 === incorrectAnswer2 ||
      incorrectAnswer3 === incorrectAnswer1 ||
      incorrectAnswer3 === word.text ||
      incorrectAnswer2 === word.text ||
      incorrectAnswer1 === word.text ||
      incorrectAnswer1 === incorrectAnswer2
    ) {
      return createNounTypeSafeQuestion(nounList, word, index);
    }
    return {
      id: index,
      type: 1,
      correctAnswer: correctAnswerIndex,
      question:
        "Which of the following words is the correct translation of " +
        word.translation +
        " ?",
      translation: word.translation,
      option1: correctAnswerIndex === 1 ? word.text : falseOptions[0],
      option2: correctAnswerIndex === 2 ? word.text : falseOptions[0],
      option3: correctAnswerIndex === 3 ? word.text : falseOptions[1],
      option4: correctAnswerIndex === 4 ? word.text : falseOptions[2],
    };
  }
};
const createVerbTypeQuestion = (
  VerbList: Array<WordContent>,
  word: WordContent,
): any => {};
const createAdjectiveTypeQuestion = (
  adjectiveList: Array<WordContent>,
  word: WordContent,
): any => {};
const createPostPositionTypeQuestion = (
  postPositionList: Array<WordContent>,
  word: WordContent,
): any => {};
const createDeterminerTypeQuestion = (
  determinerList: Array<WordContent>,
  word: WordContent,
): any => {};
const createAdverbTypeQuestion = (
  adverbList: Array<WordContent>,
  word: WordContent,
): any => {};
const createConjunctionTypeQuestion = (
  conjunctionList: Array<WordContent>,
  word: WordContent,
): any => {};
const createQuestionParticuleTypeQuestion = (
  questionParticuleList: Array<WordContent>,
  word: WordContent,
): any => {};
const createPersonalPronounTypeQuestion = (
  personalPronounList: Array<WordContent>,
  word: WordContent,
): any => {};
const createSubsidiaryVerbTypeQuestion = (
  subsidiaryVerbList: Array<WordContent>,
  word: WordContent,
): any => {};
export const createWordListQuiz = (
  wordList: Array<WordContent>,
): Array<GrammarQuizQuestion> => {
  const quizQuestions: Array<GrammarQuizQuestion> = [];
  let questionIndex = 1;
  for (const word of wordList) {
    let newQuestion;
    if (word.role === "v") {
      newQuestion = createVerbTypeQuestion(
        wordList.filter((word) => word.role === "v"),
        word,
      );
    } else if (word.role === "n") {
      newQuestion = createNounTypeQuestion(
        wordList.filter((word) => word.role === "n"),
        word,
        questionIndex,
      );
    } else if (word.role === "adj") {
      newQuestion = createAdjectiveTypeQuestion(wordList, word);
    } else if (word.role === "post") {
      newQuestion = createPostPositionTypeQuestion(wordList, word);
    } else if (word.role === "det") {
      newQuestion = createDeterminerTypeQuestion(wordList, word);
    } else if (word.role === "adv") {
      newQuestion = createAdverbTypeQuestion(wordList, word);
    } else if (word.role === "conj") {
      newQuestion = createConjunctionTypeQuestion(wordList, word);
    } else if (word.role === "qp") {
      newQuestion = createQuestionParticuleTypeQuestion(wordList, word);
    } else if (word.role === "pron") {
      newQuestion = createPersonalPronounTypeQuestion(wordList, word);
    } else if (word.role === "sub") {
      newQuestion = createSubsidiaryVerbTypeQuestion(wordList, word);
    }
    quizQuestions.push(newQuestion);
    questionIndex++;
  }
};

export const lessonFirstTab = { title: "Lesson", icon: "book" };
export const lessonSecondTab = { title: "Rule", icon: "language" };
