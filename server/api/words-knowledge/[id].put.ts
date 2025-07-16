import { createClient } from "@supabase/supabase-js";
import { defineEventHandler, getRouterParam } from "h3";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_SUPABASE_KEY,
);

export default defineEventHandler(async (event) => {
    const wordId = getRouterParam(event, "id");
    const body = await readBody(event);
    const { data, error } = await supabase
      .from("turkish_words_knowledge")
         .upsert([{word_id: wordId, ...body}],  { onConflict: 'user_id, word_id' }).select();
    if (error) throw error;
    return data;
});
