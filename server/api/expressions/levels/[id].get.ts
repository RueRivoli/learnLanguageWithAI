import { createClient } from "@supabase/supabase-js";
import { defineEventHandler, getRouterParam, getQuery } from "h3";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_SUPABASE_KEY,
);

export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, "id");
  const query = getQuery(event);
  const { data: knownExpressions, error } = await supabase
    .from("turkish_expressions_knowledge")
    .select(
      "expression_id",
    ).eq('user_id', userId).eq('expression_mastered', true);
    if (error) throw error;
   const knownExpressionIdsToExclude = knownExpressions.map(w =>  w.expression_id);
   let req = supabase
  .from('turkish_expressions')
  .select('id, text, translation')
  .order('id', { ascending: true })

if (knownExpressionIdsToExclude.length > 0) {
  req = req.not('id', 'in', `(${knownExpressionIdsToExclude.join(',')})`);
}

const { data: unknownExpressions, error: unknownExpressionsError } = await req.limit(Number(query.limit));

  if (unknownExpressionsError) throw unknownExpressionsError;
  return unknownExpressions;
});
