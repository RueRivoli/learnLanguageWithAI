<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    isMastered?: boolean | undefined;
    darkerMode?: boolean | undefined;
    text?: string | null;
    translation?: string | null;
    size?: 'sm' | 'xs';
  }>(),
  {
    isMastered: false,
    darkerMode: false,
    text: null,
    translation: null,
    size: 'sm',
  },
);
const emit = defineEmits(["click"]);

/*bg-gradient-to-r from-primary/15 to-primary/25 border border-primary/20 */
// text-slate-800
</script>

<template>
<div 
 :class="{'rounded-md bg-gradient-to-br from-slate-200 to-gray-300 text-slate-800 py-1 px-2 transition-all duration-300': props.darkerMode, 'rounded-md bg-gradient-to-br from-gray-100 to-slate-200 text-slate-700 py-1 px-2 transition-all duration-300': !props.darkerMode}"
  @click="emit('click')"
>
<div class="flex items-center justify-between">
  <div class="flex items-center gap-4">
    <div>
      <span class="text-base font-medium font-serif">
      {{ props.text }}
      </span>
      <span class="text-base font-medium font-serif" v-if="props.isMastered">*</span>
    </div>

    <span v-if="props.translation" class="text-sm text-slate-600 font-light italic">
      {{ props.translation}}
    </span>
  </div>
  <slot name="action"></slot>
    </div>
</div>
</template>

<style>
/* Styles are now handled by CSS variables in main.css */
</style>