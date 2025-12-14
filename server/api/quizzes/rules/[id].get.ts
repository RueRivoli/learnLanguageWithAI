import { defineEventHandler, getRouterParam } from "h3";
import { createSupabaseClientWithUserAuthTokenFromHeader } from "../../../utils/auth/supabaseClient";

export default defineEventHandler(async (event) => {
  const supabase = createSupabaseClientWithUserAuthTokenFromHeader(event);
  const ruleId = getRouterParam(event, "id");

  const { data, error } = await supabase
    .from("turkish_quizzes_result")
    .select("id, created_at, score_global")
    .eq("rule_id", Number(ruleId))
    .not("score_global", "is", null)
    .order("created_at", { ascending: true });

  if (error) throw error;

  const scores =
    (data ?? [])
      .map((row) => row.score_global as number | null)
      .filter((v): v is number => typeof v === "number") || [];
  const averageScoreGlobal =
    scores.length > 0
      ? scores.reduce((sum, v) => sum + v, 0) / scores.length
      : null;
console.log('averageScoreGlobal', averageScoreGlobal);
  return {
    data,
    averageScoreGlobal,
  };
});
