<script setup lang="ts">
import { BookOpenIcon } from '@heroicons/vue/24/outline';

const props = withDefaults(
  defineProps<{
    title: string | null;
    description: string | null;
  }>(),
  {
    title: null,
    description: null,
  },
);

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
            {{ title }}
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
        <slot name="content" />

      <!-- Progress details -->
      <slot name="details"></slot>
    </div>
  </div>
</template>

<style>

</style>