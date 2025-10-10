<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    expression?: any;
    isActive: boolean;
    minified: boolean;
    size?: 'sm' | 'xs';
  }>(),
  {
    expression: null,
    isActive: false,
    minified: false,
    size: 'sm',
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
  class="bg-gradient-to-br from-purple-500 to-pink-500 border border-purple-300/30 rounded-xl cursor-pointer transition-all duration-300"
   :class="props.minified ? 'p-2' : 'p-4'"
  @click="emit('click')"
>
  <div class="flex items-center" :class="props.minified ? 'justify-center' : 'justify-between'">
    <div class="flex items-center gap-4">
      <span class="text-lg text-white font-serif">
        {{ expression.text }}
      </span>
      <span v-if="!props.minified" class="text-lg text-pink-50 font-light italic">
        {{ expression.translation || 'Translation not available' }}
      </span>
      
    </div>
  </div>
  
  <!-- Example Sentences (shows when clicked) -->
  <div
    v-if="isActive && (expression.sentence || expression.sentenceEn)"
    class="mt-3 pt-3 border-t border-primary/20 space-y-2 animate-fade-in"
  >
    <div
      v-if="expression.sentence"
      class="text-md text-white rounded-lg"
    >
      <span>{{ expression.sentence }}</span>
    </div>
    <div
      v-if="expression.sentenceEn"
      class="text-pink-50"
    >
      <span class="">{{ expression.sentenceEn }}</span>
    </div>
  </div>
  <div
    v-if="isActive && (expression.sentence2 || expression.sentence2En)"
    class="mt-3 pt-3 border-t border-primary/20 space-y-2 animate-fade-in"
  >
    <div
      v-if="expression.sentence2"
      class="text-md text-white rounded-lg"
    >
      <span class="text-md text-white rounded-lg">{{ expression.sentence2 }}</span> 
    </div>
    <div
      v-if="expression.sentence2En"
      class="text-blue-50"
    >
    <span class="">{{ expression.sentence2En }}</span>
    </div>
  </div>
</div>
</template>

<style>
/* Styles are now handled by CSS variables in main.css */
</style>