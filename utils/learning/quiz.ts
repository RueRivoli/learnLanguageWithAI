import type { FormQuizState, QuizFetchedQuestion, GrammarQuizQuestion } from "~/types/quizzes/quiz";
import type { VocabularyQuizQuestion } from "~/types/quizzes/vocabulary-quiz";
import { getAuthToken } from "../auth/auth";
import { CREDITS_FOR_ONE_QUIZ } from "../credits";


export const getScoreBackgroundColorClass = (score: number) => {
  if (score > 0 && score < 40) {
    return 'bg-error';
  } else if (score >= 40 && score < 70) {
    return 'bg-warning';
  } else if (score >= 70) {
    return 'bg-success';
  }
  return 'bg-neutral';
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


export const parseGrammarQuizQuestion = (question: QuizFetchedQuestion): GrammarQuizQuestion => {
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


export const handleGenerationQuiz = async (ruleId: number, userId: string, redirectionPath: string, lessonId?: string | null, length = 5) => {
  try {
    const userStore = useUserStore();
    // Attach Authorization header from Supabase session for secure server-side auth
    const headers = await getAuthToken();
    const response = await $fetch<{ quizId: number }>(`/api/quizzes/${ruleId}`, {
      method: "PUT",
      headers,
      body: {
        numberOfQuestions: length,
        userId: userId,
      },
    });
    console.log("has generated a quiz with the quizId: ", response.quizId);
    // response is the id of the new generated quiz
    if (lessonId) await $fetch(`/api/lessons/${lessonId}`, {
      method: "PUT", 
      headers,
      body: {
        quizId: response.quizId,
      },
    });
    userStore.setcreditsAvailable(CREDITS_FOR_ONE_QUIZ);
    await navigateTo({
      path: `${redirectionPath}/${response.quizId}`,
    });
  } catch (err) {
    console.error(
      "An error occured while generating a new quiz, please try again.",
      err,
    );
  }
};


export const initializeFormQuiz = (quiz: Ref<FormQuizState>, questions: GrammarQuizQuestion[] | VocabularyQuizQuestion[]): void => {
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
}

