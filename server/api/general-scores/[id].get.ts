import { createClient } from "@supabase/supabase-js";
import { defineEventHandler, getRouterParam } from "h3";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_SUPABASE_KEY,
);

export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, "id");
  const reqGrammarScores = supabase
  .from("turkish_grammar_scores")
  .select(
    "score, rule_id, turkish_grammar_rules ( rule_name, rule_name_translation, difficulty_class)",
  )
  .eq("user_id", userId);
  // if (query.order_by) reqGrammarScores.order(query.order_by, { ascending: true });
  const reqVocabularyScores = supabase
  .from("turkish_vocabulary_scores")
  .select(
    "words_mastered_count, words_learned_count, expressions_mastered_count, expressions_learned_count"
  )
  .eq("user_id", userId);
  const [grammarScores, vocabScores] = await Promise.all([
    reqGrammarScores, reqVocabularyScores
  ])
  const error = grammarScores.error || vocabScores.error
  if (error) throw(error)
  return {grammarScores, vocabScores};
});
