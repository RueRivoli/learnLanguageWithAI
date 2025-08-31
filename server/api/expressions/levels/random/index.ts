import { createClient } from "@supabase/supabase-js";
import { defineEventHandler, getQuery } from "h3";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_SUPABASE_KEY,
);

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const quantity = Number(query.quantity) || 1;

  const { data, error } = await supabase
    .from("turkish_expressions_knowledge")
    .select("id, turkish_expressions(id, text, translation)")
    .eq("expression_mastered", true)
    .limit(quantity);
    
  if (error) throw error;
  return { data };
});
