import { createClient } from "@supabase/supabase-js";
import { defineEventHandler, getRouterParam } from "h3";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_SUPABASE_KEY,
);

export default defineEventHandler(async (event) => {
    const wordId = getRouterParam(event, "id");
    const body = await readBody(event);
    console.log('body', body)
    const { error } = await supabase
      .from("turkish_words_knowledge")
      .delete().eq('word_id', wordId)
    if (error) throw error;
});
