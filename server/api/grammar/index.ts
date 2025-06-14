import { createClient } from "@supabase/supabase-js";
import { defineEventHandler, getQuery, getRouterParam } from "h3";
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_SUPABASE_KEY,
);

export default defineEventHandler(async (event) => {
  console.log('LA')
  const query = getQuery(event);
  console.log('query', query)
  const request = supabase
    .from("turkish_grammar_rules")
    .select("id, rule_name, rule_name_translation, difficulty_class");
  // if (query.difficulty_class) {
  //   request = request.eq("difficulty_class", query.difficulty_class);
  // }
  if (query.order_by) {
    console.log('order_by',query.order_by )
    // request = request.order(query.order_by, { ascending: true })
    console.log('req', request)
  }
  // console.log('range', query.range)
  // if (query.range) request = request.range(0, Number(query.range));

  const { data, error } = await request;
  if (error) throw error;
  else if (data) return data;
});
