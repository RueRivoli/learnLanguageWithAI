import { defineEventHandler } from "h3";
import { createSupabaseClientWithUserAuthTokenFromHeader } from "../../../utils/auth/supabaseClient";


export default defineEventHandler(async (event) => {
  const supabase = createSupabaseClientWithUserAuthTokenFromHeader(event)
    const {count, error} = await supabase
    .from("turkish_expressions")
    .select('id', { count: 'exact', head: true })
  if (error) throw error;
  return {count};
});