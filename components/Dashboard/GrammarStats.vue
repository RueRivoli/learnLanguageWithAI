<script setup lang="ts">
import {
  grammarLevelTabs,
  // optionGrammarBeginner,
  // optionGrammarIntermediate,
  // optionGrammarAdvanced,
  optionGrammar,
} from "~/utils/dashboard/graphOptions";
const currentGrammarLevel = ref<"beginner" | "intermediate" | "advanced">(
  "beginner",
);

// Grammar statistics
const currentGrammarOption = computed(() => {
  switch (currentGrammarLevel.value) {
    case "beginner":
      return optionGrammar;
    case "intermediate":
      return optionGrammar;
    case "advanced":
      return optionGrammar;
    default:
      return optionGrammar;
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
        />
        <!-- <div class="flex items-center bg-gray-100 rounded-lg p-1">
          <button
            :class="[
              'px-3 py-2 cursor-pointer rounded-md text-xs font-medium transition-all duration-200',
              currentGrammarLevel === 'beginner'
                ? 'bg-white text-green-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900',
            ]"
            @click="currentGrammarLevel = 'beginner'"
          >
            Beginner
          </button>
          <button
            :class="[
              'px-3 py-2 cursor-pointer rounded-md text-xs font-medium transition-all duration-200',
              currentGrammarLevel === 'intermediate'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900',
            ]"
            @click="currentGrammarLevel = 'intermediate'"
          >
            Intermediate
          </button>
          <button
            :class="[
              'px-3 py-2 cursor-pointer rounded-md text-xs font-medium transition-all duration-200',
              currentGrammarLevel === 'advanced'
                ? 'bg-white text-red-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900',
            ]"
            @click="currentGrammarLevel = 'advanced'"
          >
            Advanced
          </button>
        </div> -->
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
