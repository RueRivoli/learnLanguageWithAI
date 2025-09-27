import { createClient } from "@supabase/supabase-js";
import { defineEventHandler, getRouterParam } from "h3";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_SUPABASE_KEY,
);

export default defineEventHandler(async (event) => {
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
