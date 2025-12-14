import { defineEventHandler, getRouterParam } from "h3";
import { createSupabaseClientWithUserAuthTokenFromHeader } from "../../utils/auth/supabaseClient";

export default defineEventHandler(async (event) => {
  const supabase = createSupabaseClientWithUserAuthTokenFromHeader(event);
  const id = getRouterParam(event, "id");
  const { data: grammarQuizzes, error: grammarQuizzesError } = await supabase
    .from("turkish_quizzes_grammar_series")
    .select(
      "id, question_id, quiz_id, turkish_grammar_quizzes ( difficulty_status, grammar_rule_id, question_type, option_1, option_2, option_3, option_4, text, correct_answer, note )",
    )
    .eq("quiz_id", id);

  const { data: wordQuizzes, error: wordQuizzesError } = await supabase
    .from("turkish_quizzes_word_series")
    .select(
      "id, question_id, quiz_id, turkish_word_quizzes ( turkish_words(id, text), question_type, option_1, option_2, option_3, option_4, text, correct_answer, note )",
    )
    .eq("quiz_id", id);

  const { data: expressionQuizzes, error: expressionQuizzesError } =
    await supabase
      .from("turkish_quizzes_expression_series")
      .select(
        "id, question_id, quiz_id, turkish_expression_quizzes ( turkish_expressions(id, text), question_type, option_1, option_2, option_3, option_4, text, correct_answer, note )",
      )
      .eq("quiz_id", id);

  if (grammarQuizzesError || wordQuizzesError || expressionQuizzesError)
    throw grammarQuizzesError || wordQuizzesError || expressionQuizzesError;
  return { grammarQuizzes, wordQuizzes, expressionQuizzes };
});
