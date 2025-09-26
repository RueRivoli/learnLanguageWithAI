<script setup lang="ts">
import { AcademicCapIcon } from "@heroicons/vue/24/outline";
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
</script>

<template>
  <div
    class="group bg-primary/10 rounded-lg p-4 border-2 border-primary/20 hover:bg-primary/15 hover:border-primary/30 transition-all duration-200 cursor-pointer"
    @click="router.push(`/learning/quiz/${props.quiz.id}`)"
  >
    <div class="flex items-center justify-between">
      <!-- Left: Academic Cap Icon -->
      <div class="flex items-center">
        <div class="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
          <AcademicCapIcon class="w-6 h-6 text-primary" />
        </div>
      </div>

      <!-- Rule Name and Quiz ID -->
      <div class="flex-1 ml-4">
        <h3 class="text-gray-600 font-medium text-base">
          {{ props.quiz.ruleName || 'Quiz' }} #{{ props.quiz.id }}
        </h3>
      </div>

      <!-- Right: Score -->
      <div class="flex items-center">
        <div class="bg-gray-100 rounded-lg px-3 py-2 border border-gray-300">
          <div class="flex items-baseline gap-1">
            <span class="text-2xl font-bold text-primary">
              {{ props.quiz.score }}
            </span>
            <span class="text-lg font-normal text-gray-600">
              /100
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
