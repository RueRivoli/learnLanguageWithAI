import { createClient } from "@supabase/supabase-js";
import { defineEventHandler, getRouterParam } from "h3";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_SUPABASE_KEY,
);

export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, "id");
  console.log('userId', userId)
  const { data: knownWords, error } = await supabase
    .from("turkish_words_knowledge")
    .select(
      "word_id",
    ).eq('user_id', userId).eq('master_word', true);
    if (error) throw error;
   const knownWordIdsToExclude = knownWords.map(w =>  w.word_id);
   console.log("knownWordIdsToExclude", knownWordIdsToExclude)
   let query = supabase
  .from('turkish_words')
  .select('id, text, translation')
  .order('id', { ascending: true })

if (knownWordIdsToExclude.length > 0) {
  query = query.not('id', 'in', `(${knownWordIdsToExclude.join(',')})`);
}

const { data: unknownWords, error: unknownWordsError } = await query.limit(30);

  if (unknownWordsError) throw unknownWordsError;
  return unknownWords;
});
