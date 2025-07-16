import { createClient } from "@supabase/supabase-js";
import { defineEventHandler, getQuery } from "h3";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_SUPABASE_KEY,
);

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const page = query.page
  const size = query.size
  const from = (Number(page) - 1) * Number(size)
  const to = (Number(page) * Number(size) - 1)
  let request

  if (query.is_learned === 'true') {
    request = supabase
    .from("turkish_words")
    .select(
      "id, text, translation, role, word_sentence, word_sentence_translation, word_sentence_2, word_sentence_2_translation, turkish_words_knowledge!inner(word_mastered)", { count: "exact"}).eq("turkish_words_knowledge.word_mastered", true).order("id", { ascending: true }).range(from, to)
  } else {
    const {data} = await supabase
    .from("turkish_words")
    .select(
      "id, turkish_words_knowledge!inner(word_mastered)").eq("turkish_words_knowledge.word_mastered", true)
    console.log('data', data)
    if (data) {
      const learnedWordIdsToExclude = data.map(({id}) => id)
      const IdToExclude = `(${learnedWordIdsToExclude.join(',')})`
      console.log('IdToExclude', IdToExclude)
      request = supabase
      .from("turkish_words")
      .select("id, text, translation, role, word_sentence, word_sentence_translation, word_sentence_2, word_sentence_2_translation", { count: "exact"}).not('id', 'in', IdToExclude).range(from, to).order("id", { ascending: true })
    }
  }
   const { data, count, error } = await request;
  if (error) throw error;
  return {data, count};
});
