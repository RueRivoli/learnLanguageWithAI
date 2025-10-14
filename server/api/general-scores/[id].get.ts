import { defineEventHandler, getRouterParam } from "h3";
import { createSupabaseClientWithUserAuthTokenFromHeader } from "../../utils/auth/supabaseClient";

export default defineEventHandler(async (event) => {
  const supabase = createSupabaseClientWithUserAuthTokenFromHeader(event)
  const userId = getRouterParam(event, "id");

  const reqGrammarScores = supabase
  .from("turkish_grammar_scores")
  .select(
    "id, score, rule_id, turkish_grammar_rules ( position, symbol, rule_name, rule_name_translation, difficulty_class)",
  )
  // if (query.order_by) reqGrammarScores.order(query.order_by, { ascending: true });
  const reqVocabularyScores = supabase
  .from("turkish_vocabulary_scores")
  .select(
    "words_mastered_count, words_learned_count, expressions_mastered_count, expressions_learned_count"
  )
  const [grammarScores, vocabScores] = await Promise.all([
    reqGrammarScores, reqVocabularyScores
  ])
  const error = grammarScores.error || vocabScores.error
  if (error) throw(error)
  return {grammarScores, vocabScores};
});
