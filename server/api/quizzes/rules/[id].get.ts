import { createClient } from "@supabase/supabase-js";
import { defineEventHandler, getRouterParam } from "h3";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_SUPABASE_KEY,
);

export default defineEventHandler(async (event) => {
  const ruleId = getRouterParam(event, "ruleId");

  const { data, error } = await supabase
    .from("turkish_result_quizzes")
    .select("id, created_at, score")
    .eq("grammar_rule_id", ruleId);

  if (error) throw error;
  return data;
});
