<script setup lang="ts">
import { getBackgroundClassFromGrammarRuleLevel } from '~/utils/learning/grammar';

const props = withDefaults(
  defineProps<{
    lightMode?: boolean;
    title: string | null;
    titleEn: string | null;
    level: number | null;
    symbol: string | null;
  }>(),
  {
    level: null,
    lightMode:false,
    title: null,
    titleEn: null,
    symbol: null,
  },
);

</script>

<template>

<!-- Total Expressions Mastered - Professional Design -->
<div :class="[
  props.lightMode 
    ? 'bg-slate-200 group relative rounded-xl shadow-md border border-slate-300 px-4 py-1 overflow-hidden transition-all duration-300'
    : 'bg-gradient-to-br from-emerald-100/95 via-green-100/90 to-teal-100/85 group relative rounded-xl shadow-md border border-emerald-300/70 px-4 py-1 overflow-hidden transition-all duration-300'
]">
    <!-- Professional background pattern -->
    <div v-if="!props.lightMode" class="absolute inset-0 bg-gradient-to-br from-emerald-100/70 via-green-100/80 to-teal-100/60 opacity-90"/>
    
    <!-- Success celebration overlay -->
    <div v-if="!props.lightMode" class="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-green-500/3 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500" />

    <!-- Content container -->
    <div class="h-full relative flex flex-col justify-between z-10">
        <div class="flex items-center justify-between">
            <div class="flex-1">
              <h3 :class="{'text-md text-gray-900 font-semibold': props.lightMode, 'text-lg text-gray-800 font-semibold': !props.lightMode}">
                    {{ props.titleEn }}
                </h3>
                <!-- <p :class="{'text-sm text-gray-900 font-light': props.lightMode, 'text-sm text-gray-800 font-light': !props.lightMode}"> {{props.title}}</p> -->
            </div>

            
            <!-- Icon with professional styling -->
            <div class="flex-shrink-0 ml-3">
              <div class="relative">
                  <div
                  class='relative p-2 rounded-md'
                  :class="getBackgroundClassFromGrammarRuleLevel(props.level ?? 0)"
                  >
                    <span class="h-4 w-4 text-white font-semibold flex items-center justify-center">{{ props.symbol }}</span>
                  </div>
              </div>
            </div>
        </div>
    </div> 
</div>
</template>

<style>  
</style>