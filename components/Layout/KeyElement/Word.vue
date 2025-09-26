<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    isMastered: boolean;
    text?: string | null;
    translation?: string | null;
    size?: 'sm' | 'xs';
  }>(),
  {
    isMastered: false,
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
class="rounded-md blue-bg py-1 px-2 transition-all duration-300"
@click="emit('click')"
>
<div class="flex items-center justify-between">
  <div class="flex items-center gap-4">
    <div>
      <span class="text-base font-medium text-white font-serif">
      {{ props.text }}
    </span>
    <span class="text-base font-medium text-white font-serif" v-if="props.isMastered">*</span>
    </div>

    <span v-if="props.translation" class="text-sm text-slate-600 font-light italic">
      {{ props.translation}}
    </span>
  </div>
    </div>
</div>
</template>

<style>

.blue-bg{
    background: #3b82f6;
}  
</style>