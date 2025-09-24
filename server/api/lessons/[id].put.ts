import { createClient } from "@supabase/supabase-js";
import { defineEventHandler, getRouterParam, readBody } from "h3";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_SUPABASE_KEY,
);

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const { quizId } = await readBody(event);
  const { data, error } = await supabase
    .from("turkish_lessons")
    .update({ quiz_id: quizId }).eq("id", id);
  if (error) throw error;
  return data;
});
