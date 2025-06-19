<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string | null;
    highlightedText?: string | null;
    endTitle?: string | null;
  }>(),
  {
    title: null,
    highlightedText: null,
    endTitle: null,
  },
);
</script>

<template>
  <!-- tracking-widest ? -->
  <h2 class="text-2xl font-extrabold text-neutral">
    <span v-if="title">{{ props.title }}</span>

    <mark class="p-1 text-white bg-accent rounded-lg">
      <span v-if="props.highlightedText">{{ props.highlightedText }}</span>
    </mark>
    <span class="ml-2 text-xl" v-if="props.endTitle">{{ props.endTitle }}</span>
  </h2>

  <!-- <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Get back to growth with <span class="text-blue-600 dark:text-blue-500">the world's #1</span> CRM.</h1>
<p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p> -->
</template>
