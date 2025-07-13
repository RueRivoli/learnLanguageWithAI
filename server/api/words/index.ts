import { createClient } from "@supabase/supabase-js";
import { defineEventHandler, getQuery } from "h3";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_SUPABASE_KEY,
);

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  let request
  if (query.is_learned === 'true') {
    request = supabase
    .from("turkish_words")
    .select(
      "id, text, translation, role, word_sentence, word_sentence_translation, word_sentence_2, word_sentence_2_translation, turkish_words_knowledge!inner(word_learned, word_mastered)",
    ).eq("turkish_words_knowledge.word_mastered", true)
    .order("id", { ascending: true })
  } else {
    request = supabase
    .from("turkish_words")
    .select(
      "id, text, translation, role, word_sentence, word_sentence_translation, word_sentence_2, word_sentence_2_translation, turkish_words_knowledge!left(word_learned, word_mastered)",
    )
  }
   const { data, error } = await request;
  if (error) throw error;
  return data;
});
