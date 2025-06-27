<script setup lang="ts">
import { PlayIcon } from "@heroicons/vue/24/outline";
import { formatDate } from "~/utils/date/date";
import { useRouter } from "vue-router";
import type { GrammarRule } from "~/types/grammar-rule";
import { getColorStyleClass } from "~/utils/learning/grammar";

const router = useRouter();
const isLoading = ref(false);
const props = withDefaults(
  defineProps<{
    loading?: boolean;
    rule?: GrammarRule | null;
    quizs?: any[];
  }>(),
  {
    loading: false,
    rule: null,
    quizs: () => [],
  },
);

const handleGenerateQuiz = async () => {
  try {
    isLoading.value = true;
    // Call quizzes endpoint to generate a quiz for ruleId props.rule?.id
    const response = await $fetch(`/api/quizzes/${props.rule?.id}`, {
      method: "PUT",
    });
    console.log("has generated a quizz with the id: ", response);
    // response is the id of the new generated quiz
    if (response) {
      // router.push(`/learning/quizzes/${response}`);
      await navigateTo({
        path: `/learning/quizzes/${response}`,
      });
    }
    isLoading.value = false;
  } catch (err) {
    console.error(
      "An error occured while generating a new quiz, please try again.",
      err,
    );
    isLoading.value = false;
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
            <span class="font-medium text-primary">{{
              props.rule?.ruleNameTranslation || "this rule"
            }}</span>
          </p>
        </div>

        <!-- Quiz List -->
        <div class="space-y-4">
          <div v-if="!props.quizs.length" class="text-center py-12">
            <div
              class="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full flex items-center justify-center shadow-sm"
            >
              <PlayIcon class="w-10 h-10 text-gray-400" />
            </div>
            <p class="text-gray-600 text-base font-medium mb-2">
              No quizzes completed yet
            </p>
            <p class="text-gray-500 text-sm">
              Start your first quiz to track progress
            </p>
          </div>

          <div v-else class="space-y-4">
            <div
              v-for="(quiz, index) in props.quizs"
              :key="index"
              class="group bg-white rounded-xl p-5 border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300 cursor-pointer"
              @click="router.push(`/learning/quiz/${quiz.id}`)"
            >
              <div class="flex items-start justify-between">
                <!-- Left Content -->
                <div class="flex-1 min-w-0">
                  <!-- Quiz ID and Date -->
                  <div class="flex items-center gap-4 mb-2">
                    <div class="flex items-center gap-2">
                      <div
                        class="w-10 h-10 bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl flex items-center justify-center shadow-sm"
                      >
                        <span class="text-sm font-bold text-primary"
                          >#{{ quiz.id }}</span
                        >
                      </div>
                    </div>

                    <div class="flex flex-col">
                      <span
                        class="text-xs font-medium text-gray-500 uppercase tracking-wide"
                      >
                        Completed
                      </span>
                      <span class="text-sm font-medium text-gray-700">
                        {{ formatDate(quiz.createdAt) }}
                      </span>
                    </div>
                  </div>

                  <!-- Score Section -->
                  <div class="flex items-center justify-end">
                    <span
                      class="font-medium mr-2"
                      :class="getColorStyleClass(quiz.score)"
                      >Score</span
                    >
                    <span
                      class="font-bold"
                      :class="getColorStyleClass(quiz.score)"
                    >
                      {{ quiz.score }}%
                    </span>
                  </div>

                  <!-- Progress Bar -->
                  <div class="w-full">
                    <progress
                      class="progress w-full"
                      :class="getColorStyleClass(quiz.score)"
                      :value="quiz.score"
                      max="100"
                    />
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
              :class="{ 'btn-disabled': isLoading }"
              @click="handleGenerateQuiz"
            >
              <span v-if="isLoading" class="loading loading-spinner" />
              <PlayIcon v-else class="w-5 h-5" />
              <span>Start New Quiz</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
