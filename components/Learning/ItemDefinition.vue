<script setup lang="ts">
import type { Word } from "~/types/word.ts";
import type { Expression } from "~/types/expression.ts";
import {
  getClassWordRole,
} from "~/utils/learning/vocabulary";

import { ArrowLongRightIcon, BookOpenIcon, LanguageIcon } from "@heroicons/vue/24/outline";
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
    ? "Select a word to view details"
    : "Select an expression to view details";
});
</script>

<template>
  <div v-if="isExistingItem" class="w-full text-pretty shadow-md">
    <div class="text-2xl align-center">
      <!-- "font-bold mr-2 underline underline-offset-3" -->
      <span class="font-bold text-gray-900 leading-tight mr-2"
        >{{ props.type === "word" ? props.word.text : props.expression.text }}
      </span>
      <span class="italic">
        {{ props.type === "word" ? word.translation : expression.textEn }}</span
      >
      <div v-if="props.type === 'word'" :class="getClassWordRole(word.role)" class="ml-2">
         {{ word.role }}
       </div>
    </div>
    <div class="p-2">
      <div>
        <div
          v-if="
            props.type === 'word'
              ? word.wordSentence
              : expression.expressionSentence
          "
          class="font-semibold flex items-center"
        >
          <ArrowLongRightIcon class="h-5 w-5 mr-2" />
          <span>
            {{
              props.type === "word"
                ? props.word.wordSentence
                : expression.expressionSentence
            }}
          </span>
        </div>
        <div class="italic">
          {{
            props.type === "word"
              ? word.wordSentenceEn
              : expression.expressionSentenceEn
          }}
        </div>
      </div>
      <div
        v-if="
          props.type === 'word'
            ? word.wordSentence2
            : expression.expressionSentence2
        "
        class="mt-2"
      >
        <div class="font-semibold flex items-center">
          <ArrowLongRightIcon class="h-5 w-5 mr-2" />
          <span>{{
            props.type === "word"
              ? word.wordSentence2
              : expression.expressionSentence2
          }}</span>
        </div>
        <div class="italic">
          {{
            props.type === "word"
              ? word.wordSentence2En
              : expression.expressionSentence2En
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
