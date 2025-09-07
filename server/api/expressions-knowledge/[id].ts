import { createClient } from "@supabase/supabase-js";
import { defineEventHandler, getRouterParam } from "h3";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_SUPABASE_KEY,
);

export default defineEventHandler(async (event) => {
    const expressionId = getRouterParam(event, "id");
    const { error } = await supabase
      .from("turkish_expressions_knowledge")
      .delete().eq('expression_id', expressionId)
    if (error) throw error;
});
