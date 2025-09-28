<script setup lang="ts">
import { BookOpenIcon, LanguageIcon, ViewfinderCircleIcon } from '@heroicons/vue/24/outline';

const props = withDefaults(
  defineProps<{
    title: string | null;
    titleEn: string | null;
    symbol: string | null;
  }>(),
  {
    title: null,
    titleEn: null,
    symbol: null,
  },
);


</script>

<template>

<!-- Total Expressions Mastered - Professional Design -->
<div class="group relative bg-gradient-to-br from-emerald-100/95 via-green-100/90 to-teal-100/85 rounded-xl shadow-md border border-emerald-300/70 p-4 hover:shadow-xl hover:border-emerald-400/80 overflow-hidden transition-all duration-300">
    <!-- Professional background pattern -->
    <div class="absolute inset-0 bg-gradient-to-br from-emerald-100/70 via-green-100/80 to-teal-100/60 opacity-90"/>

    <!-- Success celebration overlay -->
    <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-green-500/3 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500" />

    <!-- Content container -->
    <div class="h-full relative flex flex-col justify-between z-10">
        <div class="flex items-center justify-between mb-3">
            <div class="flex-1">
                <h3 class="text-xl text-gray-900 mb-0.5">
                    {{ props.title }}
                </h3>
                <p class="text-xs text-gray-500 text-sm font-light"> {{props.titleEn}}</p>
            </div>

            
            <!-- Icon with professional styling -->
            <div class="flex-shrink-0 ml-3">
              <div class="relative">
                  <div
                  class="absolute inset-0 bg-gradient-to-br from-green-800/20 to-emerald-900/20 rounded-lg blur-sm"
                  />
                  <div
                  class="relative p-2 bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 shadow-lg shadow-emerald-200/50 hover:shadow-emerald-300/60 rounded-lg shadow-lg"
                  >
                    <span class="h-5 w-5 text-white font-semibold flex items-center justify-center">{{ props.symbol }}</span>
                  </div>
              </div>
            </div>
        </div>
    </div> 
</div>
</template>

<style>
</style>
