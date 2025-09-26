<script setup lang="ts">
import { useUserScoreStore } from "~/stores/user-score-store";
import { BookOpenIcon, LanguageIcon } from "@heroicons/vue/24/outline";

const userScoreStore = useUserScoreStore();

const totalWordsMastered = computed(() => {
  return userScoreStore.$state.totalWordsMastered ?? 0;
});

const totalWords = computed(() => {
  return userScoreStore.$state.totalWords ?? 0;
});

const totalExpressionsMastered = computed(() => {
  return userScoreStore.$state.totalExpressionsMastered ?? 0;
});

const totalExpressions = computed(() => {
  return userScoreStore.$state.totalExpressions ?? 0;
});

const totalWordsMasteredInPercentage = computed(() => {
  return userScoreStore.totalWordsMasteredInPercentage ?? 0;
});
const totalExpressionsMasteredInPercentage = computed(() => {
  return userScoreStore.totalExpressionsMasteredInPercentage;
});
const totalWordsInK = computed(() => {
  return userScoreStore.totalWordsInK;
});
const totalExpressionsInK = computed(() => {
  return userScoreStore.totalExpressionsInK;
});

</script>

<template>
  <!-- Total Words Mastered - Professional Design -->
  <div
    class="group relative bg-gradient-to-br from-blue-100/90 via-blue-50/95 to-indigo-100/80 rounded-xl shadow-md border border-blue-300/70 p-4 hover:shadow-xl hover:border-blue-400/80 overflow-hidden transition-all duration-300"
  >
    <!-- Professional background pattern -->
    <div
      class="absolute inset-0 bg-gradient-to-br from-blue-100/60 via-blue-50/80 to-indigo-100/50 opacity-90"
    />

    <!-- Success celebration overlay -->
    <div
      class="absolute inset-0 bg-gradient-to-br from-green-500/5 via-emerald-500/3 to-green-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500"
    />

    <!-- Content container -->
    <div class="h-full relative flex flex-col justify-between z-10">
      <div class="flex items-center justify-between mb-3">
        <div class="flex-1">
          <h3 class="text-base font-semibold text-gray-900 mb-0.5">
            Words Acquired
          </h3>
          <!-- <p class="text-sm text-gray-600">Your vocabulary mastery progress</p> -->
        </div>

        <!-- Icon with professional styling -->
        <div class="flex-shrink-0 ml-3">
          <div class="relative">
            <div
              class="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-lg blur-sm"
            />
            <div
              class="relative p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg"
            >
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
          <span class="text-base text-gray-500"
            >/ {{ totalWords.toLocaleString() }}</span
          >
        </div>
        <p class="text-xs text-gray-600 mt-0.5">words mastered</p>
      </div>

      <!-- Progress details -->
      <div
        class="bg-gradient-to-r from-blue-100/90 to-indigo-100/80 rounded-lg p-3 border border-blue-200/80 shadow-sm"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-1.5 h-1.5 bg-blue-500 rounded-full" />
            <span class="text-lg font-medium text-gray-700"
              >{{ totalWordsMasteredInPercentage }}%</span
            >
          </div>
          <span class="text-xs text-gray-600"
            >out of <strong>{{ totalWordsInK }}</strong> total words</span
          >
        </div>
      </div>
    </div>
  </div>

  <!-- Total Expressions Mastered - Professional Design -->
  <div
    class="group relative bg-gradient-to-br from-purple-100/90 via-purple-50/95 to-pink-100/80 rounded-xl shadow-md border border-purple-300/70 p-4 hover:shadow-xl hover:border-purple-400/80 overflow-hidden transition-all duration-300"
  >
    <!-- Professional background pattern -->
    <div
      class="absolute inset-0 bg-gradient-to-br from-purple-100/60 via-purple-50/80 to-pink-100/50 opacity-90"
    />

    <!-- Success celebration overlay -->
    <div
      class="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-green-500/3 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500"
    />

    <!-- Content container -->
    <div class="h-full relative flex flex-col justify-between z-10">
      <div class="flex items-center justify-between mb-3">
        <div class="flex-1">
          <h3 class="text-base font-semibold text-gray-900 mb-0.5">
            Expressions Acquired
          </h3>
          <!-- <p class="text-sm text-gray-600">Your expression mastery progress</p> -->
        </div>

        <!-- Icon with professional styling -->
        <div class="flex-shrink-0 ml-3">
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
      </div>

      <!-- Main statistics -->
      <div class="mb-3">
        <div class="flex items-baseline gap-2">
          <span class="text-2xl font-bold text-gray-900">
            {{ totalExpressionsMastered.toLocaleString() }}
          </span>
          <span class="text-base text-gray-500"
            >/ {{ totalExpressions.toLocaleString() }}</span
          >
        </div>
        <p class="text-xs text-gray-600 mt-0.5">expressions mastered</p>
      </div>

      <!-- Progress details -->
      <div
        class="bg-gradient-to-r from-purple-100/90 to-pink-100/80 rounded-lg p-3 border border-purple-200/80 shadow-sm"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-1.5 h-1.5 bg-purple-500 rounded-full" />
            <span class="text-lg font-medium text-gray-700"
              >{{ totalExpressionsMasteredInPercentage }}%</span
            >
          </div>
          <span class="text-xs text-gray-600"
            >out of <strong>{{ totalExpressionsInK }}</strong> total expressions</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
