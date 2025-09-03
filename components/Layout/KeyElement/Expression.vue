<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    text?: string | null;
    translation?: string | null;
    size?: 'sm' | 'xs';
  }>(),
  {
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
                <span class="text-base font-medium text-white font-serif">
                    {{ props.text }}
                </span>
    <span v-if="props.translation" class="text-sm text-slate-600 font-light italic">
        {{ props.translation }}
    </span>                  
</div>
    </div>
</div>
</template>