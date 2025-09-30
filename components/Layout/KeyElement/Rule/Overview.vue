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
    ? 'bg-gradient-to-br from-slate-800 via-emerald-900/40 to-slate-800 group relative rounded-xl shadow-2xl border border-emerald-500/30 p-4 hover:shadow-emerald-500/20 hover:border-emerald-400/60 overflow-hidden transition-all duration-500 backdrop-blur-sm'
    : 'bg-gradient-to-br from-emerald-100/95 via-green-100/90 to-teal-100/85 group relative rounded-xl shadow-md border border-emerald-300/70 p-4 hover:shadow-xl hover:border-emerald-400/80 overflow-hidden transition-all duration-300'
]">
    <!-- Professional background pattern -->
    <div :class="{'absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-emerald-600/15 opacity-80': props.darkerMode, 'absolute inset-0 bg-gradient-to-br from-emerald-100/70 via-green-100/80 to-teal-100/60 opacity-90': !props.darkerMode}"/>
    
    <!-- Additional sophisticated overlay for darker mode -->
    <div v-if="props.darkerMode" class="absolute inset-0 bg-gradient-to-tr from-transparent via-emerald-400/5 to-emerald-500/10 opacity-60"></div>
    <div v-if="props.darkerMode" class="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.15),transparent_50%)]"></div>

    <!-- Success celebration overlay -->
    <div :class="{'absolute inset-0 bg-gradient-to-br from-emerald-400/10 via-emerald-500/8 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-all duration-500': props.darkerMode, 'absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-green-500/3 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500': !props.darkerMode}" />

    <!-- Content container -->
    <div class="h-full relative flex flex-col justify-between z-10">
        <div class="flex items-center justify-between mb-3">
            <div class="flex-1">
                <h3 :class="{'text-xl text-white mb-0.5': props.darkerMode, 'text-xl text-gray-900 mb-0.5': !props.darkerMode}">
                    {{ props.title }}
                </h3>
                <p :class="{'text-xs text-gray-100 text-sm font-light': props.darkerMode, 'text-xs text-gray-500 text-sm font-light': !props.darkerMode}"> {{props.titleEn}}</p>
            </div>

            
            <!-- Icon with professional styling -->
            <div class="flex-shrink-0 ml-3">
              <div class="relative">
                  <div
                  :class="{'absolute inset-0 bg-gradient-to-br from-emerald-400/30 to-emerald-600/40 rounded-lg blur-sm': props.darkerMode, 'absolute inset-0 bg-gradient-to-br from-green-800/20 to-emerald-900/20 rounded-lg blur-sm': !props.darkerMode}"
                  />
                  <div
                  :class="{'relative p-2 bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 shadow-lg shadow-emerald-400/30 hover:shadow-emerald-400/50 rounded-lg border border-emerald-400/20': props.darkerMode, 'relative p-2 bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 shadow-lg shadow-emerald-200/50 hover:shadow-emerald-300/60 rounded-lg shadow-lg': !props.darkerMode}"
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