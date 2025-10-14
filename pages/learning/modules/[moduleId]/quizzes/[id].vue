<script setup lang="ts">

import type {
  QuizFetchedQuestion,
  GrammarQuizQuestion,
  FormQuizState,
} from "~/types/quizzes/quiz";
import type { WordContent } from "~/types/vocabulary/word";
import { parseGrammarQuizQuestion } from "~/utils/learning/quiz";
import { DIFFICULTY_LEVELS } from "~/utils/learning/grammar";
import type { GrammarRuleMeta } from "~/types/modules/grammar-rule";
import type { DetailedResults } from "~/types/quizzes/quiz-result";
import { getAuthToken } from "~/utils/auth/auth";

definePageMeta({
  layout: "quiz",
});


const route = useRoute();
const moduleId = Number(route.params.moduleId);
const quizId = Number(route.params.id);
const userId = useSupabaseUser().value?.id;
const isLoadingQuiz = ref<boolean>(true);

// List of questions for grammar
const grammarQuizQuestions = ref<GrammarQuizQuestion[] | null>(null);


// Information data about the targeted grammar rule to display in the quiz
const grammarRuleMetaData = ref<GrammarRuleMeta | null>(null);

// Results modal state
const showResultsModal = ref(false);

const detailedResults = ref<DetailedResults | null>(null);
const globalScore = ref<number>(0);

const openResultsModal = () => {
  showResultsModal.value = true;
};
const closeResultsModal = () => {
  showResultsModal.value = false;
};

const getGrammarRuleMetaData = async () => {
  const headers = await getAuthToken();
  const { data } = await useFetch(`/api/grammar/${moduleId}`, { headers });
  if (data.value) {
    grammarRuleMetaData.value = {
      level: data.value.difficulty_class,
      name: data.value.rule_name,
      nameEn: data.value.rule_name_translation,
      id: data.value.id,
      symbol: data.value.symbol,
    };
  }
};

const getGrammarQuizData = async () => {
  const headers = await getAuthToken();
  const { data } = await useFetch(`/api/quizzes/${quizId}`, {
    headers,
    transform: (quizQuestions: Array<QuizFetchedQuestion>) => {
      return quizQuestions.map((question) => parseGrammarQuizQuestion(question));
    },
  });
  if (data.value) {
    grammarQuizQuestions.value = data.value;
  }
};



const handleSubmitQuiz = async (results: { score: number, formGrammarQuiz: FormQuizState, detailedResults: DetailedResults }) => {
  console.log('handleSubmitQuiz', results)
  detailedResults.value = results.detailedResults;
  const headers = await getAuthToken();
  await $fetch(`/api/quizzes/result/${quizId}`, {
    method: "PUT",
    headers,
    body: {
      userId,
      ruleId: grammarRuleMetaData.value?.id,
      score: results.score,
      detailedResults: results.detailedResults,
      type: 'grammar',
      // value: formQuiz.value,
    },
  });
  setTimeout(() => {
    openResultsModal();
  }, 200);
}


await Promise.all([getGrammarQuizData(), getGrammarRuleMetaData()]);
isLoadingQuiz.value = false;

</script>

<template>
    <QuizQuestions
      type="grammar"
      :wordsForQuiz="null"
      :expressionsForQuiz="null"
      :grammarQuizQuestions="grammarQuizQuestions"
      :grammarRuleMetaData="grammarRuleMetaData"
      :wordsQuizQuestions="null"
      :expressionsQuizQuestions="null"
      :subjetId="moduleId"
      :isLoading="isLoadingQuiz"
      @submitQuiz="(results) => handleSubmitQuiz(results)"
    />
    <!-- Results Modal -->
     <div v-if="showResultsModal" class="modal-overlay">
      <QuizModal :detailedResults="detailedResults" :grammarRuleMetaData="grammarRuleMetaData" :globalScore="globalScore" type="grammar" :showResultsModal="showResultsModal" @close="closeResultsModal" />
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
</style>
