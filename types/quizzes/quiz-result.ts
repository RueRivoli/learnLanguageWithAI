import type { QuizFetchedQuestion, GrammarQuizQuestion } from "~/types/quizzes/quiz";
import type { Database } from "~/supabase/types";

type Result = Database['public']['Tables']['turkish_quizzes_result']['Row']

export type QuizResult = {
  createdAt: Result['created_at']
  id: Result['id']
  scoreGlobal: Result['score_global']
  userId: Result['user_id']
}


export type DetailedResults = {
  grammar: { correct: number, percentage: number, total: number},
      words: { 
        correct: number, 
        total: number, 
        incorrect: number, 
        percentage: number,
        validatedList: Array<{text: string, isMastered: boolean, id: number}>,
        invalidatedList: Array<{text: string, isMastered: boolean, id: number}>,
      },
      expressions: { 
        correct: number, 
        total: number, 
        incorrect: number, 
        percentage: number,
        validatedList: Array<{text: string, isMastered: boolean, id: number}>,
        invalidatedList: Array<{text: string, isMastered: boolean, id: number}>,
      },
      overall: { percentage: number }
} | {
  grammar: { correct: number, percentage: number, total: number},
  overall: { percentage: number }
}
