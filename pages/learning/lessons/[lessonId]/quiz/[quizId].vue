<script setup lang="ts">
import type { ExpressionContent } from "~/types/vocabulary.ts/expression";
import type {
  FormQuizState,
  QuizFetchedQuestion,
  GrammarQuizQuestion,
} from "~/types/quiz/quiz";
import type { Word, WordContent } from "~/types/vocabulary.ts/word";
import { initializeFormQuiz, parseGrammarQuizQuestion } from "~/utils/learning/quiz";
import { promptGeneratedVocabularyQuiz, promptGeneratedWordQuiz, promptGeneratedExpressionQuiz } from "../../prompts/vocabulary-quiz";
import { LayoutKeyElementRule } from "#components";
import { DIFFICULTY_LEVELS } from "~/utils/learning/grammar";
import type { GrammarRuleMeta } from "~/types/grammar-rule";
import { mockExpressionQuizQuestions, mockWordQuizQuestions } from "~/mockData/lessons/quiz/index";
import type { VocabularyQuizQuestion } from "~/types/quiz/vocabulary-quiz";
import { parseVocabularyGeneratedQuiz } from "~/utils/quiz-creation/parse/generatedQuiz";
import { mockNotParsedExpressionQuizQuestions, mockNotParsedWordQuizQuestions } from "~/mockData/lessons/quiz/notparsed";

definePageMeta({
  layout: "quiz",
});


const route = useRoute();
const lessonId = String(route.params.lessonId);
const quizId = String(route.params.quizId);

const isLoading = ref<boolean>(true);
const isLoadingFetchingLessonVocabulary = ref<boolean>(true);

// List of questions for grammar, words, expressions quizzes
const grammarQuizQuestions = ref<GrammarQuizQuestion[] | null>(null);
const wordsQuizQuestions = ref<VocabularyQuizQuestion[] | null>(null);
const expressionsQuizQuestions = ref<VocabularyQuizQuestion[] | null>(null);

// Maps memorizing quizzes values for grammar, words, expressions
const formGrammarQuiz = ref<FormQuizState>({});
const formWordsQuiz = ref<FormQuizState>({});
const formExpressionsQuiz = ref<FormQuizState>({});

// List of words and expressions to be used when generating vocabulary quizzes
const wordsForQuiz = ref<WordContent[]>([]);
const expressionsForQuiz = ref<ExpressionContent[]>([]);


// Information data about the targeted grammar rule to display in the quiz
const grammarRuleMetaData = ref<GrammarRuleMeta | null>(null);


const currentQuestionIndex = ref<number>(0);
const selectedAnswer = ref<string | null>(null);
const isQuizCompleted = ref<boolean>(false);
const viewingCompletedQuestion = ref<boolean>(false);


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
      id: data.value.turkish_grammar_rules.id,
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
      return quizQuestions.map((question) => parseGrammarQuizQuestion(question));
    },
  });
  if (data.value) {
    grammarQuizQuestions.value = data.value;
    initializeFormQuiz(formGrammarQuiz, data.value);
  }
  isLoading.value = false;
};


const getGeneratedVocabularyQuiz = async () => {
  //   const generatedWordsQuiz = await $fetch(`/api/generation/vocabulary-quiz/gpt/words`, 
  //   {
  //     method: "POST",
  //     body: {
  //       message: promptGeneratedWordQuiz(wordsForQuiz.value)
  //     }
  //   }
  // );
  const generatedWordsQuiz = mockNotParsedWordQuizQuestions

  // const generatedExpressionsQuiz = await $fetch(`/api/generation/vocabulary-quiz/gpt/expressions`, 
  //   {
  //     method: "POST",
  //     body: {
  //       message: promptGeneratedExpressionQuiz(expressionsForQuiz.value)
  //     }
  //   }
  // );
  const generatedExpressionsQuiz = mockNotParsedExpressionQuizQuestions
  if (generatedWordsQuiz) {
    wordsQuizQuestions.value = parseVocabularyGeneratedQuiz(generatedWordsQuiz);
    // wordsQuizQuestions.value = mockWordQuizQuestions;
    if (wordsQuizQuestions.value) initializeFormQuiz(formWordsQuiz, wordsQuizQuestions.value);
    console.log("formWordsQuiz", formWordsQuiz.value);
  }
  if (generatedExpressionsQuiz) {
      expressionsQuizQuestions.value = parseVocabularyGeneratedQuiz(generatedExpressionsQuiz);
      // expressionsQuizQuestions.value = mockExpressionQuizQuestions;
      if (expressionsQuizQuestions.value) initializeFormQuiz(formExpressionsQuiz, expressionsQuizQuestions.value);
      console.log("expressionsQuizQuestions", expressionsQuizQuestions.value);
      console.log("formExpressionsQuiz", formExpressionsQuiz.value);
    }
};

const currentQuestion = computed(() => {
  // Determine which section we're in based on current question index  
  const grammarLength = grammarQuizQuestions.value?.length || 0;
  const wordsLength = wordsForQuiz.value?.length || 0;
  if (currentQuestionIndex.value < grammarLength) {
     // Grammar sectionn    
  return grammarQuizQuestions.value?.[currentQuestionIndex.value] || null;
} else if (currentQuestionIndex.value < grammarLength + wordsLength) {
    // Words section
    const wordIndex = currentQuestionIndex.value - grammarLength;
    return wordsQuizQuestions.value?.[wordIndex] || null;
  } else {
    // Expressions section
    const expressionIndex = currentQuestionIndex.value - grammarLength - wordsLength;
    return expressionsQuizQuestions.value?.[expressionIndex] || null;
  }
});

const currentQuestionOptions = computed(() => {
  const question = currentQuestion.value;
  if (!question) return [];
  return [question.option1, question.option2, question.option3, question.option4];
});

const totalQuestions = computed(() => {
  return (grammarQuizQuestions.value?.length || 0) + 
         (wordsForQuiz.value?.length || 0) + 
         (expressionsForQuiz.value?.length || 0);
});



// Determine if we're at the last question of the entire quiz
const isLastQuestion = computed(() => {
  return currentQuestionIndex.value >= totalQuestions.value - 1;
});


const handleQuizResults = async() => {
  console.log("handleQuizResults");
  //console.log("score", score, quiz.value, quiz.value[0].grammarRuleId);
  const { data: { session } } = await useSupabaseClient().auth.getSession()
  const headers: Record<string, string> = {}
  if (session?.access_token) headers['Authorization'] = `Bearer ${session.access_token}`
  await $fetch(`/api/quizzes/result/${quizId}`, {
    method: "PUT",
    headers,
    body: {
      ruleId: grammarRuleMetaData.value?.id,
      score: grammarScore.value,
      // value: formQuiz.value,
    },
  });
}

const goToNextQuestion = () => {
  if (selectedAnswer.value) {
    // Store the answer in the correct form based on current section
    const optionIndex = currentQuestionOptions.value.findIndex(option => option === selectedAnswer.value);
    const selectedOptionNumber = optionIndex + 1;

    // Store answer in the appropriate form based on current section
    if (isGrammarQuiz.value && formGrammarQuiz.value[currentQuestionIndex.value + 1]) {
      formGrammarQuiz.value[currentQuestionIndex.value + 1].selectedOption = selectedOptionNumber;
    } else if (isWordsQuiz.value && formWordsQuiz.value[currentQuestionIndex.value - (grammarQuizQuestions.value?.length || 0) + 1]) {
      formWordsQuiz.value[currentQuestionIndex.value - (grammarQuizQuestions.value?.length || 0) + 1].selectedOption = selectedOptionNumber;
    } else if (isExpressionsQuiz.value && formExpressionsQuiz.value[currentQuestionIndex.value - (grammarQuizQuestions.value?.length || 0) - (wordsForQuiz.value?.length || 0) + 1]) {
      formExpressionsQuiz.value[currentQuestionIndex.value - (grammarQuizQuestions.value?.length || 0) - (wordsForQuiz.value?.length || 0) + 1].selectedOption = selectedOptionNumber;
    }

    if (currentQuestionIndex.value < totalQuestions.value - 1) {
      currentQuestionIndex.value++;
      selectedAnswer.value = null;
    } else {
      // Quiz finished - handle completion
      isQuizCompleted.value = true;
      console.log("Quiz completed!", { formGrammarQuiz: formGrammarQuiz.value, formWordsQuiz: formWordsQuiz.value, formExpressionsQuiz: formExpressionsQuiz.value });
      // Open results modal after a short delay
      handleQuizResults()
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
  if (!grammarQuizQuestions.value || !formGrammarQuiz.value) return 0;
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
  if (!wordsQuizQuestions.value || !formWordsQuiz.value) return 0;
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
  if (!expressionsQuizQuestions.value || !formExpressionsQuiz.value) return 0;
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
  const grammarLength = grammarQuizQuestions.value?.length || 0;
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
  const grammarLength = grammarQuizQuestions.value?.length || 0;
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
  return currentQuestionIndex.value < (grammarQuizQuestions.value?.length || 0);
});

const isWordsQuiz = computed(() => {
  return currentQuestionIndex.value >= (grammarQuizQuestions.value?.length || 0) && currentQuestionIndex.value < (grammarQuizQuestions.value?.length || 0) + (wordsForQuiz.value?.length || 0);
});
const isExpressionsQuiz = computed(() => {
  return currentQuestionIndex.value >= (grammarQuizQuestions.value?.length || 0) + (wordsForQuiz.value?.length || 0) && currentQuestionIndex.value < (grammarQuizQuestions.value?.length || 0) + (wordsForQuiz.value?.length || 0) + (expressionsForQuiz.value?.length || 0);
});

const isVocabularyQuiz = computed(() => {
  // For now, assume vocabulary quiz if not grammar
  // This can be enhanced based on my actual data structure
  return isWordsQuiz.value || isExpressionsQuiz.value;
});



// Results modal state
const showResultsModal = ref(false);

const openResultsModal = () => {
  showResultsModal.value = true;
};

const closeResultsModal = () => {
  showResultsModal.value = false;
};





await getGrammarQuizData();
await getVocabularyFromLesson();
await getAdditionnalWordsForQuiz();
await getAdditionnalExpressionsForQuiz();
await getGeneratedVocabularyQuiz();

</script>

<template>
  <div>
    <QuizQuestions
      :grammarQuizQuestions="grammarQuizQuestions"
      :wordsForQuiz="wordsForQuiz"
      :expressionsForQuiz="expressionsForQuiz"
      :grammarRuleMetaData="grammarRuleMetaData"
      :globalScore="globalScore"
      @submitQuiz="submitQuiz"
    />
    <!-- Results Modal -->
     <div v-if="showResultsModal" class="modal-overlay">
      <QuizModal  :detailedResults="detailedResults" :grammarRuleMetaData="grammarRuleMetaData" :globalScore="globalScore" :showResultsModal="showResultsModal" @close="closeResultsModal" />
     </div>
  </div>
</template>

<style scoped>

</style>


