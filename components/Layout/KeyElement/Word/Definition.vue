<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    isActive: boolean;
    word?: any;
    size?: 'sm' | 'xs';
  }>(),
  {
    word: null,
    size: 'sm',
    isActive: false,
  },
);
const emit = defineEmits(["click"]);

/*bg-gradient-to-r from-primary/15 to-primary/25 border border-primary/20 */
// text-slate-800

// pastel:
//bg-gradient-to-r from-primary/15 to-primary/25
</script>

<template>
    <!-- Enhanced Word Card -->
 
    <div 
        class="bg-gradient-to-br from-blue-500 to-indigo-600 border border-primary/20 rounded-xl p-4 cursor-pointer transition-all duration-300"
        @click="emit('click')"
    >
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <!-- text-slate-800 -->
                <span class="text-base font-large text-white font-serif">
                    {{ props.word.text }}
                </span>
                 <!-- text-slate-600 -->
                <span class="text-sm text-white font-light italic">
                    {{ props.word.textEn || 'Translation not available' }}
                </span>
            </div>
            <!-- <svg 
                class="w-4 h-4 text-white transition-all duration-300"
                :class="{ 'rotate-180': isActive }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
            >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg> -->
        </div>
                      
                      <!-- Example Sentences (shows when clicked) -->
        <div v-if="isActive && (word.sentence || word.sentenceEn)"
          class="mt-3 pt-3 border-t border-slate-50/50 space-y-2 animate-fade-in"
        >
            <div
              v-if="word.sentence"
              class="text-sm text-white rounded-lg"
              >
                <span class="font-medium underline">Ex:</span> {{ word.sentence }}
            </div>
                        <div
                          v-if="word.sentenceEn"
                          class="text-sm text-white"
                        >
                        <div class="ml-6">
                          <span >{{ word.sentenceEn }}</span>
                        </div>
                        
                        </div>
                      </div>
</div>
</template>

<style>
/* Styles are now handled by CSS variables in main.css */
</style>