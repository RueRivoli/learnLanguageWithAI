<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string | null;
    description: string | null;
  }>(),
  {
    description: null,
    title: null,
  },
);
</script>

<template>
  <div class="flex items-center space-x-3">
    <div class="p-2 bg-indigo-100 rounded-lg">
      <!-- <ChartBarIcon class="h-6 w-6 text-primary" /> -->
      <slot />
    </div>
    <div>
      <h1 class="text-2xl font-bold text-neutral">{{ props.title }}</h1>
      <p class="text-base-800">{{ props.description }}</p>
    </div>
  </div>
</template>
