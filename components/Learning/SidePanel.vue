<script setup lang="ts">
import { ChartBarIcon, ExclamationCircleIcon } from "@heroicons/vue/24/solid";

// Mock data - replace with actual props when available
const progressData = {
  improvement: 15,
  skill: "Vowel Harmony",
  streak: 7,
  totalLessons: 24,
};
</script>

<template>
  <div class="w-full">
    <div class="bg-white shadow-sm overflow-hidden rounded-lg">
      <!-- Header -->
      <div class="p-5 py-4 border-b border-gray-100">
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center"
          >
            <ChartBarIcon class="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900">
              Learning Progress
            </h3>
            <p class="text-sm text-gray-600">Your recent achievements</p>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="p-6 space-y-6">
        <!-- Progress Highlight -->
        <!-- <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100">
          <div class="flex items-start gap-3">
            <div class="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center flex-shrink-0">
              <ChartBarIcon class="w-4 h-4 text-green-600" />
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-green-800 mb-1">
                Great progress!
              </p>
              <p class="text-xs text-green-700 leading-relaxed">
                You improved by <span class="font-semibold">{{ progressData.improvement }}%</span> 
                in <span class="font-medium">{{ progressData.skill }}</span>
              </p>
            </div>
          </div>
        </div> -->

        <!-- Stats Grid -->
        <!-- <div class="grid grid-cols-2 gap-4">
          <div class="bg-orange-50 rounded-lg p-4 border border-orange-100">
            <div class="flex items-center gap-2 mb-2">
              <StarIcon class="w-4 h-4 text-orange-500" />
              <span class="text-xs font-medium text-orange-700">Streak</span>
            </div>
            <div class="text-xl font-bold text-orange-800">
              {{ progressData.streak }} days
            </div>
          </div>

          <div class="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <div class="flex items-center gap-2 mb-2">
              <AcademicCapIcon class="w-4 h-4 text-blue-500" />
              <span class="text-xs font-medium text-blue-700">Lessons</span>
            </div>
            <div class="text-xl font-bold text-blue-800">
              {{ progressData.totalLessons }}
            </div>
          </div>
        </div> -->

        <!-- Encouragement Message -->
        <div class="bg-gray-50 rounded-lg p-4 border border-gray-100">
          <div class="flex items-center gap-3">
            <ExclamationCircleIcon class="w-5 h-5 text-primary" />
            <div>
              <p class="text-sm font-medium text-gray-800 mb-1">
                Keep up the great work!
              </p>
              <p class="text-xs text-gray-600 leading-relaxed">
                Start improving your skills.
              </p>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <!-- <div class="space-y-3">
          <h4 class="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h4>
          
          <button class="w-full bg-primary hover:bg-primary/90 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
            <ChartBarIcon class="w-4 h-4" />
            <span>Continue Learning</span>
          </button>
          
          <button class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
            <StarIcon class="w-4 h-4" />
            <span>Review Progress</span>
          </button>
        </div> -->
      </div>
    </div>
  </div>
</template>

grid-template-columns: [card] 80% [gap] 3% [additional] 17%
