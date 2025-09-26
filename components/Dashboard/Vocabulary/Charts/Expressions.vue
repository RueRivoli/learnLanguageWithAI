<script setup lang="ts">
import { optionExpressions } from "~/utils/dashboard/graphOptions";
import { useUserScoreStore } from "~/stores/user-score-store";
import { LanguageIcon } from "@heroicons/vue/24/outline";
const userScoreStore = useUserScoreStore();

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
    <!-- Expressions Chart -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div class="mb-4 flex">
        <div class="flex-shrink-0">
          <div class="relative">
            <div
              class="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg blur-sm"
            />
            <div
              class="relative p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg shadow-lg"
            >
              <LanguageIcon class="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
        <h3 class="text-lg ml-3 font-semibold text-gray-900 flex items-center">
          Expression Learning Progress
        </h3>
      </div>
      <div class="relative">
        <VChart
          ref="chart"
          :option="optionChartExpressions"
          style="width: 100%; height: 350px"
          class="rounded-lg"
        />
      </div>
    </div>
</template>
