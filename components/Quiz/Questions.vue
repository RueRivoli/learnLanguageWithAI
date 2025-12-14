<script setup lang="ts">
import type { GrammarRuleMeta } from "~/types/modules/grammar-rule";
import type { GrammarQuizQuestion } from "~/types/quizzes/quiz";
import type { VocabularyQuizQuestion } from "~/types/quizzes/vocabulary-quiz";
import type { ExpressionContent } from "~/types/vocabulary/expression";
import type { WordContent } from "~/types/vocabulary/word";
import { useQuiz } from "~/composables/useQuiz";
import {
  BookOpenIcon,
  LanguageIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
  Square2StackIcon,
} from "@heroicons/vue/24/outline";
import {
  getBackgroundClassFromGrammarRuleLevel,
  getLeftBorderStyleClassFromGrammarRuleLevel,
} from "~/utils/learning/grammar";

definePageMeta({
  layout: "full",
});

const emit = defineEmits(["submitQuiz"]);

const isReadingMode = ref<boolean>(false);
const router = useRouter();

const props = withDefaults(
  defineProps<{
    type: "full" | "vocabulary" | "grammar";
    // Lesson Id or Module Id
    subjetId: number | null;
    wordsForQuiz: WordContent[] | null;
    expressionsForQuiz: ExpressionContent[] | null;
    // List of questions for grammar, words, expressions quizzes
    grammarQuizQuestions: GrammarQuizQuestion[] | null;
    wordsQuizQuestions: VocabularyQuizQuestion[] | null;
    expressionsQuizQuestions: VocabularyQuizQuestion[] | null;
    grammarRuleMetaData: GrammarRuleMeta | null;
    isLoading: boolean;
  }>(),
  {
    type: "full",
    wordsForQuiz: null,
    expressionsForQuiz: null,
    grammarQuizQuestions: null,
    grammarRuleMetaData: null,
    wordsQuizQuestions: null,
    expressionsQuizQuestions: null,
    isLoading: false,
  },
);

const {
  currentQuestion,
  currentQuestionIndex,
  currentQuestionOptions,
  currentSection,
  expressionsProgress,
  expressionsScore,
  getUserAnswer,
  goToNextQuestion,
  goToNextQuestionInReview,
  goToPreviousQuestionInReview,
  goToQuestion,
  grammarProgress,
  grammarScore,
  isLastQuestion,
  isQuizCompleted,
  selectAnswer,
  selectedAnswer,
  totalQuestions,
  wordsProgress,
  wordsScore,
} = useQuiz(
  ref(props.grammarQuizQuestions),
  ref(props.wordsQuizQuestions),
  ref(props.expressionsQuizQuestions),
  ref(props.wordsForQuiz),
  ref(props.expressionsForQuiz),
  props.type,
  emit,
);

const handleReturnToSubject = () => {
  if (props.type === "full") {
    router.push(`/learning/lessons/${props.subjetId}`);
  } else {
    router.push(`/learning/modules/${props.subjetId}`);
  }
};
</script>

<template>
  <div class="min-h-screen bg-base-100">
    <div class="min-h-screen rounded-lg shadow-lg overflow-hidden">
      <div class="grid grid-cols-12">
        <!-- Left column -->
        <div class="col-span-3">
          <div class="row-span-1 p-6 border-b border-slate-200/70"><br /></div>
          <div
            class="pl-6 py-6 row-span-9 w-full sticky top-6 space-y-6 border-r border-slate-200/70"
          >
            <div class="space-y-4">
              <div v-if="isQuizCompleted">
                <button
                  @click="handleReturnToSubject"
                  class="btn btn-sm btn-outline"
                >
                  <svg
                    class="h-4 w-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  <span v-if="props.type === 'full'">Back to the Lesson</span>
                  <span v-else>Back to the Module</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Middle column (Main content) -->
        <div class="col-span-6">
          <div class="p-4 row-span-1 border-b border-l border-slate-200/70">
            <div class="w-full flex items-center justify-between gap-2">
              <LayoutBreadcrumbs
                :firstSection="{
                  title: `Lesson ${props.subjetId}`,
                  link: `/learning/lessons/${props.subjetId}`,
                }"
                :secondSection="{ title: 'Quiz', link: null }"
              />
              <button
                class="cursor-pointer"
                @click="isReadingMode = !isReadingMode"
                aria-label="Toggle reading mode"
              >
                <ArrowsPointingOutIcon
                  v-if="!isReadingMode"
                  class="h-5 w-5 text-neutral"
                />
                <ArrowsPointingInIcon v-else class="h-5 w-5 text-neutral" />
              </button>
            </div>
          </div>
          <div class="row-span-9">
            <div class="p-6">
              <div class="flex items-center justify-between mb-4">
                <div class="ml-2 flex items-center gap-2">
                  <span class="text-xl font-medium">{{
                    currentSection.name
                  }}</span>
                  <span class="text-xl font-semibold">{{
                    currentSection.current
                  }}</span>
                  <span class="text-slate-500"
                    >/ {{ currentSection.total }}</span
                  >
                </div>
                <LayoutKeyElementRuleBadge
                  v-if="currentSection.name === 'Grammar'"
                  class="w-60"
                  :title="grammarRuleMetaData?.name ?? null"
                  :titleEn="grammarRuleMetaData?.nameEn ?? null"
                  :level="grammarRuleMetaData?.level ?? null"
                  :symbol="grammarRuleMetaData?.symbol ?? null"
                  size="sm"
                  :lightMode="true"
                />
              </div>
              <!-- Content -->
              <div v-if="currentQuestion && !props.isLoading" class="space-y-6">
                <!-- Question -->
                <div
                  class="rounded-lg bg-white border border-slate-200/70 shadow-sm p-6"
                >
                  <h2 class="text-2xl text-slate-800 tracking-tight">
                    {{ currentQuestion.question }}
                  </h2>
                </div>

                <!-- Answer Options -->
                <div class="grid gap-3 md:grid-cols-2">
                  <button
                    v-for="(option, index) in currentQuestionOptions"
                    :key="index"
                    @click="!isQuizCompleted ? selectAnswer(option) : null"
                    class="w-full text-left cursor-pointer rounded-xl p-4 transition"
                    :class="
                      isQuizCompleted
                        ? index + 1 === Number(currentQuestion.correctAnswer)
                          ? 'bg-success border-success'
                          : index + 1 === getUserAnswer(currentQuestionIndex)
                            ? 'bg-error border-error'
                            : 'rounded-lg bg-white border border-slate-200/70 shadow-sm'
                        : selectedAnswer === option
                          ? 'bg-slate-200 border-slate-200/70'
                          : 'rounded-lg bg-white border border-slate-200/70 shadow-sm'
                    "
                    ,
                  >
                    <div class="flex items-center gap-3">
                      <div
                        class="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-100 text-slate-600"
                        :class="[
                          isQuizCompleted &&
                          index + 1 === Number(currentQuestion.correctAnswer)
                            ? 'bg-white/20'
                            : '',
                          isQuizCompleted &&
                          index + 1 === getUserAnswer(currentQuestionIndex) &&
                          index + 1 !== Number(currentQuestion.correctAnswer)
                            ? 'bg-white/20'
                            : '',
                        ]"
                      >
                        {{ String.fromCharCode(65 + index) }}
                      </div>
                      <div class="font-light">
                        {{ option }}
                      </div>
                    </div>
                  </button>
                </div>

                <!-- Navigation Buttons -->
                <div class="flex items-center justify-between">
                  <button
                    v-if="isQuizCompleted"
                    @click="goToPreviousQuestionInReview()"
                    class="btn btn-neutral"
                    :disabled="currentQuestionIndex <= 0"
                  >
                    <svg
                      class="h-4 w-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    Previous
                  </button>

                  <div class="flex-1"></div>

                  <button
                    @click="
                      isQuizCompleted
                        ? goToNextQuestionInReview()
                        : goToNextQuestion()
                    "
                    :disabled="!isQuizCompleted && !selectedAnswer"
                    class="btn btn-neutral"
                  >
                    <span v-if="!isQuizCompleted && isLastQuestion"
                      >Finish Quiz</span
                    >
                    <span
                      v-else-if="
                        isQuizCompleted &&
                        currentQuestionIndex >= totalQuestions - 1
                      "
                      >Last Question</span
                    >
                    <span v-else>Next Question</span>
                    <svg
                      class="h-4 w-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Loading -->
              <div
                v-else-if="props.isLoading"
                class="py-16 flex items-center justify-center"
              >
                <span
                  class="loading loading-spinner loading-lg text-neutral"
                ></span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right column (Progress) -->
        <div class="border-l border-slate-200/70 col-span-3">
          <div class="row-span-1 p-6 border-b border-slate-200/70"><br /></div>
          <div class="row-span-9 sticky top-6 space-y-6 p-6">
            <!-- Grammar -->
            <div class="space-y-3">
              <div class="mb-4 flex flex-wrap items-center justify-between">
                <div class="flex items-center gap-2">
                  <div
                    class="w-8 h-8 rounded-lg flex items-center justify-center mr-2 shadow-lg"
                    :class="
                      getBackgroundClassFromGrammarRuleLevel(
                        grammarRuleMetaData?.level ?? 0,
                      )
                    "
                  >
                    <Square2StackIcon class="h-4 w-4 text-white" />
                  </div>
                  <h3 class="text-lg">Module</h3>
                </div>
                <div
                  v-if="isQuizCompleted"
                  class="inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm"
                  :class="`${getBackgroundClassFromGrammarRuleLevel(grammarRuleMetaData?.level ?? 0)} text-white`"
                >
                  <span class="opacity-70">Score:</span>
                  <span class="font-semibold">{{ grammarScore }}%</span>
                </div>
              </div>
              <div class="grid grid-cols-5 gap-2">
                <button
                  v-for="(item, index) in grammarProgress"
                  :key="index"
                  @click="
                    isQuizCompleted ? goToQuestion(item.questionIndex) : null
                  "
                  class="w-10 h-10 cursor-pointer rounded-md text-sm text-cursor font-semibold flex items-center justify-center transition hover:opacity-80"
                  :class="
                    isQuizCompleted
                      ? item.current
                        ? 'bg-slate-200 border-slate-200/70'
                        : item.correct === true
                          ? 'bg-slate-200 border-slate-200/70 text-success/70'
                          : 'bg-slate-200 border-slate-200/70 text-error/70'
                      : item.current || item.completed
                        ? 'bg-slate-200 border-slate-200/70'
                        : 'rounded-lg bg-white border border-slate-200/70 shadow-sm'
                  "
                >
                  {{ index + 1 }}
                </button>
              </div>
            </div>
            <div class="p-4">
              <div class="dotted-divider"></div>
            </div>
            <!-- Vocabulary -->
            <div
              v-if="props.type === 'full' || props.type === 'vocabulary'"
              class="space-y-3"
            >
              <div class="mb-4 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div
                    class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-2 shadow-lg"
                  >
                    <BookOpenIcon class="h-4 w-4 text-white" />
                  </div>
                  <h3 class="text-lg">Words</h3>
                </div>
                <div
                  v-if="isQuizCompleted"
                  class="rounded-md bg-primary inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm text-white"
                >
                  <span class="opacity-70">Score:</span>
                  <span class="font-semibold">{{ wordsScore }}%</span>
                </div>
              </div>
              <div class="grid grid-cols-5 gap-2">
                <button
                  v-for="(item, index) in wordsProgress"
                  :key="index"
                  @click="
                    isQuizCompleted ? goToQuestion(item.questionIndex) : null
                  "
                  class="w-10 h-10 cursor-pointer rounded-md text-sm text-cursor font-semibold flex items-center justify-center transition hover:opacity-80"
                  :class="
                    isQuizCompleted
                      ? item.current
                        ? 'bg-slate-200 border-slate-200/70'
                        : item.correct === true
                          ? 'bg-slate-200 border-slate-200/70 text-success/70'
                          : 'bg-slate-200 border-slate-200/70 text-error/70'
                      : item.current || item.completed
                        ? 'bg-slate-200 border-slate-200/70'
                        : 'rounded-lg bg-white border border-slate-200/70 shadow-sm'
                  "
                >
                  {{ index + 1 }}
                </button>
              </div>
            </div>
            <div class="p-4">
              <div class="dotted-divider"></div>
            </div>
            <!-- Expressions -->
            <div
              v-if="props.type === 'full' || props.type === 'vocabulary'"
              class="space-y-3"
            >
              <div class="mb-4 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div
                    class="w-8 h-8 bg-warning rounded-lg flex items-center justify-center mr-2 shadow-lg"
                  >
                    <LanguageIcon class="h-4 w-4 text-white" />
                  </div>
                  <h3 class="text-lg">Expressions</h3>
                </div>
                <div
                  v-if="isQuizCompleted"
                  class="rounded-md bg-warning inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm text-white"
                >
                  <span class="opacity-70">Score:</span>
                  <span class="font-semibold">{{ expressionsScore }}%</span>
                </div>
              </div>
              <div class="grid grid-cols-5 gap-2">
                <button
                  v-for="(item, index) in expressionsProgress"
                  :key="index"
                  @click="
                    isQuizCompleted ? goToQuestion(item.questionIndex) : null
                  "
                  class="w-10 h-10 cursor-pointer rounded-md text-sm text-cursor font-semibold flex items-center justify-center transition hover:opacity-80"
                  :class="
                    isQuizCompleted
                      ? item.current
                        ? 'bg-slate-200 border-slate-200/70'
                        : item.correct === true
                          ? 'bg-slate-200 border-slate-200/70 text-success/70'
                          : 'bg-slate-200 border-slate-200/70 text-error/70'
                      : item.current || item.completed
                        ? 'bg-slate-200 border-slate-200/70'
                        : 'rounded-lg bg-white border border-slate-200/70 shadow-sm'
                  "
                >
                  {{ index + 1 }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Minimal local styles kept intentionally light; main styling via Tailwind/DaisyUI */

/* Larger, spaced dotted divider (slate-300 color) */
.dotted-divider {
  position: relative;
}
.dotted-divider::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 0;
  height: 6px; /* track height for better visibility */
  width: 80%; /* slightly wider but still centered */
  transform: translateX(-50%); /* center the dotted segment */
  /* Bigger dots with more spacing, using slate-300 (#cbd5e1) */
  background-image: radial-gradient(#cbd5e1 2px, transparent 2px);
  background-size: 14px 6px; /* increase spacing between dots */
  background-repeat: repeat-x;
  background-position: center bottom;
  /* Subtle fade on sides so it's less pronounced at the edges */
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 15%,
    black 85%,
    transparent 100%
  );
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 15%,
    black 85%,
    transparent 100%
  );
}
</style>
