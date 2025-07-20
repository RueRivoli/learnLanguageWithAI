<script setup lang="ts">
import { useUserScoreStore } from "~/stores/user-score-store";
import { BookOpenIcon, LanguageIcon } from "@heroicons/vue/24/outline";

const userScoreStore = useUserScoreStore();

const totalExpressions = computed(() => {
  return userScoreStore.$state.totalExpressions ?? 0;
});

const totalExpressionsInK = computed(() => {
  const total = userScoreStore.$state.totalExpressions ?? 0;
  if (total > 999) {
    const nbK = Math.floor(total / 100);
    const nbKCent = Math.floor(
      (total - nbK * 100) / 10,
    );
    return nbKCent !== 0 ? `${nbK}${nbKCent} K` : `${nbK} K`;
  } else {
    return total;
  }
});

const totalWords = computed(() => {
  return userScoreStore.$state.totalWords ?? 0;
});
const totalWordsInK = computed(() => {
  const total = userScoreStore.$state.totalWords ?? 0;
  const nbK = Math.floor(total / 1000);
  const nbKCent = Math.floor(
    (total - nbK * 1000) / 100,
  );
  return nbKCent !== 0 ? `${nbK}.${nbKCent} K` : `${nbK} K`;
});

const totalWordsMastered = computed(() => {
  return userScoreStore.$state.totalWordsMastered ?? 0;
});

const totalWordsMasteredPercentage = computed(() => {
  const total = userScoreStore.$state.totalWords ?? 0;
  return total > 0 ? Math.trunc(
    (totalWordsMastered.value / total) * 100,
  ).toFixed(1) : '0.0';
});

const totalWordsLearned = computed(() => {
  return userScoreStore.$state.totalWordsLearned ?? 0;
});
const totalWordsLearnedPercentage = computed(() => {
  const total = userScoreStore.$state.totalWords ?? 0;
  return total > 0 ? Math.trunc(
    (totalWordsLearned.value / total) * 100,
  ).toFixed(1) : '0.0';
});

const totalExpressionsMastered = computed(() => {
  return userScoreStore.$state.totalExpressionsMastered ?? 0;
});

const totalExpressionsMasteredPercentage = computed(() => {
  const total = userScoreStore.$state.totalExpressions ?? 0;
  return total > 0 ? Math.trunc(
    (totalExpressionsMastered.value / total) * 100,
  ).toFixed(1) : '0.0';
});

const totalExpressionsLearned = computed(() => {
  return userScoreStore.$state.totalExpressionsLearned ?? 0;
});
const totalExpressionsLearnedPercentage = computed(() => {
  const total = userScoreStore.$state.totalExpressions ?? 0;
  return total > 0 ? Math.trunc(
    (totalExpressionsLearned.value / total) * 100,
  ).toFixed(1) : '0.0';
});
</script>

<template>
  <!-- Total Words Mastered - Professional Design -->
  <div
    class="group relative bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-lg overflow-hidden"
  >
    <!-- Professional background pattern -->
    <div class="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-indigo-50/20 opacity-60"></div>
    
    <!-- Success celebration overlay -->
    <div class="absolute inset-0 bg-gradient-to-br from-green-500/5 via-emerald-500/3 to-green-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
    
    <!-- Content container -->
    <div class="h-full relative flex flex-col justify-between z-10">
      <div class="flex items-center justify-between mb-3">
        <div class="flex-1">
          <h3 class="text-base font-semibold text-gray-900 mb-0.5">Words Acquired</h3>
          <!-- <p class="text-sm text-gray-600">Your vocabulary mastery progress</p> -->
        </div>
        
        <!-- Icon with professional styling -->
        <div class="flex-shrink-0 ml-3">
          <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-lg blur-sm"></div>
            <div class="relative p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg">
              <BookOpenIcon class="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      </div>
      
      <!-- Main statistics -->
      <div class="mb-3">
        <div class="flex items-baseline gap-2">
          <span class="text-2xl font-bold text-gray-900">
            {{ totalWordsMastered.toLocaleString() }}
          </span>
          <span class="text-base text-gray-500">/ {{ totalWords.toLocaleString() }}</span>
        </div>
        <p class="text-xs text-gray-600 mt-0.5">words mastered</p>
      </div>
      
      <!-- Progress details -->
      <div class="bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-lg p-3 border border-gray-100">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
            <span class="text-lg font-medium text-gray-700">{{ totalWordsMasteredPercentage }}%</span>
          </div>
          <span class="text-xs text-gray-600">out of <strong>{{ totalWordsInK }}</strong> total words</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Total Expressions Mastered - Professional Design -->
  <div
    class="group relative bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-lg overflow-hidden"
  >
    <!-- Professional background pattern -->
    <div class="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-white to-pink-50/20 opacity-60"></div>
    
    <!-- Success celebration overlay -->
    <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-green-500/3 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
    
    <!-- Content container -->
    <div class="h-full relative flex flex-col justify-between z-10">
      <div class="flex items-center justify-between mb-3">
        <div class="flex-1">
          <h3 class="text-base font-semibold text-gray-900 mb-0.5">Expressions Acquired</h3>
          <!-- <p class="text-sm text-gray-600">Your expression mastery progress</p> -->
        </div>
        
        <!-- Icon with professional styling -->
        <div class="flex-shrink-0 ml-3">
          <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg blur-sm"></div>
            <div class="relative p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg shadow-lg">
              <LanguageIcon class="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      </div>
      
      <!-- Main statistics -->
      <div class="mb-3">
        <div class="flex items-baseline gap-2">
          <span class="text-2xl font-bold text-gray-900">
            {{ totalExpressionsMastered.toLocaleString() }}
          </span>
          <span class="text-base text-gray-500">/ {{ totalExpressions.toLocaleString() }}</span>
        </div>
        <p class="text-xs text-gray-600 mt-0.5">expressions mastered</p>
      </div>
      
      <!-- Progress details -->
      <div class="bg-gradient-to-r from-gray-50 to-purple-50/30 rounded-lg p-3 border border-gray-100">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
            <span class="text-lg font-medium text-gray-700">{{ totalExpressionsMasteredPercentage }}%</span>
          </div>
          <span class="text-xs text-gray-600">out of <strong>{{ totalExpressionsInK }}</strong> total expressions</span>
        </div>
      </div>
    </div>
  </div>
</template>
