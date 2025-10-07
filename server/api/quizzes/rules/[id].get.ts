import { createError, defineEventHandler, getHeader, getRouterParam } from "h3";
import { createSupabaseClientWithUserAuthToken } from "../../../utils/auth/supabaseClient";


export default defineEventHandler(async (event) => {
  const ruleId = getRouterParam(event, "id");
  const authHeader = getHeader(event, 'authorization')
  if (!authHeader) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Authorization header required'
    })
  }
  const supabase = createSupabaseClientWithUserAuthToken(authHeader)
  const { data, error } = await supabase
    .from("turkish_quizzes_result")
    .select("id, created_at, score_global")
    .eq("rule_id", Number(ruleId)).order("created_at", { ascending: true });

  if (error) throw error;
  return data;
});
