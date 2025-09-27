<script setup lang="ts">
import { AcademicCapIcon } from "@heroicons/vue/24/outline";
import { useRouter } from "vue-router";
const router = useRouter();
const props = withDefaults(
  defineProps<{
    quiz: any;
  }>(),
  {
    quiz: null,
  },
);
</script>

<template>
  <div
    class="group relative bg-gradient-to-br from-primary/5 via-gray-50/80 to-primary/8 rounded-2xl p-3 border border-primary/10 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer overflow-hidden"
    @click="router.push(`/learning/quiz/${props.quiz.id}`)"
  >
    <!-- Subtle background pattern -->
    <div class="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    
    <!-- Main content -->
    <div class="relative flex items-center justify-between">
      <!-- Left: Enhanced Icon with glow effect -->
      <div class="flex items-center">
        <div class="relative w-10 h-10 bg-gradient-to-br from-primary/20 via-primary/15 to-primary/10 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:shadow-primary/20 transition-all duration-300">
          <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <AcademicCapIcon class="relative w-6 h-6 text-primary" />
        </div>
      </div>

      <!-- Center: Enhanced typography -->
      <div class="flex-1 ml-4 flex items-center">
        <h3 class="text-gray-800 font-semibold text-lg tracking-tight group-hover:text-primary transition-colors duration-300">
          {{ props.quiz.ruleName || 'Quiz' }} 
          <span class="text-primary/70 font-medium text-sm ml-2">#{{ props.quiz.id }}</span>
        </h3>
      </div>

      <!-- Right: Ultra-professional score design -->
      <div class="flex items-center">
        <div class="relative">
          <!-- Main score container with glass morphism effect -->
          <div class="relative bg-white/80 backdrop-blur-sm rounded-xl px-2 py-1 border border-gray-300 shadow-lg group-hover:shadow-xl group-hover:shadow-primary/10 transition-all duration-300 overflow-hidden">
            <!-- Animated background gradient -->
            <div class="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <!-- Score content -->
            <div class="relative flex flex-col items-center">
              <!-- Score number with premium typography -->
              <div class="flex items-baseline gap-1">
                <span class="text-2xl font-black bg-gradient-to-br from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent group-hover:from-primary group-hover:via-primary group-hover:to-emerald-600 transition-all duration-500 tracking-tight">
                  {{ props.quiz.score }}
                </span>
                <span class="text-lg font-semibold text-gray-400 group-hover:text-gray-500 transition-colors duration-300">
                  /100
                </span>
              </div>
            </div>
            
            
            <!-- Subtle shine effect -->
            <div class="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom accent line -->
    <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  </div>
</template>
