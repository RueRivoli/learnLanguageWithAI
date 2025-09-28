<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    isActive: boolean;
    expression?: any;
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
//bg-gradient-to-br from-purple-500/20 via-pink-500/15 to-purple-600/20

</script>

 <template>
  <div 
  class="bg-gradient-to-br from-purple-500 to-pink-500 border border-purple-300/30 rounded-xl p-3 cursor-pointer transition-all duration-300"
  @click="emit('click')"
>
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-4">
      <span class="text-base font-medium text-white font-serif">
        {{ expression.text }}
      </span>
      <span class="text-sm text-white font-light italic">
        {{ expression.textEn || 'Translation not available' }}
      </span>
      
    </div>
    <!-- <svg 
      class="w-4 h-4 text-white transition-all duration-300"
      :class="{ 'rotate-180': props.isActive }"
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
    </svg> -->
  </div>
  
  <!-- Example Sentences (shows when clicked) -->
  <div
    v-if="isActive && (expression.sentence || expression.sentenceEn)"
    class="mt-3 pt-3 border-t border-primary/20 space-y-2 animate-fade-in"
  >
    <div
      v-if="expression.sentence"
      class="text-sm text-white rounded-lg"
    >
      <span class="font-medium text-white underline">Ex:</span> {{ expression.sentence }}
    </div>
    <div
      v-if="expression.sentenceEn"
      class="text-sm text-white"
    >
    <span class="ml-6">{{ expression.sentenceEn }}</span>
    </div>
  </div>
</div>
</template>

<style>
/* Styles are now handled by CSS variables in main.css */
</style>