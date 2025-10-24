<script setup lang="ts">
import type { Word } from '~/types/vocabulary/word';

const props = withDefaults(
  defineProps<{
    isActive: boolean;
    minified?: boolean;
    word?: Word | null;
    size?: 'sm' | 'xs';
  }>(),
  {
    minified: false,
    word: null,
    size: 'sm',
    isActive: false,
  },
);
const emit = defineEmits(["click"]);

const roles = computed(() => {
  if (!props.word) return '';
  return props.word?.role3 ? `${props.word?.role}, ${props.word?.role2}, ${props.word?.role3}` : props.word?.role2 ? `${props.word?.role}, ${props.word?.role2}` : props.word?.role;
});

/*bg-gradient-to-r from-primary/15 to-primary/25 border border-primary/20 */
// text-slate-800

// pastel:
//bg-gradient-to-r from-primary/15 to-primary/25
</script>

<template>
    <!-- Enhanced Word Card -->
    <div 
        class="bg-white text-slate-800 border-l-4 border-primary rounded-lg cursor-pointer transition-all duration-300"
        :class="props.minified ? 'p-2' : 'p-3'"
        @click="emit('click')"
    >
        <div class="flex items-center"  :class="props.minified ? 'justify-center' : 'justify-between'">
            <div class="flex items-center gap-2">
                <span class="text-lg text-neutral font-serif">
                    {{ props.word.text }}
                </span>
                <span class="text-md text-neutral mr-1" :class="props.minified ? 'italic' : ''"> ({{ roles }})</span>
                 <!-- text-slate-600 -->
                <span v-if="!props.minified" class="text-lg text-neutral font-light italic">
                    {{ props.word.translation || 'Translation not available' }}
                </span>
            </div>
        </div>
                      
        <!-- Example Sentences (shows when clicked) -->
        <div v-if="props.isActive && (props.word.sentence || props.word.sentenceEn)"
          class="mt-3 pt-3 border-t border-primary-50 text-neutral space-y-2 animate-fade-in"
        >
        <!-- Show only if different meaning -->
        <div v-if="props.word.role2" class="flex items-center gap-2">
          <span class="text-md font-serif">
            ({{ props.word.role }})
          </span>
          <span class="text-md font-light italic">
            {{ props.word.translation }}
          </span>
        </div>
            <div
              v-if="props.word.sentence"
              class="text-md rounded-lg"
              >
                <span>{{ props.word.sentence }}</span> 
            </div>
            <div
                v-if="props.word.sentenceEn">
                  <span>{{ props.word.sentenceEn }}</span>
              </div>
        </div>
        <div v-if="props.isActive && (props.word.sentence2 || props.word.sentence2En)"
          class="mt-3 pt-3 text-neutral border-t border-primary-50 space-y-2 animate-fade-in"
        >
        <div class="flex items-center gap-2">
          <span class="text-md font-serif">
            ({{ props.word.role2 }})
          </span>
          <span class="text-md font-light italic">
            {{ props.word.translation2 }}
          </span>
        </div>
            <div
              v-if="props.word.sentence2"
              class="text-md rounded-lg"
              >
                <span>{{ props.word.sentence2 }}</span> 
            </div>
            <div
                v-if="props.word.sentence2En">
                  <span>{{ props.word.sentence2En }}</span>
              </div>
        </div>
        <div v-if="props.isActive && (props.word.sentence3 || props.word.sentence3En)"
          class="mt-3 pt-3 text-neutral border-t border-primary-50 space-y-2 animate-fade-in"
        >
        <div class="flex items-center gap-2">
          <span class="text-md font-serif">
            ({{ props.word.role3 }})
          </span>
          <span class="text-md font-light italic">
            {{ props.word.translation3 }}
          </span>
        </div>
            <div
              v-if="props.word.sentence2"
              class="text-md rounded-lg"
              >
                <span>{{ props.word.sentence3 }}</span> 
            </div>
            <div
                v-if="props.word.sentence2En">
                  <span>{{ props.word.sentence3En }}</span>
              </div>
        </div>
</div>
</template>

<style>
/* Styles are now handled by CSS variables in main.css */
</style>