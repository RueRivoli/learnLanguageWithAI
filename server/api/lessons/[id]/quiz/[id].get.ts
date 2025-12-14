import { createClient } from "@supabase/supabase-js";
import { defineEventHandler, getQuery } from "h3";
import { createSupabaseClientWithUserAuthTokenFromHeader } from "~/server/utils/auth/supabaseClient";

export default defineEventHandler(async (event) => {
  const supabase = createSupabaseClientWithUserAuthTokenFromHeader(event);
  const query = getQuery(event);
  const quizId = getRouterParam(event, "id");
  const { data: grammarQuizzes, error: grammarQuizzesError } = await supabase
    .from("turkish_quizzes_grammar_series")
    .select(
      "turkish_grammar_quizzes(id, question_type, text, option_1, option_2, option_2, option_4, correct_answer, note, word_id)",
    )
    .eq("quiz_id", quizId);

  const { data: wordQuizzes, error: wordQuizzesError } = await supabase
    .from("turkish_quizzes_word_series")
    .select(
      "turkish_word_quizzes(id, text, option_1, option_2, option_2, option_4, correct_answer, note, word_id)",
    )
    .eq("quiz_id", quizId);
  const { data: expressionQuizzes, error: expressionQuizzesError } =
    await supabase
      .from("turkish_quizzes_expression_series")
      .select(
        "turkish_expression_quizzes(id, text, option_1, option_2, option_2, option_4, correct_answer, note, expression_id)",
      )
      .eq("quiz_id", quizId);
  if (grammarQuizzesError || wordQuizzesError || expressionQuizzesError)
    throw grammarQuizzesError || wordQuizzesError || expressionQuizzesError;
  return { grammarQuizzes, wordQuizzes, expressionQuizzes };
});
