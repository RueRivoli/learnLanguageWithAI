<script setup lang="ts">
import { CheckIcon } from "@heroicons/vue/24/solid";
import { QuestionMarkCircleIcon } from "@heroicons/vue/24/outline";

import type { QuizQuestion, FormQuizState } from "~/types/quiz.ts";
import { parseQuestions } from "~/utils/learning/quiz";

definePageMeta({
  layout: "authenticated",
});

const route = useRoute();
const quizId = route.params.id;
const isLoading = ref<boolean>(true);
const quiz = ref<QuizQuestion[]>([]);
const formQuiz = ref<FormQuizState>({});
const isQuizComplete = computed(() => {
  let complete = true;
  Object.keys(formQuiz.value).forEach((key: number) => {
    complete = complete && formQuiz.value[key].selectedOption !== null;
  });
  return complete;
});
const correctAnswers = ref(null);

const calculateScoreTotal = () => {
  return Object.keys(formQuiz.value).reduce((acc: number, key: number, _) => {
    const isCorrect =
      formQuiz.value[key].correctAnswer === formQuiz.value[key].selectedOption;
    return isCorrect ? acc + 1 : acc;
  }, 0);
};

const initializeFormQuiz = (questions: QuizQuestion[]): void => {
  formQuiz.value = questions.reduce(
    (acc: FormQuizState, currentValue: QuizQuestion, index: number) => {
      acc[index + 1] = {
        selectedOption: null,
        correctAnswer: currentValue.correctAnswer,
      };
      return acc;
    },
    {},
  );
};

const getFinalScoreQuiz = () => {};
const getQuizData = async () => {
  const { data } = await useFetch(`/api/quizzes/${quizId}`);
  const questionnary = data.value;
  if (questionnary) {
    quiz.value = questionnary.map((question) => parseQuestions(question));
    initializeFormQuiz(quiz.value);
    isLoading.value = false;
  }
};

const handleSubmit = () => {
  console.log("Form submitted:", formQuiz.value);
  const score = calculateScoreTotal();
  console.log("score", score);
  // Add your submission logic here
};

await getQuizData();
</script>

<template>
  <div>
    <div class="w-full mt-2 grid grid-cols-4 gap-2">
      <div class="col-span-3">
        <div class="border-b border-zinc-200">
          <div>
            <div>
              <div class="list bg-base-100 rounded-box shadow-md">
                <div
                  v-if="isLoading"
                  class="w-full h-72 flex justify-center items-center"
                >
                  <span class="loading loading-bars loading-xl" />
                </div>
                <div v-else class="p-4 bg-white/20">
                  <LayoutHeadingPlus
                    title="Quiz"
                    description="Track your learning progress"
                  >
                    <QuestionMarkCircleIcon class="h-6 w-6 text-primary" />
                  </LayoutHeadingPlus>

                  <div class="p-3">
                    <div class="pb-4">
                      <span class="text-xl font-bold"
                        >Choose the right answer</span
                      >
                    </div>
                    <form @submit.prevent="handleSubmit">
                      <div class="form-control">
                        <div
                          v-for="(q, n) in quiz"
                          :key="n"
                          class="mb-4 text-pretty text-neutral"
                        >
                          <div class="mb-2">
                            <label>
                              <span class="font-semibold text-lg"
                                >{{ n + 1 }}. {{ q.question }}</span
                              >
                            </label>
                          </div>
                          <div class="flex gap-5">
                            <label
                              class="label cursor-pointer gap-2 text-neutral"
                            >
                              <input
                                v-model="formQuiz[n + 1].selectedOption"
                                type="radio"
                                :name="`question-${n + 1}`"
                                class="radio radio-xs"
                                value="1"
                              />
                              <span class="label-text">{{ q.option1 }}</span>
                            </label>
                            <label
                              class="label cursor-pointer gap-2 text-neutral"
                            >
                              <input
                                v-model="formQuiz[n + 1].selectedOption"
                                type="radio"
                                :name="`question-${n + 1}`"
                                class="radio radio-xs"
                                value="2"
                              />
                              <span class="label-text">{{ q.option2 }}</span>
                            </label>
                            <label
                              class="label cursor-pointer gap-2 text-neutral"
                            >
                              <input
                                v-model="formQuiz[n + 1].selectedOption"
                                type="radio"
                                :name="`question-${n + 1}`"
                                class="radio radio-xs"
                                value="3"
                              />
                              <span class="label-text">{{ q.option3 }}</span>
                            </label>
                            <label
                              class="label cursor-pointer gap-2 text-neutral"
                            >
                              <input
                                v-model="formQuiz[n + 1].selectedOption"
                                type="radio"
                                :name="`question-${n + 1}`"
                                class="radio radio-xs"
                                value="4"
                              />
                              <span class="label-text">{{ q.option4 }}</span>
                            </label>
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        :disabled="!isQuizComplete"
                        class="btn btn-primary mt-4"
                      >
                        <CheckIcon class="h-5 w-5 font-bold" />
                        <span>Get your score</span>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-2 border-l border-zinc-950/5">side text</div>
    </div>
  </div>
</template>
