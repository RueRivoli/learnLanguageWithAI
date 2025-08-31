import { createClient } from "@supabase/supabase-js";
import { defineEventHandler, getQuery } from "h3";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_SUPABASE_KEY,
);

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const quantity = Number(query.quantity) || 2;
  const { data, error } = await supabase
    .from("turkish_words_knowledge")
    .select("id, turkish_words(id, text, translation, role)")
    .eq("word_mastered", true)
    .limit(quantity);
    console.log("HEREEEEE", data);
  if (error) throw error; 
  return { data };
});
