import { defineEventHandler, getRouterParam, getQuery } from "h3";
import { createSupabaseClientWithUserAuthTokenFromHeader } from "../../../utils/auth/supabaseClient";

export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, "id");
  const query = getQuery(event);
  const supabase = createSupabaseClientWithUserAuthTokenFromHeader(event)
  const limitItems = Number(query.limit);
  
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

if (knownExpressionIdsToExclude.length > 0) {
  req = req.not('id', 'in', `(${knownExpressionIdsToExclude.join(',')})`);
}

// Get more expressions than needed to shuffle them
const { data: allUnknownExpressions, error: unknownExpressionsError } = await req
  .limit(limitItems * 3); // Get 3x more expressions to have a good pool for randomization

if (unknownExpressionsError) throw unknownExpressionsError;

// Shuffle the array and take only the requested amount
const shuffleArray = (array: any[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const unknownExpressions = shuffleArray(allUnknownExpressions || []).slice(0, limitItems);

  return unknownExpressions;
});