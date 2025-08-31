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

const route = useRoute();
const lessonId = String(route.params.lessonId);
const quizId = String(route.params.quizId);

const isLoading = ref<boolean>(true);
const isLoadingFetchingLessonVocabulary = ref<boolean>(true);
const quiz = ref<any>(null);
const formGrammarQuiz = ref<FormQuizState>({});
const wordsForQuiz = ref<WordContent[]>([]);
const expressionsForQuiz = ref<ExpressionContent[]>([]);



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
    wordsForQuiz.value = (data.value.turkish_lesson_words || []).map((word) => word.turkish_words);
    expressionsForQuiz.value = (data.value.turkish_lesson_expressions || []).map((expression) => expression.turkish_expressions);
  }
  console.log("wordsForQuiz", wordsForQuiz.value);
  console.log("expressionsForQuiz", expressionsForQuiz.value);
  isLoadingFetchingLessonVocabulary.value = false;
};


const getQuizData = async () => {
  const { data } = await useFetch(`/api/quizzes/${quizId}`, {
    transform: (quizQuestions: Array<QuizFetchedQuestion>) => {
      return quizQuestions.map((question) => parseQuizQuestion(question));
    },
  });
  console.log("questions", data.value);
  if (data.value) {
    quiz.value = data.value;
    initializeFormQuiz(data.value);
  }
  console.log("formGrammarQuiz", formGrammarQuiz.value);
  isLoading.value = false;
};


await getQuizData();
await getVocabularyFromLesson();
// Page title
useHead({
  title: `Quiz ${quizId} - Lesson ${lessonId}`,
});
</script>

<template>
  <div class="quiz-lesson">
    <div class="quiz-lesson-content">
      <div class="quiz-lesson-content-header">
        <h1 class="quiz-lesson-content-header-title">Quiz Lesson</h1>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any specific styles for the quiz page here */
</style>


