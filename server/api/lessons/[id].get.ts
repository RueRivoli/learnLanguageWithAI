import { createClient } from "@supabase/supabase-js";
import { defineEventHandler, getRouterParam, getHeader, createError } from "h3";

export default defineEventHandler(async (event) => {
  // Get the authorization header from the request
  const authHeader = getHeader(event, 'authorization')
  if (!authHeader) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Authorization header required'
    })
  }

  // Create Supabase client with user's auth token
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
    {
      global: {
        headers: {
          Authorization: authHeader
        }
      }
    }
  )

  // Verify the user is authenticated
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError) throw userError
  if (!user?.id) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unable to resolve authenticated user'
    })
  }

  const id = getRouterParam(event, "id");
  const { data, error } = await supabase
    .from("turkish_lessons")
    .select(
      "id, title, title_en, introduction, img_url, grammar_rule_id, quiz_id, user_id, sentence_1, sentence_1_en, sentence_2, sentence_2_en, sentence_3, sentence_3_en, sentence_4, sentence_4_en, sentence_5, sentence_5_en, sentence_6, sentence_6_en, sentence_7, sentence_7_en, sentence_8, sentence_8_en, sentence_9, sentence_9_en, sentence_10, sentence_10_en, sentence_11, sentence_11_en, sentence_12, sentence_12_en, sentence_13, sentence_13_en, sentence_14, sentence_14_en, sentence_15, sentence_15_en, sentence_16, sentence_16_en, sentence_17, sentence_17_en, sentence_18, sentence_18_en, sentence_19, sentence_19_en, sentence_20, sentence_20_en, turkish_grammar_rules (rule_name, rule_name_translation, intro, symbol, description, difficulty_class, extended_description), turkish_lesson_words(turkish_words(id, text, role, translation, word_sentence, word_sentence_translation,  role_2, translation_2, word_sentence_2, word_sentence_2_translation, role_3, translation_3, word_sentence_3, word_sentence_3_translation)), turkish_lesson_expressions(turkish_expressions(id, text, translation, expression_sentence, expression_sentence_translation, expression_sentence_2, expression_sentence_2_translation)), turkish_quizzes_result (id, score_global, created_at)",
    ).eq("id", id).single();
  if (error) throw error;
  return data;
});
