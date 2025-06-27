<script setup lang="ts">
import { getColorStyleClass } from "~/utils/learning/grammar";

const props = withDefaults(
  defineProps<{
    score?: number | null;
  }>(),
  {
    score: null,
  },
);
</script>

<template>
  <div class="relative flex-shrink-0">
    <div class="relative w-10 h-10">
      <!-- Background circle -->
      <svg class="w-10 h-10 transform -rotate-90" viewBox="0 0 36 36">
        <path
          class="text-gray-200"
          stroke="currentColor"
          stroke-width="3"
          fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <!-- Progress circle -->
        <path
          :class="getColorStyleClass(props.score ?? 0)"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          fill="none"
          :stroke-dasharray="`${((props.score ?? 0) / 100) * 100}, 100`"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>
      <!-- Center text -->
      <div class="absolute inset-0 flex items-center justify-center">
        <span
          class="text-[10px] font-bold leading-none"
          :class="getColorStyleClass(props.score ?? 0)"
        >
          {{ props.score ?? 0 }}%
        </span>
      </div>
    </div>
  </div>
</template>
