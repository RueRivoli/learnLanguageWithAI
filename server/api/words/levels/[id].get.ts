import { createClient } from "@supabase/supabase-js";
import { defineEventHandler, getRouterParam, getQuery } from "h3";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_SUPABASE_KEY,
);

export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, "id");
  const query = getQuery(event);
  const limitItems = Number(query.limit)
  // TODO: Fetch some learned words to mix it ? 
  const { data: knownWords, error } = await supabase
    .from("turkish_words_knowledge")
    .select(
      "word_id",
    ).eq('user_id', userId).eq('word_mastered', true);
    if (error) throw error;
   const knownWordIdsToExclude = knownWords.map(w =>  w.word_id);
   let req = supabase
  .from('turkish_words')
  .select('id, text, translation')
  .order('id', { ascending: true })

if (knownWordIdsToExclude.length > 0) {
  req = req.not('id', 'in', `(${knownWordIdsToExclude.join(',')})`);
}

const { data: unknownWords, error: unknownWordsError } = await req.limit(limitItems);

  if (unknownWordsError) throw unknownWordsError;
  return unknownWords;
});