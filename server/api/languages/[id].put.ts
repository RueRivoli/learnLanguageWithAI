import { createClient } from "@supabase/supabase-js";
import { defineEventHandler, getRouterParam, readBody } from "h3";

export default defineEventHandler(async (event) => {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SERVICE_SUPABASE_KEY,
  );
  const body = await readBody(event);
  const languageId = getRouterParam(event, "id");
  const realVotes = body.real_votes;
  const { error } = await supabase
   .from("languages_support").update({a_votes: realVotes}).eq("id", languageId);
  if (error) throw error;
});
