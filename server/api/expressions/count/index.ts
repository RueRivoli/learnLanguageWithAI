import { createClient } from "@supabase/supabase-js";
import { defineEventHandler, getQuery } from "h3";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_SUPABASE_KEY,
);

export default defineEventHandler(async () => {
    const {count, error} = await supabase
    .from("turkish_expressions")
    .select('id', { count: 'exact', head: true })
  if (error) throw error;
  return {count};
});
