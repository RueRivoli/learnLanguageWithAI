import type { QuizFetchedQuestion, GrammarQuizQuestion } from "~/types/quizzes/quiz";
import type { Database } from "~/supabase/types";

type Result = Database['public']['Tables']['turkish_quizzes_result']['Row']

export type QuizResult = {
  createdAt: Result['created_at']
  id: Result['id']
  scoreGlobal: Result['score_global']
  userId: Result['user_id']
}
