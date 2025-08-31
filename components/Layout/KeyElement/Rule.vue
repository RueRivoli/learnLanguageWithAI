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
      return 'bg-[#e6f2f0]'; // Soft mint/aqua color
    case 'intermediate':
      return 'bg-[#f0e6d6]'; // Warmer, more pronounced beige color
    case 'advanced':
      return 'bg-[#f4e6f2]'; // Soft pink/mauve color
    case 'expert':
    default:
      return 'bg-gradient-to-r from-blue-500 to-indigo-600';
  }
});

// Dynamic text color based on level
const textClasses = computed(() => {
  switch (props.level) {
    case 'beginner':
    case 'intermediate':
    case 'advanced':
      return 'text-gray-700'; // Darker text for better contrast on light background
    default:
      return 'text-white';
  }
});
</script>

<template>
    <button 
        :class="['px-4 py-2 text-sm font-medium rounded-lg shadow-sm flex items-center gap-2 relative overflow-hidden', backgroundClasses, textClasses]"
        @click="emit('click')"
    >
        <!-- Grid overlay for beginner, intermediate, and advanced levels -->
        <div 
            v-if="props.level === 'beginner'" 
            class="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:4px_4px]"
        ></div>
        <div 
            v-if="props.level === 'intermediate'" 
            class="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:4px_4px]"
        ></div>
        <div 
            v-if="props.level === 'advanced'" 
            class="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:4px_4px]"
        ></div>
        
        <svg class="w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
       <span :class="'text-' + props.size" class="font-medium relative z-10">Key Rule : {{ props.title }}</span> 
    </button>
</template>
