<script setup lang="ts">
import type { Word } from "~/types/word.ts";
const props = withDefaults(
  defineProps<{
    loading: boolean;
    words?: Word[];
  }>(),
  {
    loading: false,
    words: [],
  },
);
console.log("Valeur reçue :", props.words);
</script>

<template>
  <div class="w-full">
    <div class="bg-base-100 rounded-box shadow-md p-5">
      <div
        v-if="props.loading"
        class="w-full h-72 flex justify-center items-center"
      >
        <span class="loading loading-bars loading-xl" />
      </div>
      <div v-else class="flex flex-col items-center justify-between">
        <h2 class="font-bold mb-3 text-xl tracking-widest text-primary">
          New words
        </h2>
        <div class="w-full">
          <LearningWordDefinition
            v-for="w in props.words"
            class="mb-2"
            :word="w"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<!-- grid-template-columns: [card] 80% [gap] 3% [additional] 17% -->
