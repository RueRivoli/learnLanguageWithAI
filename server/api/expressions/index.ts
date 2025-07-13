import { createClient } from "@supabase/supabase-js";
import { defineEventHandler, getQuery } from "h3";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_SUPABASE_KEY,
);

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  let request
  if (query.is_learned === 'true') {
    request = supabase
    .from("turkish_expressions")
    .select(
      "id, text, translation, expression_sentence, expression_sentence_translation, expression_sentence_2, expression_sentence_2_translation, turkish_expressions_knowledge!inner(expression_learned, expression_mastered)",
    ).eq("turkish_expressions_knowledge.expression_mastered", true)
    .order("id", { ascending: true });
  } else {
    request = supabase
    .from("turkish_expressions")
    .select(
      "id, text, translation, expression_sentence, expression_sentence_translation, expression_sentence_2, expression_sentence_2_translation, turkish_expressions_knowledge!left(expression_learned, expression_mastered)",
    )
    .order("id", { ascending: true });
  }
  const { data, error } = await request;
  if (error) throw error;
  return data;
});
