import type { VNode } from "vue";
import { h } from "vue";
import type { GrammarRule } from "~/types/grammar-rule.ts";

export const modulesFirstTab = { title: "Beginner", icon: "academic" };
export const modulesSecondTab = { title: "Intermediate", icon: "trophy" };
export const modulesThirdTab = { title: "Advanced", icon: "rocket" };

const enum RuleDifficulty {
  "BEGINNER" = 1,
  "INTERMEDIATE" = 2,
  "ADVANCED" = 3,
  "EXPERT" = 4,
}

export function getLevelText(level: string): string {
  switch (level) {
    case "1":
      return "beginner";
    case "2":
      return "intermediate";
    case "3":
      return "advanced";
    case "4":
      return "expert";
    default:
      return "beginner";
  }
}

export function getLevelLabel(level: string): VNode {
  switch (level) {
    case "1":
      return h("div", { class: "flex items-center" }, [
        h("div", { class: "status status-success mr-2" }),
        h("div", "beginner"),
      ]);
    case "2":
      return h("div", { class: "flex items-center" }, [
        h("div", { class: "status status-warning mr-2" }),
        h("div", "intermediate"),
      ]);
    case "3":
      return h("div", { class: "flex items-center" }, [
        h("div", { class: "status status-error mr-2" }),
        h("div", "advanced"),
      ]);
    case "4":
      return h("div", { class: "flex items-center" }, [
        h("div", { class: "status status-success mr-2" }),
        h("div", "expert"),
      ]);
    default:
      return h("div", { class: "flex items-center" }, [
        h("div", { class: "status status-neutral mr-2" }),
        h("div", "unknown"),
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
  // TODO: find better styling idea
  switch (rule.difficulty_class) {
    case "1":
      return "bg-success";
    case "2":
      return "bg-warning";
    case "3":
      return "bg-error";
    case "4":
      return "bg-neutral";
    default:
      return "bg-neutral";
  }
}

export function getProgressBarStyleClass(progress: number): string {
  if (progress < 30) {
    return "progress-error"; // Red for low progress
  } else if (progress < 50) {
    return "progress-warning"; // Yellow for moderate progress
  } else if (progress < 70) {
    return "progress-info"; // Blue for good progress
  } else if (progress < 100) {
    return "progress-primary"; // Indigo for great progress
  } else if (progress === 100) {
    return "progress-success"; // Green for complete
  } else {
    return "progress-neutral"; // Gray for unknown
  }
}

export function getPercentageStyleClass(progress: number): string {
  return "text-neutral";
  // if (progress < 30) {
  //   return "text-error";
  // } else if (progress < 50) {
  //   return "text-warning";
  // } else if (progress < 70) {
  //   return "text-middle-progress";
  // } else if (progress < 100) {
  //   return "text-accent";
  // } else if (progress === 100) {
  //   return "text-success";
  // } else {
  //   return "text-neutral";
  // }
}

// Radial Progress Bar Utility Functions
export function getRadialProgressClass(progress: number): string {
  if (progress < 30) {
    return "text-red-500";
  } else if (progress < 50) {
    return "text-yellow-500";
  } else if (progress < 70) {
    return "text-blue-500";
  } else if (progress < 100) {
    return "text-indigo-500";
  } else if (progress === 100) {
    return "text-green-500";
  } else {
    return "text-gray-500";
  }
}

export function getRadialGradientStart(progress: number): string {
  if (progress < 30) {
    return "#ef4444"; // red-500
  } else if (progress < 50) {
    return "#eab308"; // yellow-500
  } else if (progress < 70) {
    return "#3b82f6"; // blue-500
  } else if (progress < 100) {
    return "#6366f1"; // indigo-500
  } else if (progress === 100) {
    return "#22c55e"; // green-500
  } else {
    return "#6b7280"; // gray-500
  }
}

export function getRadialGradientEnd(progress: number): string {
  if (progress < 30) {
    return "#dc2626"; // red-600
  } else if (progress < 50) {
    return "#ca8a04"; // yellow-600
  } else if (progress < 70) {
    return "#2563eb"; // blue-600
  } else if (progress < 100) {
    return "#4f46e5"; // indigo-600
  } else if (progress === 100) {
    return "#16a34a"; // green-600
  } else {
    return "#4b5563"; // gray-600
  }
}

export function getRadialTextClass(progress: number): string {
  if (progress < 30) {
    return "text-red-600";
  } else if (progress < 50) {
    return "text-yellow-600";
  } else if (progress < 70) {
    return "text-blue-600";
  } else if (progress < 100) {
    return "text-indigo-600";
  } else if (progress === 100) {
    return "text-green-600";
  } else {
    return "text-gray-600";
  }
}

export function getRadialGlowClass(progress: number): string {
  if (progress < 30) {
    return "bg-red-500";
  } else if (progress < 50) {
    return "bg-yellow-500";
  } else if (progress < 70) {
    return "bg-blue-500";
  } else if (progress < 100) {
    return "bg-indigo-500";
  } else if (progress === 100) {
    return "bg-green-500";
  } else {
    return "bg-gray-500";
  }
}
