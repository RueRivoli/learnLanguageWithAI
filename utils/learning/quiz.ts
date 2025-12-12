import type {
  FormQuizState,
  QuizFetchedQuestion,
  GrammarQuizQuestion,
} from "~/types/quizzes/quiz";
import type { VocabularyQuizQuestion } from "~/types/quizzes/vocabulary-quiz";
import { getAuthToken } from "../auth/auth";
import { CREDITS_FOR_ONE_QUIZ } from "../credits";


const getVocabularyFromLesson = async (lessonId: number) => {
  const headers = await getAuthToken();
  const { data: vocabularyData } = await useFetch(`/api/lessons/${lessonId}/vocabulary`, {
    headers,
  });
  if (vocabularyData.value) {
    const wordsForQuiz = (vocabularyData.value.turkish_lesson_words || []).map((word: any) => {
        return { ...word.turkish_words, isMastered: false };
      })
    const expressionsForQuiz = (vocabularyData.value.turkish_lesson_expressions || []).map(
        (expression: any) => {
          return { ...expression.turkish_expressions, isMastered: false };
        },
      )

  const { data: randomWords } = await $fetch(`/api/words/levels/random/?limit=2`, {
        method: "GET",
        headers,
      });

      if (randomWords) {
        wordsForQuiz.push(
          ...randomWords.map((word: any) => {
            return { ...word.turkish_words, isMastered: true };
          }),
        );
      }
    const randomExpressions = await $fetch(`/api/expressions/levels/random/?limit=2`, {
        method: "GET",
        headers,
      });
      if (randomExpressions && (randomExpressions as any).data) {
        expressionsForQuiz.push(
          ...(randomExpressions as any).data.map((expression: any) => {
            return { ...expression.turkish_expressions, isMastered: true };
          }),
        );
      }
    return {wordsForQuiz, expressionsForQuiz}
  }
};


export const parseQuestions = (data: any): GrammarQuizQuestion => {
  return {
    id: data.id,
    type: data.turkish_grammar_quizzes.question_type ?? null,
    difficulty: data.turkish_grammar_quizzes.difficulty_class ?? null,
    ruleId: data.turkish_grammar_quizzes.grammar_rule_id ?? null,
    correctAnswer: data.turkish_grammar_quizzes.correct_answer ?? null,
    question: data.turkish_grammar_quizzes.text ?? null,
    option1: data.turkish_grammar_quizzes.option_1 ?? null,
    option2: data.turkish_grammar_quizzes.option_2 ?? null,
    option3: data.turkish_grammar_quizzes.option_3 ?? null,
    option4: data.turkish_grammar_quizzes.option_4 ?? null,
  };
};

export const parseGrammarQuizQuestion = (
  question: QuizFetchedQuestion,
): GrammarQuizQuestion => {
  return {
    id: question.id,
    type: question.turkish_grammar_quizzes.question_type ?? null,
    difficulty: question.turkish_grammar_quizzes.difficulty_status ?? null,
    ruleId: question.turkish_grammar_quizzes.grammar_rule_id ?? null,
    correctAnswer: question.turkish_grammar_quizzes.correct_answer ?? null,
    question: question.turkish_grammar_quizzes.text ?? null,
    // translation: question.turkish_grammar_quizzes.translation ?? null,
    option1: question.turkish_grammar_quizzes.option_1 ?? null,
    option2: question.turkish_grammar_quizzes.option_2 ?? null,
    option3: question.turkish_grammar_quizzes.option_3 ?? null,
    option4: question.turkish_grammar_quizzes.option_4 ?? null,
    note: null,
    // note: question.turkish_grammar_quizzes.note ?? null,
  };
};

export const parseWordQuizQuestion = (question: QuizFetchedQuestion): any => {
  return {
    id: question.question_id,
    type: question.turkish_word_quizzes.question_type ?? null,
    wordId: question.turkish_word_quizzes.turkish_words.id ?? null,
    wordText: question.turkish_word_quizzes.turkish_words.text ?? null,
    question: question.turkish_word_quizzes.text ?? null,
    option1: question.turkish_word_quizzes.option_1 ?? null,
    option2: question.turkish_word_quizzes.option_2 ?? null,
    option3: question.turkish_word_quizzes.option_3 ?? null,
    option4: question.turkish_word_quizzes.option_4 ?? null,
    correctAnswer: question.turkish_word_quizzes.correct_answer ?? null,
    note: question.turkish_word_quizzes.note ?? null,
  };
};

export const parseExpressionQuizQuestion = (question: QuizFetchedQuestion): any => {
  return {
    id: question.question_id,
    type: question.turkish_expression_quizzes.question_type ?? null,
    expressionId: question.turkish_expression_quizzes.turkish_expressions.id ?? null,
    expressionText: question.turkish_expression_quizzes.turkish_expressions.text ?? null,
    question: question.turkish_expression_quizzes.text ?? null,
    option1: question.turkish_expression_quizzes.option_1 ?? null,
    option2: question.turkish_expression_quizzes.option_2 ?? null,
    option3: question.turkish_expression_quizzes.option_3 ?? null,
    option4: question.turkish_expression_quizzes.option_4 ?? null,
    correctAnswer: question.turkish_expression_quizzes.correct_answer ?? null,
    note: question.turkish_expression_quizzes.note ?? null,
  };
};
export const handleGenerationQuiz = async (
  ruleId: number,
  userId: string,
  lessonId?: string | null,
  length = 5,
  // 1 = grammar + vocabulary, 2 = grammar only
  type = 1,
) => {
  if (!lessonId) return;
  console.log("handleGenerationQuiz", ruleId, userId, lessonId, length);
  try {
    const userStore = useUserStore();
    const headers = await getAuthToken();

    // Generate a quiz for the grammar rule
    const response = await $fetch<{ quizId: number }>(
      `/api/quizzes/${ruleId}`,
      {
        method: "PUT",
        headers,
        body: {
          numberOfQuestions: length,
          userId: userId,
        },
      },
    );
    if (type === 1) {
      const headers = await getAuthToken();
      console.log("Generating vocabulary quiz");
      await $fetch<{ quizId: number }>(
        `/api/quizzes/lessons/${lessonId}`,
        {
          method: "PUT",
          headers,
          body: {
            userId: userId,
            quizId: response.quizId,
          },
        },
      );

      // const vocabularyData = await getVocabularyFromLesson(Number(lessonId))
      // const quizVocabularyResponse = await $fetch<{ quizId: number }>(
      //   `/api/quizzes/vocabulary/${ruleId}`,
      //   {
      //     method: "PUT",
      //     headers,
      //     body: {
      //       numberOfQuestions: length,
      //       userId: userId,
      //     },
      //   },
      // );
    }
    // Save the quiz id to the lesson
    if (lessonId)
      await $fetch(`/api/lessons/${lessonId}`, {
        method: "PUT",
        headers,
        body: {
          quizId: response.quizId,
        },
      });

    userStore.creditsUsageUpdate(CREDITS_FOR_ONE_QUIZ);
    return response;
  } catch (err) {
    console.error(
      "An error occured while generating a new quiz, please try again.",
      err,
    );
  }
};

export const initializeFormQuiz = (
  quiz: Ref<FormQuizState>,
  questions: GrammarQuizQuestion[] | VocabularyQuizQuestion[],
): void => {
  quiz.value = questions.reduce(
    (
      acc: FormQuizState,
      currentValue: GrammarQuizQuestion | VocabularyQuizQuestion,
      index: number,
    ) => {
      acc[index + 1] = {
        questionId: currentValue.id,
        selectedOption: null,
        correctAnswer: currentValue.correctAnswer,
      };
      return acc;
    },
    {},
  );
};
