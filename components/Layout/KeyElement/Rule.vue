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
    return 'btn-success';
    return 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-md shadow-emerald-100'; // Refined mint/teal gradient
    case 'intermediate':
    return 'btn-warning';
      return 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-md shadow-amber-100'; // Refined amber/orange gradient
    case 'advanced':
      return 'btn-error';
      return 'bg-gradient-to-br from-pink-500 to-rose-600 shadow-md shadow-pink-100'; // Refined pink/rose gradient
    case 'expert':
    default:
      return 'bg-gradient-to-br from-blue-600 to-indigo-700 shadow-md shadow-blue-100';
  }
});

// Dynamic text color based on level
const textClasses = computed(() => {
  return 'text-white font-semibold'; // White text for all levels
});
//        :class="['px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2 relative overflow-hidden btn btn-soft btn-secondary', backgroundClasses, textClasses]"
</script>

<template>
    <button 
  :class="['text-sm font-medium rounded-lg flex items-center gap-2 relative overflow-hidden btn btn-outline btn-sm', backgroundClasses]"
        @click="emit('click')"
    >
        <!-- Subtle texture overlay for all levels -->
        <div 
            class="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:4px_4px]"
        ></div>
        
        <svg class="w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
       <span :class="'text-' + props.size" class="font-medium relative z-10"><span v-if="props.prefix">Key Rule :</span> {{ props.title }}</span> 
    </button>
</template>
