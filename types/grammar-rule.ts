import type { Database } from "~/supabase/types";

type GrammarRow = Database['public']['Tables']['turkish_grammar_rules']['Row']

export type GrammarRule = {
  id: GrammarRow['id'];
  ruleName: GrammarRow['rule_name'];
  ruleNameTranslation: GrammarRow['rule_name_translation'];
  difficultyClass: GrammarRow['difficulty_class'];
  intro: GrammarRow['intro'];
  description: GrammarRow['description'];
  highlights: GrammarRow['highlights'];
  extendedDescription: GrammarRow['extended_description'];
  symbol: GrammarRow['rule_name'];
  bookmarked: GrammarRow['bookmarked'];
  type: GrammarRow['type'];
};

export const parseRules = (modules: Array<Database['public']['Tables']['turkish_grammar_rules']['Row'] & { 'turkish_grammar_scores': Array<{score: number}>}>): Array<GrammarRule & {score: Array<{score: number}>}> => {
  return modules.map((module) => (
    {
      id: module.id,
      ruleName: module.rule_name,
      ruleNameTranslation: module.rule_name_translation,
      difficultyClass: module.difficulty_class,
      intro: module.intro,
      description: module.description,
      highlights: module.highlights,
      extendedDescription: module.extended_description,
      symbol: module.symbol,
      score: module.turkish_grammar_scores,
      type: module.type,
      bookmarked: module.bookmarked,
    }))
}

export const parseRuleData = (data: Database['public']['Tables']['turkish_grammar_rules']['Row']): GrammarRule  => {
  return {
    id: data.id,
    ruleName: data.rule_name,
    ruleNameTranslation: data.rule_name_translation,
    difficultyClass: data.difficulty_class,
    symbol: data.symbol,
    bookmarked: data.bookmarked,
    description: data.description,
    highlights: data.highlights,
    type: data.type,
    extendedDescription: data.extended_description,
    intro: data.intro,
    // score
  };
};