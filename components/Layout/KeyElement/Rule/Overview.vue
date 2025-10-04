<script setup lang="ts">
import { DocumentIcon, LanguageIcon } from '@heroicons/vue/24/outline';

const props = withDefaults(
  defineProps<{
    darkerMode?: boolean;
    title: string | null;
    titleEn: string | null;
    symbol: string | null;
  }>(),
  {
    darkerMode:false,
    title: null,
    titleEn: null,
    symbol: null,
  },
);

</script>

<template>

<!-- Total Expressions Mastered - Professional Design -->
<div :class="[
  props.darkerMode 
    ? 'bg-gradient-to-br from-slate-700/35 via-slate-500/25 to-slate-700/35 group relative rounded-xl shadow-xl border border-emerald-400/25 p-4 hover:shadow-emerald-400/15 hover:border-emerald-300/40 overflow-hidden transition-all duration-500 backdrop-blur-sm'
    : 'bg-gradient-to-br from-emerald-100/95 via-green-100/90 to-teal-100/85 group relative rounded-xl shadow-md border border-emerald-300/70 p-4 hover:shadow-xl hover:border-emerald-400/80 overflow-hidden transition-all duration-300'
]">
    <!-- Professional background pattern -->
    <div v-if="!props.darkerMode" class="absolute inset-0 bg-gradient-to-br from-emerald-100/70 via-green-100/80 to-teal-100/60 opacity-90"/>
    
    <!-- Success celebration overlay -->
    <div v-if="!props.darkerMode" class="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-green-500/3 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500" />

    <!-- Content container -->
    <div class="h-full relative flex flex-col justify-between z-10">
        <div class="flex items-center justify-between mb-3">
            <div class="flex-1">
                <h3 :class="{'text-xl text-gray-900 mb-0.5': props.darkerMode, 'text-xl text-gray-800 mb-0.5': !props.darkerMode}">
                    {{ props.titleEn }}
                </h3>
                <p :class="{'text-sm text-gray-900 font-light': props.darkerMode, 'text-sm text-gray-800 font-light': !props.darkerMode}"> {{props.title}}</p>
            </div>

            
            <!-- Icon with professional styling -->
            <div class="flex-shrink-0 ml-3">
              <div class="relative">
                  <div
                  :class="{'absolute inset-0 bg-gradient-to-br from-emerald-300/20 to-emerald-500/25 rounded-lg blur-sm': props.darkerMode, 'absolute inset-0 bg-gradient-to-br from-green-800/20 to-emerald-900/20 rounded-lg blur-sm': !props.darkerMode}"
                  />
                  <div
                  :class="{'relative p-2 bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 shadow-md shadow-emerald-300/20 hover:shadow-emerald-300/35 rounded-lg border border-emerald-300/15': props.darkerMode, 'relative p-2 bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 shadow-lg shadow-emerald-200/50 hover:shadow-emerald-300/60 rounded-lg shadow-lg': !props.darkerMode}"
                  >
                    <span class="h-5 w-5 text-white font-semibold flex items-center justify-center">{{ props.symbol }}</span>
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

<style>  
</style>