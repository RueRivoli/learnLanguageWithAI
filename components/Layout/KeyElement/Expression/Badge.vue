<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    isMastered?: boolean | undefined;
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

// bg-gradient-to-br from-purple-500/20 via-pink-500/15 to-purple-600/20 border border-purple-300/30 
</script>

<template>
 <div class="rounded-md py-1 px-2 transition-all duration-300 bg-gradient-to-br from-purple-500 to-pink-500" @click="emit('click')">
      <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div>
                <span class="text-base font-medium text-white font-serif">
                    {{ props.text }}
                </span>
                <span class="text-base font-medium text-white font-serif" v-if="props.isMastered">*</span>
              </div>

    <span v-if="props.translation" class="text-sm text-slate-600 font-light italic">
        {{ props.translation }}
    </span>
    <slot name="action"></slot>               
</div>
    </div>
</div>
</template>