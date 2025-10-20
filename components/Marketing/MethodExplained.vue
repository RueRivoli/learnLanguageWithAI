<script setup lang="ts">
import {
  BookOpenIcon,
  ChartBarIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/vue/24/solid";
</script>

<template>
  <div class="bg-primary/20 overflow-hidden py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div
        class="w-full mx-auto"
      >        
          <div class="flex items-center gap-4">
            <div>
              <h2>1.We track your progress</h2>
              <span class="text-primary">Your level in your targeted language concepts is tracked through quizzes preapred by our qualified teachers</span>
            </div>
            <div>
             <img src="~/public/syllabus_beginner.png" alt="Beginner Syllabus" class="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0" width="1232" height="800" />
          </div>
        </div>
          <div class="mt-4 flex items-center gap-4">
            <div>
              <h2>2.We track your known vocabulary</h2>
              <span class="text-primary">Your knowledge on the most used words and expressions are also tracked through quizzes</span>
            </div>
            <div>
              <img src="~/public/vocabheatmap.png" alt="Beginner Syllabus" class="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0" width="1232" height="800" />
          </div>
        </div>
          <div class="mt-4 flex items-center gap-4">
            <div>
              <h2>3. Practice with targeted fun stories</h2>
              <span class="text-primary">Your lessons are targetting your weaknesses concepts and your missing vocabulary</span>
            </div>
            <div>
              <img src="~/public/story1.png" alt="Beginner Syllabus" class="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0" width="1232" height="800" />
            </div>
          </div>
          <div class="flex items-center gap-4">
            <div>
              <h2>4. Testing Fun Quiz</h2>
              <span class="text-primary">You end each lesson with a quiz to evaluate your progress on the concept and on the vocabulary</span>
            </div>
            <div>
              <img
                  src="~/assets/img/platform/screen.png"
                  alt="Product screenshot"
                  class="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
                  width="1232"
                  height="800"
              />
          </div>

        </div>
        </div>
      </div>
  </div>
</template>

<style scoped></style>
