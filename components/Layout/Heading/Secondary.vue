<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string | null;
    highlightedText?: string | null;
  }>(),
  {
    title: null,
    highlightedText: null,
  },
);
</script>

<template>
  <!-- tracking-widest ? -->
  <h2 class="text-xl font-extrabold text-primary">
    {{ props.title }}

    <mark class="p-1 text-white bg-accent rounded-lg">
      <span v-if="props.highlightedText">{{ props.highlightedText }} </span>
    </mark>
  </h2>

  <!-- <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Get back to growth with <span class="text-blue-600 dark:text-blue-500">the world's #1</span> CRM.</h1>
<p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p> -->

  <!-- <mark class="px-2 text-white bg-blue-600 rounded-sm dark:bg-blue-500"
    >control</mark
  >

  <h1
    class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
  >
    Regain
    <mark class="px-2 text-white bg-blue-600 rounded-sm dark:bg-blue-500"
      >control</mark
    >
    over your days
  </h1>
  <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
    Here at Flowbite we focus on markets where technology, innovation, and
    capital can unlock long-term value and drive economic growth.
  </p> -->
</template>
