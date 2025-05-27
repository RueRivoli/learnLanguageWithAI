import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_SUPABASE_KEY,
);

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;

  const { data, error } = await supabase
    .from("turkish_lessons")
    .select(
      "id, title, title_en, content, content_en, turkish_grammar_rules (rule_name, rule_name_translation, description, sentence_example, sentence_example_translation, sentence_example_2, sentence_example_2_translation), turkish_lesson_words(turkish_words(word, translation, word_sentence, word_sentence_translation))",
    )
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
});
