import { defineEventHandler, getRouterParam, readBody } from "h3";
import { createSupabaseClientWithUserAuthTokenFromHeader } from "../../utils/auth/supabaseClient";


export default defineEventHandler(async (event) => {
  const supabase = createSupabaseClientWithUserAuthTokenFromHeader(event)
    const wordId = getRouterParam(event, "id");
    const body = await readBody(event);
    const { data, error } = await supabase
      .from("turkish_words_knowledge")
         .upsert([{word_id: wordId, ...body}],  { onConflict: 'user_id, word_id' }).select();
    if (error) throw error;
    return data;
});
