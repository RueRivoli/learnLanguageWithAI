import { defineEventHandler, getRouterParam } from "h3";
import { createSupabaseClientWithUserAuthTokenFromHeader } from "../../utils/auth/supabaseClient";

export default defineEventHandler(async (event) => {
  const supabase = createSupabaseClientWithUserAuthTokenFromHeader(event)
  const userId = getRouterParam(event, "id");
  console.log("userId", userId);
  if (!userId) {
    throw ({ statusCode: 400, statusMessage: "Missing user ID" });
  }
  const { data, error } = await supabase
    .from("profiles")
    .select()
    .eq("id", userId);
  if (error) throw error;
  return data;
});
