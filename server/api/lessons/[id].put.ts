import { defineEventHandler, getRouterParam, readBody } from "h3";
import { createSupabaseClientWithUserAuthTokenFromHeader } from "../../utils/auth/supabaseClient";

export default defineEventHandler(async (event) => {
  const supabase = createSupabaseClientWithUserAuthTokenFromHeader(event);
  const id = getRouterParam(event, "id");
  const { quizId } = await readBody(event);
  const { data, error } = await supabase
    .from("turkish_lessons")
    .update({ quiz_id: quizId })
    .eq("id", id);
  if (error) throw error;
  return data;
});
