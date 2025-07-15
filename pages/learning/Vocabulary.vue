<script setup lang="ts">
import { BookOpenIcon, CheckIcon, XMarkIcon } from "@heroicons/vue/24/outline";

import {
  getClassWordRole,
  parseExpressions,
  parseWords,
  vocabularyFirstTab,
  vocabularySecondTab,
} from "~/utils/learning/vocabulary";

import type { Word } from "~/types/word.ts";
import type { Expression } from "~/types/expression.ts";
import type {
  DatabaseExpressions,
  DatabaseWords,
} from "~/utils/learning/vocabulary.ts";

definePageMeta({
  layout: "authenticated",
});
useHead({
  title: "Vocabulary",
  titleTemplate: "%s - Learn languages with AI",
  meta: [
    { name: "vocabulary", content: "width=device-width, initial-scale=1" },
  ],
  link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
});

const words = ref<Word[]>([]);
const expressions = ref<Expression[]>([]);
const selectedWord = ref<Word | null>(null);
const selectedExpression = ref<Expression | null>(null);
const activeVocabularyTab = ref(1);
const showLearnedWords = ref(false);
const showLearnedExpressions = ref(false);
const searchQuery = ref("");
const isLoadingFetchingWords = ref(true);
const isLoadingFetchingExpressions = ref(true);

// Fetch data
const getWordList = async () => {
  isLoadingFetchingWords.value = true;
  const { data } = await useFetch(`/api/words/`, {
    query: { is_learned: showLearnedWords.value },
    transform: (words: Array<DatabaseWords>) => {
      return parseWords(words);
    },
  });
  isLoadingFetchingWords.value = false;
  if (data.value) {
    words.value = data.value;
  }
};

const getExpressionList = async () => {
  const { data: dataExpr } = await useFetch(`/api/expressions/`, {
    query: { is_learned: showLearnedExpressions.value },
    transform: (expressions: Array<DatabaseExpressions>) => {
      return parseExpressions(expressions);
    },
  });
  isLoadingFetchingExpressions.value = false;
  if (dataExpr.value) {
    expressions.value = dataExpr.value;
  }
};

watchEffect(async () => {
  console.log("WatchEffet", showLearnedWords.value);
  await getWordList();
  await getExpressionList();
});

watchEffect(async () => {
  console.log("WatchEffet", showLearnedExpressions.value);
  await getExpressionList();
});

const editStatusWord = (id: any, isLearned: boolean) => {
  console.log("mark as learned", id, isLearned);
};
</script>

<template>
  <div class="max-w-full max-h-screen grid grid-cols-4">
    <div class="max-h-screen col-span-3">
      <div class="bg-white rounded-lg shadow-md">
        <!-- Header -->
        <div
          class="bg-gradient-to-r from-gray-50/50 to-white p-5 border-b border-gray-100/60"
        >
          <div class="flex items-center justify-between mb-6">
            <LayoutHeadingPlus
              title="Vocabulary"
              description="Master Turkish words and expressions"
            >
              <BookOpenIcon class="h-6 w-6 text-primary" />
            </LayoutHeadingPlus>

            <!-- Tab Navigation -->

            <LayoutTabs
              :first-tab="vocabularyFirstTab"
              :second-tab="vocabularySecondTab"
              @tab-active-changed="
                (activeTab) => (activeVocabularyTab = activeTab)
              "
            />
          </div>

          <!-- Controls -->
          <div class="flex items-center justify-between">
            <!-- Search -->
            <!-- <div class="relative flex-1 max-w-md">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search words or expressions..."
                class="w-full pl-12 pr-4 py-3 border border-gray-200/60 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-white/80 backdrop-blur-sm shadow-sm"
              />
              <FunnelIcon class="absolute left-4 top-3 h-5 w-5 text-gray-400" />
            </div> -->
            <!-- <div class="relative flex-1 max-w-md w-64">
              <fieldset class="fieldset">
                <input
                  v-model="searchQuery"
                  type="text"
                  class="input"
                  placeholder="Search words or expressions..."
                />
              </fieldset>
            </div> -->
            <div
              v-if="activeVocabularyTab === 1"
              class="h-full flex justify-center"
            >
              <label class="label">
                <input
                  v-model="showLearnedWords"
                  type="checkbox"
                  checked="checked"
                  class="toggle toggle-primary"
                />
                <span
                  :class="{
                    'text-primary': showLearnedWords,
                  }"
                  >Show Learned Words</span
                >
              </label>
            </div>
            <div v-else class="h-full flex justify-center">
              <label class="label">
                <input
                  v-model="showLearnedExpressions"
                  type="checkbox"
                  checked="checked"
                  class="toggle toggle-primary"
                />
                <span
                  :class="{
                    'text-primary': showLearnedExpressions,
                  }"
                  >Show Learned Expressions</span
                >
              </label>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="h-full px-6 overflow-auto">
          <!-- Words Tab -->
          <div v-if="activeVocabularyTab === 1" class="py-6">
            <div
              class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <!-- flex flex-col justify-between bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200 -->
              <div
                v-for="word in words"
                :key="word.id"
                class="group p-4 relative bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200 cursor-pointer"
                :class="{
                  'ring-1 ring-primary/90 shadow-lg shadow-primary/10':
                    selectedWord?.id === word.id,
                  // 'opacity-75': learnedWords.has(word.id),
                }"
                @click="selectedWord = word"
              >
                <!-- Word content -->
                <div>
                  <div
                    class="text-pretty flex items-start justify-between mb-2"
                  >
                    <h3 class="text-xl font-bold text-gray-900 leading-tight">
                      {{ word.text }}
                    </h3>
                    <div :class="getClassWordRole(word.role)">
                      {{ word.role }}
                    </div>
                  </div>
                  <p class="italic font-medium">
                    {{ word.translation }}
                  </p>
                </div>

                <!-- Actions -->
                <div class="flex items-center justify-end pt-4">
                  <div class="flex items-center gap-1">
                    <button class="btn btn-ghost btn-xs mr-2">
                      <div class="flex items-center" v-if="word.isMastered">
                        <XMarkIcon class="h-4 w-4 mr-2" />
                        <span >Move Back To Learn</span>
                      </div>
                      <div v-else class="flex items-center" >
                        <CheckIcon class="h-4 w-4 mr-2" />
                        <span >Mark as Learned</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Empty state -->
            <!-- <div v-if="filteredWords.length === 0" class="text-center py-12"> -->
            <!-- <div
                class="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <BookOpenIcon class="h-8 w-8 text-gray-400" />
              </div> -->
            <!-- <h3 class="text-lg font-medium text-gray-900 mb-2">
                {{ searchQuery ? "No words found" : "No words available" }}
              </h3> -->
            <!-- <p class="text-gray-500">
                {{
                  searchQuery
                    ? "Try adjusting your search terms."
                    : "Check back later for new words."
                }}
              </p> -->
            <!-- </div> -->
          </div>

          <!-- Expressions Tab -->
          <div v-if="activeVocabularyTab === 2" class="py-6">
            <div
              class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <div
                v-for="expression in expressions"
                :key="expression.text"
                class="group p-4 relative bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200 cursor-pointer"
                :class="{
                  'ring-1 ring-primary/90 shadow-lg shadow-primary/10':
                    selectedExpression?.text === expression.text,
                  // 'opacity-75': learnedExpressions.has(expression.text),
                }"
                @click="selectedExpression = expression"
              >
                <!-- Expression content -->
                <div>
                  <div class="mb-3">
                    <h3 class="text-xl font-bold text-gray-900 leading-tight">
                      {{ expression.text }}
                    </h3>
                  </div>
                  <p class="text-base text-gray-700 font-medium">
                    {{ expression.textEn }}
                  </p>
                </div>

                <!-- Actions -->
                <div
                  class="flex items-center justify-between pt-4 border-t border-gray-100/60"
                >
                  <div class="flex items-center gap-1">
                    <button class="btn btn-ghost btn-xs mr-2">
                      <div class="flex items-center" v-if="expression.isMastered">
                        <XMarkIcon class="h-4 w-4 mr-2" />
                        <span >Move Back To Learn</span>
                      </div>
                      <div v-else class="flex items-center" >
                        <CheckIcon class="h-4 w-4 mr-2" />
                        <span >Mark as Learned</span>
                      </div>
                    </button>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Side Panel -->
    <div class="col-span-1 flex flex-col grow-1">
      <div class="h-full">
          <LearningItemDefinition
            v-if="activeVocabularyTab === 1"
            class="bg-white p-5 border-l border-primary/20"
            :word="selectedWord"
          />
          <LearningItemDefinition
            v-else
            class="bg-white p-5 border-l border-primary/20"
            :expression="selectedExpression"
            type="expression"
          />
      </div>
    </div>
  </div>
</template>
