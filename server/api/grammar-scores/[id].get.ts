import { createClient } from "@supabase/supabase-js";
import { defineEventHandler, getQuery, getRouterParam } from "h3";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_SUPABASE_KEY,
);

export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, "id");
  const query = getQuery(event)
  const req = supabase
  .from("turkish_grammar_scores")
  .select(
    "score, rule_id, turkish_grammar_rules ( rule_name, rule_name_translation)",
  )
  .eq("user_id", userId);
  if (query.order_by) req.order(query.order_by, { ascending: true });
  const { data, error } = await req

  if (error) throw error;
  return data;
});
