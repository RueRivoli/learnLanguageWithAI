import { createClient } from "@supabase/supabase-js";
import { defineEventHandler } from "h3";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_SUPABASE_KEY,
);

export default defineEventHandler(async () => {
  const { data, error } = await supabase.from("turkish_words").select("id, word, translation, function");
  console.log("data", data);
  if (error) throw error;
  return data;
});
