import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_SUPABASE_KEY,
);

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;

  const { data, error } = await supabase
    .from("turkish_grammar_rules")
    .select(
      "id, rule_name, rule_name_translation, difficulty_class, description, sentence_example, sentence_example_translation, sentence_example_2_translation",
    )
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
});
