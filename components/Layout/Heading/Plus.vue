<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string | null;
    description: string | null;
    textColor?: string;
    backgroundColor?: string;
    descriptionTextColor?: string;
  }>(),
  {
    description: null,
    title: null,
    textColor: "text-neutral",
    backgroundColor: "bg-indigo-100",
    descriptionTextColor: "text-base-800",
  },
);
</script>

<template>
  <div class="flex items-center space-x-3">
    <div class="p-2 rounded-lg" :class="props.backgroundColor">
      <!-- <ChartBarIcon class="h-6 w-6 text-primary" /> -->
      <slot />
    </div>
    <div>
      <h1 class="text-2xl font-bold" :class="props.textColor">
        {{ props.title }}
      </h1>
      <p :class="props.descriptionTextColor">{{ props.description }}</p>
    </div>
  </div>
</template>
