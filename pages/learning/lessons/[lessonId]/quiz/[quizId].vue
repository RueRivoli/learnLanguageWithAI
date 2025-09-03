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
import { ArrowLeftIcon, BookOpenIcon, EyeIcon, LanguageIcon } from "@heroicons/vue/24/outline";

definePageMeta({
  layout: "quiz",
});

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
      // Open results modal after a short delay
      setTimeout(() => {
        openResultsModal();
      }, 500);
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

// Summary data for completed quiz
const validatedWords = computed(() => {
  if (!wordsQuiz.value || !formWordsQuiz.value) return { correct: 0, total: 0 };
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
  
  return { correct, total };
});

const validatedExpressions = computed(() => {
  if (!expressionsQuiz.value || !formExpressionsQuiz.value) return { correct: 0, total: 0 };
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
  
  return { correct, total };
});

// Results modal state
const showResultsModal = ref(false);

const openResultsModal = () => {
  showResultsModal.value = true;
};

const closeResultsModal = () => {
  showResultsModal.value = false;
};

// Enhanced data for modal
const detailedResults = computed(() => {
  const grammarCorrect = Object.values(formGrammarQuiz.value).filter(a => a.selectedOption !== null && Number(a.selectedOption) === Number(a.correctAnswer)).length;
  const grammarTotal = Object.values(formGrammarQuiz.value).filter(a => a.selectedOption !== null).length;
  
  const wordsCorrect = validatedWords.value.correct;
  const wordsTotal = validatedWords.value.total;
  const wordsIncorrect = wordsTotal - wordsCorrect;
  
  const expressionsCorrect = validatedExpressions.value.correct;
  const expressionsTotal = validatedExpressions.value.total;
  const expressionsIncorrect = expressionsTotal - expressionsCorrect;
  
  // Get actual words that were validated/invalidated
  const validatedWordsList = [];
  const invalidatedWordsList = [];
  if (wordsQuiz.value && formWordsQuiz.value) {
    Object.values(formWordsQuiz.value).forEach((answer, index) => {
      if (answer.selectedOption !== null && wordsQuiz.value[index]) {
        const question = wordsQuiz.value[index];
        const correctAnswer = question[`option${answer.correctAnswer}`];
        const userAnswer = question[`option${answer.selectedOption}`];
        
        if (Number(answer.selectedOption) === Number(answer.correctAnswer)) {
          validatedWordsList.push(correctAnswer);
        } else {
          invalidatedWordsList.push(correctAnswer);
        }
      }
    });
  }
  
  // Get actual expressions that were validated/invalidated
  const validatedExpressionsList = [];
  const invalidatedExpressionsList = [];
  if (expressionsQuiz.value && formExpressionsQuiz.value) {
    Object.values(formExpressionsQuiz.value).forEach((answer, index) => {
      if (answer.selectedOption !== null && expressionsQuiz.value[index]) {
        const question = expressionsQuiz.value[index];
        const correctAnswer = question[`option${answer.correctAnswer}`];
        const userAnswer = question[`option${answer.selectedOption}`];
        
        if (Number(answer.selectedOption) === Number(answer.correctAnswer)) {
          validatedExpressionsList.push(correctAnswer);
        } else {
          invalidatedExpressionsList.push(correctAnswer);
        }
      }
    });
  }
  
  return {
    grammar: { correct: grammarCorrect, total: grammarTotal, percentage: grammarTotal > 0 ? Math.round((grammarCorrect / grammarTotal) * 100) : 0 },
    words: { 
      correct: wordsCorrect, 
      total: wordsTotal, 
      incorrect: wordsIncorrect, 
      percentage: wordsTotal > 0 ? Math.round((wordsCorrect / wordsTotal) * 100) : 0,
      validatedList: validatedWordsList,
      invalidatedList: invalidatedWordsList
    },
    expressions: { 
      correct: expressionsCorrect, 
      total: expressionsTotal, 
      incorrect: expressionsIncorrect, 
      percentage: expressionsTotal > 0 ? Math.round((expressionsCorrect / expressionsTotal) * 100) : 0,
      validatedList: validatedExpressionsList,
      invalidatedList: invalidatedExpressionsList
    },
    overall: { percentage: globalScore.value }
  };
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

    <!-- Results Modal -->
     <div v-if="showResultsModal" class="modal-overlay">
      <QuizModal  :detailedResults="detailedResults" :grammarRuleMetaData="grammarRuleMetaData" :globalScore="globalScore" :showResultsModal="showResultsModal" @close="closeResultsModal" />
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
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
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
  border-color: #4f46e5;
  background: linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #8b5cf6 100%);
  color: white;
  box-shadow: 
    0 10px 25px -3px rgba(79, 70, 229, 0.4),
    0 4px 6px -2px rgba(79, 70, 229, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

.option-button.selected::before {
  opacity: 1;
  background: 
    radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
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
    radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
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
    radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
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
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
  color: #6b7280;
  border: 1px solid #e5e7eb;
  box-shadow: 
    0 2px 4px -1px rgba(0, 0, 0, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.progress-square::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.02) 0%, transparent 50%),
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
    radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
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
    radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
}

.progress-square.correct {
  background: linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%) !important;
  color: white !important;
  border-color: #10b981 !important;
  box-shadow: 
    0 4px 8px -2px rgba(16, 185, 129, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
}

.progress-square.correct::before {
  opacity: 1 !important;
  background: 
    radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%) !important;
}

.progress-square.incorrect {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%) !important;
  color: white !important;
  border-color: #ef4444 !important;
  box-shadow: 
    0 4px 8px -2px rgba(239, 68, 68, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
}

.progress-square.incorrect::before {
  opacity: 1 !important;
  background: 
    radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%) !important;
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
  background: linear-gradient(135deg, #4f46e5 0%, #6366f1 25%, #8b5cf6 50%, #a855f7 75%, #c084fc 100%);
  color: white;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 
    0 10px 25px -3px rgba(79, 70, 229, 0.4),
    0 4px 6px -2px rgba(79, 70, 229, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
}

.global-score-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%);
  pointer-events: none;
}

.global-score-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  opacity: 0.9;
  position: relative;
  z-index: 1;
}

.global-score-value {
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
}

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

.modal-container {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 20px;
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  max-width: 900px;
  width: 90%;
  max-height: 95vh;
  overflow-y: auto;
  position: relative;
  animation: modalSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
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

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem 1rem 2rem;
  border-bottom: 1px solid #e5e7eb;
  position: relative;
}

.modal-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(79, 70, 229, 0.02) 0%, transparent 50%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%);
  pointer-events: none;
}

.modal-title-section {
  position: relative;
  z-index: 1;
}

.modal-title {
  font-size: 2rem;
  font-weight: 800;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
  letter-spacing: -0.025em;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.modal-subtitle {
  font-size: 1.1rem;
  color: #6b7280;
  margin: 0;
  font-weight: 500;
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

.modal-content {
  padding: 1.5rem 2rem;
}

/* Overall Score Section */
.overall-score-section {
  margin-bottom: 2rem;
}

.overall-score-card {
  background: linear-gradient(135deg, #4f46e5 0%, #6366f1 25%, #8b5cf6 50%, #a855f7 75%, #c084fc 100%);
  border-radius: 20px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  position: relative;
  overflow: hidden;
  box-shadow: 
    0 20px 40px -12px rgba(79, 70, 229, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.overall-score-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
  pointer-events: none;
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

.score-label {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
  text-align: center;
}

.score-details {
  flex: 1;
  position: relative;
  z-index: 1;
}

.score-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: white;
  margin: 0 0 0.75rem 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.score-description {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  line-height: 1.5;
}

/* Charts Section */
.charts-section {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 2rem 0;
  text-align: center;
  letter-spacing: -0.025em;
}

/* Grammar Chart - Full Width */
.grammar-chart-container {
  margin-bottom: 1.5rem;
}

.grammar-full-width {
  width: 100%;
}

.grammar-chart-content {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.grammar-chart-content .chart-visual {
  flex-shrink: 0;
}

.grammar-chart-content .chart-details {
  flex: 1;
}

/* Vocabulary Charts - Side by Side */
.vocabulary-charts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.chart-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 1.25rem;
  box-shadow: 
    0 10px 25px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.chart-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.02) 0%, transparent 50%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}



.chart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
}

.chart-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
  color: #374151;
  font-size: 1.1rem;
}

.chart-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #6b7280;
}

.chart-percentage {
  font-size: 1.5rem;
  font-weight: 700;
  color: #4f46e5;
  background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.chart-visual {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
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
  stroke: #4f46e5;
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
  font-size: 1.25rem;
  font-weight: 700;
  color: #374151;
  text-align: center;
}

.chart-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  position: relative;
  z-index: 1;
}

.chart-stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
}

.stat-value {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}

.stat-value.level {
  text-transform: capitalize;
  color: #7c3aed;
  background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-value.incorrect {
  color: #ef4444;
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-value.words-gradient {
  background: #3b82f6;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-value.expressions-gradient {
  background: linear-gradient(to bottom right, #8b5cf6, #ec4899, #f472b6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.chart-percentage.words-gradient {
  background: #3b82f6;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.chart-percentage.expressions-gradient {
  background: linear-gradient(to bottom right, #8b5cf6, #ec4899, #f472b6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Word boxes styling */
.chart-details .stat-value {
  background: #3b82f6;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  -webkit-background-clip: unset;
  -webkit-text-fill-color: unset;
  background-clip: unset;
}

/* Modal Actions */
.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  padding-top: 1.5rem;
}

.action-button {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  text-decoration: none;
  position: relative;
  overflow: hidden;
}

.action-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}



.action-button.primary {
  background: linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #8b5cf6 100%);
  color: white;
  box-shadow: 
    0 10px 25px -3px rgba(79, 70, 229, 0.4),
    0 4px 6px -2px rgba(79, 70, 229, 0.1);
}



.action-button.secondary {
  background: linear-gradient(135deg, #6b7280 0%, #9ca3af 100%);
  color: white;
  box-shadow: 
    0 10px 25px -3px rgba(107, 114, 128, 0.4),
    0 4px 6px -2px rgba(107, 114, 128, 0.1);
}



.action-icon {
  width: 1.25rem;
  height: 1.25rem;
  position: relative;
  z-index: 1;
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
  
  /* Modal responsive */
  .modal-container {
    width: 95%;
    max-height: 98vh;
  }
  
  .modal-header {
    padding: 1rem 1.5rem 0.75rem 1.5rem;
  }
  
  .modal-title {
    font-size: 1.5rem;
  }
  
  .modal-content {
    padding: 1rem 1.5rem;
  }
  
  .overall-score-card {
    flex-direction: column;
    text-align: center;
    padding: 1.5rem;
    gap: 1rem;
  }
  
  .score-circle {
    width: 80px;
    height: 80px;
  }
  
  .score-percentage {
    font-size: 1.75rem;
  }
  
  .score-title {
    font-size: 1.5rem;
  }
  
  .vocabulary-charts-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .grammar-chart-content {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .chart-card {
    padding: 1rem;
  }
  
  .modal-actions {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .action-button {
    width: 100%;
    justify-content: center;
  }
}
</style>


