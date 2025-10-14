import { defineEventHandler, getQuery, getRouterParam, readBody } from "h3";
import { createSupabaseClientWithUserAuthTokenFromHeader } from "../../../utils/auth/supabaseClient";



export default defineEventHandler(async (event) => {
  const supabase = createSupabaseClientWithUserAuthTokenFromHeader(event)
  const userId = getRouterParam(event, "id");
  const body = readBody(event)
  const masteredWordIds = body.word_mastered_id
  const forgottonWordIds = body.word_forgotton_ids
    for (const wordId of masteredWordIds) {
        supabase.from("turkish_words_knowledge")
        .upsert({
            word_id: wordId,
            word_learned: false,
            word_mastered: true,
        })
    }
    for (const wordId of forgottonWordIds) {
        supabase.from("turkish_words_knowledge")
        .upsert({
            word_id: wordId,
            word_learned: false,
            word_mastered: false,
        })
    }
  if (error) throw error;
  return data;
});