import { createClient } from "@supabase/supabase-js";
import { defineEventHandler, getRouterParam, getQuery } from "h3";
import { createSupabaseClientWithUserAuthTokenFromHeader } from "../../../utils/auth/supabaseClient";

export default defineEventHandler(async (event) => {
  const supabase = createSupabaseClientWithUserAuthTokenFromHeader(event)
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

if (knownWordIdsToExclude.length > 0) {
  req = req.not('id', 'in', `(${knownWordIdsToExclude.join(',')})`);
}

// Get more words than needed to shuffle them
const { data: allUnknownWords, error: unknownWordsError } = await req
  .limit(limitItems * 3); // Get 3x more words to have a good pool for randomization

if (unknownWordsError) throw unknownWordsError;

// Shuffle the array and take only the requested amount
const shuffleArray = (array: any[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const unknownWords = shuffleArray(allUnknownWords || []).slice(0, limitItems);

  return unknownWords;
});