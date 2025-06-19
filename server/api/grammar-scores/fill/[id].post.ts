import { LanguagesTableKey } from "~/utils/languages";
import { createClient } from "@supabase/supabase-js";
import { defineEventHandler, getRouterParam } from "h3";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_SUPABASE_KEY,
);

export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, "id");
  if (!userId) {
    throw ("Missing user ID");
  }
  const body = await readBody(event);
  console.log("body", body)
  const languageLearned = body.language_learned
  if (!languageLearned) {
    throw ("Missing language name");
  }
  const targetLanguageFullText = LanguagesTableKey[languageLearned]
  const tableRules = targetLanguageFullText + '_grammar_rules'
  const tableScores = targetLanguageFullText + '_grammar_scores'
  const tableVocabularyScores = targetLanguageFullText + '_vocabulary_scores'

  const { count, error } = await supabase
  .from(tableRules)
  .select('*', { count: 'exact', head: true })
  if (error) throw(error)
  if (count) {
    // Create a row to track the score on grammar rules for new user
    for (let i = 1; i <= count; i++) {
        await supabase.from(tableScores).insert({
          rule_id: i,
          user_id: userId,
          score: 20,
        });
      }
  }
  // Create a row to track the score on words/expressions for new user
  await supabase.from(tableVocabularyScores).insert({
    user_id: userId,
    language: languageLearned,
    words_mastered_count: 0,
    words_learned_count: 0,
    expressions_mastered_count: 0,
    expressions_learned_count: 0,
  });
});
