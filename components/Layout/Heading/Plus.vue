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
    backgroundColor: "",
    descriptionTextColor: "text-base-800",
  },
);
</script>

<template>
  <div class="flex items-center space-x-3">
    <div class="p-2 rounded-lg" :class="props.backgroundColor">
      <slot />
    </div>
    <div>
      <h1 class="text-2xl font-medium" :class="props.textColor">
        {{ props.title }}
      </h1>
      <p v-if="props.description" :class="props.descriptionTextColor">
        {{ props.description }}
      </p>
    </div>
  </div>
</template>
