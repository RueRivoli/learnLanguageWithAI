import { createClient } from "@supabase/supabase-js";
import { defineEventHandler, getQuery } from "h3";
import { createSupabaseClientWithUserAuthTokenFromHeader } from "../../../../utils/auth/supabaseClient";


export default defineEventHandler(async (event) => {
  const supabase = createSupabaseClientWithUserAuthTokenFromHeader(event)
  const query = getQuery(event);
  const quantity = Number(query.quantity) || 2;
  const { data, error } = await supabase
    .from("turkish_words_knowledge")
    .select("id, turkish_words(id, text, translation, role)")
    .eq("word_mastered", true)
    .limit(quantity);
  if (error) throw error; 
  return { data };
});
