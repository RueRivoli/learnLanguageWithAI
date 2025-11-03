import type { Database } from "~/supabase/types";

type QuizRow = Database["public"]["Tables"]["turkish_grammar_quizzes"]["Row"];

export type Quiz = {
  rule: QuizRow["grammar_rule_id"];
  score: number;
};

export type QuizSeries =
  Database["public"]["Tables"]["turkish_quizzes_series"]["Row"];
export type GrammarQuizModel =
  Database["public"]["Tables"]["turkish_grammar_quizzes"]["Row"];

export type QuizFetchedQuestion = {
  id: QuizSeries["id"];
  question_id: QuizSeries["id"];
  quiz_id: QuizSeries["id"];
  turkish_grammar_quizzes: {
    difficulty_status: GrammarQuizModel["difficulty_status"];
    grammar_rule_id: GrammarQuizModel["grammar_rule_id"];
    question_type: GrammarQuizModel["question_type"];
    option_1: GrammarQuizModel["option_1"];
    option_2: GrammarQuizModel["option_2"];
    option_3: GrammarQuizModel["option_3"];
    option_4: GrammarQuizModel["option_4"];
    text: GrammarQuizModel["text"];
    correct_answer: GrammarQuizModel["correct_answer"];
    // translation: GrammarQuizModel['translation']
  };
};

type GrammarQuizQuestionModel =
  Database["public"]["Tables"]["turkish_grammar_quizzes"]["Row"];

// Quiz GrammarQuestion Model for a Lesson
export type GrammarQuizQuestion = {
  id: GrammarQuizQuestionModel["id"];
  type: GrammarQuizQuestionModel["question_type"];
  difficulty: GrammarQuizQuestionModel["difficulty_status"];
  ruleId: GrammarQuizQuestionModel["grammar_rule_id"];
  question: GrammarQuizQuestionModel["text"];
  correctAnswer: GrammarQuizQuestionModel["correct_answer"];
  option1: GrammarQuizQuestionModel["option_1"];
  option2: GrammarQuizQuestionModel["option_2"];
  option3: GrammarQuizQuestionModel["option_3"];
  option4: GrammarQuizQuestionModel["option_4"];
  note: GrammarQuizQuestionModel["note"];
};

export type QuizProgress = {
  completed: boolean | null;
  current: boolean | null;
  correct: boolean | null;
  questionIndex: number;
};

export interface FormQuizItem {
  selectedOption: number | null;
  questionId: QuizSeries["id"];
  correctAnswer: QuizRow["correct_answer"];
}

export interface FormQuizState {
  [key: number]: FormQuizItem;
}
