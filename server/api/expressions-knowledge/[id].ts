import { defineEventHandler, getRouterParam } from "h3";
import { createSupabaseClientWithUserAuthTokenFromHeader } from "../../utils/auth/supabaseClient";

export default defineEventHandler(async (event) => {
  const supabase = createSupabaseClientWithUserAuthTokenFromHeader(event);
  const expressionId = getRouterParam(event, "id");
  const { error } = await supabase
    .from("turkish_expressions_knowledge")
    .delete()
    .eq("expression_id", expressionId);
  if (error) throw error;
});
