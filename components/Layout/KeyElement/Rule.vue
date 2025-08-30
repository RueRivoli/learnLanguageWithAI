<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string | null;
    size?: 'sm' | 'xs';
    level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  }>(),
  {
    title: null,
    size: 'sm',
    level: 'beginner',
  },
);
const emit = defineEmits(["click"]);

// Dynamic background classes based on level
const backgroundClasses = computed(() => {
  switch (props.level) {
    case 'beginner':
      return 'bg-gradient-to-r from-emerald-500 to-green-600';
    case 'intermediate':
      return 'bg-gradient-to-r from-amber-600 to-orange-700';
    case 'advanced':
      return 'bg-gradient-to-r from-error to-red-600';
    case 'expert':
    default:
      return 'bg-gradient-to-r from-blue-500 to-indigo-600';
  }
});
</script>

<template>
    <button 
        :class="['px-4 py-2 text-white text-sm font-medium rounded-lg shadow-sm flex items-center gap-2', backgroundClasses]"
        @click="emit('click')"
    >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
       <span :class="'text-' + props.size" class="font-medium">Key Rule : {{ props.title }}</span> 
    </button>
</template>
