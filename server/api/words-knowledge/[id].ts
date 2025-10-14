import { defineEventHandler, getRouterParam, readBody } from "h3";
import { createSupabaseClientWithUserAuthTokenFromHeader } from "../../utils/auth/supabaseClient";


export default defineEventHandler(async (event) => {
  const supabase = createSupabaseClientWithUserAuthTokenFromHeader(event)
    const wordId = getRouterParam(event, "id");
    const body = await readBody(event);
    console.log('body', body)
    const { error } = await supabase
      .from("turkish_words_knowledge")
      .delete().eq('word_id', wordId)
    if (error) throw error;
});
