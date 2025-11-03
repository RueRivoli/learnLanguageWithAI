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
    <slot></slot>
    <div class="text-2xl font-light text-gray-900 mb-1">
      <h1 class="text-2xl font-light" :class="props.textColor">
        {{ props.title }}
      </h1>
      <p :class="props.descriptionTextColor">{{ props.description }}</p>
    </div>
  </div>
</template>
