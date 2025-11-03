import { defineEventHandler, getQuery, getRouterParam } from "h3";
import { createSupabaseClientWithUserAuthTokenFromHeader } from "../../../../utils/auth/supabaseClient";

export default defineEventHandler(async (event) => {
  const supabase = createSupabaseClientWithUserAuthTokenFromHeader(event);
  const id = getRouterParam(event, "id");
  const { data, error } = await supabase
    .from("turkish_lessons")
    .select(
      "id, title, turkish_grammar_rules (id, rule_name, symbol, rule_name_translation, difficulty_class), turkish_lesson_words(turkish_words(id, text, role, translation, role)), turkish_lesson_expressions(turkish_expressions(id,text, translation))",
    )
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
});
