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

const userStore = useUserStore();
const userScoreStore = useUserScoreStore();
const words = ref<Word[]>([]);
const expressions = ref<Expression[]>([]);
const selectedWord = ref<Word | null>(null);
const selectedExpression = ref<Expression | null>(null);
const activeVocabularyTab = ref(1);
const showLearnedWords = ref(false);
const showLearnedExpressions = ref(false);
// const searchQuery = ref("");
const isLoadingFetchingWords = ref(true);
const isLoadingFetchingExpressions = ref(true);

const countWords = ref<number>(0);
const countExpr = ref<number>(0);
const {
  currentPage,
  endItem,
  goToNextPage,
  goToPage,
  goToPreviousPage,
  itemsPerPage,
  pageNumbers,
  startItem,
  totalItems,
  totalPages,
} = usePagination(countWords);

const {
  currentPage: currentPageExpr,
  goToNextPage: goToNextPageExpr,
  goToPage: goToPageExpr,
  goToPreviousPage: goToPreviousPageExpr,
  itemsPerPage: itemsPerPageExpr,
  pageNumbers: pageNumbersExpr,
  startItem: startItemExpr,
  totalItems: totalItemsExpr,
  totalPages: totalPagesExpr,
} = usePagination(countExpr);

// {
//   query: { is_learned: showLearnedWords.value },
//   transform: (words: Array<DatabaseWords>) => {
//     return parseWords(words);
//   },
// },

// Fetch data
const getWordList = async () => {
  isLoadingFetchingWords.value = true;
  const { data } = await useFetch(
    `/api/words?page=${currentPage.value}&size=16`,
    {
      query: { is_learned: showLearnedWords.value },
      transform: ({
        data,
        count,
      }: {
        data: Array<DatabaseWords>;
        count: number;
      }) => ({
        words: parseWords(data),
        count,
      }),
    },
  );
  if (data.value) {
    words.value = data.value.words || [];
    countWords.value = data.value.count || 0;
  }
  isLoadingFetchingWords.value = false;
};

const getExpressionList = async () => {
  isLoadingFetchingExpressions.value = true;
  const { data: dataExpr } = await useFetch(
    `/api/expressions?page=${currentPageExpr.value}&size=10`,
    {
      query: { is_learned: showLearnedExpressions.value },
      transform: ({
        data,
        count,
      }: {
        data: Array<DatabaseExpressions>;
        count: number;
      }) => ({
        expressions: parseExpressions(data),
        count,
      }),
    },
  );
  if (dataExpr.value) {
    expressions.value = dataExpr.value.expressions || [];
    countExpr.value = dataExpr.value.count || 0;
  }
  isLoadingFetchingExpressions.value = false;
};

getWordList();
getExpressionList();

const handleShowLearnWordsChange = async () => {
  currentPage.value = 1;
  await getWordList();
};

const handleGoToPreviousPage = async () => {
  goToPreviousPage();
  await getWordList();
};
const handleGoToPage = async (page: number) => {
  goToPage(page);
  await getWordList();
};
const handleGoToNextPage = async () => {
  goToNextPage();
  await getWordList();
};

const handleShowLearnExpressionsChange = async () => {
  currentPageExpr.value = 1;
  await getExpressionList();
};

const handleGoToPreviousPageForExpressions = async () => {
  goToPreviousPageExpr();
  await getExpressionList();
};
const handleGoToPageForExpressions = async (page: number) => {
  goToPageExpr(page);
  await getExpressionList();
};
const handleGoToNextPageForExpressions = async () => {
  goToNextPageExpr();
  await getExpressionList();
};

const handleWordLearningStatus = async (wordId: number, isLearned: boolean) => {
  console.log("edit learning status word", wordId, isLearned);
  if (isLearned) {
    await $fetch(`/api/words-knowledge/${wordId}`, {
      method: "DELETE",
    });
  } else {
    console.log("tere");
    await $fetch(`/api/words-knowledge/${wordId}`, {
      method: "PUT",
      body: {
        word_mastered: true,
        user_id: userStore.$state.id,
      },
    });
  }
  getWordList();
  userScoreStore.setVocabularyScores(userStore.$state.id);
};

const handleExpressionLearningStatus = async (
  expressionId: number,
  isLearned: boolean,
) => {
  if (isLearned) {
    await $fetch(`/api/expressions-knowledge/${expressionId}`, {
      method: "DELETE",
    });
  } else {
    await $fetch(`/api/expressions-knowledge/${expressionId}`, {
      method: "PUT",
      body: {
        expression_mastered: true,
        user_id: userStore.$state.id,
      },
    });
  }

  getExpressionList();
  userScoreStore.setVocabularyScores(userStore.$state.id);
};
// abandonned because
// reset currentPage to 1 when switching showLearnedWords
// trigger race conditions with watchEffect

// watchEffect(async () => {
//   console.log("WatchEffet", showLearnedWords.value);
//   await getWordList();
// });

// watchEffect(async () => {
//   console.log("WatchEffet", showLearnedExpressions.value);
// await getExpressionList();
// });
</script>

<template>
  <div class="max-w-full min-h-screen grid grid-cols-4">
    <div class="min-h-screen col-span-3">
      <div
        class="min-h-screen h-full flex flex-col bg-white rounded-lg shadow-md"
      >
        <!-- Header -->
        <div
          class="bg-gradient-to-r from-gray-50/50 to-white p-5 border-b border-gray-100/60"
        >
          <div class="flex items-center justify-between mb-6">
            <LayoutHeadingPlus
              title="Vocabulary"
              description="Most Common Words and Expressions"
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
                  @change="handleShowLearnWordsChange"
                />
                <span
                  :class="{
                    'text-primary': showLearnedWords,
                  }"
                  >See Words You Learned</span
                >
              </label>
            </div>
            <div v-else class="h-full flex flex-col justify-between">
              <label class="label">
                <input
                  v-model="showLearnedExpressions"
                  type="checkbox"
                  checked="checked"
                  class="toggle toggle-primary"
                  @change="handleShowLearnExpressionsChange"
                />
                <span
                  :class="{
                    'text-primary': showLearnedExpressions,
                  }"
                  >See Expressions You Learned</span
                >
              </label>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="h-full px-6">
          <!-- Words Tab -->
          <div
            v-if="activeVocabularyTab === 1"
            class="pt-6 h-full flex flex-col justify-between"
          >
            <!-- Loading Skeleton for Words -->
            <div
              v-if="isLoadingFetchingWords"
              class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <div
                v-for="i in 12"
                :key="i"
                class="group p-4 relative bg-white rounded-lg border border-gray-200 animate-pulse"
              >
                <!-- Word content skeleton -->
                <div>
                  <div class="flex items-start justify-between mb-2">
                    <div class="skeleton h-6 w-24 rounded-md bg-gray-200" />
                    <div class="skeleton h-5 w-16 rounded-full bg-gray-200" />
                  </div>
                  <div class="skeleton h-4 w-32 rounded bg-gray-200 mb-2" />
                  <div class="skeleton h-4 w-28 rounded bg-gray-200" />
                </div>

                <!-- Actions skeleton -->
                <div class="flex items-center justify-end pt-4">
                  <div class="skeleton h-8 w-32 rounded-md bg-gray-200" />
                </div>
              </div>
            </div>

            <!-- Actual Words Content -->
            <div
              v-else
              class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <!-- flex flex-col justify-between bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200 -->
              <div
                v-for="(word, index) in words"
                :key="word.id"
                class="group p-4 relative rounded-lg border hover:shadow-md transition-all duration-300 cursor-pointer"
                :class="{
                  'ring-1 ring-primary/90 shadow-lg shadow-primary/10':
                    selectedWord?.id === word.id,
                  // 'opacity-75': learnedWords.has(word.id),
                  // Alternating backgrounds every 2 items
                  'bg-gradient-to-br from-blue-50/80 via-blue-100/40 to-indigo-50/60 border-blue-200/60 shadow-sm': Math.floor(index / 2) % 2 === 0,
                  'bg-gradient-to-br from-indigo-50/60 via-blue-50/40 to-blue-100/30 border-indigo-200/60 shadow-sm': Math.floor(index / 2) % 2 === 1,
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
                    <button
                      class="btn btn-ghost btn-xs mr-2"
                      @click="
                        handleWordLearningStatus(word.id, showLearnedWords)
                      "
                    >
                      <div v-if="showLearnedWords" class="flex items-center">
                        <XMarkIcon class="h-4 w-4 mr-2" />
                        <span>Move Back To Learn</span>
                      </div>
                      <div v-else class="flex items-center">
                        <CheckIcon class="h-4 w-4 mr-2" />
                        <span>Mark as Learned</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <LayoutTablePagination
              class="mt-2"
              :current-page="currentPage"
              :end-item="endItem"
              :start-item="startItem"
              :items-per-page="itemsPerPage"
              :page-numbers="pageNumbers"
              :total-items="totalItems"
              :total-pages="totalPages"
              @go-to-next-page="handleGoToNextPage"
              @go-to-page="(page: number) => handleGoToPage(page)"
              @go-to-previous-page="handleGoToPreviousPage"
            />
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
          <div
            v-if="activeVocabularyTab === 2"
            class="pt-6 h-full flex flex-col justify-between"
          >
            <!-- Loading Skeleton for Expressions -->
            <div
              v-if="isLoadingFetchingExpressions"
              class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <div
                v-for="i in 12"
                :key="i"
                class="group p-4 relative bg-white rounded-lg border border-gray-200 animate-pulse"
              >
                <!-- Expression content skeleton -->
                <div>
                  <div class="mb-3">
                    <div
                      class="skeleton h-6 w-32 rounded-md bg-gray-200 mb-2"
                    />
                    <div class="skeleton h-5 w-28 rounded bg-gray-200" />
                  </div>
                  <div class="skeleton h-4 w-36 rounded bg-gray-200 mb-2" />
                  <div class="skeleton h-4 w-24 rounded bg-gray-200" />
                </div>

                <!-- Actions skeleton -->
                <div
                  class="flex items-center justify-between pt-4 border-t border-gray-100/60"
                >
                  <div class="skeleton h-8 w-32 rounded-md bg-gray-200" />
                </div>
              </div>
            </div>

            <!-- Actual Expressions Content -->
            <div
              v-else
              class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <div
                v-for="(expression, index) in expressions"
                :key="expression.text"
                class="group p-4 relative rounded-lg border hover:shadow-md transition-all duration-300 cursor-pointer"
                :class="{
                  'ring-1 ring-primary/90 shadow-lg shadow-primary/10':
                    selectedExpression?.text === expression.text,
                  // 'opacity-75': learnedExpressions.has(expression.text),
                  // Alternating backgrounds every 2 items
                  'bg-gradient-to-br from-purple-50/80 via-purple-100/40 to-pink-50/60 border-purple-200/60 shadow-sm': Math.floor(index / 2) % 2 === 0,
                  'bg-gradient-to-br from-pink-50/60 via-purple-50/40 to-purple-100/30 border-pink-200/60 shadow-sm': Math.floor(index / 2) % 2 === 1,
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
                    <button
                      class="group relative overflow-hidden rounded-xl px-4 py-2 font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2"
                      :class="{
                        'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl focus:ring-red-500': showLearnedExpressions,
                        'bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white shadow-lg hover:shadow-xl focus:ring-emerald-500': !showLearnedExpressions,
                      }"
                      @click="
                        handleExpressionLearningStatus(
                          expression.id,
                          showLearnedExpressions,
                        )
                      "
                    >
                      <!-- Button background effect -->
                      <div class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <div class="relative z-10 flex items-center gap-2">
                        <div
                          v-if="showLearnedExpressions"
                          class="flex items-center gap-2"
                        >
                          <XMarkIcon class="h-4 w-4" />
                          <span class="text-sm font-semibold">Move Back</span>
                        </div>
                        <div v-else class="flex items-center gap-2">
                          <CheckIcon class="h-4 w-4" />
                          <span class="text-sm font-semibold">Mark Learned</span>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <LayoutTablePagination
              class="mt-2"
              :current-page="currentPageExpr"
              :end-item="endItemExpr"
              :start-item="startItemExpr"
              :items-per-page="itemsPerPageExpr"
              :page-numbers="pageNumbersExpr"
              :total-items="totalItemsExpr"
              :total-pages="totalPagesExpr"
              @go-to-next-page="handleGoToNextPageForExpressions"
              @go-to-page="(page: number) => handleGoToPageForExpressions(page)"
              @go-to-previous-page="handleGoToPreviousPageForExpressions"
            />
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
