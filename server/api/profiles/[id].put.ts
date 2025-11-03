import { defineEventHandler, getRouterParam, readBody } from "h3";
import { createSupabaseClientWithUserAuthTokenFromHeader } from "../../utils/auth/supabaseClient";

export default defineEventHandler(async (event) => {
  const supabase = createSupabaseClientWithUserAuthTokenFromHeader(event);
  const userId = getRouterParam(event, "id");
  const body = await readBody(event);
  if (!userId) {
    throw { statusCode: 400, statusMessage: "Missing user ID" };
  }
  const { data, error } = await supabase
    .from("profiles")
    .update(body)
    .eq("id", userId)
    .select();
  if (error) throw error;
  return data;
});
