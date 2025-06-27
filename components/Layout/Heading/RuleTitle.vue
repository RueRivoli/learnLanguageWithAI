<script setup lang="ts">
import type { GrammarRule } from "~/types/grammar-rule";
import { getGrammarRuleStyleClass } from "~/utils/learning/grammar";
const props = withDefaults(
  defineProps<{
    rule?: GrammarRule | null;
    mainTitle?: boolean;
  }>(),
  {
    rule: null,
    mainTitle: false,
  },
);
</script>

<template>
  <div class="flex items-center justify-between mb-3">
    <div class="flex items-center space-x-3">
      <div
        v-if="props.rule"
        class="w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold"
        :class="getGrammarRuleStyleClass(props.rule)"
      >
        <span
          :class="{ 'text-xl': props.mainTitle, 'text-lg': !props.mainTitle }"
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
  </div>
</template>
