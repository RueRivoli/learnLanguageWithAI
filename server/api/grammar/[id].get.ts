import { defineEventHandler } from "h3";
import { createSupabaseClientWithUserAuthTokenFromHeader } from "../../utils/auth/supabaseClient";

export default defineEventHandler(async (event) => {
  const supabase = createSupabaseClientWithUserAuthTokenFromHeader(event);
  const id = event.context.params?.id;

  const { data, error } = await supabase
    .from("turkish_grammar_rules")
    .select(
      "id, rule_name, rule_name_translation, symbol, difficulty_class, intro, description, extended_description",
    )
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
});
