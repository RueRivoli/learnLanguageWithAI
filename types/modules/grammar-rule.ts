import type { Database } from "~/supabase/types";

export type GrammarRow = Database['public']['Tables']['turkish_grammar_rules']['Row']

type GrammarRuleLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert'

export type GrammarRuleMeta = {
  highlights: GrammarRow['highlights'];
  level: GrammarRuleLevel,
  name: GrammarRow['rule_name'],
  nameEn: GrammarRow['rule_name_translation'],
  id: GrammarRow['id'],
  symbol: GrammarRow['symbol']
}


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

