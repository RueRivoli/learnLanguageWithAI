<script setup lang="ts">
import { ClockIcon } from "@heroicons/vue/24/outline";
import { formatDate } from "~/utils/date/date";
import { useRouter } from "vue-router";
const router = useRouter();
const props = withDefaults(
  defineProps<{
    quiz: any;
  }>(),
  {
    quiz: null,
  },
);


const getScoreColor = (score: number) => {
  if (score >= 90) return 'bg-emerald-100 text-emerald-700 border-emerald-200';
  if (score >= 80) return 'bg-blue-100 text-blue-700 border-blue-200';
  if (score >= 70) return 'bg-yellow-100 text-yellow-700 border-yellow-200';
  if (score >= 60) return 'bg-orange-100 text-orange-700 border-orange-200';
  return 'bg-red-100 text-red-700 border-red-200';
};
</script>

<template>
    <div
        class="group bg-gray-50 rounded-lg p-4 border border-gray-100 hover:bg-white hover:border-gray-200 hover:shadow-sm transition-all duration-200 cursor-pointer"
              @click="router.push(`/learning/quiz/${props.quiz.id}`)"
            >
              <div class="flex items-center justify-between">
                <!-- Quiz Info -->
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span class="text-sm font-semibold text-primary">#{{ props.quiz.id }}</span>
                  </div>
                  
                  <div class="flex items-center gap-2 text-sm text-gray-600">
                    <ClockIcon class="w-4 h-4" />
                    <span>{{ formatDate(props.quiz.createdAt) }}</span>
                  </div>
                </div>

                <!-- Score -->
                <div class="flex items-center gap-3">
                  <div class="text-right">
                    <div class="text-xs text-gray-500 mb-1">Score</div>
                    <div class="text-lg font-bold text-gray-900">{{ props.quiz.score }}%</div>
                  </div>
                  
                  <!-- Score Badge -->
                  <div class="px-3 py-1 rounded-full text-sm font-medium border"
                       :class="getScoreColor( props.quiz.score )">
                    {{  props.quiz.score  >= 90 ? 'Excellent' :  props.quiz.score  >= 80 ? 'Good' :  props.quiz.score  >= 70 ? 'Fair' :  props.quiz.score  >= 60 ? 'Needs Work' : 'Review' }}
                  </div>
                </div>
              </div>

              <!-- Progress Bar -->
              <div class="mt-3">
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="h-2 rounded-full transition-all duration-300"
                       :class="getScoreColor( props.quiz.score ).split(' ')[0].replace('bg-', 'bg-gradient-to-r from-').replace('-100', '-500') + ' to-' + getScoreColor( props.quiz.score ).split(' ')[0].replace('bg-', '').replace('-100', '-600')"
                       :style="{ width: `${ props.quiz.score }%` }">
                  </div>
                </div>
              </div>
    </div>
</template>
