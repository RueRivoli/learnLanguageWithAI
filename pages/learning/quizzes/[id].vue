<script setup lang="ts">
import { CheckIcon, ClockIcon } from "@heroicons/vue/24/solid";
import {
  QuestionMarkCircleIcon,
  ArrowRightIcon,
} from "@heroicons/vue/24/outline";

import type {
  FormQuizState,
  QuizFetchedQuestion,
  QuizFormattedQuestion,
} from "~/types/quiz.ts";
import { parseQuizQuestion } from "~/utils/learning/quiz";

definePageMeta({
  layout: "authenticated",
});

const route = useRoute();
const quizId = route.params.id;
const isLoading = ref<boolean>(true);
const quiz = ref<QuizFormattedQuestion[]>([]);
const formQuiz = ref<FormQuizState>({});

const isQuizComplete = computed(() => {
  let complete = true;
  Object.keys(formQuiz.value).forEach((key: string) => {
    complete =
      complete && formQuiz.value[parseInt(key)].selectedOption !== null;
  });
  return complete;
});

const calculateScoreTotal = () => {
  return Object.keys(formQuiz.value).reduce((acc: number, key: string) => {
    const keyNum = parseInt(key);
    const isCorrect =
      formQuiz.value[keyNum].correctAnswer ===
      formQuiz.value[keyNum].selectedOption;
    return isCorrect ? acc + 1 : acc;
  }, 0);
};

const initializeFormQuiz = (questions: QuizFormattedQuestion[]): void => {
  formQuiz.value = questions.reduce(
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
  isLoading.value = false;
};

const handleSubmit = async () => {
  console.log("Form submitted:", formQuiz.value);
  const score = calculateScoreTotal();
  const scoreTotal = score * 20;
  console.log("score", score, quiz.value, quiz.value[0].grammarRuleId);
  // Add your submission logic here
  await $fetch(`/api/quizzes/result/${quizId}`, {
    method: "PUT",
    body: {
      ruleId: quiz.value[0].grammarRuleId,
      score: scoreTotal,
      value: formQuiz.value,
    },
  });
};

const getOptionLabel = (index: number) => {
  return String.fromCharCode(65 + index); // A, B, C, D
};

await getQuizData();
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <div class="flex-1 max-w-7xl mx-auto px-4 py-5 w-full">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-2">
          <div
            class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center"
          >
            <QuestionMarkCircleIcon class="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Quiz Assessment</h1>
            <p class="text-gray-600">
              Test your knowledge and track your progress
            </p>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Quiz Questions -->
        <div class="flex-1 lg:max-w-none">
          <div
            class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <!-- Loading State -->
            <div
              v-if="isLoading"
              class="w-full h-96 flex flex-col justify-center items-center"
            >
              <div
                class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"
              />
              <p class="text-gray-500">Loading quiz questions...</p>
            </div>

            <!-- Quiz Content -->
            <div v-else class="p-8">
              <!-- Quiz Header -->
              <div
                class="flex items-center justify-between mb-8 pb-6 border-b border-gray-100"
              >
                <div>
                  <h2 class="text-xl font-semibold text-gray-900 mb-1">
                    Choose the correct answer
                  </h2>
                  <p class="text-sm text-gray-600">
                    {{ quiz.length }} questions • Read carefully and select the
                    best option
                  </p>
                </div>
                <div class="flex items-center gap-2 text-sm text-gray-500">
                  <ClockIcon class="w-4 h-4" />
                  <span>No time limit</span>
                </div>
              </div>
              <!-- Questions Form -->
              <form class="space-y-8" @submit.prevent="handleSubmit">
                <div
                  v-for="(question, index) in quiz"
                  :key="index"
                  class="bg-gray-50 rounded-lg p-6 border border-gray-100"
                >
                  <!-- Question -->
                  <div class="mb-6">
                    <div class="flex items-start gap-3">
                      <div
                        class="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0"
                      >
                        {{ index + 1 }}
                      </div>
                      <div class="flex-1">
                        <h3
                          class="text-lg font-medium text-gray-900 leading-relaxed"
                        >
                          {{ question.question }}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <!-- Options -->
                  <div class="space-y-3">
                    <label
                      v-for="(option, optionIndex) in [
                        question.option1,
                        question.option2,
                        question.option3,
                        question.option4,
                      ]"
                      :key="optionIndex"
                      class="flex items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-primary/30 hover:bg-primary/5 cursor-pointer duration-200"
                      :class="{
                        'border-primary bg-primary/10':
                          formQuiz[index + 1]?.selectedOption ===
                          String(optionIndex + 1),
                      }"
                    >
                      <input
                        :id="`question-${index + 1}-option-${optionIndex + 1}`"
                        v-model="formQuiz[index + 1].selectedOption"
                        type="radio"
                        :name="`question-${index + 1}`"
                        :value="String(optionIndex + 1)"
                        class="radio radio-md radio-primary"
                      />
                      <!-- <div
                        class="w-6 h-6 border-2 rounded-full flex items-center justify-center mr-4 flex-shrink-0"
                        :class="{
                          'border-primary':
                            formQuiz[index + 1]?.selectedOption ===
                            String(optionIndex + 1),
                          'border-gray-300':
                            formQuiz[index + 1]?.selectedOption !==
                            String(optionIndex + 1),
                        }"
                      >
                        <div
                          v-if="
                            formQuiz[index + 1]?.selectedOption ===
                            String(optionIndex + 1)
                          "
                          class="w-3 h-3 bg-primary rounded-full"
                        />
                      </div> -->
                      <div class="flex items-center gap-3 flex-1">
                        <span
                          class="w-8 h-8 ml-2 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center text-sm font-semibold"
                        >
                          {{ getOptionLabel(optionIndex) }}
                        </span>
                        <span class="text-gray-700 font-medium">{{
                          option
                        }}</span>
                      </div>
                    </label>
                  </div>
                </div>

                <!-- Submit Button -->
                <div class="pt-6 border-t border-gray-100">
                  <button
                    type="submit"
                    :disabled="!isQuizComplete"
                    class="w-full btn btn-primary btn-lg disabled:cursor-not-allowed font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-3"
                  >
                    <span>Submit Quiz & Get Results</span>
                    <ArrowRightIcon class="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:w-80 lg:flex-shrink-0">
          <div class="lg:sticky lg:top-6">
            <div
              class="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <!-- Progress Overview -->
              <div class="mb-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">
                  Quiz Progress
                </h3>
                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600">Questions</span>
                    <span class="text-sm font-semibold text-gray-900">{{
                      quiz.length
                    }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600">Answered</span>
                    <span class="text-sm font-semibold text-primary">
                      {{
                        Object.values(formQuiz).filter(
                          (q: any) => q.selectedOption !== null,
                        ).length
                      }}
                    </span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600">Remaining</span>
                    <span class="text-sm font-semibold text-gray-900">
                      {{
                        quiz.length -
                        Object.values(formQuiz).filter(
                          (q: any) => q.selectedOption !== null,
                        ).length
                      }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Progress Bar -->
              <div class="mb-6">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-medium text-gray-700"
                    >Completion</span
                  >
                  <span class="text-sm font-semibold text-primary">
                    {{
                      Math.round(
                        (Object.values(formQuiz).filter(
                          (q: any) => q.selectedOption !== null,
                        ).length /
                          quiz.length) *
                          100,
                      )
                    }}%
                  </span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div
                    class="bg-primary h-2 rounded-full duration-300"
                    :style="{
                      width: `${(Object.values(formQuiz).filter((q: any) => q.selectedOption !== null).length / quiz.length) * 100}%`,
                    }"
                  />
                </div>
              </div>

              <!-- Tips -->
              <!-- <div class="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <div class="flex items-start gap-3">
                  <AcademicCapIcon class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 class="text-sm font-semibold text-blue-900 mb-1">Quick Tips</h4>
                    <ul class="text-xs text-blue-800 space-y-1">
                      <li>• Read each question carefully</li>
                      <li>• Review your answers before submitting</li>
                      <li>• Take your time, there's no rush</li>
                    </ul>
                  </div>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
