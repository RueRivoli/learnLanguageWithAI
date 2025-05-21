import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_SUPABASE_KEY,
);

export default defineEventHandler(async (event) => {
  const request = supabase
    .from("turkish_lessons")
    .select(
      "id, title, title_en,  turkish_grammar_rules ( rule_name, rule_name_translation), turkish_lesson_words ( turkish_words ( word ) )",
    );

  const { data, error } = await request;
  if (error) throw error;
  else if (data) return data;
});
