import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_SUPABASE_KEY,
);

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const difficulty = query.difficulty_class;
  let request = supabase
    .from("turkish_grammar_rules")
    .select("id,rule_name, rule_name_translation, difficulty_class");
  if (difficulty) {
    request = request.eq("difficulty_class", difficulty);
  }

  const { data, error } = await request;
  if (error) throw error;
  else if (data) return data;
});
