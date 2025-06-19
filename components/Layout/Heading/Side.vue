<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string | null;
  }>(),
  {
    title: null,
  },
);
</script>

<template>
  <h2 class="text-lg font-extrabold text-neutral">
    <mark
      class="p-2 text-white bg-linear-to-tr from-[#5cc3b0] to-[#4bb3a1] rounded-lg"
    >
      <span v-if="props.title">{{ props.title }}</span>
    </mark>
  </h2>
</template>
