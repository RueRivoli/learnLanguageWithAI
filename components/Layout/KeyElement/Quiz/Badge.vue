<script setup lang="ts">
import { ArrowTrendingUpIcon, QuestionMarkCircleIcon } from '@heroicons/vue/24/solid';

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

// Score-based styling with modern colors
const scoreStyles = computed(() => {
  if (props.score === null || props.score === undefined) {
    return {
      bg: 'bg-gray-50',
      border: 'border-gray-300',
      text: 'text-gray-700',
      badge: 'bg-gray-200 text-gray-700',
      dot: 'bg-gray-400',
      icon: 'text-gray-50',
    };
  }
  
  if (props.score >= 80) {
    return {
      bg: 'bg-success-50',
      border: 'border-success',
      text: 'text-success',
      badge: 'bg-success text-white',
      dot: 'bg-success',
      icon: 'bg-success-50 text-success',
    };
  }
  if (props.score >= 60) {
    return {
      bg: 'bg-blue-50',
      border: 'border-info',
      text: 'text-info',
      badge: 'bg-info text-white',
      dot: 'bg-info',
      icon: 'bg-info-50 text-info',
    };
  }
  if (props.score >= 40) {
    return {
      bg: 'bg-warning-50',
      border: 'border-warning',
      text: 'text-warning',
      badge: 'bg-warning text-white',
      dot: 'bg-warning',
      icon: 'bg-warning-50 text-warning',
    };
  }
  return {
    bg: 'bg-error-50',
    border: 'border-error',
    text: 'text-error',
    badge: 'bg-error text-white',
    dot: 'bg-error',
    icon: 'bg-error-50 text-error',
  };
});

// Incomplete quiz styling (urgent/action needed)
const incompleteStyles = {
  bg: 'bg-rose-50',
  border: 'border-rose-900',
  text: 'text-rose-900',
  badge: 'bg-rose-500 text-white',
  dot: 'bg-rose-900',
  icon: 'text-error',
};

// Size-based classes
const sizeClasses = computed(() => {
  switch (props.size) {
    case 'xs':
      return {
        container: 'px-2',
        text: 'text-xs',
        icon: 'w-3.5 h-3.5',
        badge: 'px-2 py-0.5 text-xs',
        dot: 'w-1.5 h-1.5',
      };
    case 'xl':
      return {
        container: 'px-5 py-3.5',
        text: 'text-base',
        icon: 'w-5 h-5',
        badge: 'px-3 py-1 text-sm',
        dot: 'w-2 h-2',
      };
    case 'sm':
    default:
      return {
        container: 'px-2 py-1.5',
        text: 'text-sm',
        icon: 'w-5 h-5',
        badge: 'px-2.5 py-0.5 text-sm',
        dot: 'w-1.5 h-1.5',
      };
  }
});

const currentStyles = computed(() => props.filledOut ? scoreStyles.value : incompleteStyles);
</script>

<template>
  <button class="btn btn-error btn-outline btn-sm rounded-lg cursor-pointer" v-if="!props.filledOut">
    <div class="flex items-center gap-3">
      <div class="rounded-lg flex items-center">
        <ArrowTrendingUpIcon :class="[sizeClasses.icon, currentStyles.icon]" />
        <span class="ml-2">Complete Quiz</span>
      </div>
    </div>
  </button>
  <button 
    v-else
    :class="[
      'flex items-center justify-between rounded-lg border-2 shadow-lg',
      'transition-all duration-300 ease-in-out',
      currentStyles.bg,
      currentStyles.border,
      sizeClasses.container,
      {'cursor-pointer': !props.filledOut}
    ]"
    @click="emit('click')"
  >
    <div class="flex items-center gap-3">
      <div class="rounded-lg flex items-center">
        <question-mark-circle-icon v-if="props.filledOut" :class="[sizeClasses.icon, currentStyles.icon]"  />
        <ArrowTrendingUpIcon :class="[sizeClasses.icon, currentStyles.icon]" v-else />
        <div class="ml-2">
          <span 
            v-if="props.filledOut" 
            :class="[sizeClasses.text, currentStyles.text, 'font-semibold']"
          >
            Quiz
          </span>
          <div v-else class="flex items-center gap-2">
            <span :class="[sizeClasses.text, currentStyles.text, 'font-semibold']">
              Complete Quiz
            </span>
          </div>
        </div>
      </div>
      

    </div>

    <!-- Right Section: Score -->
    <div v-if="props.filledOut && props.score !== null" class="ml-2 flex items-center gap-3">
      <div class="flex flex-col items-end">
        <div class="flex flex-col items-center">
          <span :class="[sizeClasses.text, currentStyles.text, 'font-bold']">
            {{ props.score }}%
          </span>
        </div>
      </div>
    </div>
  </button>
</template>
