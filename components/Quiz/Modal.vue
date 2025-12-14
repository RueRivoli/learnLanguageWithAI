<script setup lang="ts">
import {
  ArrowLeftIcon,
  BookOpenIcon,
  LanguageIcon,
  ListBulletIcon,
  Square2StackIcon,
} from "@heroicons/vue/24/outline";
import type { DetailedResults, GrammarRuleMeta } from "~/types";
import {
  getBackgroundClassFromGrammarRuleLevel,
  getTextStyleClassFromGrammarRuleLevel,
  RuleDifficulty,
} from "~/utils/learning/grammar";

definePageMeta({
  layout: "authenticated",
});

const props = withDefaults(
  defineProps<{
    grammarRuleMetaData: GrammarRuleMeta | null;
    loading?: boolean;
    detailedResults?: DetailedResults | null;
    globalScore?: number | null;
    type: "grammar" | "vocabulary" | "full";
    display: "modal" | "layout";
  }>(),
  {
    type: "full",
    grammarRuleMetaData: null,
    loading: false,
    rule: null,
    detailedResults: null,
    globalScore: null,
    display: "modal",
  },
);
const greetingMessage = computed(() => {
  if (!props.globalScore) return `You scored some points!`;
  if (props.globalScore === 100) {
    return `Perfect !`;
  } else if (props.globalScore >= 90) {
    return `Close to perfection, some crazy results !`;
  } else if (props.globalScore >= 80) {
    return `Congratulations, your overall score is excellent !`;
  } else if (props.globalScore >= 70) {
    return `Some very good result here !`;
  } else if (props.globalScore >= 60) {
    return `You did a great job!`;
  } else if (props.globalScore >= 50) {
    return `Quite good!`;
  } else if (props.globalScore >= 40) {
    return `Promising!`;
  } else if (props.globalScore >= 30) {
    return `Not bad at all!`;
  } else if (props.globalScore >= 20) {
    return `You scored some points!`;
  } else if (props.globalScore >= 10) {
    return `Keep up fighting!`;
  } else if (props.globalScore >= 0) {
    return `Don't give up! You'll make it`;
  }
});

const congratulationsMessage = computed(() => {
  if (props.type === "grammar") {
    return `Well done ! You've accomplished ${props.detailedResults.grammar.percentage}% of success for the ${props.grammarRuleMetaData?.name}`;
  }
  const scores = [
    {
      type: "words",
      percentage: props.detailedResults.words.percentage,
      label: "word list",
    },
    {
      type: "expressions",
      percentage: props.detailedResults.expressions.percentage,
      label: "expression list",
    },
    {
      type: "grammar",
      percentage: props.detailedResults.grammar.percentage,
      label: "grammar rule",
    },
  ];

  // Find the maximum score
  const maxScore = Math.max(...scores.map((s) => s.percentage));
  const maxScoreItem = scores.find((s) => s.percentage === maxScore);

  // If overall score is at least 60%
  if (props.detailedResults.overall.percentage >= 60 && maxScoreItem) {
    if (maxScore >= 60) {
      return `Well done ! You've accomplished ${maxScore}% of success for the ${maxScoreItem.label}`;
    }
  }

  // If max score is between 40 and 60% (excluded)
  if (maxScore >= 40 && maxScore < 60) {
    const goodScores = scores.filter(
      (s) => s.percentage >= 40 && s.percentage < 60,
    );
    if (goodScores.length > 0) {
      const bestScore = goodScores.reduce((prev, current) =>
        prev.percentage > current.percentage ? prev : current,
      );
      return `Congratulations, you have accomplished a correct score: ${bestScore.percentage}% for the ${bestScore.label}`;
    }
  }

  // If no score is above 40%
  return "You've been through the lesson and are showing great effort, keep up the work !";
});

const emit = defineEmits(["close"]);
</script>
          <!-- :class="{ 'grammar-achievement__advanced': grammarRuleMetaData?.level === RuleDifficulty.ADVANCED, 'grammar-achievement__intermediate': grammarRuleMetaData?.level === RuleDifficulty.INTERMEDIATE, 'grammar-achievement__beginner': grammarRuleMetaData?.level === RuleDifficulty.BEGINNER }" -->
<template>
  <!-- Results Modal -->
  <div
    class="rounded-lg"
    :class="{ 'modal-container': props.display === 'modal' }"
    @click.stop
  >
    <!-- Modal Content -->
    <div class="p-3">
      <div class="mb-6 grid grid-cols-2 gap-6">
        <div
          class="overall-chart-bg relative overflow-hidden rounded-xl border border-slate-300 p-5 shadow"
        >
          <button
            v-if="props.display === 'modal'"
            @click="emit('close')"
            class="btn btn-circle btn-ghost btn-sm absolute top-3 right-3"
            aria-label="Close"
          >
            <svg
              class="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div>
              <div class="text-4xl font-extrabold text-slate-900">
                {{ props.detailedResults.overall.percentage }}%
              </div>
              <div class="text-xs uppercase tracking-wide text-slate-500">
                Overall Score
              </div>
              <p class="mt-2 text-sm text-slate-600">
                {{ congratulationsMessage }}
              </p>
            </div>
          </div>
        </div>
        <div
          class="overall-chart-bg relative overflow-hidden shadow-sm flex flex-col justify-between w-full p-6 border rounded-lg bg-gradient-to-br"
        >

          <div class="flex justify-between items-center mb-4">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="relative">
                  <div
                    class="w-8 h-8 rounded-lg flex items-center justify-center mr-2 shadow-lg"
                    :class="
                      getBackgroundClassFromGrammarRuleLevel(
                        grammarRuleMetaData?.level ?? 0,
                      )
                    "
                  >
                    <Square2StackIcon class="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>
              <div clas="flex items-center ml-3">
                <h3 class="text-base font-medium text-gray-900 mb-0.5">
                  Module
                </h3>
              </div>
            </div>
              <div
                class="text-2xl font-bold"
                :class="
                  getTextStyleClassFromGrammarRuleLevel(
                    grammarRuleMetaData?.level ?? 0,
                  )
                "
              >
                {{ props.detailedResults.grammar.percentage }}%
              </div>
          </div>
          <div>
            <LayoutKeyElementRuleBadge
              :title="grammarRuleMetaData?.name"
              :titleEn="grammarRuleMetaData?.nameEn"
              :level="grammarRuleMetaData?.level"
              :symbol="grammarRuleMetaData?.symbol"
              :light-mode="true"
              size="sm"
              :prefix="false"
            />
          </div>
        </div>
      </div>

      <div class="mb-3">
        <div v-if="props.type !== 'grammar'" class="grid grid-cols-2 gap-6">
          <!-- Words Chart -->
          <div class="p-6 flex flex-col justify-between border border-slate-200/70 rounded-lg overall-chart-bg">
            <div class="flex justify-between items-center mb-4">
              <div>
                <div class="flex items-center justify-between">
                  <div class="flex-shrink-0 mr-3">
                    <div class="relative">
                      <div
                        class="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-lg blur-sm"
                      />
                      <div
                        class="relative p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg"
                      >
                        <BookOpenIcon class="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </div>
                  <div class="flex-1">
                    <h3 class="text-base font-medium text-gray-900 mb-0.5">
                      Words Acquired
                    </h3>
                  </div>
                </div>
              </div>
              <div class="text-primary text-2xl font-bold">
                {{ props.detailedResults.words.percentage }}%
              </div>
            </div>
            <div class="flex items-center justify-center">
              <div class="progress-ring">
                <svg class="progress-ring-svg" width="100" height="100">
                  <defs>
                    <linearGradient
                      id="wordsGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop
                        offset="0%"
                        style="
                          stop-color: var(--color-primary);
                          stop-opacity: 1;
                        "
                      />
                      <stop
                        offset="100%"
                        style="
                          stop-color: var(--color-primary);
                          stop-opacity: 1;
                        "
                      />
                    </linearGradient>
                  </defs>
                  <circle
                    class="progress-ring-circle-bg"
                    cx="50"
                    cy="50"
                    r="40"
                  />
                  <circle
                    class="progress-ring-circle words"
                    cx="50"
                    cy="50"
                    r="40"
                    :stroke-dasharray="251"
                    :stroke-dashoffset="
                      251 - (251 * props.detailedResults.words.percentage) / 100
                    "
                  />
                </svg>
                <!-- <div class="progress-ring-text">{{ props.detailedResults.words.correct }}/{{ props.detailedResults.words.total }}</div> -->
                <div class="progress-ring-text">
                  <div class="flex items-baseline gap-1">
                    <span class="text-2xl font-bold text-gray-900">
                      {{ props.detailedResults.words.correct }}
                    </span>
                    <span class="text-base text-gray-500"
                      >/{{ props.detailedResults.words.total }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-col justify-between gap-2">
              <div>
                <div class="flex justify-between items-center">
                  <div class="text-gray-500 text-sm mb-1">Validated:</div>
                  <span class="text-primary font-medium"
                    >+{{
                      props.detailedResults.words.validatedList.length
                    }}</span
                  >
                </div>
                <div class="flex flex-wrap gap-2">
                  <div
                    v-for="word in props.detailedResults.words.validatedList"
                    :key="word"
                  >
                    <LayoutKeyElementWordBadge
                      :text="word.text"
                      :isMastered="word.isMastered"
                    />
                  </div>
                </div>
              </div>
              <div>
                <div class="flex justify-between items-center">
                  <div class="text-gray-500 text-sm mb-1">Invalidated:</div>
                  <span class="text-primary font-medium">{{
                    props.detailedResults.words.invalidatedList.length
                  }}</span>
                </div>
                <div class="flex flex-wrap gap-2">
                  <div
                    v-for="word in props.detailedResults.words.invalidatedList"
                    :key="word"
                  >
                    <LayoutKeyElementWordBadge
                      :text="word.text"
                      :isMastered="word.isMastered"
                    />
                  </div>
                </div>
              </div>
              <div v-if="props.display === 'modal'">
                <div class="flex justify-between items-center">
                  <div class="text-gray-500 text-sm mb-1">Note:</div>
                </div>
                <div class="text-xs text-gray-600">
                  *The quiz may include a few words already known because
                  repetition is the way to memorize
                </div>
              </div>
            </div>
          </div>
          <div
            class="p-6 flex flex-col justify-between border border-slate-200/70 rounded-lg overall-chart-bg"
          >
            <div class="flex justify-between items-center mb-4">
              <div class="chart-title">
                <div class="flex items-center justify-between">
                  <div class="flex-shrink-0 mr-3">
                    <div class="relative">
                      <div
                        class="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg blur-sm"
                      />
                      <div class="relative p-2 bg-warning rounded-lg shadow-lg">
                        <LanguageIcon class="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </div>
                  <div class="flex-1">
                    <h3 class="text-base font-medium text-gray-900 mb-0.5">
                      Expressions Acquired
                    </h3>
                  </div>
                </div>
              </div>
              <div class="text-warning text-2xl font-bold">
                {{ props.detailedResults.expressions.percentage }}%
              </div>
            </div>
            <div class="relative z-1">
              <div class="progress-ring">
                <svg class="progress-ring-svg" width="100" height="100">
                  <defs>
                    <linearGradient
                      id="expressionsGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        style="stop-color: #f59e0b; stop-opacity: 1"
                      />
                      <stop
                        offset="50%"
                        style="stop-color: #fbbf24; stop-opacity: 1"
                      />
                      <stop
                        offset="100%"
                        style="stop-color: #f59e0b; stop-opacity: 1"
                      />
                    </linearGradient>
                  </defs>
                  <circle
                    class="progress-ring-circle-bg"
                    cx="50"
                    cy="50"
                    r="40"
                  />
                  <circle
                    class="progress-ring-circle expressions"
                    cx="50"
                    cy="50"
                    r="40"
                    :stroke-dasharray="251"
                    :stroke-dashoffset="
                      251 -
                      (251 * props.detailedResults.expressions.percentage) / 100
                    "
                  />
                </svg>
                <!-- <div class="progress-ring-text">{{ props.detailedResults.expressions.correct }}/{{ props.detailedResults.expressions.total }}</div> -->
              </div>
              <div class="progress-ring-text">
                <div class="flex items-baseline gap-1">
                  <span class="text-2xl font-bold text-gray-900">
                    {{ props.detailedResults.expressions.correct }}
                  </span>
                  <span class="text-base text-gray-500"
                    >/{{ props.detailedResults.expressions.total }}</span
                  >
                </div>
              </div>
            </div>
            <div class="flex flex-col justify-between gap-2">
              <div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-500 text-sm mb-1">Validated:</span
                  ><span class="text-warning font-medium"
                    >+{{
                      props.detailedResults.expressions.validatedList.length
                    }}</span
                  >
                </div>
                <div class="flex flex-wrap gap-2">
                  <div
                    v-for="expression in props.detailedResults.expressions
                      .validatedList"
                    :key="expression"
                  >
                    <LayoutKeyElementExpressionBadge
                      :text="expression.text"
                      :isMastered="expression.isMastered"
                      :lightMode="true"
                    />
                  </div>
                </div>
              </div>

              <div>
                <div class="flex justify-between items-center">
                  <div class="text-gray-500 text-sm mb-1">Invalidated:</div>
                  <span class="text-warning font-medium">{{
                    props.detailedResults.expressions.invalidatedList.length
                  }}</span>
                </div>
                <div class="flex flex-wrap gap-2">
                  <div
                    v-for="expression in props.detailedResults.expressions
                      .invalidatedList"
                    :key="expression"
                  >
                    <LayoutKeyElementExpressionBadge
                      :text="expression.text"
                      :isMastered="expression.isMastered"
                      :lightMode="true"
                    />
                  </div>
                </div>
              </div>
              <div v-if="props.display === 'modal'">
                <div class="flex justify-between items-center">
                  <div class="text-gray-500 text-sm mb-1">Note:</div>
                </div>
                <div class="text-xs text-gray-600">
                  *The quiz may include a few expressions already known because
                  repetition is the way to memorize
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div
        v-if="props.display === 'modal'"
        class="mt-8 flex items-center justify-center gap-2"
      >
        <button
          class="btn-ghost px-4 py-2 text-sm font-medium cursor-pointer flex items-center gap-2"
          @click="$router.push(`/learning/stories/`)"
        >
          <ArrowLeftIcon class="h-5 w-5" />
          <span>Back To Lessons</span>
        </button>
        <button
          class="bg-primary hover:bg-primary/90 cursor-pointer text-white py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
          @click="emit('close')"
        >
          <ListBulletIcon class="h-5 w-5" />
          <span>See Answers</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-container {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  box-shadow:
    0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  max-width: 700px;
  width: 90%;
  max-height: 91vh;
  overflow-y: auto;
  position: relative;
  animation: modalSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.overall-chart-bg {
  background: linear-gradient(135deg, #ffffff 0%, color-mix(in oklch, var(--color-neutral) 20%, white) 100%);
  border: 1px solid #dbeafe;
}

/* Chart Background Colors */
.grammar-achievement__beginner {
  background: linear-gradient(135deg, #ffffff 0%, color-mix(in oklch, var(--color-success) 35%, white) 100%);
  border: 1px solid color-mix(in oklch, var(--color-success) 12%, white);
}

.grammar-achievement__intermediate {
  background: linear-gradient(135deg, #ffffff 0%, color-mix(in oklch, var(--color-info) 35%, white) 100%);
  border: 1px solid color-mix(in oklch, var(--color-info) 12%, white);
}

.grammar-achievement__advanced {
  background: linear-gradient(135deg, #ffffff 0%, color-mix(in oklch, var(--color-error) 35%, white) 100%);
  border: 1px solid color-mix(in oklch, var(--color-error) 12%, white);
}

.words-chart-bg {
  background: linear-gradient(135deg, #ffffff 0%, color-mix(in oklch, var(--color-primary-light) 40%, white) 100%);
  border: 1px solid color-mix(in oklch, var(--color-primary) 15%, white);
}

.expressions-chart-bg {
  background: linear-gradient(135deg, #ffffff 0%, #fef3c7 100%); /* amber-100 */
  border: 1px solid #fce7f3; /* amber-200 */
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-close-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 12px;
  background: rgba(239, 68, 68, 0.1);
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  z-index: 1;
}

.close-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #ef4444;
}

.score-circle {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  position: relative;
  z-index: 1;
}

.score-percentage {
  font-size: 1.75rem;
  font-weight: 800;
  color: white;
  line-height: 1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.grammar-chart-content {
  display: flex;
  align-items: center;
  justify-content: normal;
  gap: 1.5rem;
}

/* Vocabulary Charts - Side by Side */



.chart-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
  color: #374151;
  font-size: 1.1rem;
}

.progress-ring {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.progress-ring-svg {
  transform: rotate(-90deg);
}

.progress-ring-circle-bg {
  fill: none;
  stroke: #e5e7eb;
  stroke-width: 8;
}

.progress-ring-circle {
  fill: none;
  /* stroke: #4f46e5; */
  stroke-width: 8;
  stroke-linecap: round;
  transition: stroke-dashoffset 1s ease-in-out;
}

.progress-ring-circle.words {
  stroke: url(#wordsGradient);
}

.progress-ring-circle.expressions {
  stroke: url(#expressionsGradient);
}

.progress-ring-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.25rem;
  font-weight: 700;
  color: #374151;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
