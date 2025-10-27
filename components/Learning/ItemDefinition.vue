<script setup lang="ts">
import type { Word } from "~/types/vocabulary/word";
import type { Expression } from "~/types/vocabulary/expression";
import {
  getClassWordRole,
} from "~/utils/learning/vocabulary";

import { BookOpenIcon, LanguageIcon } from "@heroicons/vue/24/outline";
definePageMeta({
  layout: "authenticated",
});

const props = withDefaults(
  defineProps<{
    word?: Word | null;
    expression?: Expression | null;
    type?: "word" | "expression";
  }>(),
  {
    word: null,
    expression: null,
    type: "word",
  },
);

const isExistingItem = computed(() => {
  return (
    (props.type === "word" && props.word) ||
    (props.type === "expression" && props.expression)
  );
});
const emptyMessage = computed(() => {
  return props.type === "word"
    ? "Select a word to view its definition"
    : "Select an expression to view its explanation";
});
</script>

<template>
  <div v-if="isExistingItem" class="w-full text-pretty shadow-md">
    <div class="text-2xl flex flex-wrap items-center">
      <!-- "font-bold mr-2 underline underline-offset-3" -->
      <span class="font-bold text-gray-900 leading-tight mr-2"
        >{{ props.type === "word" ? props.word.text : props.expression.text }}
      </span>
      <br v-if="props.type === 'expression'" />
      <span>
        {{ props.type === "word" ? word.translation : expression.translation }}</span
      >
      <div v-if="props.type === 'word'" :class="getClassWordRole(word.role)" class="ml-2">
         {{ word.role }}
       </div>
    </div>
    <div class="mt-2">
      <div>
        <div
          v-if="
            props.type === 'word'
              ? word.sentence
              : expression.sentence
          "
          class="font-semibold"
        >
          <span>
            {{
              props.type === "word"
                ? props.word.sentence
                : expression.sentence
            }}
          </span>
        </div>
          <div>
          <span>{{
            props.type === "word"
              ? word.sentenceEn
              : expression.sentenceEn
          }}</span></div>
      </div>
      <div
        v-if="
          props.type === 'word'
            ? word.sentence2
            : expression.sentence2
        "
        class="mt-2"
      >
        <div class="font-semibold flex items-center">
          <span>{{
            props.type === "word"
              ? word.sentence2
              : expression.sentence2
          }}</span>
        </div>
        <div class="italic">
          {{
            props.type === "word"
              ? word.sentence2En
              : expression.sentence2En
          }}
        </div>
      </div>
    </div>
  </div>
  <div
    v-else
    class="flex items-center justify-center"
  >
    <div class="text-center">
      <BookOpenIcon v-if="props.type === 'word'" class="h-8 w-8 mx-auto mb-2" />
      <LanguageIcon v-else class="h-8 w-8 mx-auto mb-2" />
      <p class="text-sm">{{ emptyMessage }}</p>
    </div>
  </div>
</template>
