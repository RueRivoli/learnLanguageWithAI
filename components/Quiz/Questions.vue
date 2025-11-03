<script setup lang="ts">
import type { GrammarRuleMeta } from "~/types/modules/grammar-rule";
import type { GrammarQuizQuestion } from "~/types/quizzes/quiz";
import type { VocabularyQuizQuestion } from "~/types/quizzes/vocabulary-quiz";
import type { ExpressionContent } from "~/types/vocabulary/expression";
import type { WordContent } from "~/types/vocabulary/word";
import { useQuiz } from "~/composables/useQuiz";

definePageMeta({
  layout: "quiz",
});

const emit = defineEmits(["submitQuiz"]);

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
  <div class="quiz-container">
    <!-- Main Quiz Section -->
    <div class="quiz-main">
      <div class="quiz-header">
        <div v-if="isQuizCompleted" class="back-button-container">
          <button @click="handleReturnToSubject" class="back-button">
            <svg
              class="back-icon"
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
        <div class="quiz-progress-indicator">
          <span class="quiz-section-name">{{ currentSection.name }}</span>
          <span class="quiz-counter">{{ currentSection.current }}</span>
          <span class="quiz-total">/ {{ currentSection.total }}</span>
        </div>
      </div>
      <div v-if="currentQuestion && !props.isLoading" class="quiz-content">
        <!-- Back to lessons button -->

        <!-- Question -->
        <div class="question-section">
          <h2 class="question-text">{{ currentQuestion.question }}</h2>
        </div>

        <!-- Answer Options -->
        <div class="options-section">
          <div class="options-grid">
            <button
              v-for="(option, index) in currentQuestionOptions"
              :key="index"
              @click="!isQuizCompleted ? selectAnswer(option) : null"
              :class="[
                'option-button',
                selectedAnswer === option ? 'selected' : '',
                isQuizCompleted ? 'completed-quiz' : '',
                isQuizCompleted &&
                index + 1 === Number(currentQuestion.correctAnswer)
                  ? 'correct-answer'
                  : '',
                isQuizCompleted &&
                index + 1 === getUserAnswer(currentQuestionIndex) &&
                index + 1 !== Number(currentQuestion.correctAnswer)
                  ? 'incorrect-answer'
                  : '',
              ]"
            >
              <span class="option-letter">{{
                String.fromCharCode(65 + index)
              }}</span>
              <span class="option-text">{{ option }}</span>
            </button>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="navigation-section">
          <!-- Previous Button (only in review mode) -->
          <button
            v-if="isQuizCompleted"
            @click="goToPreviousQuestionInReview()"
            :disabled="currentQuestionIndex <= 0"
            :class="[
              'nav-button prev-button',
              currentQuestionIndex <= 0 ? 'disabled' : '',
            ]"
          >
            <svg
              class="nav-icon"
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
            <span>Previous</span>
          </button>

          <!-- Next Button -->
          <button
            @click="
              isQuizCompleted ? goToNextQuestionInReview() : goToNextQuestion()
            "
            :disabled="!isQuizCompleted && !selectedAnswer"
            :class="[
              'nav-button next-button',
              !isQuizCompleted && !selectedAnswer ? 'disabled' : '',
            ]"
          >
            <span v-if="!isQuizCompleted && isLastQuestion">Finish Quiz</span>
            <span
              v-else-if="
                isQuizCompleted && currentQuestionIndex >= totalQuestions - 1
              "
              >Last Question</span
            >
            <span v-else>Next Question</span>
            <svg
              class="nav-icon"
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

      <!-- Loading State -->
      <div v-else-if="props.isLoading" class="loading-section">
        <div class="loading-spinner"></div>
        <p class="loading-text">Loading quiz...</p>
      </div>
    </div>

    <!-- Progress Sidebar - Calendar Style -->
    <div class="progress-sidebar">
      <div class="sidebar-header">
        <h3 class="sidebar-title">Quiz Progress</h3>
      </div>

      <div class="progress-section">
        <div class="">
          <LayoutKeyElementRuleBadge
            class="mb-4"
            :title="grammarRuleMetaData?.name"
            :titleEn="grammarRuleMetaData?.nameEn"
            :level="grammarRuleMetaData?.level"
            :symbol="grammarRuleMetaData?.symbol"
            size="xs"
            :lightMode="true"
          />
          <h4 class="progress-title">Grammar</h4>
        </div>

        <!-- Grammar Score -->
        <div v-if="isQuizCompleted" class="score-display">
          <span class="score-label">Score:</span>
          <span class="score-value">{{ grammarScore }}%</span>
        </div>

        <div class="progress-grid grammar-grid">
          <div
            v-for="(item, index) in grammarProgress"
            :key="index"
            @click="isQuizCompleted ? goToQuestion(item.questionIndex) : null"
            :class="[
              'progress-square',
              item.completed ? 'completed' : '',
              item.current ? 'current' : '',
              isQuizCompleted && item.correct === true ? 'correct' : '',
              isQuizCompleted && item.correct === false ? 'incorrect' : '',
              isQuizCompleted ? 'clickable' : '',
            ]"
          >
            {{ index + 1 }}
          </div>
        </div>
      </div>

      <div
        class="progress-section"
        v-if="props.type === 'full' || props.type === 'vocabulary'"
      >
        <h4 class="progress-title">Vocabulary</h4>

        <!-- Words Subsection -->
        <div class="progress-subsection">
          <div class="flex items-center justify-between">
            <h5 class="progress-subtitle">Words</h5>
            <!-- Words Score -->
            <div v-if="isQuizCompleted" class="score-display small">
              <span class="score-label">Score:</span>
              <span class="score-value">{{ wordsScore }}%</span>
            </div>
          </div>
          <div class="progress-grid words-grid">
            <div
              v-for="(item, index) in wordsProgress"
              :key="index"
              @click="isQuizCompleted ? goToQuestion(item.questionIndex) : null"
              :class="[
                'progress-square',
                item.completed ? 'completed' : '',
                item.current ? 'current' : '',
                isQuizCompleted && item.correct === true ? 'correct' : '',
                isQuizCompleted && item.correct === false ? 'incorrect' : '',
                isQuizCompleted ? 'clickable' : '',
              ]"
            >
              {{ index + 1 }}
            </div>
          </div>
        </div>

        <!-- Expressions Subsection -->
        <div class="progress-subsection">
          <div class="flex items-center justify-between">
            <h5 class="progress-subtitle">Expressions</h5>
            <!-- Expressions Score -->
            <div v-if="isQuizCompleted" class="score-display small">
              <span class="score-label">Score:</span>
              <span class="score-value">{{ expressionsScore }}%</span>
            </div>
          </div>
          <div class="progress-grid expressions-grid">
            <div
              v-for="(item, index) in expressionsProgress"
              :key="index"
              @click="isQuizCompleted ? goToQuestion(item.questionIndex) : null"
              :class="[
                'progress-square',
                item.completed ? 'completed' : '',
                item.current ? 'current' : '',
                isQuizCompleted && item.correct === true ? 'correct' : '',
                isQuizCompleted && item.correct === false ? 'incorrect' : '',
                isQuizCompleted ? 'clickable' : '',
              ]"
            >
              {{ index + 1 }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Container */
.quiz-container {
  min-height: 100vh;
  background: var(--color-primary);
  display: flex;
  font-family:
    "Inter",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    sans-serif;
  position: relative;
}

/* Subtle professional background pattern */
.quiz-container::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(
      circle at 25% 25%,
      rgba(255, 255, 255, 0.05) 0.5px,
      transparent 0.5px
    ),
    radial-gradient(
      circle at 75% 75%,
      rgba(255, 255, 255, 0.05) 0.5px,
      transparent 0.5px
    );
  background-size: 50px 50px;
  background-position:
    0 0,
    25px 25px;
  opacity: 0.5;
  pointer-events: none;
}

/* Main Quiz Section */
.quiz-main {
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

.quiz-header {
  width: 100%;
  margin-bottom: 2rem;
  text-align: center;
  position: relative;
}

.back-button-container {
  margin-bottom: 1.5rem;
  text-align: left;
}

.back-button {
  display: inline-flex;
  align-items: center;
  padding: 0.625rem 1.25rem;
  background: var(--color-base-100);
  color: var(--color-base-content);
  border: 1px solid var(--color-base-300);
  border-radius: var(--radius-field);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
}

.back-button:hover {
  background: var(--color-base-100);
  border-color: var(--color-primary);
}

.back-icon {
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
}

.quiz-progress-indicator {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.quiz-section-name {
  font-weight: 600;
  color: #ffffff;
  font-size: 1.2rem;
}

.quiz-counter {
  font-weight: 700;
  color: #ffffff;
  font-size: 1.4rem;
}

.quiz-total {
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
}

.quiz-content {
  width: 100%;
  max-width: 700px;
}

/* Question Section */
.question-section {
  margin-bottom: 3rem;
  text-align: center;
}

.question-text {
  font-size: 2rem;
  font-weight: 600;
  color: #ffffff;
  line-height: 1.4;
  margin: 0;
  letter-spacing: -0.025em;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Options Section */
.options-section {
  margin-bottom: 3rem;
}

.options-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  max-width: 600px;
  margin: 0 auto;
}

.option-button {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 1.25rem 1.5rem;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: left;
  width: 100%;
  min-height: 100px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.option-button::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(
      circle at 20% 80%,
      rgba(120, 119, 198, 0.03) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 20%,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 50%
    ),
    linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.option-button:hover {
  border-color: #d1d5db;
  transform: translateY(-2px);
  box-shadow:
    0 10px 25px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.option-button:hover::before {
  opacity: 1;
}

.option-button.selected {
  border-color: #f59e0b;
  background: linear-gradient(135deg, #f59e0b 0%, #fb923c 50%, #fbbf24 100%);
  color: white;
  box-shadow:
    0 10px 25px -3px rgba(245, 158, 11, 0.4),
    0 4px 6px -2px rgba(245, 158, 11, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

.option-button.selected::before {
  opacity: 1;
  background:
    radial-gradient(
      circle at 30% 70%,
      rgba(255, 255, 255, 0.15) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 70% 30%,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 50%
    );
}

.option-letter {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: #f3f4f6;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
  margin-right: 1rem;
  flex-shrink: 0;
}

.option-button.selected .option-letter {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.option-button.completed-quiz {
  cursor: default;
}

.option-button.correct-answer {
  background: linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%);
  border-color: #10b981;
  color: white;
  box-shadow:
    0 10px 25px -3px rgba(16, 185, 129, 0.4),
    0 4px 6px -2px rgba(16, 185, 129, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.option-button.correct-answer::before {
  opacity: 1;
  background:
    radial-gradient(
      circle at 30% 70%,
      rgba(255, 255, 255, 0.15) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 70% 30%,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 50%
    );
}

.option-button.correct-answer .option-letter {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.option-button.incorrect-answer {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%);
  border-color: #ef4444;
  color: white;
  box-shadow:
    0 10px 25px -3px rgba(239, 68, 68, 0.4),
    0 4px 6px -2px rgba(239, 68, 68, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.option-button.incorrect-answer::before {
  opacity: 1;
  background:
    radial-gradient(
      circle at 30% 70%,
      rgba(255, 255, 255, 0.15) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 70% 30%,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 50%
    );
}

.option-button.incorrect-answer .option-letter {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.option-text {
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.4;
  text-align: left;
  flex: 1;
}

/* Navigation Buttons */
.navigation-section {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.nav-button {
  display: inline-flex;
  align-items: center;
  padding: 0.875rem 2rem;
  background: var(--color-warning);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}

.nav-button:hover:not(.disabled) {
  background: var(--color-warning);
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(79, 70, 229, 0.4);
}

.nav-button.disabled {
  background: #9ca3af;
  cursor: not-allowed;
  box-shadow: none;
}

.prev-button {
  background: #6b7280;
  box-shadow: 0 4px 12px rgba(107, 114, 128, 0.3);
}

.prev-button:hover:not(.disabled) {
  background: #4b5563;
  box-shadow: 0 6px 16px rgba(107, 114, 128, 0.4);
}

.nav-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.next-button .nav-icon {
  margin-left: 0.5rem;
}

.prev-button .nav-icon {
  margin-right: 0.5rem;
}

/* Loading Section */
.loading-section {
  text-align: center;
  padding: 4rem 2rem;
}

.loading-spinner {
  width: 3rem;
  height: 3rem;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid #ffffff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

.loading-text {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  font-weight: 500;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Progress Sidebar - Calendar Inspired */
.progress-sidebar {
  width: 320px;
  background: var(--color-base-100);
  border-left: 1px solid var(--color-base-300);
  padding: 2rem;
  overflow-y: auto;
  position: relative;
}

.sidebar-header {
  margin-bottom: 2rem;
  text-align: center;
}

.sidebar-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
  letter-spacing: -0.025em;
}

.progress-section {
  margin-bottom: 2.5rem;
}

.progress-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 1rem 0;
  letter-spacing: -0.025em;
}

.progress-subsection {
  margin-bottom: 1.5rem;
}

.progress-subtitle {
  font-size: 0.95rem;
  font-weight: 500;
  color: #6b7280;
  margin: 0 0 0.75rem 0;
  letter-spacing: -0.015em;
}

/* Progress Grid - Calendar Style */
.progress-grid {
  display: grid;
  gap: 8px;
}

.grammar-grid {
  grid-template-columns: repeat(5, 1fr);
}

.words-grid {
  grid-template-columns: repeat(5, 1fr);
}

.expressions-grid {
  grid-template-columns: repeat(5, 1fr);
}

.progress-square {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 50%, #dce4ed 100%);
  color: #475569;
  border: 1px solid #cbd5e1;
  box-shadow:
    0 2px 4px -1px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.3),
    inset 0 -1px 0 rgba(148, 163, 184, 0.1);
  position: relative;
  overflow: hidden;
}

.progress-square::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(
      circle at 20% 80%,
      rgba(120, 119, 198, 0.02) 0%,
      transparent 50%
    ),
    linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.progress-square.completed:not(.correct):not(.incorrect) {
  background: linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%);
  color: white;
  border-color: #10b981;
  box-shadow:
    0 4px 8px -2px rgba(16, 185, 129, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.progress-square.completed:not(.correct):not(.incorrect)::before {
  opacity: 1;
  background:
    radial-gradient(
      circle at 30% 70%,
      rgba(255, 255, 255, 0.15) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 70% 30%,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 50%
    );
}

.progress-square.current {
  background: linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #8b5cf6 100%);
  color: white;
  border-color: #4f46e5;
  box-shadow:
    0 6px 12px -2px rgba(79, 70, 229, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

.progress-square.current::before {
  opacity: 1;
  background:
    radial-gradient(
      circle at 30% 70%,
      rgba(255, 255, 255, 0.15) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 70% 30%,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 50%
    );
}

.progress-square.correct {
  background: linear-gradient(
    135deg,
    #10b981 0%,
    #059669 50%,
    #047857 100%
  ) !important;
  color: white !important;
  border-color: #10b981 !important;
  box-shadow:
    0 4px 8px -2px rgba(16, 185, 129, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
}

.progress-square.correct::before {
  opacity: 1 !important;
  background:
    radial-gradient(
      circle at 30% 70%,
      rgba(255, 255, 255, 0.15) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 70% 30%,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 50%
    ) !important;
}

.progress-square.incorrect {
  background: linear-gradient(
    135deg,
    #ef4444 0%,
    #dc2626 50%,
    #b91c1c 100%
  ) !important;
  color: white !important;
  border-color: #ef4444 !important;
  box-shadow:
    0 4px 8px -2px rgba(239, 68, 68, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
}

.progress-square.incorrect::before {
  opacity: 1 !important;
  background:
    radial-gradient(
      circle at 30% 70%,
      rgba(255, 255, 255, 0.15) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 70% 30%,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 50%
    ) !important;
}

.progress-square.clickable {
  cursor: pointer;
}

.progress-square.clickable:hover {
  transform: scale(1.05);
  box-shadow:
    0 6px 16px -4px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.progress-square.clickable:hover::before {
  opacity: 1;
}

/* Score Display Styles */
.score-display {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  padding: 0.5rem 0.75rem;
  background: var(--color-base-200);
  border-radius: var(--radius-field);
  border: 1px solid var(--color-base-300);
}

.score-display.small {
  font-size: 0.875rem;
  padding: 0.375rem 0.5rem;
  margin-bottom: 0.5rem;
}

.score-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-base-content);
  opacity: 0.7;
}

.score-value {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-base-content);
}

.score-display.small .score-label {
  font-size: 0.75rem;
}

.score-display.small .score-value {
  font-size: 0.875rem;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .quiz-container {
    flex-direction: column;
  }

  .progress-sidebar {
    width: 100%;
    border-left: none;
    border-top: 1px solid var(--color-base-300);
    order: 2;
  }

  .quiz-main {
    order: 1;
  }
}

@media (max-width: 768px) {
  .quiz-main {
    padding: 1rem;
  }

  .question-text {
    font-size: 1.5rem;
  }

  .options-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
    max-width: 400px;
  }

  .option-button {
    padding: 1rem 1.25rem;
    min-height: 90px;
  }

  .option-text {
    font-size: 0.9rem;
  }

  .progress-sidebar {
    padding: 1rem;
  }

  .progress-square {
    width: 40px;
    height: 40px;
    font-size: 0.75rem;
  }
}
</style>
