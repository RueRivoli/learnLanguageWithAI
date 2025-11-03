<script setup lang="ts">
import {
  getBackgroundClassFromGrammarRuleLevel,
  getHoveringBorderStyleClassFromGrammarRuleLevel,
} from "~/utils/learning/grammar";

const props = withDefaults(
  defineProps<{
    lightMode?: boolean;
    title: string | null;
    titleEn: string | null;
    level: number | null;
    symbol: string | null;
    size?: "small" | "large";
  }>(),
  {
    level: null,
    lightMode: false,
    title: null,
    titleEn: null,
    symbol: null,
    size: "large",
  },
);
</script>

<template>
  <!-- Total Expressions Mastered - Professional Design -->
  <div
    :class="[
      props.lightMode
        ? `bg-slate-200 group relative rounded-xl shadow-md p-4 hover:shadow-lg overflow-hidden transition-all duration-300 ${getHoveringBorderStyleClassFromGrammarRuleLevel(props.level ?? 0)}`
        : 'bg-gradient-to-br from-emerald-100/95 via-green-100/90 to-teal-100/85 group relative rounded-xl shadow-md border border-emerald-300/70 p-4 hover:shadow-xl hover:border-emerald-400/80 overflow-hidden transition-all duration-300',
    ]"
  >
    <!-- Professional background pattern -->
    <div
      v-if="!props.lightMode"
      class="absolute inset-0 bg-gradient-to-br from-emerald-100/70 via-green-100/80 to-teal-100/60 opacity-90"
    />

    <!-- Success celebration overlay -->
    <div
      v-if="!props.lightMode"
      class="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-green-500/3 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500"
    />

    <!-- Content container -->
    <div class="h-full relative flex flex-col justify-between z-10">
      <div class="flex items-center justify-between mb-3">
        <div class="flex-1">
          <h3
            :class="{
              'text-gray-900 mb-0.5': props.lightMode,
              'text-gray-800 mb-0.5': !props.lightMode,
              'text-sm': props.size === 'small',
              'text-xl': props.size === 'large',
            }"
          >
            {{ props.titleEn }}
          </h3>
          <p
            :class="{
              'text-gray-900 font-light': props.lightMode,
              'text-gray-800 font-light': !props.lightMode,
              'text-xs': props.size === 'small',
              'text-sm': props.size === 'large',
            }"
          >
            {{ props.title }}
          </p>
        </div>

        <!-- Icon with professional styling -->
        <div class="flex-shrink-0 ml-3 self-start">
          <div class="relative">
            <div
              class="relative p-2 rounded-lg"
              :class="getBackgroundClassFromGrammarRuleLevel(props.level ?? 0)"
            >
              <span
                class="h-5 w-5 text-white font-semibold flex items-center justify-center"
                >{{ props.symbol }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <!-- Main statistics -->
      <slot name="content" />
      <!-- Progress details -->
      <slot name="details"></slot>
    </div>
  </div>
</template>

<style></style>
