import { createClient } from "@supabase/supabase-js";
import { createError, defineEventHandler, getHeader, getQuery } from "h3";
import { createSupabaseClientWithUserAuthToken } from "../../utils/auth/supabaseClient";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const authHeader = getHeader(event, 'authorization')
  if (!authHeader) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Authorization header required'
    })
  }
  const supabase = createSupabaseClientWithUserAuthToken(authHeader)
  let request = supabase
    .from("turkish_grammar_rules")
    .select("id, rule_name, rule_name_translation, symbol, highlights, type, intro, description, extended_description, difficulty_class, bookmarked, turkish_grammar_scores (score)")
  if (query.difficulty_class) {
    request = request.eq("difficulty_class", query.difficulty_class);
  }
  if (query.order_by) {
    request = request.order(query.order_by, { ascending: true })
  }
  if (query.limit) request = request.range(0, Number(query.limit));
  const { data, error } = await request;
  if (error) throw error;
  else if (data) return data;
});
