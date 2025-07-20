<script setup lang="ts">
import { useUserScoreStore } from "~/stores/user-score-store";
import { BookOpenIcon, LanguageIcon } from "@heroicons/vue/24/outline";

const userScoreStore = useUserScoreStore();

const totalExpressions = computed(() => {
  return userScoreStore.$state.totalExpressions ?? 0;
});

const totalExpressionsInK = computed(() => {
  if (userScoreStore.$state.totalExpressions > 999) {
    const nbK = Math.floor(userScoreStore.$state.totalExpressions / 100);
    const nbKCent = Math.floor(
      (userScoreStore.$state.totalExpressions - nbK * 100) / 10,
    );
    return nbKTen !== 0 ? `${nbK}${nbKCent} K` : `${nbK} K`;
  } else {
    return userScoreStore.$state.totalExpressions;
  }
});

const totalWords = computed(() => {
  return userScoreStore.$state.totalWords ?? 0;
});
const totalWordsInK = computed(() => {
  const nbK = Math.floor(userScoreStore.$state.totalWords / 1000);
  const nbKCent = Math.floor(
    (userScoreStore.$state.totalWords - nbK * 1000) / 100,
  );
  return nbKCent !== 0 ? `${nbK}.${nbKCent} K` : `${nbK} K`;
});

const totalWordsMastered = computed(() => {
  return userScoreStore.$state.totalWordsMastered ?? 0;
});

const totalWordsMasteredPercentage = computed(() => {
  return Math.trunc(
    (totalWordsMastered.value / userScoreStore.$state.totalWords) * 100,
  ).toFixed(1);
});

const totalWordsLearned = computed(() => {
  return userScoreStore.$state.totalWordsLearned ?? 0;
});
const totalWordsLearnedPercentage = computed(() => {
  return Math.trunc(
    (totalWordsLearned.value / userScoreStore.$state.totalWords) * 100,
  ).toFixed(1);
});

const totalExpressionsMastered = computed(() => {
  return userScoreStore.$state.totalExpressionsMastered ?? 0;
});

const totalExpressionsMasteredPercentage = computed(() => {
  return Math.trunc(
    (totalExpressionsMastered.value / userScoreStore.$state.totalExpressions) *
      100,
  ).toFixed(1);
});

const totalExpressionsLearned = computed(() => {
  return userScoreStore.$state.totalExpressionsLearned ?? 0;
});
const totalExpressionsLearnedPercentage = computed(() => {
  return Math.trunc(
    (totalExpressionsLearned.value / userScoreStore.$state.totalExpressions) *
      100,
  ).toFixed(1);
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
          {{ totalWordsMastered.toLocaleString() }} /
          {{ totalWords.toLocaleString() }}
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
          <span
            >out of <strong>{{ totalWordsInK }}</strong></span
          >
        </div>
        <!-- <div class="flex items-center text-sm text-gray-600">
          <span class="text-warning font-medium"
            >{{ totalWordsLearnedPercentage }}%</span
          >
          <span class="mx-1">being learned</span>
          <span>out of 2K</span>
        </div> -->
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
          {{ totalExpressionsMastered.toLocaleString() }} /
          {{ totalExpressions.toLocaleString() }}
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
          <span
            >out of <strong>{{ totalExpressionsInK }}</strong></span
          >
        </div>
        <!-- <div class="flex items-center text-sm text-gray-600">
          <span class="text-warning font-medium"
            >{{ totalExpressionsLearnedPercentage }}%</span
          >
          <span class="mx-1">being learned</span>
          <span>out of 2K</span>
        </div> -->
      </div>
    </div>
  </div>
</template>
