import type { QuizFetchedQuestion, QuizFormattedQuestion, QuizQuestion, QuizQuestion } from "~/types/quiz.ts";
import type { Database } from "~/supabase/types";



export const parseQuestions = (data: any): QuizQuestion => {
  return {
    type: data.turkish_grammar_quizzes.question_type ?? null,
    difficulty: data.turkish_grammar_quizzes.difficulty_class ?? null,
    grammarRuleId: data.turkish_grammar_quizzes.grammar_rule_id ?? null,
    correctAnswer: data.turkish_grammar_quizzes.correct_answer ?? null,
    question: data.turkish_grammar_quizzes.text ?? null,
    option1: data.turkish_grammar_quizzes.option_1 ?? null,
    option2: data.turkish_grammar_quizzes.option_2 ?? null,
    option3: data.turkish_grammar_quizzes.option_3 ?? null,
    option4: data.turkish_grammar_quizzes.option_4 ?? null,
  };
};


export const parseQuizQuestion = (question: QuizFetchedQuestion): QuizFormattedQuestion => {
  return {
    id: question.id,
    type: question.turkish_grammar_quizzes.question_type ?? null,
    difficulty: question.turkish_grammar_quizzes.difficulty_status ?? null,
    grammarRuleId: question.turkish_grammar_quizzes.grammar_rule_id ?? null,
    correctAnswer: question.turkish_grammar_quizzes.correct_answer ?? null,
    question: question.turkish_grammar_quizzes.text ?? null,
    translation: question.turkish_grammar_quizzes.translation ?? null,
    option1: question.turkish_grammar_quizzes.option_1 ?? null,
    option2: question.turkish_grammar_quizzes.option_2 ?? null,
    option3: question.turkish_grammar_quizzes.option_3 ?? null,
    option4: question.turkish_grammar_quizzes.option_4 ?? null,
  };
};
