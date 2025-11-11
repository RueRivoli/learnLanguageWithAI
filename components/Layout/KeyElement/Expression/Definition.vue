<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    expression?: any;
    isActive: boolean;
    isDarkMode: boolean;
    minified: boolean;
    size?: "sm" | "xs";
  }>(),
  {
    expression: null,
    isActive: false,
    isDarkMode: false,
    minified: false,
    size: "sm",
  },
);
const emit = defineEmits(["click"]);
</script>

<template>
  <div
    :class="[
      'text-slate-800 border-l-4 border-warning rounded-lg cursor-pointer transition-all duration-300',
      { 'bg-warning/20': props.isDarkMode },
      { 'bg-white': !props.isDarkMode },
      { 'p-2': props.minified },
      { 'p-3': !props.minified },
    ]"
    @click="emit('click')"
  >
    <div
      class="flex items-center"
      :class="props.minified ? 'justify-center' : 'justify-between'"
    >
      <div class="flex items-center text-neutral gap-4">
        <span class="text-lg font-serif">
          {{ expression.text }}
        </span>
        <span v-if="!props.minified" class="text-lg font-light italic">
          {{ expression.translation || "Translation not available" }}
        </span>
      </div>
    </div>

    <!-- Example Sentences (shows when clicked) -->
    <div
      v-if="isActive && (expression.sentence || expression.sentenceEn)"
      class="mt-3 pt-3 text-neutral border-t border-warning/20 space-y-2 animate-fade-in"
    >
      <div v-if="expression.sentence" class="text-md rounded-lg">
        <span>{{ expression.sentence }}</span>
      </div>
      <div v-if="expression.sentenceEn">
        <span class="">{{ expression.sentenceEn }}</span>
      </div>
    </div>
    <div
      v-if="isActive && (expression.sentence2 || expression.sentence2En)"
      class="mt-3 pt-3 text-neutral border-t border-primary/20 space-y-2 animate-fade-in"
    >
      <div v-if="expression.sentence2" class="text-md rounded-lg">
        <span class="text-md rounded-lg">{{ expression.sentence2 }}</span>
      </div>
      <div v-if="expression.sentence2En">
        <span class="">{{ expression.sentence2En }}</span>
      </div>
    </div>
  </div>
</template>

<style>
/* Styles are now handled by CSS variables in main.css */
</style>
