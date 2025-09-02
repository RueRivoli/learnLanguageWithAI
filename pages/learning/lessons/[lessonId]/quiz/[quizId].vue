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
import { mockData } from "../../mockData";

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
const isQuizCompleted = ref<boolean>(false);
const viewingCompletedQuestion = ref<boolean>(false);


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
  // const data  = await $fetch(`/api/generation/vocabulary-quiz/gpt/`, 
  //   {
  //     method: "POST",
  //     body: {
  //       message: promptGeneratedVocabularyQuiz(wordsForQuiz.value, expressionsForQuiz.value)
  //     }
  //   }
  // );
  const data = mockData;
  
  console.log("data", data);
  if (data) {
    console.log("generatedVocabularyQuiz", data);
    
    // Parse the JSON string into an objectn    
    // const parsedData = JSON.parse(data);
    const parsedData = mockData;
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
    // Store the answer in the correct form based on current section
    const optionIndex = currentQuestionOptions.value.findIndex(option => option === selectedAnswer.value);
    const selectedOptionNumber = optionIndex + 1;

    // Store answer in the appropriate form based on current section
    if (isGrammarQuiz.value && formGrammarQuiz.value[currentQuestionIndex.value + 1]) {
      formGrammarQuiz.value[currentQuestionIndex.value + 1].selectedOption = selectedOptionNumber;
    } else if (isWordsQuiz.value && formWordsQuiz.value[currentQuestionIndex.value - (grammarQuiz.value?.length || 0) + 1]) {
      formWordsQuiz.value[currentQuestionIndex.value - (grammarQuiz.value?.length || 0) + 1].selectedOption = selectedOptionNumber;
    } else if (isExpressionsQuiz.value && formExpressionsQuiz.value[currentQuestionIndex.value - (grammarQuiz.value?.length || 0) - (wordsForQuiz.value?.length || 0) + 1]) {
      formExpressionsQuiz.value[currentQuestionIndex.value - (grammarQuiz.value?.length || 0) - (wordsForQuiz.value?.length || 0) + 1].selectedOption = selectedOptionNumber;
    }

    if (currentQuestionIndex.value < totalQuestions.value - 1) {
      currentQuestionIndex.value++;
      selectedAnswer.value = null;
    } else {
      // Quiz finished - handle completion
      isQuizCompleted.value = true;
      console.log("Quiz completed!", { formGrammarQuiz: formGrammarQuiz.value, formWordsQuiz: formWordsQuiz.value, formExpressionsQuiz: formExpressionsQuiz.value });
    }
  }
};

const selectAnswer = (option: string) => {
  selectedAnswer.value = option;
};

// Navigation function to go to specific question
const goToQuestion = (questionIndex: number) => {
  if (isQuizCompleted.value) {
    currentQuestionIndex.value = questionIndex;
    viewingCompletedQuestion.value = true;
    
    // Set the selected answer to show which option the user chose
    const userAnswer = getUserAnswer(questionIndex);
    if (userAnswer !== null) {
      const question = currentQuestion.value;
      if (question) {
        const options = [question.option1, question.option2, question.option3, question.option4];
        selectedAnswer.value = options[userAnswer - 1] || null;
      }
    } else {
      selectedAnswer.value = null;
    }
  }
};

// Navigation function for review mode
const goToNextQuestionInReview = () => {
  if (isQuizCompleted.value && currentQuestionIndex.value < totalQuestions.value - 1) {
    currentQuestionIndex.value++;
    
    // Set the selected answer to show which option the user chose
    const userAnswer = getUserAnswer(currentQuestionIndex.value);
    if (userAnswer !== null) {
      const question = currentQuestion.value;
      if (question) {
        const options = [question.option1, question.option2, question.option3, question.option4];
        selectedAnswer.value = options[userAnswer - 1] || null;
      }
    } else {
      selectedAnswer.value = null;
    }
  }
};

const goToPreviousQuestionInReview = () => {
  if (isQuizCompleted.value && currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
    
    // Set the selected answer to show which option the user chose
    const userAnswer = getUserAnswer(currentQuestionIndex.value);
    if (userAnswer !== null) {
      const question = currentQuestion.value;
      if (question) {
        const options = [question.option1, question.option2, question.option3, question.option4];
        selectedAnswer.value = options[userAnswer - 1] || null;
      }
    } else {
      selectedAnswer.value = null;
    }
  }
};

// Calculate scores for each section
const grammarScore = computed(() => {
  if (!grammarQuiz.value || !formGrammarQuiz.value) return 0;
  let correct = 0;
  let total = 0;
  
  Object.values(formGrammarQuiz.value).forEach((answer, index) => {
    if (answer.selectedOption !== null) {
      total++;
      if (Number(answer.selectedOption) === Number(answer.correctAnswer)) {
        correct++;
      }
    }
  });
  
  return total > 0 ? Math.round((correct / total) * 100) : 0;
});

const wordsScore = computed(() => {
  if (!wordsQuiz.value || !formWordsQuiz.value) return 0;
  let correct = 0;
  let total = 0;
  
  Object.values(formWordsQuiz.value).forEach((answer) => {
    if (answer.selectedOption !== null) {
      total++;
      if (Number(answer.selectedOption) === Number(answer.correctAnswer)) {
        correct++;
      }
    }
  });
  
  return total > 0 ? Math.round((correct / total) * 100) : 0;
});

const expressionsScore = computed(() => {
  if (!expressionsQuiz.value || !formExpressionsQuiz.value) return 0;
  let correct = 0;
  let total = 0;
  
  Object.values(formExpressionsQuiz.value).forEach((answer) => {
    if (answer.selectedOption !== null) {
      total++;
      if (Number(answer.selectedOption) === Number(answer.correctAnswer)) {
        correct++;
      }
    }
  });
  
  return total > 0 ? Math.round((correct / total) * 100) : 0;
});

const globalScore = computed(() => {
  const grammarTotal = Object.values(formGrammarQuiz.value).filter(a => a.selectedOption !== null).length;
  const wordsTotal = Object.values(formWordsQuiz.value).filter(a => a.selectedOption !== null).length;
  const expressionsTotal = Object.values(formExpressionsQuiz.value).filter(a => a.selectedOption !== null).length;
  
  const totalQuestions = grammarTotal + wordsTotal + expressionsTotal;
  if (totalQuestions === 0) return 0;
  
  const totalCorrect = 
    Object.values(formGrammarQuiz.value).filter(a => a.selectedOption !== null && Number(a.selectedOption) === Number(a.correctAnswer)).length +
    Object.values(formWordsQuiz.value).filter(a => a.selectedOption !== null && Number(a.selectedOption) === Number(a.correctAnswer)).length +
    Object.values(formExpressionsQuiz.value).filter(a => a.selectedOption !== null && Number(a.selectedOption) === Number(a.correctAnswer)).length;
  
  return Math.round((totalCorrect / totalQuestions) * 100);
});

// Check if a specific question was answered correctly
const isQuestionCorrect = (questionIndex: number) => {
  const grammarLength = grammarQuiz.value?.length || 0;
  const wordsLength = wordsForQuiz.value?.length || 0;
  
  if (questionIndex < grammarLength) {
    const formIndex = questionIndex + 1;
    const answer = formGrammarQuiz.value[formIndex];
    return answer && answer.selectedOption !== null && Number(answer.selectedOption) === Number(answer.correctAnswer);
  } else if (questionIndex < grammarLength + wordsLength) {
    const formIndex = questionIndex - grammarLength + 1;
    const answer = formWordsQuiz.value[formIndex];
    return answer && answer.selectedOption !== null && Number(answer.selectedOption) === Number(answer.correctAnswer);
  } else {
    const formIndex = questionIndex - grammarLength - wordsLength + 1;
    const answer = formExpressionsQuiz.value[formIndex];
    return answer && answer.selectedOption !== null && Number(answer.selectedOption) === Number(answer.correctAnswer);
  }
};

// Get user's selected answer for a question
const getUserAnswer = (questionIndex: number) => {
  const grammarLength = grammarQuiz.value?.length || 0;
  const wordsLength = wordsForQuiz.value?.length || 0;
  
  if (questionIndex < grammarLength) {
    const formIndex = questionIndex + 1;
    const answer = formGrammarQuiz.value[formIndex];
    return answer?.selectedOption || null;
  } else if (questionIndex < grammarLength + wordsLength) {
    const formIndex = questionIndex - grammarLength + 1;
    const answer = formWordsQuiz.value[formIndex];
    return answer?.selectedOption || null;
  } else {
    const formIndex = questionIndex - grammarLength - wordsLength + 1;
    const answer = formExpressionsQuiz.value[formIndex];
    return answer?.selectedOption || null;
  }
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
      const hasAnswer = formGrammarQuiz.value[i + 1] && formGrammarQuiz.value[i + 1].selectedOption !== null;
      progress.push({
        completed: !isQuizCompleted.value && i < currentQuestionIndex.value,
        current: !isQuizCompleted.value && i === currentQuestionIndex.value,
        correct: isQuizCompleted.value && hasAnswer ? isQuestionCorrect(i) : null,
        questionIndex: i
      });
  }
  return progress;
});

const wordsProgress = computed(() => {
  const progress = [];
  
  for (let i = 0; i < wordsForQuiz.value.length; i++) {
    const questionIndex = i + (grammarQuiz.value?.length || 0);
    if (isVocabularyQuiz.value) {
      const hasAnswer = formWordsQuiz.value[i + 1] && formWordsQuiz.value[i + 1].selectedOption !== null;
      progress.push({
        completed: !isQuizCompleted.value && questionIndex < currentQuestionIndex.value,
        current: !isQuizCompleted.value && questionIndex === currentQuestionIndex.value,
        correct: isQuizCompleted.value && hasAnswer ? isQuestionCorrect(questionIndex) : null,
        questionIndex: questionIndex
      });
    } else if (isQuizCompleted) {
      progress.push({
        correct: isQuestionCorrect(questionIndex),
        questionIndex: questionIndex
      });
    } else {
      // If this is grammar quiz, words section remains untouched (all gray)
      progress.push({
        completed: false,
        current: false,
        correct: null,
        questionIndex: questionIndex
      });
    }
  }
  return progress;
});

const expressionsProgress = computed(() => {
  const progress = [];
  
  for (let i = 0; i < expressionsForQuiz.value.length; i++) {
    const questionIndex = i + (grammarQuiz.value?.length || 0) + (wordsForQuiz.value?.length || 0);
    if (isExpressionsQuiz.value) {
      const hasAnswer = formExpressionsQuiz.value[i + 1] && formExpressionsQuiz.value[i + 1].selectedOption !== null;
      progress.push({
        completed: !isQuizCompleted.value && questionIndex < currentQuestionIndex.value,
        current: !isQuizCompleted.value && questionIndex === currentQuestionIndex.value,
        correct: isQuizCompleted.value && hasAnswer ? isQuestionCorrect(questionIndex) : null,
        questionIndex: questionIndex
      });
    } else if (isQuizCompleted) {
      progress.push({
        correct: isQuestionCorrect(questionIndex),
        questionIndex: questionIndex
      });
    } else {
      // If this is grammar quiz or word quiz, expressions section remains untouched (all gray)
      progress.push({
        completed: false,
        current: false,
        correct: null,
        questionIndex: questionIndex
      });
    }
  }
  return progress;
});

await getGrammarQuizData();
await getVocabularyFromLesson();
await getAdditionnalWordsForQuiz();
await getAdditionnalExpressionsForQuiz();
await getGeneratedVocabularyQuiz();

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
        <div v-if="isQuizCompleted" class="back-button-container">
          <button @click="$router.push(`/learning/lessons/${lessonId}`)" class="back-button">
            <svg class="back-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Go back to lessons
          </button>
        </div>
        <div class="quiz-progress-indicator">
          <span class="quiz-section-name">{{ currentSection.name }}</span>
          <span class="quiz-counter">{{ currentSection.current }}</span>
          <span class="quiz-total">/ {{ currentSection.total }}</span>
        </div>
      </div>
      <div v-if="currentQuestion && !isLoading" class="quiz-content">
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
                isQuizCompleted && index + 1 === Number(currentQuestion.correctAnswer) ? 'correct-answer' : '',
                isQuizCompleted && index + 1 === getUserAnswer(currentQuestionIndex) && index + 1 !== Number(currentQuestion.correctAnswer) ? 'incorrect-answer' : ''
              ]"
            >
              <span class="option-letter">{{ String.fromCharCode(65 + index) }}</span>
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
              currentQuestionIndex <= 0 ? 'disabled' : ''
            ]"
          >
            <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span>Previous</span>
          </button>

          <!-- Next Button -->
          <button
            @click="isQuizCompleted ? goToNextQuestionInReview() : goToNextQuestion()"
            :disabled="!isQuizCompleted && !selectedAnswer"
            :class="[
              'nav-button next-button',
              !isQuizCompleted && !selectedAnswer ? 'disabled' : ''
            ]"
          >
            <span v-if="!isQuizCompleted && isLastQuestion">Finish Quiz</span>
            <span v-else-if="isQuizCompleted && currentQuestionIndex >= totalQuestions - 1">Last Question</span>
            <span v-else>Next Question</span>
            <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              isQuizCompleted ? 'clickable' : ''
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
                isQuizCompleted ? 'clickable' : ''
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
                isQuizCompleted ? 'clickable' : ''
              ]"
            >
              {{ index + 1 }}
            </div>
          </div>
        </div>
      </div>
      
      <!-- Global Score -->
      <div v-if="isQuizCompleted" class="global-score-section">
        <div class="global-score-card">
          <h4 class="global-score-title">Overall Score</h4>
          <div class="global-score-value">{{ globalScore }}%</div>
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
  position: relative;
}

.back-button-container {
  margin-bottom: 1.5rem;
  text-align: left;
}

.back-button {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.back-button:hover {
  background: #e5e7eb;
  border-color: #9ca3af;
}

.back-icon {
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
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

.option-button.completed-quiz {
  cursor: default;
}

.option-button.correct-answer {
  background: #10b981;
  border-color: #10b981;
  color: white;
}

.option-button.correct-answer .option-letter {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.option-button.incorrect-answer {
  background: #ef4444;
  border-color: #ef4444;
  color: white;
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

.nav-button:hover:not(.disabled) {
  background: #4338ca;
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



.progress-square.completed:not(.correct):not(.incorrect) {
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

.progress-square.correct {
  background: #10b981 !important;
  color: white !important;
  border-color: #10b981 !important;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3) !important;
}

.progress-square.incorrect {
  background: #ef4444 !important;
  color: white !important;
  border-color: #ef4444 !important;
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3) !important;
}

.progress-square.clickable {
  cursor: pointer;
}

.progress-square.clickable:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Score Display Styles */
.score-display {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  padding: 0.5rem 0.75rem;
  background: #f8fafc;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
}

.score-display.small {
  font-size: 0.875rem;
  padding: 0.375rem 0.5rem;
  margin-bottom: 0.5rem;
}

.score-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b;
}

.score-value {
  font-size: 1rem;
  font-weight: 700;
  color: #1e293b;
}

.score-display.small .score-label {
  font-size: 0.75rem;
}

.score-display.small .score-value {
  font-size: 0.875rem;
}

/* Global Score Styles */
.global-score-section {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 2px solid #e5e7eb;
}

.global-score-card {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}

.global-score-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  opacity: 0.9;
}

.global-score-value {
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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


