<script setup lang="ts">
import type { ExpressionContent } from "~/types/expression";
import type {
  FormQuizState,
  QuizFetchedQuestion,
  QuizFormattedQuestion,
} from "~/types/quiz.ts";
import type { Word, WordContent } from "~/types/word";
import type { QuizQuestion } from "~/utils/learning/lesson-quiz";
import { parseQuizQuestion } from "~/utils/learning/quiz";
import { promptGeneratedVocabularyQuiz } from "../../prompts/vocabulary-quiz";
import { LayoutKeyElementRule } from "#components";
import { DIFFICULTY_LEVELS } from "~/utils/learning/grammar";

definePageMeta({
  layout: "quiz",
});
const vowelChangeMap = {
    // Front vowels (e, i, ö, ü)
    'e': ['i', 'ö', 'ü', 'a'],
    'i': ['e', 'ü', 'ö', 'ı'], 
    'ö': ['ü', 'e', 'i', 'o'],
    'ü': ['ö', 'i', 'e', 'u'],
    // Back vowels (a, ı, o, u)
    'a': ['ı', 'o', 'u', 'e'],
    'ı': ['a', 'o', 'u', 'i'],
    'o': ['u', 'a', 'ı', 'e'],
    'u': ['o', 'a', 'ı', 'e']
};
const consonantChangeMap = {
    'b': ['p', 'v', 'f'],
    'c': ['ç', 's', 'ş'],
    'd': ['t', 'v', 'b'],
    'ğ': ['k', 'h', 'g'],
    'h': ['g', 'ğ', 'k'],
    'k': ['c', 'q', 'ş'],
    'p': ['ç', 's', 'r'],
    't': ['ç', 's', 'd'],
    'v': ['p', 'b', 'ş'],
    'f': ['v', 's', 'c'],
    's': ['ç', 'c', 'ş'],
    'ş': ['ç', 's', 'c'],
    'z': ['ç', 's', 'ş'],
    'ç': ['c', 's', 'ş'],
    'x': ['y', 's', 'ş'],
    'q': ['l', 's', 'k'],
    'w': ['ç', 's', 'ş'],
    'y': ['ç', 's', 'ş'],
    'r': ['ç', 's', 'ş'],
    'l': ['p', 'v', 's'],
    'm': ['n', 'b', 'v'],
    'n': ['m', 't', 'd'],
    'j': ['g', 's', 't'],
};

const TOTAL_GRAMMAR_QUESTIONS = 5;

const route = useRoute();
const lessonId = String(route.params.lessonId);
const quizId = String(route.params.quizId);

const isLoading = ref<boolean>(true);
const isLoadingFetchingLessonVocabulary = ref<boolean>(true);
const grammarQuiz = ref<QuizQuestion[] | null>(null);
const formGrammarQuiz = ref<FormQuizState>({});
const wordsForQuiz = ref<WordContent[]>([]);
const expressionsForQuiz = ref<ExpressionContent[]>([]);
const wordsQuiz = ref<QuizQuestion[] | null>(null);
const formWordsQuiz = ref<FormQuizState>({});
const expressionsQuiz = ref<QuizQuestion[] | null>(null);
const formExpressionsQuiz = ref<FormQuizState>({});
const grammarRuleMetaData = ref<{level: 'beginner' | 'intermediate' | 'advanced' | 'expert', name: string} | null>(null);

const currentQuestionIndex = ref<number>(0);
const selectedAnswer = ref<string | null>(null);


const initializeGrammarFormQuiz = (questions: QuizFormattedQuestion[]): void => {
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

const initializeWordsFormQuiz = (questions: QuizQuestion[]): void => {

  formWordsQuiz.value = questions.reduce(
    (
      acc: FormQuizState,
      currentValue: QuizQuestion,
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

const initializeExpressionsFormQuiz = (questions: QuizQuestion[]): void => {

  formExpressionsQuiz.value = questions.reduce(
    (
      acc: FormQuizState,
      currentValue: QuizQuestion,
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
  if (data.value) {
    grammarRuleMetaData.value = {
      level: DIFFICULTY_LEVELS[data.value.turkish_grammar_rules.difficulty_class],
      name: data.value.turkish_grammar_rules.rule_name_translation,
    }
    wordsForQuiz.value.push(...(data.value.turkish_lesson_words || []).map((word: any) => word.turkish_words));
    expressionsForQuiz.value.push(...(data.value.turkish_lesson_expressions || []).map((expression: any) => expression.turkish_expressions));
  }
  isLoadingFetchingLessonVocabulary.value = false;
};

const getAdditionnalWordsForQuiz = async () => {
  const { data } = await $fetch(`/api/words/levels/random/?limit=2`, {
    method: "GET",
  });
  if (data) {
    wordsForQuiz.value.push(...(data.map((word: any) => word.turkish_words)));
  }
  isLoading.value = false;
};


const getAdditionnalExpressionsForQuiz = async () => {
  const data = await $fetch(`/api/expressions/levels/random/?limit=2`, {
    method: "GET",
  });
  if (data && (data as any).data) {
    expressionsForQuiz.value.push(...((data as any).data.map((expression: any) => expression.turkish_expressions)));
    isLoading.value = false;
    console.log("expressionsForQuiz", expressionsForQuiz.value);
   }
}

const getGrammarQuizData = async () => {
  const { data } = await useFetch(`/api/quizzes/${quizId}`, {
    transform: (quizQuestions: Array<QuizFetchedQuestion>) => {
      return quizQuestions.map((question) => parseQuizQuestion(question));
    },
  });
  console.log("questions", data.value);
  if (data.value) {
    grammarQuiz.value = data.value;
    initializeGrammarFormQuiz(data.value);
  }
  console.log("grammarQuiz", grammarQuiz.value);
  console.log("formGrammarQuiz", formGrammarQuiz.value);
  isLoading.value = false;
};


const getGeneratedVocabularyQuiz = async () => {
  const data  = await $fetch(`/api/generation/vocabulary-quiz/gpt/`, 
    {
      method: "POST",
      body: {
        message: promptGeneratedVocabularyQuiz(wordsForQuiz.value, expressionsForQuiz.value)
      }
    }
  );
  console.log("data", data);
  if (data) {
    console.log("generatedVocabularyQuiz", data);
    
    // Parse the JSON string into an objectn    
    const parsedData = JSON.parse(data);
    console.log("parsedData", parsedData);
    const wordsArray = [];
    if (parsedData.words) {
      for (let i = 1; i <= 20; i++) {
        const questionKey = `question${i}`;
        if (parsedData.words[questionKey]) {
          wordsArray.push({
            id: i, // Generate ID based on question number
            type: 1, 
            question: parsedData.words[questionKey].question,
            translation: parsedData.words[questionKey].translation,
            correctAnswer: parsedData.words[questionKey].correctAnswer,
            option1: parsedData.words[questionKey].option1,
            option2: parsedData.words[questionKey].option2,
            option3: parsedData.words[questionKey].option3,
            option4: parsedData.words[questionKey].option4
          });
        }
      }
    }
    console.log("wordsArray", wordsArray);
    wordsQuiz.value = wordsArray;
    console.log("wordsQuiz", wordsQuiz.value);
    initializeWordsFormQuiz(wordsQuiz.value);
    console.log("formWordsQuiz", formWordsQuiz.value);
    
    // Parse the expressions object into an array
    const expressionsArray = [];
    if (parsedData.expressions) {
      for (let i = 1; i <= 5; i++) {
        const questionKey = `question${i}`;
        if (parsedData.expressions[questionKey]) {
          expressionsArray.push({
            id: i,
            type: 1,
            question: parsedData.expressions[questionKey].question,
            translation: parsedData.expressions[questionKey].translation,
            correctAnswer: parsedData.expressions[questionKey].correctAnswer,
            option1: parsedData.expressions[questionKey].option1,
            option2: parsedData.expressions[questionKey].option2,
            option3: parsedData.expressions[questionKey].option3,
            option4: parsedData.expressions[questionKey].option4
          });
        }
      }
    }
    expressionsQuiz.value = expressionsArray;
    initializeExpressionsFormQuiz(expressionsQuiz.value);
    console.log("expressionsQuiz", expressionsQuiz.value);
    console.log("formExpressionsQuiz", formExpressionsQuiz.value);
  }
};

const currentQuestion = computed(() => {
  // Determine which section we're in based on current question index  
  const grammarLength = grammarQuiz.value?.length || 0;
  const wordsLength = wordsForQuiz.value?.length || 0;
  if (currentQuestionIndex.value < grammarLength) {
     // Grammar sectionn    
  return grammarQuiz.value?.[currentQuestionIndex.value] || null;
} else if (currentQuestionIndex.value < grammarLength + wordsLength) {
    // Words section
    const wordIndex = currentQuestionIndex.value - grammarLength;
    return wordsQuiz.value?.[wordIndex] || null;
  } else {
    // Expressions section
    const expressionIndex = currentQuestionIndex.value - grammarLength - wordsLength;
    return expressionsQuiz.value?.[expressionIndex] || null;
  }
});

const currentQuestionOptions = computed(() => {
  const question = currentQuestion.value;
  if (!question) return [];
  return [question.option1, question.option2, question.option3, question.option4];
});

const totalQuestions = computed(() => {
  return (grammarQuiz.value?.length || 0) + 
         (wordsForQuiz.value?.length || 0) + 
         (expressionsForQuiz.value?.length || 0);
});

// Determine current section and progress
const currentSection = computed(() => {
  console.log('currentSection: isGrammar, isVocabulary', isGrammarQuiz.value, isWordsQuiz.value, isExpressionsQuiz.value);
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
    const grammarCount = grammarQuiz.value?.length || 0;
    
    if (currentQuestionIndex.value < (grammarQuiz.value?.length || 0) + wordsCount) {
      return {
        name: 'Words',
        current: currentQuestionIndex.value - grammarCount + 1,
        total: wordsCount
      };
    } else {
      return {
        name: 'Expressions',
        current: currentQuestionIndex.value - wordsCount - grammarCount + 1,
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


const goToNextQuestion = () => {
  if (selectedAnswer.value) {
    // Store the answer in the correct form based on current sectionn    
    const optionIndex = currentQuestionOptions.value.findIndex(option => option === selectedAnswer.value);
    const selectedOptionNumber = optionIndex + 1;

    if (formGrammarQuiz.value[currentQuestionIndex.value + 1]) {
      formGrammarQuiz.value[currentQuestionIndex.value + 1].selectedOption = selectedOptionNumber;
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
  return currentQuestionIndex.value < (grammarQuiz.value?.length || 0);
});

const isWordsQuiz = computed(() => {
  return currentQuestionIndex.value >= (grammarQuiz.value?.length || 0) && currentQuestionIndex.value < (grammarQuiz.value?.length || 0) + (wordsForQuiz.value?.length || 0);
});
const isExpressionsQuiz = computed(() => {
  return currentQuestionIndex.value >= (grammarQuiz.value?.length || 0) + (wordsForQuiz.value?.length || 0) && currentQuestionIndex.value < (grammarQuiz.value?.length || 0) + (wordsForQuiz.value?.length || 0) + (expressionsForQuiz.value?.length || 0);
});

const isVocabularyQuiz = computed(() => {
  // For now, assume vocabulary quiz if not grammar
  // This can be enhanced based on my actual data structure
  return isWordsQuiz.value || isExpressionsQuiz.value;
});

// Dynamic progress tracking for separate quiz types
const grammarProgress = computed(() => {
  const progress = [];
  const totalGrammarQuestions = 5; // Display 5 squares for grammar
  
  for (let i = 0; i < totalGrammarQuestions; i++) {
      progress.push({
        completed: i < currentQuestionIndex.value,
        current: i === currentQuestionIndex.value,
      });
  }
  return progress;
});

const wordsProgress = computed(() => {
  const progress = [];
  
  for (let i = 0; i < wordsForQuiz.value.length; i++) {
    if (isVocabularyQuiz.value) {
      progress.push({
        completed: i + (grammarQuiz.value?.length || 0) < currentQuestionIndex.value,
        current: i + (grammarQuiz.value?.length || 0) === currentQuestionIndex.value, 
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
    if (isExpressionsQuiz.value) {
      progress.push({
        completed: i + (grammarQuiz.value?.length || 0) + (wordsForQuiz.value?.length || 0) < currentQuestionIndex.value,
        current: i + (grammarQuiz.value?.length || 0) + (wordsForQuiz.value?.length || 0) === currentQuestionIndex.value, 
      });
    } else {
      // If this is grammar quiz or word quiz, expressions section remains untouched (all gray)
      progress.push({
        completed: false,
        current: false,
      });
    }
  }
  return progress;
});

await getGrammarQuizData();
await getVocabularyFromLesson();
await getAdditionnalWordsForQuiz();
await getAdditionnalExpressionsForQuiz();
// await getGeneratedVocabularyQuiz();

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

        <!-- Answer Options -->
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
        <div class="flex items-center justify-between">
          <h4 class="progress-title">Grammar</h4>
          <LayoutKeyElementRule class="mb-4" :title="grammarRuleMetaData?.name" :level="grammarRuleMetaData?.level" size="xs" :prefix="false" />
        </div>
    
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


