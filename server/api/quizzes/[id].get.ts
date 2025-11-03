import { defineEventHandler, getRouterParam } from "h3";
import { createSupabaseClientWithUserAuthTokenFromHeader } from "../../utils/auth/supabaseClient";

export default defineEventHandler(async (event) => {
  const supabase = createSupabaseClientWithUserAuthTokenFromHeader(event);
  const id = getRouterParam(event, "id");
  const { data, error } = await supabase
    .from("turkish_quizzes_series")
    .select(
      "id, question_id, quiz_id, turkish_grammar_quizzes ( difficulty_status, grammar_rule_id, question_type, option_1, option_2, option_3, option_4, text, correct_answer, note )",
    )
    .eq("quiz_id", id);

  if (error) throw error;
  return data;
});
