<script setup lang="ts">
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
      bg: 'bg-gradient-to-br from-gray-50 via-gray-100 to-slate-200',
      border: 'border-gray-300',
      text: 'text-gray-700',
      badge: 'bg-gray-200 text-gray-700',
      dot: 'bg-gray-400',
      icon: 'text-gray-400',
    };
  }
  
  if (props.score >= 90) {
    return {
      bg: 'bg-gradient-to-br from-emerald-50 via-emerald-100 to-teal-100',
      border: 'border-emerald-300',
      text: 'text-emerald-800',
      badge: 'bg-emerald-500 text-white',
      dot: 'bg-emerald-500',
      icon: 'text-emerald-500',
    };
  }
  if (props.score >= 80) {
    return {
      bg: 'bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100',
      border: 'border-blue-300',
      text: 'text-blue-800',
      badge: 'bg-blue-500 text-white',
      dot: 'bg-blue-500',
      icon: 'text-blue-500',
    };
  }
  if (props.score >= 70) {
    return {
      bg: 'bg-gradient-to-br from-yellow-50 via-yellow-100 to-amber-100',
      border: 'border-yellow-300',
      text: 'text-yellow-800',
      badge: 'bg-yellow-500 text-white',
      dot: 'bg-yellow-500',
      icon: 'text-yellow-500',
    };
  }
  if (props.score >= 60) {
    return {
      bg: 'bg-gradient-to-br from-orange-50 via-orange-100 to-amber-100',
      border: 'border-orange-300',
      text: 'text-orange-800',
      badge: 'bg-orange-500 text-white',
      dot: 'bg-orange-500',
      icon: 'text-orange-500',
    };
  }
  return {
    bg: 'bg-gradient-to-br from-red-50 via-red-100 to-rose-100',
    border: 'border-red-300',
    text: 'text-red-800',
    badge: 'bg-red-500 text-white',
    dot: 'bg-red-500',
    icon: 'text-red-500',
  };
});

// Incomplete quiz styling (urgent/action needed)
const incompleteStyles = {
  bg: 'bg-gradient-to-br from-rose-50 via-rose-100 to-red-100',
  border: 'border-rose-400',
  text: 'text-rose-900',
  badge: 'bg-rose-500 text-white',
  dot: 'bg-rose-500',
  icon: 'text-rose-500',
  pulse: 'animate-pulse',
};

// Size-based classes
const sizeClasses = computed(() => {
  switch (props.size) {
    case 'xs':
      return {
        container: 'px-3 py-2',
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
        container: 'px-4 py-2.5',
        text: 'text-sm',
        icon: 'w-4 h-4',
        badge: 'px-2.5 py-0.5 text-sm',
        dot: 'w-1.5 h-1.5',
      };
  }
});

const currentStyles = computed(() => props.filledOut ? scoreStyles.value : incompleteStyles);
</script>

<template>
  <button 
    :class="[
      'w-full flex items-center justify-between rounded-xl border-2 shadow-lg',
      'transition-all duration-300 ease-in-out',
      currentStyles.bg,
      currentStyles.border,
      sizeClasses.container
    ]"
    @click="emit('click')"
  >
    <!-- Left Section: Quiz Info -->
    <div class="flex items-center gap-3">
      <!-- Icon -->
      <div :class="['p-2 rounded-lg', props.filledOut ? 'bg-white/70' : 'bg-white/80']">
        <svg 
          :class="[sizeClasses.icon, currentStyles.icon]" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2.5" 
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      
      <!-- Quiz Title -->
      <div class="flex flex-col items-start">
        <span 
          v-if="props.filledOut" 
          :class="[sizeClasses.text, currentStyles.text, 'font-semibold']"
        >
          Quiz #{{ props.quizId }}
        </span>
        <div v-else class="flex items-center gap-2">
          <span :class="[sizeClasses.text, currentStyles.text, 'font-semibold']">
            Quiz Incomplete
          </span>
          <span :class="['w-2 h-2 rounded-full', currentStyles.badge, incompleteStyles.pulse]" />
        </div>
      </div>
    </div>

    <!-- Right Section: Score -->
    <div v-if="props.filledOut && props.score !== null" class="flex items-center gap-3">
      <div class="flex flex-col items-end">
        <div class="flex items-center gap-2">
          <span :class="[currentStyles.dot, 'rounded-full', sizeClasses.dot]" />
          <span :class="[sizeClasses.text, currentStyles.text, 'font-bold']">
            {{ props.score }}%
          </span>
        </div>
        <span v-if="props.size === 'xl'" class="text-xs text-gray-600 mt-0.5">
          correct answers
        </span>
      </div>
      
      <!-- Score Badge -->
      <div 
        :class="[
          'rounded-lg shadow-md font-semibold',
          currentStyles.badge,
          sizeClasses.badge
        ]"
      >
        <span v-if="props.score >= 90">Excellent!</span>
        <span v-else-if="props.score >= 80">Great!</span>
        <span v-else-if="props.score >= 70">Good</span>
        <span v-else-if="props.score >= 60">Fair</span>
        <span v-else>Try Again</span>
      </div>
    </div>
  </button>
</template>
