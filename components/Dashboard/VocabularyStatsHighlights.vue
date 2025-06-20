<script setup lang="ts">
import { useUserScoreStore } from "~/stores/user-score-store";
import { BookOpenIcon, LanguageIcon } from "@heroicons/vue/24/outline";

const TOTAL_WORDS = 3000;
const TOTAL_EXPRESSIONS = 2000;
const userScoreStore = useUserScoreStore();

const totalWordsMastered = computed(() => {
  return userScoreStore.$state.totalWordsMastered ?? 0;
});

const totalWordsMasteredPercentage = computed(() => {
  return Math.trunc((totalWordsMastered.value / TOTAL_WORDS) * 100);
});

const totalWordsLearned = computed(() => {
  return userScoreStore.$state.totalWordsLearned ?? 0;
});
const totalWordsLearnedPercentage = computed(() => {
  return Math.trunc((totalWordsLearned.value / TOTAL_WORDS) * 100);
});

const totalExpressionsMastered = computed(() => {
  return userScoreStore.$state.totalExpressionsMastered ?? 0;
});

const totalExpressionsMasteredPercentage = computed(() => {
  return Math.trunc((totalExpressionsMastered.value / TOTAL_EXPRESSIONS) * 100);
});

const totalExpressionsLearned = computed(() => {
  return userScoreStore.$state.totalExpressionsLearned ?? 0;
});
const totalExpressionsLearnedPercentage = computed(() => {
  return Math.trunc((totalExpressionsLearned.value / TOTAL_EXPRESSIONS) * 100);
});
</script>

<template>
  <div
    class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
  >
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm font-medium text-gray-600">Total Words Mastered</p>
        <p class="text-2xl font-bold text-gray-900">
          {{ totalWordsMastered.toLocaleString() }}
        </p>
      </div>
      <div class="p-3 bg-white rounded-lg">
        <BookOpenIcon class="h-6 w-6 text-neutral" />
      </div>
    </div>
    <div class="mt-4">
      <div class="flex flex-col">
        <div class="flex items-center text-sm text-gray-600">
          <span class="text-success font-medium"
            >{{ totalWordsMasteredPercentage }}%</span
          >
          <span class="mx-1">mastered</span>
          <span>out of 3K</span>
        </div>
        <div class="flex items-center text-sm text-gray-600">
          <span class="text-warning font-medium"
            >{{ totalWordsLearnedPercentage }}%</span
          >
          <span class="mx-1">being learned</span>
          <span>out of 2K</span>
        </div>
      </div>
    </div>
  </div>

  <div
    class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
  >
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm font-medium text-gray-600">
          Total Expressions Mastered
        </p>
        <p class="text-2xl font-bold text-gray-900">
          {{ totalExpressionsMastered.toLocaleString() }}
        </p>
      </div>
      <div class="p-3 bg-white rounded-lg">
        <LanguageIcon class="h-6 w-6 text-neutral" />
      </div>
    </div>
    <div class="mt-4">
      <div class="flex flex-col">
        <div class="flex items-center text-sm text-gray-600">
          <span class="text-success font-medium"
            >{{ totalExpressionsMasteredPercentage }}%</span
          >
          <span class="mx-1">mastered</span>
          <span>out of 2K</span>
        </div>
        <div class="flex items-center text-sm text-gray-600">
          <span class="text-warning font-medium"
            >{{ totalExpressionsLearnedPercentage }}%</span
          >
          <span class="mx-1">being learned</span>
          <span>out of 2K</span>
        </div>
      </div>
    </div>
  </div>
</template>
