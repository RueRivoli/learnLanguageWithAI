import { createClient } from "@supabase/supabase-js";
import { defineEventHandler, getQuery } from "h3";
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_SUPABASE_KEY,
);

export default defineEventHandler(async (event) => {
  console.log('LA')
  const query = getQuery(event);
  console.log('query', query)
  let request = supabase
    .from("turkish_grammar_rules")
    .select("id, rule_name, rule_name_translation, symbol, highlights, type, intro, description, extended_description, difficulty_class, bookmarked, turkish_grammar_scores (score)")
  if (query.difficulty_class) {
    request = request.eq("difficulty_class", query.difficulty_class);
  }
  console.log("query.order_by", query, query.order_by)
  if (query.order_by) {
    request = request.order(query.order_by, { ascending: false })
  }
  if (query.limit) request = request.range(0, Number(query.limit));
  const { data, error } = await request;
  if (error) throw error;
  else if (data) return data;
});
