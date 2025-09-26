<script setup lang="ts">
import type { ExpressionContent } from "~/types/vocabulary/expression";
import type {
  QuizFetchedQuestion,
  GrammarQuizQuestion,
  FormQuizState,
} from "~/types/quizzes/quiz";
import type { WordContent } from "~/types/vocabulary/word";
import { parseGrammarQuizQuestion } from "~/utils/learning/quiz";
import { promptGeneratedVocabularyQuiz, promptGeneratedWordQuiz, promptGeneratedExpressionQuiz } from "../../prompts/vocabulary-quiz";
import { DIFFICULTY_LEVELS } from "~/utils/learning/grammar";
import type { GrammarRuleMeta } from "~/types/modules/grammar-rule";
import { mockExpressionQuizQuestions, mockWordQuizQuestions } from "~/mockData/lessons/quiz/index";
import type { VocabularyQuizQuestion } from "~/types/quizzes/vocabulary-quiz";
import { parseVocabularyGeneratedQuiz } from "~/utils/quiz-creation/parse/generatedQuiz";
import { mockNotParsedExpressionQuizQuestions, mockNotParsedWordQuizQuestions } from "~/mockData/lessons/quiz/notparsed";
import type { DetailedResults } from "~/types/quizzes/quiz-result";

definePageMeta({
  layout: "quiz",
});


const route = useRoute();
const lessonId = Number(route.params.lessonId);
const quizId = Number(route.params.quizId);

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

const detailedResults = ref<DetailedResults | null>(null);
const globalScore = ref<number>(0);
const openResultsModal = () => {
  showResultsModal.value = true;
};
const closeResultsModal = () => {
  showResultsModal.value = false;
};

// Fetch lesson data
const getVocabularyFromLesson = async () => {
  const { data } = await useFetch(
    `/api/lessons/${lessonId}/vocabulary`,
  );
  if (data.value) {
    grammarRuleMetaData.value = {
      level: DIFFICULTY_LEVELS[data.value.turkish_grammar_rules.difficulty_class],
      name: data.value.turkish_grammar_rules.rule_name_translation,
      id: data.value.turkish_grammar_rules.id,
    }
    wordsForQuiz.value.push(...(data.value.turkish_lesson_words || []).map((word: any) => {return { ...word.turkish_words, isMastered: false }}));
    expressionsForQuiz.value.push(...(data.value.turkish_lesson_expressions || []).map((expression: any) => {return { ...expression.turkish_expressions, isMastered: false }}));
  }
};

const getAdditionnalWordsForQuiz = async () => {
  const { data } = await $fetch(`/api/words/levels/random/?limit=2`, {
    method: "GET",
  });
  if (data) {
    wordsForQuiz.value.push(...(data.map((word: any) => {return { ...word.turkish_words, isMastered: true }})));
  }
};


const getAdditionnalExpressionsForQuiz = async () => {
  const data = await $fetch(`/api/expressions/levels/random/?limit=2`, {
    method: "GET",
  });
  if (data && (data as any).data) {
    expressionsForQuiz.value.push(...((data as any).data.map((expression: any) => {return { ...expression.turkish_expressions, isMastered: true }})));
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
  }
};


const getGeneratedVocabularyQuiz = async () => {
    const generatedWordsQuiz = await $fetch(`/api/generation/vocabulary-quiz/gpt/words`, 
    {
      method: "POST",
      body: {
        message: promptGeneratedWordQuiz(wordsForQuiz.value)
      }
    }
  );
  // const generatedWordsQuiz = mockNotParsedWordQuizQuestions

  const generatedExpressionsQuiz = await $fetch(`/api/generation/vocabulary-quiz/gpt/expressions`, 
    {
      method: "POST",
      body: {
        message: promptGeneratedExpressionQuiz(expressionsForQuiz.value)
      }
    }
  );
  // const generatedExpressionsQuiz = mockNotParsedExpressionQuizQuestions
  if (generatedWordsQuiz) {
    // change generatedQuiz if using mock data
    wordsQuizQuestions.value = parseVocabularyGeneratedQuiz(generatedWordsQuiz);
    // wordsQuizQuestions.value = mockWordQuizQuestions;
  }
  if (generatedExpressionsQuiz) {
    // change generatedQuiz if using mock data
      expressionsQuizQuestions.value = parseVocabularyGeneratedQuiz(generatedExpressionsQuiz);
      // expressionsQuizQuestions.value = mockExpressionQuizQuestions;
    }
};

const handleSubmitQuiz = async(results: { score: number, formGrammarQuiz: FormQuizState, detailedResults: DetailedResults }) => {
  detailedResults.value = results.detailedResults;
  const { data: { session } } = await useSupabaseClient().auth.getSession()
  const headers: Record<string, string> = {}
  if (session?.access_token) headers['Authorization'] = `Bearer ${session.access_token}`
  await $fetch(`/api/quizzes/result/${quizId}`, {
    method: "PUT",
    headers,
    body: {
      ruleId: grammarRuleMetaData.value?.id,
      score: results.score,
      detailedResults: results.detailedResults,
      // value: formQuiz.value,
    },
  });
  setTimeout(() => {
    openResultsModal();
  }, 200);
}

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
    <QuizQuestions
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
      <QuizModal :detailedResults="detailedResults" :grammarRuleMetaData="grammarRuleMetaData" :globalScore="globalScore" :showResultsModal="showResultsModal" @close="closeResultsModal" />
     </div>
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


