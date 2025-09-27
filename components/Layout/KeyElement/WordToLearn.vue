<script setup lang="ts">
import type { Lesson } from '~/types/lessons/lesson';
import type { WordContent } from '~/types/vocabulary/word';

const props = withDefaults(
  defineProps<{
    activeWordTranslation: number;
    index: number;
    word: Lesson['newWords'][0] | null;
    size?: 'sm' | 'xs';
  }>(),
  {
    activeWordTranslation: 0,
    index: 0,
    word: null,
  },
);
const emit = defineEmits(["click"]);

/*bg-gradient-to-r from-primary/15 to-primary/25 border border-primary/20 */
// text-slate-800
</script>

<template>
    <div class="bg-gradient-to-r from-primary/15 to-primary/25 border border-primary/20 rounded-2xl p-4 cursor-pointer transition-all duration-300" @click="toggleWordTranslation(index)">
        <div class="flex items-center justify-between">
           <div class="flex items-center gap-4">
                <span class="text-base font-medium text-slate-800 font-serif">
                    {{ props.word?.text }}
                </span>
                <span class="text-sm text-slate-600 font-light italic">
                 {{ props.word?.textEn || 'Translation not available' }}
                </span>
            </div>
            <svg 
                class="w-4 h-4 text-slate-500 transition-all duration-300"
                :class="{ 'rotate-180': props.activeWordTranslation === props.index }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
        </div>
                      
                      <!-- Example Sentences (shows when clicked) -->
                      <div
                        v-if="props.activeWordTranslation === props.index && (props.word?.sentence || props.word?.sentenceEn)"
                        class="mt-3 pt-3 border-t border-primary/20 space-y-2 animate-fade-in"
                      >
                        <div
                          v-if="props.word.sentence"
                          class="text-sm text-slate-700 bg-slate-50/50 p-3 rounded-lg"
                        >
                          <span class="font-medium text-slate-800">Example:</span> {{ props.word.sentence }}
                        </div>
                        <div
                          v-if="props.word.sentenceEn"
                          class="text-sm text-slate-600 pl-3"
                        >
                        <span class="font-medium text-slate-800">Translation:</span> <span class="italic">{{ props.word.sentenceEn }}</span>
                        </div>
                      </div>
                    </div>
</template>

<style>

.blue-bg{
    background: #3b82f6;
}  
</style>