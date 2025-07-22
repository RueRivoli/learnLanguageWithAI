<script setup lang="ts">
import { optionExpressions, optionWords } from "~/utils/dashboard/graphOptions";
import { useUserScoreStore } from "~/stores/user-score-store";
const userScoreStore = useUserScoreStore();
const optionChartWords = computed(() => {
  const totalWordsMastered = userScoreStore.$state.totalWordsMastered ?? 0;
  const totalWordsLearned = userScoreStore.$state.totalWordsLearned ?? 0;
  return optionWords(
    totalWordsMastered,
    totalWordsLearned,
    userScoreStore.$state.totalWords ?? 0,
    userScoreStore.totalWordsInK,
  );
});
const optionChartExpressions = computed(() => {
  const totalExpressionsMastered =
    userScoreStore.$state.totalExpressionsMastered ?? 0;
  const totalExpressionsLearned =
    userScoreStore.$state.totalExpressionsLearned ?? 0;
  return optionExpressions(
    totalExpressionsMastered,
    totalExpressionsLearned,
    userScoreStore.$state.totalExpressions ?? 0,
    userScoreStore.totalExpressionsInK,
  );
});
</script>

<template>
  <!-- Vocabulary Chart -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div class="mb-4">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">
          Word Learning Progress
        </h3>
        <!-- <p class="text-sm text-gray-600">
        Track your word mastery across difficulty levels
      </p> -->
      </div>
      <div class="relative">
        <VChart
          ref="chart"
          :option="optionChartWords"
          style="width: 100%; height: 350px"
          class="rounded-lg"
        />
      </div>
    </div>

    <!-- Expressions Chart -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div class="mb-4">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">
          Expression Learning Progress
        </h3>
        <!-- <p class="text-sm text-gray-600">
        Monitor your expression learning journey
      </p> -->
      </div>
      <div class="relative">
        <VChart
          :option="optionChartExpressions"
          style="width: 100%; height: 350px"
          class="rounded-lg"
        />
      </div>
    </div>
  </div>
</template>
