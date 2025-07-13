import { createClient } from "@supabase/supabase-js";
import { defineEventHandler, getRouterParam } from "h3";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_SUPABASE_KEY,
);

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  const { data, error } = await supabase
    .from("turkish_lessons")
    .insert({ title: "title", title_en: 'title_en', grammar_rule_id: 2, content: "content", content_en: "english" })
  if (error) throw error;
  return data;
});
