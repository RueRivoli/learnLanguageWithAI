import type { VNode } from "vue";
import { h } from "vue";

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
        h("div", { class: "status status-primary mr-2" }),
        h("div", "beginner"),
      ]);
    case RuleDifficulty.INTERMEDIATE:
      return h("div", { class: "flex items-center" }, [
        h("div", { class: "status status-secondary mr-2" }),
        h("div", "intermediate"),
      ]);
    case RuleDifficulty.ADVANCED:
      return h("div", { class: "flex items-center" }, [
        h("div", { class: "status status-warning mr-2" }),
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
