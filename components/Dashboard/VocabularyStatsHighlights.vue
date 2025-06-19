<script setup lang="ts">
import { optionExpressions, optionWords } from "~/utils/dashboard/graphOptions";
import {
  ChartBarIcon,
  BookOpenIcon,
  LanguageIcon,
} from "@heroicons/vue/24/outline";

// Calculated Stats
const totalWords = computed(() => {
  const data = (optionWords.series as any[])[0]?.data || [];
  return data.reduce((sum: number, item: any) => sum + item.value, 0);
});

const totalExpressions = computed(() => {
  const data = (optionExpressions.series as any[])[0]?.data || [];
  return data.reduce((sum: number, item: any) => sum + item.value, 0);
});

const wordsProgress = computed(() => {
  const data = (optionWords.series as any[])[0]?.data || [];
  const mastered = data[0]?.value || 0;
  return totalWords.value > 0
    ? Math.round((mastered / totalWords.value) * 100)
    : 0;
});

const expressionsProgress = computed(() => {
  const data = (optionExpressions.series as any[])[0]?.data || [];
  const mastered = data[0]?.value || 0;
  return totalExpressions.value > 0
    ? Math.round((mastered / totalExpressions.value) * 100)
    : 0;
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
          <span class="text-success font-medium">{{ wordsProgress }}%</span>
          <span class="mx-1">mastered</span>
          <span>out of 3K</span>
        </div>
        <div class="flex items-center text-sm text-gray-600">
          <span class="text-warning font-medium">{{ wordsProgress }}%</span>
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
        <p class="text-sm font-medium text-gray-600">Total Expressions Mastered</p>
        <p class="text-2xl font-bold text-gray-900">
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
            >{{ expressionsProgress }}%</span
          >
          <span class="mx-1">mastered</span>
          <span>out of 3K</span>
        </div>
        <div class="flex items-center text-sm text-gray-600">
          <span class="text-warning font-medium"
            >{{ expressionsProgress }}%</span
          >
          <span class="mx-1">being learned</span>
          <span>out of 2K</span>
        </div>
      </div>
    </div>
  </div>
</template>
