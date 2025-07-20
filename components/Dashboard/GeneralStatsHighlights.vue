<script setup lang="ts"></script>

<template>
  <div
    class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
  >
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm font-medium text-gray-600">WELCOME!</p>
        <p class="text-2xl font-bold text-gray-900">
          Start here with a short quiz to initiate your level
        </p>
      </div>
      <div class="p-3 bg-white rounded-lg">
        <BookOpenIcon class="h-6 w-6 text-neutral" />
      </div>
    </div>
  </div>
  <DashboardVocabularyStatsHighlights />
</template>
