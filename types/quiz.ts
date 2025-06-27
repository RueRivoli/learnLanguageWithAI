import type { Database } from "~/supabase/types";

type QuizRow = Database['public']['Tables']['turkish_grammar_quizzes']['Row']

export type Quiz = {
  rule: QuizRow['grammar_rule_id'];
  score: number;
};

export type QuizSeries = Database['public']['Tables']['turkish_quizzes_series']['Row']
export type GrammarQuizModel = Database['public']['Tables']['turkish_grammar_quizzes']['Row']

export type QuizFetchedQuestion = {
  id: QuizSeries['id'],
  question_id: QuizSeries['id'],
  quiz_id: QuizSeries['id'],
  turkish_grammar_quizzes: {
    difficulty_status: GrammarQuizModel['difficulty_status'], 
    grammar_rule_id: GrammarQuizModel['grammar_rule_id'],
    question_type: GrammarQuizModel['question_type'], 
    option_1: GrammarQuizModel['option_1'], 
    option_2: GrammarQuizModel['option_2'], 
    option_3: GrammarQuizModel['option_3'], 
    option_4: GrammarQuizModel['option_4'], 
    text: GrammarQuizModel['text'], 
    correct_answer: GrammarQuizModel['correct_answer'], 
    translation: GrammarQuizModel['translation']
  }
}

export interface QuizFormattedQuestion {
  id: QuizSeries['id'],
  type: GrammarQuizModel['question_type'],
  difficulty: GrammarQuizModel['difficulty_status'],
  grammarRuleId: GrammarQuizModel['grammar_rule_id'],
  translation: GrammarQuizModel['translation'],
  correctAnswer: GrammarQuizModel['correct_answer'],
  question: GrammarQuizModel['text'], 
  option1: GrammarQuizModel['option_1'], 
  option2: GrammarQuizModel['option_2'], 
  option3: GrammarQuizModel['option_3'], 
  option4: GrammarQuizModel['option_4'], 
}

export interface FormQuizItem {
  selectedOption: number | null;
  questionId: QuizSeries['id'],
  correctAnswer: QuizRow['correct_answer'];
}

export interface FormQuizState {
  [key: number]: FormQuizItem;
}