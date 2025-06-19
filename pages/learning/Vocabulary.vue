<script setup lang="ts">
import { LanguageIcon, XMarkIcon } from "@heroicons/vue/24/solid";
import { BookOpenIcon, TagIcon } from "@heroicons/vue/24/outline";
import type { Word } from "~/types/word.ts";
import type { Expression } from "~/types/expression.ts";

definePageMeta({
  layout: "authenticated",
});
useHead({
  title: "Words",
  titleTemplate: "%s - Learn languages with AI",
  meta: [{ name: "words", content: "width=device-width, initial-scale=1" }],
  link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
});

const router = useRouter();
const words = ref<Word[]>([]);
const expressions = ref<Expression[]>([]);
const selectedWord = ref(null);
const selectedExpression = ref(null);

const { data } = await useFetch("/api/words/:id");
console.log("data", data.value);
if (data) {
  words.value = data.value?.map(
    ({
      id,
      text,
      role,
      translation,
      word_sentence,
      word_sentence_translation,
      word_sentence_2,
      word_sentence_2_translation,
    }) => ({
      id,
      text,
      role,
      translation,
      wordSentence: word_sentence,
      wordSentenceEn: word_sentence_translation,
      wordSentence2: word_sentence_2,
      wordSentence2En: word_sentence_2_translation,
    }),
  );
  selectedWord.value = words.value[0];
}
const { dataExpr } = await useFetch("/api/expressions/:id");
if (dataExpr)
  expressions.value = dataExpr.value?.map(
    ({
      id,
      text,
      translation,
      expression_sentence,
      expression_sentence_translation,
      expression_sentence_2,
      expression_sentence_2_translation,
    }) => ({
      id,
      text,
      translation,
      wordSentence: expression_sentence,
      wordSentenceEn: expression_sentence_translation,
      wordSentence2: expression_sentence_2,
      wordSentence2En: expression_sentence_2_translation,
    }),
  );
selectedExpression.value = expressions.value[0];

// const getWords = async () => {

// };

// const getExpressions = async () => {};

// getWords();
// getExpressions();
</script>

<template>
  <div class="w-full grid grid-cols-4 gap-2">
    <div class="col-span-3">
      <div class="list h-96 bg-white rounded-box shadow-md">
        <div class="p-4">
          <LayoutHeadingPlus
            title="Words"
            description="The most important words to learn"
          >
            <BookOpenIcon
              class="h-6 w-6 text-primary"
            />
          </LayoutHeadingPlus>
        </div>
        <div class="overflow-x-auto h-96 w-auto">
          <div class="px-4 max-h-full">
            <table class="table table-pin-rows table-pin-cols">
              <thead class="bg-primary">
                <tr>
                  <th />
                  <th>Word</th>
                  <th>Translation</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(w, n) in words"
                  class="cursor-pointer hover:opacity-60 text-pretty font-semibold"
                  @click="selectedWord = w"
                >
                  <td>
                    <div>{{ w.id }}</div>
                  </td>
                  <td>
                    <div>{{ w.text }} ({{ w.role }})</div>
                  </td>
                  <td>
                    <div>{{ w.translation }}</div>
                  </td>
                  <td class="flex items-center">
                    <div
                      class="tooltip tooltip-accent tooltip-bottom"
                      data-tip="To give priority to this word"
                    >
                      <TagIcon
                        class="h-5 w-5 mr-4 font-semibold text-neutral group-hover:text-white"
                      />
                    </div>
                    <div
                      class="tooltip tooltip-accent tooltip-bottom"
                      data-tip="Mark this word if you know it"
                    >
                      <XMarkIcon
                        class="h-5 w-5 font-semibold text-neutral group-hover:text-white"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="mt-2 h-96 list bg-white rounded-box shadow-md">
        <div class="overflow-x-auto h-96 w-auto">
          <div class="p-4">
            <LayoutHeadingPlus
              title="Expressions"
              description="The most important expressions to learn"
            >
              <LanguageIcon
                class="h-6 w-6 text-primary"
              />
            </LayoutHeadingPlus>
          </div>
          <div class="px-4">
            <table class="table table-pin-rows table-pin-cols">
              <thead>
                <tr class="bg-primary">
                  <th />
                  <th>Expression</th>
                  <th>Translation</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(expr, n) in expressions"
                  class="cursor-pointer font-semibold"
                  @click="selectedExpression = expr"
                >
                  <td>
                    <div>{{ expr.id }}</div>
                  </td>
                  <td>
                    <div>{{ expr.text }}</div>
                  </td>
                  <td>
                    <div>{{ expr.translation }}</div>
                  </td>
                  <td class="flex items-center">
                    <div
                      class="tooltip tooltip-accent tooltip-bottom"
                      data-tip="To give priority to this word"
                    >
                      <TagIcon
                        class="h-5 w-5 mr-4 font-semibold text-black dark:text-white group-hover:text-white"
                      />
                    </div>
                    <div
                      class="tooltip tooltip-accent tooltip-bottom"
                      data-tip="Mark this word if you know it"
                    >
                      <XMarkIcon
                        class="h-5 w-5 font-semibold text-black dark:text-white group-hover:text-white"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="col-span-1 h-full grid grid-rows-2 gap-4 grow-1">
      <div class="row-span-1">
        <LearningWordIllustration
          v-if="selectedWord"
          class="bg-white0 rounded-box shadow-md p-3"
          :word="selectedWord"
        />
      </div>
      <div class="row-span-1">
        <LearningWordIllustration
          v-if="selectedExpression"
          class="bg-white0 rounded-box shadow-md p-4"
          :word="selectedExpression"
        />
      </div>
    </div>
  </div>
</template>
