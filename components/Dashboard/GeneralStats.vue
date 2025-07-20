<script setup lang="ts">
import {
  grammarLevelTabs,
} from "~/utils/dashboard/graphOptions";

import { useUserScoreStore } from "~/stores/user-score-store";
const activeLevelTab = ref(1);
const userScoreStore = useUserScoreStore();
const levelTitle = computed(() => {
  switch (activeLevelTab.value) {
    case 1:
      return "Beginner";
    case 2:
      return "Intermediate";
    case 3:
      return "Advanced";
    default:
      return "Beginner";
  }
});


const currentInfo = computed(() => {
  switch (activeLevelTab.value) {
    case 1:
      return (userScoreStore as any).beginnerGrammarRulesInfo;
    case 2:
      return (userScoreStore as any).intermediateGrammarRulesInfo;
    case 3:
      return (userScoreStore as any).advancedGrammarRulesInfo;
    default:
      return [];
  }
});
</script>

<template>
  <!-- General Dashboard -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <div
      class="col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6"
    >
      <div class="mb-4 flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">
          Your Progress on the Different Themes
        </h3>
        <LayoutTabs
            :first-tab="grammarLevelTabs.firstTab"
            :second-tab="grammarLevelTabs.secondTab"
            :third-tab="grammarLevelTabs.thirdTab"
            @tab-active-changed="(activeT) => (activeLevelTab = activeT)"
          />
      </div>
  
      <div
        v-for="(rule, index) in currentInfo"
        :key="index"
        class="flex flex-col justify-between bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200"
      >
        <LayoutHeadingRuleTitle :rule="rule" :main-title="true" />
        <LearningModuleScore
          v-if="rule.score"
          :score="rule.score"
        />
      </div>
    </div>
  </div>
</template>
