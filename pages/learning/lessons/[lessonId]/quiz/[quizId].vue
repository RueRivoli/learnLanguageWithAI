<script setup lang="ts">
import type { ExpressionContent } from "~/types/expression";
import type { Lesson } from "~/types/lesson.ts";
import type {
  FormQuizState,
  QuizFetchedQuestion,
  QuizFormattedQuestion,
} from "~/types/quiz.ts";
import type { Word, WordContent } from "~/types/word";
import { parseQuizQuestion } from "~/utils/learning/quiz";

definePageMeta({
  layout: "authenticated",
});

const TOTAL_VOCABULARY_QUESTIONS = 15;
const TOTAL_GRAMMAR_QUESTIONS = 5;  
const TOTAL_WORDS_QUESTIONS = 12;
const TOTAL_EXPRESSIONS_QUESTIONS = 4;

const route = useRoute();
const lessonId = String(route.params.lessonId);
const quizId = String(route.params.quizId);

const isLoading = ref<boolean>(true);
const isLoadingFetchingLessonVocabulary = ref<boolean>(true);
const grammarQuiz = ref<any>(null);
const formGrammarQuiz = ref<FormQuizState>({});
const wordsForQuiz = ref<WordContent[]>([]);
const expressionsForQuiz = ref<ExpressionContent[]>([]);
const currentQuestionIndex = ref<number>(0);
const selectedAnswer = ref<string | null>(null);

const { data: lessonVocabulary } = await useFetch(`/api/lessons/${lessonId}/vocabulary`, {
  method: 'GET'
}).catch(() => ({ data: null }));

console.log("lessonVocabulary", lessonVocabulary);

const initializeFormQuiz = (questions: QuizFormattedQuestion[]): void => {
  formGrammarQuiz.value = questions.reduce(
    (
      acc: FormQuizState,
      currentValue: QuizFormattedQuestion,
      index: number,
    ) => {
      acc[index + 1] = {
        questionId: currentValue.id,
        selectedOption: null,
        correctAnswer: currentValue.correctAnswer,
      };
      return acc;
    },
    {},
  );
};

// Fetch lesson data
const getVocabularyFromLesson = async () => {
  isLoadingFetchingLessonVocabulary.value = true;
  const { data } = await useFetch(
    `/api/lessons/${lessonId}/vocabulary`,
  );
  console.log("getVocabularyFromLesson", data.value);
  if (data.value) {
    wordsForQuiz.value.push(...(data.value.turkish_lesson_words || []).map((word: any) => word.turkish_words));
    expressionsForQuiz.value.push(...(data.value.turkish_lesson_expressions || []).map((expression: any) => expression.turkish_expressions));
  }
  console.log("wordsForQuiz", wordsForQuiz.value);
  console.log("expressionsForQuiz", expressionsForQuiz.value);
  isLoadingFetchingLessonVocabulary.value = false;
};

const getAdditionnalWordsForQuiz = async () => {
  const { data } = await $fetch(`/api/words/levels/random/?limit=2`, {
    method: "GET",
  });
  if (data) {
    wordsForQuiz.value.push(...(data.map((word: any) => word.turkish_words)));
    console.log("wordsQuiz", data);
  }
  console.log("wordsForQuiz", wordsForQuiz.value);
  isLoading.value = false;
};


const getAdditionnalExpressionsForQuiz = async () => {
  const data = await $fetch(`/api/expressions/levels/random/?limit=2`, {
    method: "GET",
  });
  if (data && (data as any).data) {
    expressionsForQuiz.value.push(...((data as any).data.map((expression: any) => expression.turkish_expressions)));
    isLoading.value = false;
    console.log("expressionsForQuiz 2", expressionsForQuiz.value);
   }
}

const getQuizData = async () => {
  const { data } = await useFetch(`/api/quizzes/${quizId}`, {
    transform: (quizQuestions: Array<QuizFetchedQuestion>) => {
      return quizQuestions.map((question) => parseQuizQuestion(question));
    },
  });
  console.log("questions", data.value);
  if (data.value) {
    grammarQuiz.value = data.value;
    initializeFormQuiz(data.value);
  }
  console.log("grammarQuiz", grammarQuiz.value);
  console.log("formGrammarQuiz", formGrammarQuiz.value);
  isLoading.value = false;
};

const currentQuestion = computed(() => {
  return grammarQuiz.value?.[currentQuestionIndex.value] || null;
});

const currentQuestionOptions = computed(() => {
  return [grammarQuiz.value?.[currentQuestionIndex.value].option1, grammarQuiz.value?.[currentQuestionIndex.value].option2, grammarQuiz.value?.[currentQuestionIndex.value].option3, grammarQuiz.value?.[currentQuestionIndex.value].option4];
});

const totalQuestions = computed(() => {
  return grammarQuiz.value?.length || 0;
});

// Determine current section and progress
const currentSection = computed(() => {
  if (isGrammarQuiz.value) {
    return {
      name: 'Grammar',
      current: currentQuestionIndex.value + 1,
      total: TOTAL_GRAMMAR_QUESTIONS
    };
  } else if (isVocabularyQuiz.value) {
    // For vocabulary quizzes, determine if we're in words or expressions
    const wordsCount = wordsForQuiz.value.length;
    const expressionsCount = expressionsForQuiz.value.length;
    
    if (currentQuestionIndex.value < wordsCount) {
      return {
        name: 'Words',
        current: currentQuestionIndex.value + 1,
        total: wordsCount
      };
    } else {
      return {
        name: 'Expressions',
        current: currentQuestionIndex.value - wordsCount + 1,
        total: expressionsCount
      };
    }
  }
  
  return { name: '', current: 0, total: 0 };
});

// Determine if we're at the last question of the entire quiz
const isLastQuestion = computed(() => {
  return currentQuestionIndex.value >= totalQuestions.value - 1;
});

// Determine if we're at the end of grammar section (for vocabulary quizzes)
const isEndOfGrammarSection = computed(() => {
  if (isGrammarQuiz.value) {
    return currentQuestionIndex.value >= TOTAL_GRAMMAR_QUESTIONS - 1;
  }
  return false;
});

const goToNextQuestion = () => {
  if (selectedAnswer.value) {
    // Store the answer
    if (formGrammarQuiz.value[currentQuestionIndex.value + 1]) {
      // Convert option string to option number (1-4 based on current options)
      const optionIndex = currentQuestionOptions.value.findIndex(option => option === selectedAnswer.value);
      formGrammarQuiz.value[currentQuestionIndex.value + 1].selectedOption = optionIndex + 1;
    }
    
    if (currentQuestionIndex.value < totalQuestions.value - 1) {
      currentQuestionIndex.value++;
      selectedAnswer.value = null;
    } else {
      // Quiz finished - handle completion
      console.log("Quiz completed!", formGrammarQuiz.value);
    }
  }
};

const selectAnswer = (option: string) => {
  selectedAnswer.value = option;
};

// Determine quiz type based on quiz data structure
const isGrammarQuiz = computed(() => {
  // If quiz has grammar rule data, it's a grammar quiz
  return grammarQuiz.value?.[0]?.grammarRuleId != null;
});

const isVocabularyQuiz = computed(() => {
  // For now, assume vocabulary quiz if not grammar
  // This can be enhanced based on my actual data structure
  return !isGrammarQuiz.value;
});

// Dynamic progress tracking for separate quiz types
const grammarProgress = computed(() => {
  const progress = [];
  const totalGrammarQuestions = 5; // Display 5 squares for grammar
  
  for (let i = 0; i < totalGrammarQuestions; i++) {
    if (isGrammarQuiz.value) {
      // Show progress only if this is a grammar quiz
      progress.push({
        completed: i < currentQuestionIndex.value,
        current: i === currentQuestionIndex.value,
      });
    } else {
      // If this is vocabulary quiz, grammar section remains untouched (all gray)
      progress.push({
        completed: false,
        current: false,
      });
    }
  }
  return progress;
});

const wordsProgress = computed(() => {
  const progress = [];
  
  for (let i = 0; i < wordsForQuiz.value.length; i++) {
    if (isVocabularyQuiz.value) {
      // Show progress only if this is a vocabulary quiz
      const questionsPerSquare = Math.max(1, Math.floor(totalQuestions.value / TOTAL_VOCABULARY_QUESTIONS));
      const questionIndex = i * questionsPerSquare;
      progress.push({
        completed: questionIndex < currentQuestionIndex.value,
        current: questionIndex === currentQuestionIndex.value || 
                 (i === Math.floor(currentQuestionIndex.value / questionsPerSquare) && questionIndex <= currentQuestionIndex.value),
      });
    } else {
      // If this is grammar quiz, words section remains untouched (all gray)
      progress.push({
        completed: false,
        current: false,
      });
    }
  }
  return progress;
});

const expressionsProgress = computed(() => {
  const progress = [];
  
  for (let i = 0; i < expressionsForQuiz.value.length; i++) {
    if (isVocabularyQuiz.value) {
      // Show progress only if this is a vocabulary quiz
      // Expressions come after words in the quiz sequence
      const questionsPerSquare = Math.max(1, Math.floor(totalQuestions.value / TOTAL_VOCABULARY_QUESTIONS));
      const questionIndex = (TOTAL_WORDS_QUESTIONS + i) * questionsPerSquare;
      progress.push({
        completed: questionIndex < currentQuestionIndex.value,
        current: questionIndex === currentQuestionIndex.value || 
                 (i === Math.floor((currentQuestionIndex.value - TOTAL_WORDS_QUESTIONS) / questionsPerSquare) && questionIndex <= currentQuestionIndex.value),
      });
    } else {
      // If this is grammar quiz, expressions section remains untouched (all gray)
      progress.push({
        completed: false,
        current: false,
      });
    }
  }
  return progress;
});

await getQuizData();
await getVocabularyFromLesson();
await getAdditionnalWordsForQuiz();
await getAdditionnalExpressionsForQuiz();
// Page title
useHead({
  title: `Quiz ${quizId} - Lesson ${lessonId}`,
});

</script>

<template>
  <div class="quiz-container">
    <!-- Main Quiz Section -->
    <div class="quiz-main">
      <div class="quiz-header">
        <div class="quiz-progress-indicator">
          <span class="quiz-section-name">{{ currentSection.name }}</span>
          <span class="quiz-counter">{{ currentSection.current }}</span>
          <span class="quiz-total">/ {{ currentSection.total }}</span>
        </div>
      </div>

      <div v-if="currentQuestion && !isLoading" class="quiz-content">
        <!-- Question -->
        <div class="question-section">
          <h2 class="question-text">{{ currentQuestion.question }}</h2>
        </div>

        <!-- Answer Options -->{{ currentQuestion.options }}
        <div class="options-section">
          <div class="options-grid">
            <button
              v-for="(option, index) in currentQuestionOptions"
              :key="index"
              @click="selectAnswer(option)"
              :class="[
                'option-button',
                selectedAnswer === option ? 'selected' : ''
              ]"
            >
              <span class="option-letter">{{ String.fromCharCode(65 + index) }}</span>
              <span class="option-text">{{ option }}</span>
            </button>
          </div>
        </div>

        <!-- Next Button -->
        <div class="next-section">
          <button
            @click="goToNextQuestion"
            :disabled="!selectedAnswer"
            :class="[
              'next-button',
              !selectedAnswer ? 'disabled' : ''
            ]"
          >
            <span v-if="isLastQuestion">Finish Quiz</span>
            <span v-else>Next Question</span>
            <svg class="next-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-else-if="isLoading" class="loading-section">
        <div class="loading-spinner"></div>
        <p class="loading-text">Loading quiz...</p>
      </div>
    </div>

    <!-- Progress Sidebar - Calendar Style -->
    <div class="progress-sidebar">
      <div class="sidebar-header">
        <h3 class="sidebar-title">Progress</h3>
      </div>

      <div class="progress-section">
        <h4 class="progress-title">Grammar</h4>
        <div class="progress-grid grammar-grid">
          <div
            v-for="(item, index) in grammarProgress"
            :key="index"
            :class="[
              'progress-square',
              item.completed ? 'completed' : '',
              item.current ? 'current' : ''
            ]"
          >
            {{ index + 1 }}
          </div>
        </div>
      </div>

      <div class="progress-section">
        <h4 class="progress-title">Vocabulary</h4>
        
        <!-- Words Subsection -->
        <div class="progress-subsection">
          <h5 class="progress-subtitle">Words</h5>
          <div class="progress-grid words-grid">
            <div
              v-for="(item, index) in wordsProgress"
              :key="index"
              :class="[
                'progress-square',
                item.completed ? 'completed' : '',
                item.current ? 'current' : ''
              ]"
            >
              {{ index + 1 }}
            </div>
          </div>
        </div>

        <!-- Expressions Subsection -->
        <div class="progress-subsection">
          <h5 class="progress-subtitle">Expressions</h5>
          <div class="progress-grid expressions-grid">
            <div
              v-for="(item, index) in expressionsProgress"
              :key="index"
              :class="[
                'progress-square',
                item.completed ? 'completed' : '',
                item.current ? 'current' : ''
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
  background: #f8f9fa;
  display: flex;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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
}

.quiz-header {
  width: 100%;
  margin-bottom: 2rem;
  text-align: center;
}

.quiz-progress-indicator {
  font-size: 1.1rem;
  color: #6b7280;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.quiz-section-name {
  font-weight: 600;
  color: #374151;
  font-size: 1.2rem;
}

.quiz-counter {
  font-weight: 700;
  color: #4f46e5;
  font-size: 1.4rem;
}

.quiz-total {
  font-weight: 500;
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
  color: #1f2937;
  line-height: 1.4;
  margin: 0;
  letter-spacing: -0.025em;
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
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  width: 100%;
  min-height: 100px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.option-button:hover {
  border-color: #d1d5db;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.option-button.selected {
  border-color: #4f46e5;
  background: #4f46e5;
  color: white;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
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

.option-text {
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.4;
  text-align: left;
  flex: 1;
}

/* Next Button */
.next-section {
  text-align: center;
}

.next-button {
  display: inline-flex;
  align-items: center;
  padding: 0.875rem 2rem;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}

.next-button:hover:not(.disabled) {
  background: #4338ca;
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(79, 70, 229, 0.4);
}

.next-button.disabled {
  background: #9ca3af;
  cursor: not-allowed;
  box-shadow: none;
}

.next-icon {
  width: 1.25rem;
  height: 1.25rem;
  margin-left: 0.5rem;
}

/* Loading Section */
.loading-section {
  text-align: center;
  padding: 4rem 2rem;
}

.loading-spinner {
  width: 3rem;
  height: 3rem;
  border: 3px solid #e5e7eb;
  border-top: 3px solid #4f46e5;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

.loading-text {
  color: #6b7280;
  font-size: 1.1rem;
  font-weight: 500;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Progress Sidebar - Calendar Inspired */
.progress-sidebar {
  width: 320px;
  background: white;
  border-left: 1px solid #e5e7eb;
  padding: 2rem;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.05);
  overflow-y: auto;
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
  transition: all 0.2s ease;
  background: #f9fafb;
  color: #6b7280;
  border: 1px solid #e5e7eb;
}



.progress-square.completed {
  background: #10b981;
  color: white;
  border-color: #10b981;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
}

.progress-square.current {
  background: #4f46e5;
  color: white;
  border-color: #4f46e5;
  box-shadow: 0 2px 8px rgba(79, 70, 229, 0.4);
  transform: scale(1.05);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .quiz-container {
    flex-direction: column;
  }
  
  .progress-sidebar {
    width: 100%;
    border-left: none;
    border-top: 1px solid #e5e7eb;
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


