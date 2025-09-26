<script setup lang="ts">
import { optionWords } from "~/utils/dashboard/graphOptions";
import { BookOpenIcon } from "@heroicons/vue/24/outline";
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

</script>

<template>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div class="mb-4 flex">        
        <div class="flex-shrink-0 ">
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
        <h3 class="text-lg ml-3 font-semibold text-gray-900 flex items-center">
          Word Learning Progress
        </h3>
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
  </div>
</template>
