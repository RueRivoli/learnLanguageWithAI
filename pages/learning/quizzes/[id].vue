<script setup lang="ts">
import { ClockIcon } from "@heroicons/vue/24/solid";
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
const isLoading = ref<boolean>(true);
const quiz = ref<QuizFormattedQuestion[]>([]);
const formQuiz = ref<FormQuizState>({});

const { lessonId, quizId } = route.params; // strings

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
                  class="relative rounded-xl border shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden transform hover:-translate-y-1 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/15 border-primary/20"
                >
                  <!-- Professional background texture -->
                  <div
                    class="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(var(--color-primary-500),0.03)_25%,rgba(var(--color-primary-500),0.03)_75%,transparent_75%)] bg-[size:20px_20px] opacity-80"
                  />

                  <!-- Subtle geometric pattern overlay -->
                  <div
                    class="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(var(--color-primary-500),0.02)_1px,transparent_0)] bg-[size:16px_16px] opacity-60"
                  />

                  <!-- Animated corner accent -->
                  <div
                    class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/20 via-primary/15 to-transparent rounded-bl-full opacity-60"
                  />

                  <!-- Floating decorative elements -->
                  <div
                    class="absolute top-4 left-4 w-3 h-3 bg-primary/60 rounded-full opacity-40 animate-pulse"
                  />
                  <div
                    class="absolute bottom-6 right-6 w-2 h-2 bg-primary/50 rounded-full opacity-30 animate-bounce"
                  />

                  <!-- Content container -->
                  <div class="relative z-10 p-6">
                    <!-- Question -->
                    <div class="mb-6">
                      <div class="flex items-start gap-3">
                        <div
                          class="w-8 h-8 bg-gradient-to-br from-primary/80 to-primary text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 shadow-lg shadow-primary/30"
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
                        class="group relative flex items-center p-4 bg-white/90 backdrop-blur-sm rounded-lg border border-primary/20 hover:border-primary/30 cursor-pointer duration-300 transition-all hover:shadow-md"
                        :class="{
                          'border-primary/60 bg-primary/5 shadow-md shadow-primary/10':
                            formQuiz[index + 1]?.selectedOption ===
                            String(optionIndex + 1),
                        }"
                      >
                        <!-- Option background effects -->
                        <div
                          class="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
                        />
                        <div
                          class="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.02)_25%,rgba(0,0,0,0.02)_75%,transparent_75%)] bg-[size:8px_8px] rounded-lg opacity-30"
                        />

                        <input
                          :id="`question-${index + 1}-option-${optionIndex + 1}`"
                          v-model="formQuiz[index + 1].selectedOption"
                          type="radio"
                          :name="`question-${index + 1}`"
                          :value="String(optionIndex + 1)"
                          class="radio radio-md radio-primary relative z-10"
                        />
                        <div
                          class="flex items-center gap-3 flex-1 relative z-10"
                        >
                          <span
                            class="w-8 h-8 ml-2 bg-gradient-to-br from-primary/10 to-primary/20 text-primary/80 rounded-full flex items-center justify-center text-sm font-semibold shadow-sm"
                          >
                            {{ getOptionLabel(optionIndex) }}
                          </span>
                          <span class="text-gray-700 font-medium">{{
                            option
                          }}</span>
                        </div>

                        <!-- Selection indicator -->
                        <div
                          v-if="
                            formQuiz[index + 1]?.selectedOption ===
                            String(optionIndex + 1)
                          "
                          class="absolute top-2 right-2 w-2 h-2 bg-primary/70 rounded-full shadow-sm animate-pulse"
                        />
                      </label>
                    </div>
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

        <QuizSidebar :form-quiz="formQuiz" :quiz="quiz" task="completion" />
      </div>
    </div>
  </div>
</template>
