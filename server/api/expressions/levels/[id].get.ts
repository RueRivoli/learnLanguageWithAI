import { createClient } from "@supabase/supabase-js";
import { defineEventHandler, getRouterParam } from "h3";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_SUPABASE_KEY,
);

export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, "id");
  console.log('userId', userId)
  const { data: knownExpressions, error } = await supabase
    .from("turkish_expressions_knowledge")
    .select(
      "expression_id",
    ).eq('user_id', userId).eq('master_expression', true);
    if (error) throw error;
   const knownExpressionIdsToExclude = knownExpressions.map(w =>  w.expression_id);
   console.log("knownWordIdsToExclude", knownExpressionIdsToExclude)
   let query = supabase
  .from('turkish_expressions')
  .select('id, text, translation')
  .order('id', { ascending: true })

if (knownExpressionIdsToExclude.length > 0) {
  query = query.not('id', 'in', `(${knownExpressionIdsToExclude.join(',')})`);
}

const { data: unknownExpressions, error: unknownExpressionsError } = await query.limit(30);

  if (unknownExpressionsError) throw unknownExpressionsError;
  return unknownExpressions;
});
