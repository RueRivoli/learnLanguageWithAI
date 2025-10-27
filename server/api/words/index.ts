import { createClient } from "@supabase/supabase-js";
import { createError, defineEventHandler, getHeader, getQuery } from "h3";
import { createSupabaseClientWithUserAuthToken, createSupabaseClientWithUserAuthTokenFromHeader } from "../../utils/auth/supabaseClient";


export default defineEventHandler(async (event) => {
  const supabase = createSupabaseClientWithUserAuthTokenFromHeader(event)
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
      "id, text, role, translation, word_sentence, word_sentence_translation, role_2, translation_2, word_sentence_2, word_sentence_2_translation, role_3, translation_3, word_sentence_3, word_sentence_3_translation, turkish_words_knowledge!inner(word_mastered)", { count: "exact"}).eq("turkish_words_knowledge.word_mastered", true).order("id", { ascending: true }).range(from, to)
  } else {
    const {data} = await supabase
    .from("turkish_words")
    .select(
      "id, turkish_words_knowledge!inner(word_mastered)").eq("turkish_words_knowledge.word_mastered", true)
    if (data) {
      const learnedWordIdsToExclude = data.map(({id}) => id)
      const IdToExclude = `(${learnedWordIdsToExclude.join(',')})`
      request = supabase
      .from("turkish_words")
      .select("id, text, translation, role, word_sentence, word_sentence_translation, word_sentence_2, word_sentence_2_translation", { count: "exact"}).not('id', 'in', IdToExclude).range(from, to).order("id", { ascending: true })
    }
  }
   const { data, count, error } = await request;
  if (error) throw error;
  return {data, count};
});
