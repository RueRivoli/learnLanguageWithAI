import type { VNode } from "vue";
import { h } from "vue";
import type { GrammarRule } from "~/types/grammar-rule";
const enum RuleDifficulty {
  "BEGINNER" = 1,
  "INTERMEDIATE" = 2,
  "ADVANCED" = 3,
  "EXPERT" = 4,
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
  // TODO: find better styling idea
  switch (rule.difficulty_class) {
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
    return "progress-error";
  } else if (progress < 50) {
    return "progress-warning";
  } else if (progress < 70) {
    return "progress-neutral";
  } else if (progress < 100) {
    return "progress-accent";
  } else if (progress === 100) {
    return "progress-success";
  } else {
    return "progress-neutral";
  }
}

export function getPercentageStyleClass(progress: number): string {
  if (progress < 30) {
    return "text-error";
  } else if (progress < 50) {
    return "text-warning";
  } else if (progress < 70) {
    return "text-neutral";
  } else if (progress < 100) {
    return "text-accent";
  } else if (progress === 100) {
    return "text-success";
  } else {
    return "text-neutral";
  }
}
