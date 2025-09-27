<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string | null;
    size?: 'sm' | 'xs';
    level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    prefix: boolean;
  }>(),
  {
    title: null,
    size: 'sm',
    level: 'beginner',
    prefix: true,
  },
);
const emit = defineEmits(["click"]);

// Dynamic background classes based on level
const backgroundClasses = computed(() => {
  switch (props.level) {
    case 'beginner':
      return 'bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 shadow-lg shadow-emerald-200/50 hover:shadow-emerald-300/60';
    case 'intermediate':
      return 'bg-gradient-to-br from-amber-400 via-amber-500 to-orange-600 shadow-lg shadow-amber-200/50 hover:shadow-amber-300/60';
    case 'advanced':
      return 'bg-gradient-to-br from-pink-400 via-pink-500 to-rose-600 shadow-lg shadow-pink-200/50 hover:shadow-pink-300/60';
    case 'expert':
    default:
      return 'bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 shadow-lg shadow-blue-200/50 hover:shadow-blue-300/60';
  }
});

// Dynamic icon classes based on level
const iconClasses = computed(() => {
  switch (props.level) {
    case 'beginner':
      return 'text-emerald-100';
    case 'intermediate':
      return 'text-amber-100';
    case 'advanced':
      return 'text-pink-100';
    case 'expert':
    default:
      return 'text-blue-100';
  }
});

// Size classes
const sizeClasses = computed(() => {
  switch (props.size) {
    case 'xs':
      return 'px-3 py-1.5 text-xs';
    case 'sm':
    default:
      return 'px-4 py-2 text-sm';
  }
});
</script>

<template>
  <button 
    :class="[
      'flex items-center gap-2 font-medium text-white rounded-lg cursor-pointer border-0 outline-none focus:outline-none',
      backgroundClasses,
      sizeClasses
    ]"
    @click="emit('click')"
  >
    <!-- Icon with enhanced styling -->
    <svg class="w-4 h-4" :class="iconClasses" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
    </svg>
    
    <!-- Text with enhanced typography -->
    <span class="font-medium">
      <span v-if="props.prefix">Key Rule:</span> 
      <span class="ml-1">{{ props.title }}</span>
    </span>
  </button>
</template>
