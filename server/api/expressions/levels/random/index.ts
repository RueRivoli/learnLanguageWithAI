import { defineEventHandler, getQuery } from "h3";
import { createSupabaseClientWithUserAuthTokenFromHeader } from "../../../../utils/auth/supabaseClient";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const quantity = Number(query.quantity) || 1;
  const supabase = createSupabaseClientWithUserAuthTokenFromHeader(event)

  const { data, error } = await supabase
    .from("turkish_expressions_knowledge")
    .select("id, turkish_expressions(id, text, translation)")
    .eq("expression_mastered", true)
    .limit(quantity);
    
  if (error) throw error;
  return { data };
});
