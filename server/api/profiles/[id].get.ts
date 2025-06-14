import { createClient } from "@supabase/supabase-js";
import { defineEventHandler, getRouterParam } from "h3";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_SUPABASE_KEY,
);

export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, "id");
  const { data, error } = await supabase
    .from("profiles")
    .select()
    .eq("id", userId);
  if (error) throw error;
  return data;
});
