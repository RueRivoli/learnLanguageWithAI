<script setup lang="ts">
// import type { Quiz } from "~/types/quiz.ts";
import { PlayIcon, EyeIcon } from "@heroicons/vue/24/outline";
import { formatDate } from "~/utils/date/date";
import { useRouter } from "vue-router";

const router = useRouter();

const props = withDefaults(
  defineProps<{
    loading: boolean;
    ruleName: string | null;
    quizs: any[];
  }>(),
  {
    loading: false,
    ruleName: "",
    quizs: () => [],
  },
);

const handleGenerateQuiz = async () => {
  console.log("handleGenerateQuiz");
  try {
    const response = await $fetch(`/api/quizzes/${1}`, {
      method: "PUT",
    });
    if (response) {
      router.push(`/learning/quizzes/${response}`);
    }
  } catch (err) {
    console.error("Error generating quiz:", err);
  }
};
</script>

<template>
  <div class="w-full">
    <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
      <!-- Loading State -->
      <div v-if="loading" class="w-full h-64 flex justify-center items-center">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"
        />
      </div>

      <div v-else class="space-y-6">
        <!-- Header -->
        <div class="border-b border-gray-100 pb-4">
          <h3 class="text-lg font-semibold text-gray-900 mb-1">
            Recent Quizzes
          </h3>
          <p class="text-sm text-gray-600">
            Last attempts on
            <span class="font-medium text-primary">{{ ruleName }}</span>
          </p>
        </div>

        <!-- Quiz List -->
        <div class="space-y-3">
          <div v-if="!props.quizs.length" class="text-center py-8">
            <div
              class="w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center"
            >
              <PlayIcon class="w-8 h-8 text-gray-400" />
            </div>
            <p class="text-gray-500 text-sm font-medium">
              No quizzes completed yet
            </p>
            <p class="text-gray-400 text-xs mt-1">
              Start your first quiz to track progress
            </p>
          </div>

          <div v-else class="space-y-3">
            <div
              v-for="(quiz, index) in props.quizs"
              :key="quiz.id"
              class="bg-gray-50 rounded-lg p-4 border border-gray-100 hover:border-gray-200 transition-colors duration-200"
            >
              <div class="flex items-center justify-between">
                <div class="flex-1">
                  <div class="flex items-center gap-3 mb-2">
                    <div
                      class="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center"
                    >
                      <span class="text-xs font-semibold text-primary"
                        >#{{ quiz.id }}</span
                      >
                    </div>
                    <div class="text-sm text-gray-600">
                      {{ formatDate(quiz.createdAt) }}
                    </div>
                  </div>

                  <div class="flex items-center gap-3">
                    <div class="flex-1">
                      <div class="flex items-center gap-2">
                        <div class="w-full bg-gray-200 rounded-full h-2">
                          <div
                            class="h-2 rounded-full transition-all duration-300"
                            :class="
                              quiz.score >= 80
                                ? 'bg-green-500'
                                : quiz.score >= 60
                                  ? 'bg-yellow-500'
                                  : 'bg-red-500'
                            "
                            :style="{ width: `${quiz.score}%` }"
                          />
                        </div>
                        <span
                          class="text-sm font-semibold text-gray-700 min-w-[3rem]"
                        >
                          {{ quiz.score }}%
                        </span>
                      </div>
                    </div>

                    <button
                      class="p-2 text-gray-400 hover:text-gray-600 hover:bg-white rounded-lg transition-colors duration-200"
                      title="View quiz details"
                      @click="router.push(`/learning/quiz/${quiz.id}`)"
                    >
                      <EyeIcon class="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Button -->
        <div class="pt-4 border-t border-gray-100">
          <button
            class="w-full bg-primary cursor-pointer hover:bg-primary/90 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            type="submit"
            @click="handleGenerateQuiz"
          >
            <PlayIcon class="w-5 h-5" />
            <span>Start New Quiz</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

