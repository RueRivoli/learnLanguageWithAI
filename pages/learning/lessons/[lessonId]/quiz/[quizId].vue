<script setup lang="ts">
import type { ExpressionContent } from "~/types/vocabulary/expression";
import type {
  QuizFetchedQuestion,
  GrammarQuizQuestion,
  FormQuizState,
} from "~/types/quizzes/quiz";
import type { WordContent } from "~/types/vocabulary/word";
import { parseGrammarQuizQuestion } from "~/utils/learning/quiz";
import {
  promptGeneratedVocabularyQuiz,
  promptGeneratedWordQuiz,
  promptGeneratedExpressionQuiz,
} from "../../prompts/vocabulary-quiz";
import { DIFFICULTY_LEVELS } from "~/utils/learning/grammar";
import type { GrammarRuleMeta } from "~/types/modules/grammar-rule";
import {
  mockExpressionQuizQuestions,
  mockWordQuizQuestions,
} from "~/mockData/lessons/quiz/index";
import type { VocabularyQuizQuestion } from "~/types/quizzes/vocabulary-quiz";
import { parseVocabularyGeneratedQuiz } from "~/utils/quiz-creation/parse/generatedQuiz";
import {
  mockNotParsedExpressionQuizQuestions,
  mockNotParsedWordQuizQuestions,
} from "~/mockData/lessons/quiz/notparsed";
import type { DetailedResults } from "~/types/quizzes/quiz-result";
import { getAuthToken } from "~/utils/auth/auth";
import { CREDITS_FOR_ONE_QUIZ } from "~/utils/credits";

definePageMeta({
  layout: "quiz",
});

const route = useRoute();
const lessonId = Number(route.params.lessonId);
const quizId = Number(route.params.quizId);
const userStore = useUserStore();
const isLoadingQuiz = ref<boolean>(true);

// List of questions for grammar, words, expressions quizzes
const grammarQuizQuestions = ref<GrammarQuizQuestion[] | null>(null);
const wordsQuizQuestions = ref<VocabularyQuizQuestion[] | null>(null);
const expressionsQuizQuestions = ref<VocabularyQuizQuestion[] | null>(null);

// List of words and expressions to be used when generating vocabulary quizzes
const wordsForQuiz = ref<WordContent[]>([]);
const expressionsForQuiz = ref<ExpressionContent[]>([]);

// Information data about the targeted grammar rule to display in the quiz
const grammarRuleMetaData = ref<GrammarRuleMeta | null>(null);

// Results modal state
const showResultsModal = ref(false);
const myModalToGetCredits = ref<{
  openModal: () => void;
  closeModal: () => void;
} | null>(null);

const detailedResults = ref<DetailedResults | null>(null);
const globalScore = ref<number>(0);
const openResultsModal = () => {
  showResultsModal.value = true;
};
const closeResultsModal = () => {
  showResultsModal.value = false;
};

const openingModalId = ref(0);

const handleCancelModal = () => {
  myModalToGetCredits.value?.closeModal();
};

// Fetch lesson data
const getVocabularyFromLesson = async () => {
  const headers = await getAuthToken();
  const { data } = await useFetch(`/api/lessons/${lessonId}/vocabulary`, {
    headers,
  });
  if (data.value) {
    grammarRuleMetaData.value = {
      level: data.value.turkish_grammar_rules.difficulty_class,
      name: data.value.turkish_grammar_rules.rule_name,
      nameEn: data.value.turkish_grammar_rules.rule_name_translation,
      id: data.value.turkish_grammar_rules.id,
      symbol: data.value.turkish_grammar_rules.symbol,
    };
    wordsForQuiz.value.push(
      ...(data.value.turkish_lesson_words || []).map((word: any) => {
        return { ...word.turkish_words, isMastered: false };
      }),
    );
    expressionsForQuiz.value.push(
      ...(data.value.turkish_lesson_expressions || []).map(
        (expression: any) => {
          return { ...expression.turkish_expressions, isMastered: false };
        },
      ),
    );
  }
};

const getAdditionnalWordsForQuiz = async () => {
  const headers = await getAuthToken();
  const { data } = await $fetch(`/api/words/levels/random/?limit=2`, {
    method: "GET",
    headers,
  });
  if (data) {
    wordsForQuiz.value.push(
      ...data.map((word: any) => {
        return { ...word.turkish_words, isMastered: true };
      }),
    );
  }
};

const getAdditionnalExpressionsForQuiz = async () => {
  const headers = await getAuthToken();
  const data = await $fetch(`/api/expressions/levels/random/?limit=2`, {
    method: "GET",
    headers,
  });
  if (data && (data as any).data) {
    expressionsForQuiz.value.push(
      ...(data as any).data.map((expression: any) => {
        return { ...expression.turkish_expressions, isMastered: true };
      }),
    );
  }
};

const getGrammarQuizData = async () => {
  const headers = await getAuthToken();
  const { data } = await useFetch(`/api/quizzes/${quizId}`, {
    headers,
    transform: (quizQuestions: Array<QuizFetchedQuestion>) => {
      return quizQuestions.map((question) =>
        parseGrammarQuizQuestion(question),
      );
    },
  });
  if (data.value) {
    grammarQuizQuestions.value = data.value;
  }
};

const getGeneratedVocabularyQuiz = async () => {
  try {
    if (!userStore.isEnoughTokensForOneQuiz) {
      myModalToGetCredits.value?.openModal();
      return;
    }
    const headers = await getAuthToken();
    const generatedWordsQuiz = $fetch(
      `/api/generation/vocabulary-quiz/claude/words`,
      {
        method: "POST",
        headers,
        body: {
          message: promptGeneratedWordQuiz(wordsForQuiz.value),
        },
      },
    );

    const generatedExpressionsQuiz = $fetch(
      `/api/generation/vocabulary-quiz/claude/expressions`,
      {
        headers,
        method: "POST",
        body: {
          message: promptGeneratedExpressionQuiz(expressionsForQuiz.value),
        },
      },
    );

    // const generatedWordsQuiz = mockNotParsedWordQuizQuestions
    // const generatedExpressionsQuiz = mockNotParsedExpressionQuizQuestions

    const [wordsQuizResult, expressionsQuizResult] = await Promise.all([
      generatedWordsQuiz,
      generatedExpressionsQuiz,
    ]);
    if (wordsQuizResult) {
      // change generatedQuiz if using mock data
      wordsQuizQuestions.value = parseVocabularyGeneratedQuiz(wordsQuizResult);
      // wordsQuizQuestions.value = mockWordQuizQuestions;
    }

    if (expressionsQuizResult) {
      // change generatedQuiz if using mock data
      expressionsQuizQuestions.value = parseVocabularyGeneratedQuiz(
        expressionsQuizResult,
      );
      // expressionsQuizQuestions.value = mockExpressionQuizQuestions;
    }
    userStore.creditsUsageUpdate(CREDITS_FOR_ONE_QUIZ);
  } catch (error) {
    console.error("Error generating vocabulary quiz:", error);
    // Handle error appropriately - maybe set some default values or show error message
  }
};

const handleSubmitQuiz = async (results: {
  score: number;
  formGrammarQuiz: FormQuizState;
  detailedResults: DetailedResults;
}) => {
  detailedResults.value = results.detailedResults;
  const headers = await getAuthToken();
  await $fetch(`/api/quizzes/result/${quizId}`, {
    method: "PUT",
    headers,
    body: {
      userId: userStore.id,
      ruleId: grammarRuleMetaData.value?.id,
      score: results.score,
      detailedResults: results.detailedResults,
      // value: formQuiz.value,
    },
  });

  setTimeout(() => {
    openResultsModal();
  }, 200);
};

await Promise.all([
  getGrammarQuizData(),
  getVocabularyFromLesson(),
  getAdditionnalWordsForQuiz(),
  getAdditionnalExpressionsForQuiz(),
]);
await getGeneratedVocabularyQuiz();
isLoadingQuiz.value = false;
</script>

<template>
  <div>
    <!-- Skeleton Loader -->
    <div v-if="isLoadingQuiz" class="quiz-skeleton-container">
      <!-- Main Quiz Section Skeleton -->
      <div class="quiz-skeleton-main">
        <!-- Header Skeleton -->
        <div class="skeleton-header">
          <div class="skeleton-progress-indicator">
            <div class="skeleton-bar skeleton-section-name"></div>
            <div class="skeleton-bar skeleton-counter"></div>
          </div>
        </div>

        <div class="skeleton-content">
          <!-- Question Skeleton -->
          <div class="skeleton-question-section">
            <div class="skeleton-bar skeleton-question skeleton-shimmer"></div>
            <div
              class="skeleton-bar skeleton-question-secondary skeleton-shimmer"
            ></div>
          </div>

          <!-- Options Skeleton -->
          <div class="skeleton-options-grid">
            <div class="skeleton-option skeleton-shimmer">
              <div class="skeleton-option-letter"></div>
              <div class="skeleton-option-text">
                <div class="skeleton-bar skeleton-text-line"></div>
                <div class="skeleton-bar skeleton-text-line-short"></div>
              </div>
            </div>
            <div class="skeleton-option skeleton-shimmer">
              <div class="skeleton-option-letter"></div>
              <div class="skeleton-option-text">
                <div class="skeleton-bar skeleton-text-line"></div>
                <div class="skeleton-bar skeleton-text-line-short"></div>
              </div>
            </div>
            <div class="skeleton-option skeleton-shimmer">
              <div class="skeleton-option-letter"></div>
              <div class="skeleton-option-text">
                <div class="skeleton-bar skeleton-text-line"></div>
                <div class="skeleton-bar skeleton-text-line-short"></div>
              </div>
            </div>
            <div class="skeleton-option skeleton-shimmer">
              <div class="skeleton-option-letter"></div>
              <div class="skeleton-option-text">
                <div class="skeleton-bar skeleton-text-line"></div>
                <div class="skeleton-bar skeleton-text-line-short"></div>
              </div>
            </div>
          </div>

          <!-- Navigation Skeleton -->
          <div class="skeleton-navigation">
            <div class="skeleton-bar skeleton-button skeleton-shimmer"></div>
          </div>
        </div>

        <!-- Loading Status -->
        <div class="skeleton-loading-status">
          <div class="skeleton-spinner">
            <div class="spinner-ring"></div>
            <div class="spinner-ring spinner-ring-2"></div>
          </div>
          <p class="skeleton-loading-text">
            Preparing your personalized quiz...
          </p>
          <div class="skeleton-progress-bar">
            <div class="skeleton-progress-fill"></div>
          </div>
        </div>
      </div>

      <!-- Sidebar Skeleton -->
      <div class="quiz-skeleton-sidebar">
        <div class="skeleton-sidebar-header">
          <div
            class="skeleton-bar skeleton-sidebar-title skeleton-shimmer"
          ></div>
        </div>

        <!-- Grammar Section Skeleton -->
        <div class="skeleton-progress-section">
          <div
            class="skeleton-bar skeleton-section-title skeleton-shimmer"
          ></div>
          <div class="skeleton-progress-grid">
            <div
              v-for="i in 10"
              :key="`grammar-${i}`"
              class="skeleton-progress-square skeleton-shimmer"
            ></div>
          </div>
        </div>

        <!-- Vocabulary Section Skeleton -->
        <div class="skeleton-progress-section">
          <div
            class="skeleton-bar skeleton-section-title skeleton-shimmer"
          ></div>
          <!-- Words -->
          <div class="skeleton-subsection">
            <div
              class="skeleton-bar skeleton-subsection-title skeleton-shimmer"
            ></div>
            <div class="skeleton-progress-grid">
              <div
                v-for="i in 10"
                :key="`words-${i}`"
                class="skeleton-progress-square skeleton-shimmer"
              ></div>
            </div>
          </div>
          <!-- Expressions -->
          <div class="skeleton-subsection">
            <div
              class="skeleton-bar skeleton-subsection-title skeleton-shimmer"
            ></div>
            <div class="skeleton-progress-grid">
              <div
                v-for="i in 10"
                :key="`expressions-${i}`"
                class="skeleton-progress-square skeleton-shimmer"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <QuizQuestions
      v-else
      type="full"
      :wordsForQuiz="wordsForQuiz"
      :expressionsForQuiz="expressionsForQuiz"
      :grammarQuizQuestions="grammarQuizQuestions"
      :grammarRuleMetaData="grammarRuleMetaData"
      :wordsQuizQuestions="wordsQuizQuestions"
      :expressionsQuizQuestions="expressionsQuizQuestions"
      :subjetId="lessonId"
      :isLoading="isLoadingQuiz"
      @submitQuiz="(results) => handleSubmitQuiz(results)"
    />
    <!-- Results Modal -->
    <div v-if="showResultsModal" class="modal-overlay">
      <QuizModal
        :detailedResults="detailedResults"
        :grammarRuleMetaData="grammarRuleMetaData"
        :globalScore="globalScore"
        :showResultsModal="showResultsModal"
        type="full"
        @close="closeResultsModal"
      />
    </div>

    <AccountPaymentModal
      ref="myModalToGetCredits"
      @cancel="handleCancelModal"
    />
  </div>
</template>

<style scoped>
/* Results Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: modalFadeIn 0.3s ease-out;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* ===================================
   Skeleton Loader Styles
   =================================== */

/* Container */
.quiz-skeleton-container {
  min-height: 100vh;
  background: var(--color-base-200);
  display: flex;
  font-family:
    "Inter",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    sans-serif;
  position: relative;
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Subtle background pattern */
.quiz-skeleton-container::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(
      circle at 25% 25%,
      var(--color-primary) 0.5px,
      transparent 0.5px
    ),
    radial-gradient(
      circle at 75% 75%,
      var(--color-primary) 0.5px,
      transparent 0.5px
    );
  background-size: 50px 50px;
  background-position:
    0 0,
    25px 25px;
  opacity: 0.03;
  pointer-events: none;
}

/* Main Section */
.quiz-skeleton-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.skeleton-header {
  width: 100%;
  margin-bottom: 2rem;
  text-align: center;
}

.skeleton-progress-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.skeleton-section-name {
  width: 120px;
  height: 24px;
  border-radius: 6px;
}

.skeleton-counter {
  width: 60px;
  height: 28px;
  border-radius: 6px;
}

.skeleton-content {
  width: 100%;
  max-width: 700px;
}

/* Question Section Skeleton */
.skeleton-question-section {
  margin-bottom: 3rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.skeleton-question {
  width: 80%;
  height: 36px;
  border-radius: 8px;
}

.skeleton-question-secondary {
  width: 60%;
  height: 32px;
  border-radius: 8px;
}

/* Options Grid Skeleton */
.skeleton-options-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  max-width: 600px;
  margin: 0 auto 3rem;
}

.skeleton-option {
  display: flex;
  align-items: center;
  padding: 1.25rem 1.5rem;
  background: #ffffff;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  min-height: 100px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.skeleton-option-letter {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: #f3f4f6;
  margin-right: 1rem;
  flex-shrink: 0;
}

.skeleton-option-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.skeleton-text-line {
  width: 100%;
  height: 16px;
  border-radius: 4px;
  background: #f3f4f6;
}

.skeleton-text-line-short {
  width: 70%;
  height: 16px;
  border-radius: 4px;
  background: #f3f4f6;
}

/* Navigation Skeleton */
.skeleton-navigation {
  display: flex;
  justify-content: center;
}

.skeleton-button {
  width: 180px;
  height: 48px;
  border-radius: 12px;
}

/* Loading Status */
.skeleton-loading-status {
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.skeleton-spinner {
  position: relative;
  width: 60px;
  height: 60px;
}

.spinner-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 4px solid #e5e7eb;
  border-top-color: #4f46e5;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.spinner-ring-2 {
  border-top-color: #8b5cf6;
  animation: spin 1.5s linear infinite reverse;
  opacity: 0.5;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.skeleton-loading-text {
  font-size: 1rem;
  font-weight: 500;
  color: #6b7280;
  margin: 0;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.skeleton-progress-bar {
  width: 240px;
  height: 6px;
  background: #e5e7eb;
  border-radius: 3px;
  overflow: hidden;
}

.skeleton-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #4f46e5, #8b5cf6, #4f46e5);
  background-size: 200% 100%;
  animation: progressMove 1.5s ease-in-out infinite;
}

@keyframes progressMove {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* Sidebar Skeleton */
.quiz-skeleton-sidebar {
  width: 320px;
  background: var(--color-base-100);
  border-left: 1px solid var(--color-base-300);
  padding: 2rem;
  overflow-y: auto;
}

.skeleton-sidebar-header {
  margin-bottom: 2rem;
  text-align: center;
}

.skeleton-sidebar-title {
  width: 160px;
  height: 32px;
  border-radius: 8px;
  margin: 0 auto;
}

.skeleton-progress-section {
  margin-bottom: 2.5rem;
}

.skeleton-section-title {
  width: 120px;
  height: 24px;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.skeleton-subsection {
  margin-bottom: 1.5rem;
}

.skeleton-subsection-title {
  width: 80px;
  height: 20px;
  border-radius: 4px;
  margin-bottom: 0.75rem;
}

.skeleton-progress-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
}

.skeleton-progress-square {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
}

/* Shimmer Animation */
.skeleton-bar {
  background: linear-gradient(90deg, #f3f4f6 0%, #e5e7eb 50%, #f3f4f6 100%);
  background-size: 200% 100%;
}

.skeleton-shimmer {
  position: relative;
  overflow: hidden;
}

.skeleton-shimmer::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.6) 50%,
    transparent 100%
  );
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .quiz-skeleton-container {
    flex-direction: column;
  }

  .quiz-skeleton-sidebar {
    width: 100%;
    border-left: none;
    border-top: 1px solid var(--color-base-300);
  }
}

@media (max-width: 768px) {
  .quiz-skeleton-main {
    padding: 1rem;
  }

  .skeleton-options-grid {
    grid-template-columns: 1fr;
  }

  .skeleton-progress-square {
    width: 40px;
    height: 40px;
  }

  .quiz-skeleton-sidebar {
    padding: 1rem;
  }
}
</style>
