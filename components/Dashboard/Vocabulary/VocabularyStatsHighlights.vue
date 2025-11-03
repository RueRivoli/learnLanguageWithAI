<script setup lang="ts">
import { useUserScoreStore } from "~/stores/user-score-store";

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
  <!-- Main statistics -->
  <LayoutKeyElementWordOverview title="Words Acquired" description="test">
    <template #content>
      <div class="mb-3">
        <div class="flex items-baseline gap-2">
          <span class="text-2xl font-bold text-gray-900">
            {{ totalWordsMastered.toLocaleString() }}
          </span>
          <span class="text-base text-gray-500"
            >/ {{ totalWords.toLocaleString() }}</span
          >
        </div>
        <p class="text-xs text-gray-600 mt-0.5">expressions mastered</p>
      </div>
    </template>
    <template #details>
      <div
        class="bg-gradient-to-br from-violet-100/90 via-purple-50/95 to-violet-100/80 rounded-lg p-3 border border-blue-200/80 shadow-sm"
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
    </template>
  </LayoutKeyElementWordOverview>

  <!-- Main statistics -->
  <LayoutKeyElementExpressionOverview
    title="Expressions Acquired"
    description="test"
  >
    <template #content>
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
    </template>
    <template #details>
      <!-- Progress details -->
      <div
        class="group relative bg-gradient-to-br from-amber-100/90 via-yellow-50/95 to-amber-100/80 rounded-lg p-3 border border-amber-300/70 shadow-md transition-all duration-300 overflow-hidden"
      >
        <!-- Professional background pattern -->
        <div
          class="absolute inset-0 bg-gradient-to-br from-amber-100/60 via-yellow-50/80 to-amber-100/50 opacity-90"
        />
        <!-- Content -->
        <div class="relative z-10">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="w-1.5 h-1.5 bg-amber-500 rounded-full" />
              <span class="text-lg font-medium text-gray-700"
                >{{ totalExpressionsMasteredInPercentage }}%</span
              >
            </div>
            <span class="text-xs text-gray-600"
              >out of <strong>{{ totalExpressionsInK }}</strong> total
              expressions</span
            >
          </div>
        </div>
      </div>
    </template>
  </LayoutKeyElementExpressionOverview>
</template>
