import type { VNode } from "vue";
import { h } from "vue";
import type { GrammarRule } from "~/types/modules/grammar-rule";
import type { Database } from "~/supabase/types";

export const grammarLevelTabs = {
  firstTab : { title: 'Beginner', icon: 'academic', activeBgColorClass: 'bg-success/80', activeTxtColorClass: 'text-white'},
  secondTab : { title: 'Intermediate', icon: 'trophy', activeBgColorClass: 'bg-warning/80', activeTxtColorClass: 'text-white'},
  thirdTab : { title: 'Advanced', icon: 'rocket', activeBgColorClass: 'bg-error/80', activeTxtColorClass: 'text-white'}
}


// Mapping des niveaux de difficulté
export const DIFFICULTY_LEVELS = {
  1: "beginner",
  2: "intermediate", 
  3: "advanced",
  4: "expert"
} as const

// Mapping inverse pour obtenir l'ID depuis le nom
export const DIFFICULTY_IDS = {
  "BEGINNER": 1,
  "INTERMEDIATE": 2,
  "ADVANCED": 3,
  "EXPERT": 4
} as const

// Types dérivés
export type DifficultyLevel = typeof DIFFICULTY_LEVELS[keyof typeof DIFFICULTY_LEVELS]
export type DifficultyId = typeof DIFFICULTY_IDS[keyof typeof DIFFICULTY_IDS]

// Enum pour une meilleure compatibilité avec le code existant
export enum RuleDifficulty {
  BEGINNER = 1,
  INTERMEDIATE = 2,
  ADVANCED = 3,
  EXPERT = 4
}

// Fonctions utilitaires pour les mappings
export function getDifficultyName(id: number): DifficultyLevel | null {
  return DIFFICULTY_LEVELS[id as keyof typeof DIFFICULTY_LEVELS] || null
}

export function getDifficultyNameSafe(id: number): DifficultyLevel {
  return DIFFICULTY_LEVELS[id as keyof typeof DIFFICULTY_LEVELS] || "beginner"
}

export function getDifficultyId(name: string): DifficultyId | null {
  return DIFFICULTY_IDS[name as keyof typeof DIFFICULTY_IDS] || null
}

export function isDifficultyId(id: number): id is DifficultyId {
  return id in DIFFICULTY_LEVELS
}

export function isDifficultyLevel(name: string): name is DifficultyLevel {
  return name in DIFFICULTY_IDS
}

export function getLevelText(level: RuleDifficulty): string {
  const difficultyName = getDifficultyName(level)
  return difficultyName ? difficultyName.toLowerCase() : "beginner"
}

export function getLevelLabel(level: RuleDifficulty): VNode {
  switch (level) {
    case RuleDifficulty.BEGINNER:
      return h("div", { class: "flex items-center" }, [
        h("div", { class: "status status-success mr-2" }),
        h("div", "beginner"),
      ]);
    case RuleDifficulty.INTERMEDIATE:
      return h("div", { class: "flex items-center" }, [
        h("div", { class: "status status-warning mr-2" }),
        h("div", "intermediate"),
      ]);
    case RuleDifficulty.ADVANCED:
      return h("div", { class: "flex items-center" }, [
        h("div", { class: "status status-error mr-2" }),
        h("div", "advanced"),
      ]);
    case RuleDifficulty.EXPERT:
      return h("div", { class: "flex items-center" }, [
        h("div", { class: "status status-success mr-2" }),
        h("div", "expert"),
      ]);
    default:
      return h("div", { class: "flex items-center" }, [
        h("div", { class: "status status-neutral mr-2" }),
        h("div", "unkown"),
      ]);
  }
}

// export function getGrammarRuleDifficulty(difficulty: RuleDifficulty): string {
//   if (difficulty == RuleDifficulty.BEGINNER) {
//     return "progress-error";
//   } else if (difficulty == RuleDifficulty.INTERMEDIATE) {
//     return "progress-warning";
//   } else if (difficulty == RuleDifficulty.ADVANCED) {
//     return "progress-middle-progress";
//   } else if (difficulty == RuleDifficulty.EXPERT) {
//     return "progress-accent";
//   } else {
//     return "progress-neutral";
//   }
// }

export function getGrammarRuleInitialLetters(level: string): string {
  const words = level.split(" ");
  let initials = "";
  let i = 0;
  while (i < 3 && words[i]) {
    initials += words[i].charAt(0).toUpperCase();
    i += 1;
  }
  return initials;
}

export function getGrammarRuleStyleClass(rule: GrammarRule): string {
  switch (rule.difficultyClass) {
    case RuleDifficulty.BEGINNER:
      return "bg-success";
    case RuleDifficulty.INTERMEDIATE:
      return "bg-warning";
    case RuleDifficulty.ADVANCED:
      return "bg-error";
    case RuleDifficulty.EXPERT:
      return "bg-neutral";
    default:
      return "bg-neutral";
  }
}

export function getProgressBarStyleClass(progress: number): string {
  if (progress < 30) {
    return "text-error";
  } else if (progress < 50) {
    return "text-warning";
  } else if (progress < 70) {
    return "text-middle-progress";
  } else if (progress < 100) {
    return "text-accent";
  } else if (progress === 100) {
    return "text-success";
  } else {
    return "text-neutral";
  }
}

export function getColorStyleClass(progress: number): string {
  // return "progress-neutral";
  if (progress < 30) {
    return "text-error";
  } else if (progress < 50) {
    return "text-warning";
  } else if (progress < 70) {
    return "text-middle-progress";
  } else if (progress < 100) {
    return "text-accent";
  } else if (progress === 100) {
    return "text-success";
  } else {
    return "text-neutral";
  }
}

export function getPercentageStyleClass(progress: number): string {
  if (progress < 30) {
    return "text-error";
  } else if (progress < 50) {
    return "text-warning";
  } else if (progress < 70) {
    return "text-middle-progress";
  } else if (progress < 100) {
    return "text-accent";
  } else if (progress === 100) {
    return "text-success";
  } else {
    return "text-neutral";
  }
}

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