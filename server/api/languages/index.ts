import { createClient } from "@supabase/supabase-js";
import { defineEventHandler, getQuery } from "h3";

export default defineEventHandler(async (event) =>  {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SERVICE_SUPABASE_ANON_KEY,
  );
  const query = getQuery(event);
  const isSupported = query.is_supported;
  let request = supabase.from("languages_support").select("id, language, a_votes, b_votes, status, background_classes, is_supported, is_released").order("id", { ascending: true });
  if (isSupported === 'true') {
    request = request.eq("is_supported", true);
  } else if (isSupported === 'false') {
    request = request.eq("is_supported", false);
  }
  const { data, error } = await request;
  if (error) throw error;
  if (isSupported === 'false') {
      // Sort by the sum of a_votes + b_votes (descending)
      const sortedData = data?.sort((a, b) => (b.a_votes + b.b_votes) - (a.a_votes + a.b_votes));
      return { data: sortedData };
  }
  return { data };
});
