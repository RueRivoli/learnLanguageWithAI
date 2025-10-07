<script setup lang="ts">
import { getScoreBackgroundColorClass } from '~/utils/learning/quiz';

const props = withDefaults(
  defineProps<{
    quizId?: number | null;
    score?: number | null;
    size?: 'sm' | 'xs' | 'xl';
    filledOut: boolean;
  }>(),
  {
    quizId: null,
    score: null,
    size: 'sm',
    filledOut: true,
  },
);
const emit = defineEmits(["click"]);

// Dynamic text color based on score
const scoreColorClass = computed(() => {
  if (props.score === null || props.score === undefined) return '';
  if (props.score > 0 && props.score < 40) {
    return 'text-xl text-error';
  } else if (props.score >= 40 && props.score < 70) {
    return 'text-xl text-warning';
  } else if (props.score >= 70) {
    return 'text-xl text-success';
  }
  return 'text-xl text-neutral';
});

// Dynamic background gradient based on filledOut status
const backgroundGradientClass = computed(() => {
  if (!props.filledOut) {
    return 'bg-gradient-to-r from-red-600 to-rose-700';
  }
  return 'bg-gradient-to-r from-gray-500 to-slate-600';
});
</script>

<template>
    <button 
        :class="['px-4 py-2 text-white text-sm font-medium rounded-lg shadow-sm flex items-center gap-2 justify-between', backgroundGradientClass]"
        @click="emit('click')"
    >
    <div class="flex items-center gap-2">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span v-if="props.filledOut" :class="'text-' + props.size">
          Quiz #{{ props.quizId }}
        </span>
        <span v-else :class="'text-' + props.size" class="font-medium">Quiz Incomplete</span>
    </div>
    <div class="flex items-center gap-2">
      <div v-if="props.score" class="w-1.5 h-1.5 rounded-full" :class="getScoreBackgroundColorClass(props.score)" />
      <span v-if="props.filledOut" :class="'text-' + props.size"><span :class="scoreColorClass">{{ props.score }}%</span> <span class="text-xs text-white ml-2">of correct answers</span></span> 
    </div>
    </button>
</template>
