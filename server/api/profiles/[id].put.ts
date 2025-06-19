import { languages } from '~/utils/syllabus';
import { createClient } from "@supabase/supabase-js";
import { defineEventHandler, getRouterParam } from "h3";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_SUPABASE_KEY,
);

export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, "id");
  const body = await readBody(event);
  if (!userId) {
    throw ({ statusCode: 400, statusMessage: "Missing user ID" });
  }
  const { data, error } = await supabase
    .from("profiles")
    .update(body)
    .eq("id", userId).select();
  if (error) throw error;
  return data;
});
