<script setup lang="ts">
import { DocumentIcon, LanguageIcon } from '@heroicons/vue/24/outline';

const props = withDefaults(
  defineProps<{
    title: string | null;
    titleEn: string | null;
  }>(),
  {
    title: null,
    titleEn: null,
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
                <h3 class="text-sm text-base font-semibold text-gray-900 mb-0.5">
                    {{ props.title }}
                </h3>
                <p class="text-xs text-gray-500 text-sm font-light"> {{props.titleEn}}</p>
            </div>

            
            <!-- Icon with professional styling -->
            <div class="flex-shrink-0 ml-3">
            <div class="relative">
                <div
                class="absolute inset-0 bg-gradient-to-br from-emerald-600/25 to-teal-600/25 rounded-lg blur-sm"
                />
                <div
                class="h-8 w-8 flex items-center relative p-2 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-lg shadow-lg flex items-center justify-center"
                >
                <!-- <span class="w-5 text-white leading-8">B1</span> -->
                <DocumentIcon class="h-8 w-8  text-white" />
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