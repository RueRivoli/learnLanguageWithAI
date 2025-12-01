<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    lightMode?: boolean | undefined;
    isMastered?: boolean | undefined;
    text?: string | null;
    translation?: string | null;
    size?: "sm" | "xs";
  }>(),
  {
    lightMode: false,
    isMastered: false,
    text: null,
    translation: null,
    size: "sm",
  },
);
const emit = defineEmits(["click"]);

// bg-gradient-to-br from-purple-500/20 via-pink-500/15 to-purple-600/20 border border-purple-300/30
</script>

<template>
  <div
    :class="{
      'rounded-md bg-white py-1 px-4 transition-all duration-300 border-l-4 border-warning':
        props.lightMode,
      'rounded-md py-1 px-2 transition-all duration-300 bg-gradient-to-br from-purple-500 to-pink-500 border-l-4 border-warning':
        !props.lightMode,
    }"
    @click="emit('click')"
  >
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div>
          <span class="text-base font-medium font-serif">
            {{ props.text }}
          </span>
          <span
            :class="{
              'text-base font-medium font-serif': props.lightMode,
              'text-white font-medium font-serif': !props.lightMode,
            }"
            v-if="props.isMastered"
            >*</span
          >
        </div>

        <span
          v-if="props.translation"
          class="text-sm text-slate-600 font-light"
        >
          {{ props.translation }}
        </span>
        <slot name="action"></slot>
      </div>
    </div>
  </div>
</template>
