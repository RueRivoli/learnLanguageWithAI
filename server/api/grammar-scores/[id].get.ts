import { defineEventHandler, getQuery, getRouterParam } from "h3";
import { createSupabaseClientWithUserAuthTokenFromHeader } from "../../utils/auth/supabaseClient";

export default defineEventHandler(async (event) => {
  const supabase = createSupabaseClientWithUserAuthTokenFromHeader(event)
  const userId = getRouterParam(event, "id");
  const query = getQuery(event)
  const req = supabase
  .from("turkish_grammar_scores")
  .select(
    "score, rule_id, turkish_grammar_rules ( rule_name, rule_name_translation, difficulty_class, symbol, highlights)",
  )
  .eq("user_id", userId);
  if (query.order_by) req.order(query.order_by, { ascending: true });
  const { data, error } = await req

  if (error) throw error;
  return data;
});