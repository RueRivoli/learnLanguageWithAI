import { createClient } from "@supabase/supabase-js";
import { defineEventHandler } from "h3";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_SUPABASE_KEY,
);

export default defineEventHandler(async () => {
  const { data, error } = await supabase
    .from("turkish_words")
    .select(
      "id, text, translation, role, word_sentence, word_sentence_translation, word_sentence_2, word_sentence_2_translation",
    )
    .order("id", { ascending: true });
  if (error) throw error;
  return data;
});
