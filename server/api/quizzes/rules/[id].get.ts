import { defineEventHandler, getRouterParam } from "h3";
import { createSupabaseClientWithUserAuthTokenFromHeader } from "../../../utils/auth/supabaseClient";


export default defineEventHandler(async (event) => {
  const supabase = createSupabaseClientWithUserAuthTokenFromHeader(event)
  const ruleId = getRouterParam(event, "id");

  const { data, error } = await supabase
    .from("turkish_quizzes_result")
    .select("id, created_at, score_global")
    .eq("rule_id", Number(ruleId)).order("created_at", { ascending: true });

  if (error) throw error;
  return data;
});
