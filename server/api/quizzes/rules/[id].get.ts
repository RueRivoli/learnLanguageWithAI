import { createClient } from "@supabase/supabase-js";
import { defineEventHandler, getRouterParam } from "h3";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_SUPABASE_KEY,
);

export default defineEventHandler(async (event) => {
  const ruleId = getRouterParam(event, "id");
  const { data, error } = await supabase
    .from("turkish_quizzes_result")
    .select("id, created_at, score_global")
    .eq("rule_id", Number(ruleId));

  if (error) throw error;
  return data;
});
