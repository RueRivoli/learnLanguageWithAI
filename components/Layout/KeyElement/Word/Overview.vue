<script setup lang="ts">
import { BookOpenIcon } from "@heroicons/vue/24/outline";

const props = withDefaults(
  defineProps<{
    description: string | null;
    lightMode?: boolean;
    title: string | null;
  }>(),
  {
    description: null,
    lightMode: false,
    title: null,
  },
);
</script>

<template>
  <!-- Total Words Mastered - Professional Design -->
  <div
    :class="[
      'group p-4 relative rounded-lg shadow-md hover:shadow-lg',
      lightMode ? 'bg-slate-200 group relative rounded-lg shadow-md border border-slate-300' : 'bg-gradient-to-br from-violet-100/90 via-purple-50/95 to-violet-100/80 rounded-lg shadow-md border border-violet-300/70',
    ]"
  >
    <!-- Professional background pattern -->
    <div
      v-if="!lightMode"
      class="absolute inset-0 bg-gradient-to-br from-violet-100/90 via-purple-50/95 to-violet-100/80 opacity-90"
    />

    <!-- Success celebration overlay -->
    <div
    v-if="!lightMode"
      class="absolute inset-0 bg-gradient-to-br from-green-500/5 via-emerald-500/3 to-green-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500"
    />

    <!-- Content container -->
    <div class="h-full relative flex flex-col justify-between z-10">
      <div class="flex items-center justify-between mb-3">
        <div class="flex-1">
          <h3 class="text-gray-900 mb-0.5 text-xl">
            {{ title }}
          </h3>
          <!-- <p class="text-sm text-gray-600">Your vocabulary mastery progress</p> -->
        </div>

        <!-- Icon with professional styling -->
        <div class="flex-shrink-0 ml-3">
          <div class="relative">
            <div class="absolute inset-0 bg-primary rounded-lg" />
            <div class="relative p-2 bg-primary rounded-lg shadow-lg">
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

<style></style>
