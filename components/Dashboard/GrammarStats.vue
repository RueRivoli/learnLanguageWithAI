<script setup lang="ts">
import {
  grammarLevelTabs,
  optionBeginnerGrammar,
  optionIntermediateGrammar,
  optionAdvancedGrammar,
} from "~/utils/dashboard/graphOptions";
// 1 = Beginner, 2 = Intermediate, 3 = Advanced,

const activeTab = ref(1);
const userScoreStore = useUserScoreStore();
// Grammar statistics
const optionBeginnerRulesGrammar = computed(() => {
  return optionBeginnerGrammar(
    userScoreStore.beginnerGrammarRulesScores,
    userScoreStore.beginnerGrammarRulesNames,
  );
});
const optionIntermediateRulesGrammar = computed(() => {
  return optionIntermediateGrammar(
    userScoreStore.intermediateGrammarRulesScores,
    userScoreStore.intermediateGrammarRulesNames,
  );
});
const optionAdvancedRulesGrammar = computed(() => {
  return optionIntermediateGrammar(
    userScoreStore.advancedGrammarRulesScores,
    userScoreStore.advancedGrammarRulesNames,
  );
});
const currentGrammarOption = computed(() => {
  switch (activeTab.value) {
    case 1:
      return optionBeginnerRulesGrammar.value;
    case 2:
      return optionIntermediateRulesGrammar.value;
    case 3:
      return optionAdvancedRulesGrammar.value;
    default:
      return optionBeginnerGrammar;
  }
});
</script>
<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div class="mb-6">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">
            Grammar Progress
          </h3>
          <p class="text-sm text-gray-600">
            Track your grammar mastery by level
          </p>
        </div>

        <!-- Grammar Level Switch -->
        <LayoutTabs
          :first-tab="grammarLevelTabs.firstTab"
          :second-tab="grammarLevelTabs.secondTab"
          :third-tab="grammarLevelTabs.thirdTab"
          @tab-active-changed="(activeT) => (activeTab = activeT)"
        />
      </div>
    </div>
    <div class="relative">
      <VChart
        :option="currentGrammarOption"
        style="width: 100%; height: 400px"
        class="rounded-lg"
      />
    </div>
  </div>
</template>

<!-- <div
class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6"
>
<div class="flex items-center justify-between mb-6">
  <div>
    <h3 class="text-lg font-semibold text-gray-900 mb-2">
      Grammar Progress
    </h3>
    <p class="text-sm text-gray-600">
      Track your grammar mastery by difficulty level
    </p>
  </div>

  <div class="flex items-center space-x-2">
    <span class="text-sm font-medium text-gray-700">Level:</span>
    <div class="flex items-center bg-gray-100 rounded-lg p-1">
      <button
        class="px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200"
        :class="
          currentGrammarLevel === 'beginner'
            ? 'bg-white text-indigo-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        "
        @click="currentGrammarLevel = 'beginner'"
      >
        Beginner
      </button>
      <button
        class="px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200"
        :class="
          currentGrammarLevel === 'intermediate'
            ? 'bg-white text-indigo-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        "
        @click="currentGrammarLevel = 'intermediate'"
      >
        Intermediate
      </button>
      <button
        class="px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200"
        :class="
          currentGrammarLevel === 'advanced'
            ? 'bg-white text-indigo-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        "
        @click="currentGrammarLevel = 'advanced'"
      >
        Advanced
      </button>
    </div>
  </div>
</div>

<div class="relative">
  <VChart
    :option="grammarChartOption"
    style="width: 100%; height: 400px"
    class="rounded-lg"
  />
</div>
</div> -->
