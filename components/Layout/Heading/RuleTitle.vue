<script setup lang="ts">
import type { GrammarRow, GrammarRule } from "~/types/modules/grammar-rule";
import { getGrammarRuleStyleClass } from "~/utils/learning/grammar";
const props = withDefaults(
  defineProps<{
    rule?:
      | GrammarRule
      | {
          difficultyClass: GrammarRow["difficulty_class"];
          ruleName: GrammarRow["rule_name"];
          ruleNameTranslation: GrammarRow["rule_name_translation"];
          symbol: GrammarRow["rule_name"];
        }
      | null;
    mainTitle?: boolean;
  }>(),
  {
    rule: null,
    mainTitle: false,
  },
);
</script>

<template>
  <div class="flex items-center justify-between mb-4">
    <div class="flex items-center space-x-3">
      <div
        v-if="props.rule"
        class="w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold relative overflow-hidden shadow-lg"
        :class="getGrammarRuleStyleClass(props.rule)"
      >
        <!-- Professional texture overlay -->
        <div
          class="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-black/20"
        />
        <div
          class="absolute inset-0 bg-[conic-gradient(from_45deg_at_50%_50%,rgba(255,255,255,0.4)_0deg,rgba(255,255,255,0.1)_90deg,rgba(255,255,255,0.2)_180deg,rgba(255,255,255,0.05)_270deg)]"
        />
        <div
          class="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:4px_4px]"
        />
        <span
          :class="{ 'text-xl': props.mainTitle, 'text-lg': !props.mainTitle }"
          class="relative z-10"
        >
          {{ props.rule.symbol }}
        </span>
      </div>
      <div>
        <h3
          class="font-semibold text-gray-900"
          :class="{ 'text-xl': props.mainTitle, 'text-sm': !props.mainTitle }"
        >
          {{ props.rule?.ruleNameTranslation }}
        </h3>
        <p
          class="text-gray-500"
          :class="{ 'text-md': props.mainTitle, 'text-xs': !props.mainTitle }"
        >
          {{ props.rule?.ruleName }}
        </p>
      </div>
    </div>
    <slot />
  </div>
</template>
