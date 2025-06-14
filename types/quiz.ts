export type Quiz = {
  rule: number;
  score: number;
};

export interface QuizQuestion {
  type: string | null;
  difficulty: string | null;
  correctAnswer: number | null;
  question: string | null;
  option1: string | null;
  option2: string | null;
  option3: string | null;
  option4: string | null;
}

export interface FormQuizItem {
  selectedOption: string | null;
  correctAnswer: number| null;
}

export interface FormQuizState {
  [key: number]: FormQuizItem;
}