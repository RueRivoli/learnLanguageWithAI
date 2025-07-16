import { createClient } from "@supabase/supabase-js";
import { defineEventHandler, getRouterParam } from "h3";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_SUPABASE_KEY,
);

export default defineEventHandler(async (event) => {
    const expressionId = getRouterParam(event, "id");
    const body = await readBody(event);
    console.log('body', body)
  const { data, error } = await supabase
    .from("turkish_expressions_knowledge")
    .upsert([{expression_id: expressionId, ...body}], { onConflict: 'user_id, expression_id' }).select();
    if (error) throw error;
    return data;
});
