import { createClient } from "@supabase/supabase-js";
import { defineEventHandler, getRouterParam, readBody } from "h3";
import { createSupabaseClientWithUserAuthTokenFromHeader } from "../../utils/auth/supabaseClient";

export default defineEventHandler(async (event) => {
  const supabase = createSupabaseClientWithUserAuthTokenFromHeader(event);
  const expressionId = getRouterParam(event, "id");
  const body = await readBody(event);

  const { data, error } = await supabase
    .from("turkish_expressions_knowledge")
    .upsert([{ expression_id: expressionId, ...body }], {
      onConflict: "user_id, expression_id",
    })
    .select();
  if (error) throw error;
  return data;
});
