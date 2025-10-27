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

</script>

 <template>
  <div
  class="bg-warning/20 border-l-4 border-warning rounded-lg cursor-pointer transition-all duration-300"
   :class="props.minified ? 'p-2' : 'p-3'"
  @click="emit('click')"
>
  <div class="flex items-center" :class="props.minified ? 'justify-center' : 'justify-between'">
    <div class="flex items-center text-neutral gap-4">
      <span class="text-lg font-serif">
        {{ expression.text }}
      </span>
      <span v-if="!props.minified" class="text-lg font-light italic">
        {{ expression.translation || 'Translation not available' }}
      </span>
      
    </div>
  </div>
  
  <!-- Example Sentences (shows when clicked) -->
  <div
    v-if="isActive && (expression.sentence || expression.sentenceEn)"
    class="mt-3 pt-3 text-neutral border-t border-warning/20 space-y-2 animate-fade-in"
  >
    <div
      v-if="expression.sentence"
      class="text-md rounded-lg"
    >
      <span>{{ expression.sentence }}</span>
    </div>
    <div
      v-if="expression.sentenceEn"
    >
      <span class="">{{ expression.sentenceEn }}</span>
    </div>
  </div>
  <div
    v-if="isActive && (expression.sentence2 || expression.sentence2En)"
    class="mt-3 pt-3 text-neutral border-t border-primary/20 space-y-2 animate-fade-in"
  >
    <div
      v-if="expression.sentence2"
      class="text-md rounded-lg"
    >
      <span class="text-md rounded-lg">{{ expression.sentence2 }}</span> 
    </div>
    <div
      v-if="expression.sentence2En"
    >
    <span class="">{{ expression.sentence2En }}</span>
    </div>
  </div>
</div>
</template>

<style>
/* Styles are now handled by CSS variables in main.css */
</style>