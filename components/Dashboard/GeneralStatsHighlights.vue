<script setup lang="ts">
import { PuzzlePieceIcon } from "@heroicons/vue/24/outline";

const props = withDefaults(
  defineProps<{
    pseudo?: string | null;
  }>(),
  {
    pseudo: null,
  },
);
</script>

<template>
  <!-- Catchy Welcome Quiz Encouragement -->
  <div
    class="group relative bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-xl shadow-lg border-0 p-4 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 overflow-hidden cursor-pointer"
  >
    <!-- Animated background pattern -->
    <div class="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-all duration-700 animate-pulse"></div>
    
    <!-- Floating particles effect -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-2 left-2 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-bounce" style="animation-delay: 0s;"></div>
      <div class="absolute top-4 right-4 w-1 h-1 bg-white rounded-full animate-ping" style="animation-delay: 0.5s;"></div>
      <div class="absolute bottom-3 left-4 w-1 h-1 bg-cyan-300 rounded-full animate-bounce" style="animation-delay: 1s;"></div>
      <div class="absolute bottom-2 right-2 w-1 h-1 bg-white rounded-full animate-ping" style="animation-delay: 1.5s;"></div>
    </div>
    
    <!-- Content container -->
    <div class="relative z-10">
      <div class="flex items-center justify-between">
        <div class="flex-1">
          <!-- Welcome message with flashy styling -->
          <div class="flex items-center gap-2 mb-2">
            <div class="flex items-center gap-2">
              <div class="w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse"></div>
              <p class="text-base font-bold text-white drop-shadow-lg">
                Welcome {{ props.pseudo || 'there' }}! 🎉
              </p>
            </div>
          </div>
          
          <!-- Main catchy message -->
          <h2 class="text-xl md:text-2xl font-bold text-white mb-2 drop-shadow-lg leading-tight">
            Ready to <span class="text-yellow-300 animate-pulse">Level Up</span>?
          </h2>
          
          <!-- Encouraging subtitle -->
          <p class="text-sm text-white/90 mb-3 drop-shadow-md">
            Kick things off with a quick quiz to configure your level!
          </p>
          
          <!-- Call to action button -->
          <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 hover:bg-white/30 transition-all duration-300 group-hover:scale-105">
            <span class="text-white font-semibold text-sm">Start Quiz Now</span>
            <div class="w-4 h-4 bg-yellow-300 rounded-full flex items-center justify-center">
              <svg class="w-2.5 h-2.5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <!-- Animated icon -->
        <div class="flex-shrink-0 ml-4">
          <div class="relative">
            <!-- Glow effect -->
            <div class="absolute inset-0 bg-yellow-300/50 rounded-xl blur-lg animate-pulse"></div>
            <!-- Icon container -->
            <div class="relative p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 group-hover:scale-110 transition-all duration-300">
              <PuzzlePieceIcon class="h-6 w-6 text-white drop-shadow-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Bottom accent line -->
    <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-300 via-cyan-300 to-pink-300"></div>
  </div>
  <DashboardVocabularyStatsHighlights />
</template>
