<script setup lang="ts">
import { PlayIcon, TrophyIcon, ClockIcon } from "@heroicons/vue/24/outline";
import { formatDate } from "~/utils/date/date";
import { handleGenerationQuiz } from "~/utils/learning/quiz";
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
  if (!props.rule?.id) return;
  isLoading.value = true;
  await handleGenerationQuiz(props.rule?.id, "/learning/quizzes");
  isLoading.value = false;
}

// const handleGenerateQuiz = async () => {
//   try {
//     isLoading.value = true;
//     // Call quizzes endpoint to generate a quiz for ruleId props.rule?.id
//     const response = await $fetch(`/api/quizzes/${props.rule?.id}`, {
//       method: "PUT",
//     });
//     console.log("has generated a quizz with the id: ", response);
//     // response is the id of the new generated quiz
//     if (response) {
//       // router.push(`/learning/quizzes/${response}`);
//       await navigateTo({
//         path: `/learning/quizzes/${response.quizId}`,
//       });
//     }
//     isLoading.value = false;
//   } catch (err) {
//     console.error(
//       "An error occured while generating a new quiz, please try again.",
//       err,
//     );
//     isLoading.value = false;
//   }
// };

const getScoreColor = (score: number) => {
  if (score >= 90) return 'bg-emerald-100 text-emerald-700 border-emerald-200';
  if (score >= 80) return 'bg-blue-100 text-blue-700 border-blue-200';
  if (score >= 70) return 'bg-yellow-100 text-yellow-700 border-yellow-200';
  if (score >= 60) return 'bg-orange-100 text-orange-700 border-orange-200';
  return 'bg-red-100 text-red-700 border-red-200';
};
</script>

<template>
  <div class="w-full">
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <!-- Loading State -->
      <div v-if="loading" class="w-full h-32 flex justify-center items-center">
        <div class="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" />
      </div>

      <div v-else class="space-y-5">
        <!-- Header -->
        <div class="border-b border-gray-100 pb-4">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg">
              <TrophyIcon class="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900">
                Recent Quizzes
              </h3>
              <p class="text-sm text-gray-600">
                Progress on
                <span class="font-medium text-primary">
                  {{ props.rule?.ruleNameTranslation || "this rule" }}
                </span>
              </p>
            </div>
          </div>
        </div>

        <!-- Quiz List -->
        <div class="space-y-3">
          <div v-if="!props.quizs.length" class="text-center py-8">
            <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full flex items-center justify-center">
              <PlayIcon class="w-8 h-8 text-gray-400" />
            </div>
            <p class="text-gray-600 font-medium mb-1">
              No quizzes completed yet
            </p>
            <p class="text-gray-500 text-sm">
              Start your first quiz to track progress
            </p>
          </div>

          <div v-else class="space-y-3">
            <div
              v-for="(quiz, index) in props.quizs"
              :key="index"
              class="group bg-gray-50 rounded-lg p-4 border border-gray-100 hover:bg-white hover:border-gray-200 hover:shadow-sm transition-all duration-200 cursor-pointer"
              @click="router.push(`/learning/quiz/${quiz.id}`)"
            >
              <div class="flex items-center justify-between">
                <!-- Quiz Info -->
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span class="text-sm font-semibold text-primary">#{{ quiz.id }}</span>
                  </div>
                  
                  <div class="flex items-center gap-2 text-sm text-gray-600">
                    <ClockIcon class="w-4 h-4" />
                    <span>{{ formatDate(quiz.createdAt) }}</span>
                  </div>
                </div>

                <!-- Score -->
                <div class="flex items-center gap-3">
                  <div class="text-right">
                    <div class="text-xs text-gray-500 mb-1">Score</div>
                    <div class="text-lg font-bold text-gray-900">{{ quiz.score }}%</div>
                  </div>
                  
                  <!-- Score Badge -->
                  <div class="px-3 py-1 rounded-full text-sm font-medium border"
                       :class="getScoreColor(quiz.score)">
                    {{ quiz.score >= 90 ? 'Excellent' : quiz.score >= 80 ? 'Good' : quiz.score >= 70 ? 'Fair' : quiz.score >= 60 ? 'Needs Work' : 'Review' }}
                  </div>
                </div>
              </div>

              <!-- Progress Bar -->
              <div class="mt-3">
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="h-2 rounded-full transition-all duration-300"
                       :class="getScoreColor(quiz.score).split(' ')[0].replace('bg-', 'bg-gradient-to-r from-').replace('-100', '-500') + ' to-' + getScoreColor(quiz.score).split(' ')[0].replace('bg-', '').replace('-100', '-600')"
                       :style="{ width: `${quiz.score}%` }">
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Button -->
          <div class="pt-4 border-t border-gray-100">
            <button
              class="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
              :disabled="isLoading"
              @click="handleGenerateQuiz"
            >
              <span v-if="isLoading" class="animate-spin cursor-pointer rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              <PlayIcon v-else class="w-5 h-5" />
              <span>Start New Quiz</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
