<script setup lang="ts">
import { LanguageIcon } from "@heroicons/vue/24/solid";

import {
  getClassWordRole,
  parseExpressions,
  parseWords,
  vocabularyFirstTab,
  vocabularySecondTab,
} from "~/utils/learning/vocabulary";

import type { Word } from "~/types/vocabulary/word";
import type { Expression } from "~/types/vocabulary/expression";
import type {
  DatabaseExpressions,
  DatabaseWords,
} from "~/utils/learning/vocabulary.ts";
import { BookOpenIcon } from "@heroicons/vue/24/outline";
import { getAuthToken } from "~/utils/auth/auth";

definePageMeta({
  layout: "authenticated",
});
useHead({
  title: "Vocabulary",
  titleTemplate: "%s - Tookan AI",
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
const itemsPerPage = ref(28);
const {
  currentPage,
  endItem,
  goToNextPage,
  goToPage,
  goToPreviousPage,
  pageNumbers,
  startItem,
  totalItems,
  totalPages,
} = usePagination(countWords, itemsPerPage);

const {
  currentPage: currentPageExpr,
  goToNextPage: goToNextPageExpr,
  goToPage: goToPageExpr,
  goToPreviousPage: goToPreviousPageExpr,
  pageNumbers: pageNumbersExpr,
  startItem: startItemExpr,
  totalItems: totalItemsExpr,
  totalPages: totalPagesExpr,
} = usePagination(countExpr, itemsPerPage);

// {
//   query: { is_learned: showLearnedWords.value },
//   transform: (words: Array<DatabaseWords>) => {
//     return parseWords(words);
//   },
// },

// Fetch data
const getWordList = async () => {
  isLoadingFetchingWords.value = true;
  const headers = await getAuthToken();
  const { data } = await useFetch(
    `/api/words?page=${currentPage.value}&size=28`,
    {
      query: { is_learned: showLearnedWords.value },
      headers,
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
  const headers = await getAuthToken();
  const { data: dataExpr } = await useFetch(
    `/api/expressions?page=${currentPageExpr.value}&size=32`,
    {
      query: { is_learned: showLearnedExpressions.value },
      headers,
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
  if (isLearned) {
    const headers = await getAuthToken();
    await $fetch(`/api/words-knowledge/${wordId}`, {
      method: "DELETE",
      headers,
    });
  } else {
    const headers = await getAuthToken();
    await $fetch(`/api/words-knowledge/${wordId}`, {
      method: "PUT",
      headers,
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
    const headers = await getAuthToken();
    await $fetch(`/api/expressions-knowledge/${expressionId}`, {
      method: "DELETE",
      headers,
    });
  } else {
    const headers = await getAuthToken();
    await $fetch(`/api/expressions-knowledge/${expressionId}`, {
      method: "PUT",
      headers,
      body: {
        expression_mastered: true,
        user_id: userStore.$state.id,
      },
    });
  }

  getExpressionList();
  userScoreStore.setVocabularyScores(userStore.$state.id);
};
</script>

<template>
  <div class="max-w-full min-h-screen grid grid-cols-4">
    <div class="min-h-screen col-span-3">
      <div class="min-h-screen h-full flex flex-col rounded-lg">
        <!-- Header -->
        <div class="p-5">
          <div class="flex items-center justify-between mb-6">
            <LayoutHeadingPlus
              title="Vocabulary"
              description="Most Common Turkish Words and Expressions"
            >
              <LanguageIcon class="h-6 w-6 text-neutral" />
            </LayoutHeadingPlus>

            <!-- Tab Navigation -->

            <LayoutTabs
              :first-tab="vocabularyFirstTab"
              :second-tab="vocabularySecondTab"
              @tab-active-changed="
                (activeTab) => {
                  selectedWord = null;
                  selectedExpression = null;
                  activeVocabularyTab = activeTab;
                }
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
                  checked
                  class="toggle toggle-primary"
                  @change="handleShowLearnWordsChange"
                />
                <span
                  :class="{
                    'text-primary': showLearnedWords,
                  }"
                  >See Words You Mastered</span
                >
              </label>
            </div>
            <div v-else class="h-full flex flex-col justify-between">
              <label class="label">
                <input
                  v-model="showLearnedExpressions"
                  type="checkbox"
                  checked
                  class="toggle toggle-primary"
                  @change="handleShowLearnExpressionsChange"
                />
                <span
                  :class="{
                    'text-primary': showLearnedExpressions,
                  }"
                  >See Expressions You Mastered</span
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
            <!-- Empty State -->
            <div
              v-if="words.length === 0"
              class="flex flex-col items-center justify-center py-16 px-4"
            >
              <div
                v-if="showLearnedWords"
                class="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <BookOpenIcon class="h-10 w-10 text-gray-400" />
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">
                {{ showLearnedWords ? "No Words Learned yet" : "" }}
              </h3>
              <p class="text-gray-500 text-center max-w-md">
                {{
                  showLearnedWords
                    ? "Start Learning Words to see them appear here."
                    : ""
                }}
              </p>
            </div>

            <!-- Words Grid -->
            <div
              v-else
              class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <div v-for="(word, index) in words" :key="index">
                <LayoutKeyElementWordBadge
                  class="cursor-pointer"
                  :text="word.text"
                  :translation="word.translation"
                  :role="word.role"
                  :lightMode="true"
                  @click="selectedWord = word"
                />
              </div>
            </div>
            <LayoutTablePagination
              v-if="words.length > 0"
              class="mt-2 bg-base-100"
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
                <LanguageIcon class="h-8 w-8 text-gray-400" />
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
            v-else-if="activeVocabularyTab === 2"
            class="pt-6 h-full flex flex-col justify-between"
          >
            <!-- Empty State -->
            <div
              v-if="expressions.length === 0"
              class="flex flex-col items-center justify-center py-16 px-4"
            >
              <div
                v-if="showLearnedExpressions"
                class="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <LanguageIcon class="h-10 w-10 text-gray-400" />
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">
                {{ showLearnedExpressions ? "No expressions learned yet" : "" }}
              </h3>
              <p class="text-gray-500 text-center max-w-md">
                {{
                  showLearnedExpressions
                    ? "Start Learning Expressions to see them appear here."
                    : ""
                }}
              </p>
            </div>

            <!-- Expressions Grid -->
            <div
              v-else
              class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <div v-for="(expr, index) in expressions" :key="index">
                <LayoutKeyElementExpressionBadge
                  class="cursor-pointer"
                  :text="expr.text"
                  :translation="expr.translation"
                  :lightMode="true"
                  @click="selectedExpression = expr"
                />
              </div>
            </div>
            <LayoutTablePagination
              v-if="expressions.length > 0"
              class="mt-2"
              :current-page="currentPageExpr"
              :end-item="endItem"
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
          class="p-6 rounded-lg"
          :class="{
            'border-l-4 border-primary': selectedWord,
            'border-l-4 border-warning': selectedExpression,
            'bg-white': true,
          }"
          :word="selectedWord"
          :expression="selectedExpression"
          :type="selectedWord ? 'word' : 'expression'"
        />
      </div>
    </div>
  </div>
</template>
