<script setup lang="ts">
import type { Word } from "~/types/word.ts";

definePageMeta({
  layout: "authenticated",
});

const props = withDefaults(
  defineProps<{
    word: Word | null;
  }>(),
  {
    word: null,
  },
);
</script>

<template>
  <div class="w-full text-pretty bg-white">
    <div class="text-2xl">
      <span class="font-bold mr-2 underline underline-offset-3"
        >{{ word.text }}
      </span>
      <span class="italic"> {{ word.translation }}</span>
    </div>
    <div class="p-2">
      <div>
        <div v-if="word.wordSentence" class="font-semibold">
          1. {{ word.wordSentence }}
        </div>
        <div class="italic">{{ word.wordSentenceEn }}</div>
      </div>
      <div v-if="word.wordSentence2" class="mt-2">
        <div class="font-semibold">2. {{ word.wordSentence2 }}</div>
        <div class="italic">{{ word.wordSentence2En }}</div>
      </div>
    </div>
  </div>
</template>
