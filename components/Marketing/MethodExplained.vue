<script setup lang="ts">
import { ArrowLongRightIcon } from "@heroicons/vue/24/outline";
import {
  ChartBarIcon,
  BookOpenIcon,
  SparklesIcon,
  AcademicCapIcon,
  ArrowRightIcon,
} from "@heroicons/vue/24/solid";
</script>

<template>
  <section class="relative overflow-hidden bg-primary/10 py-24 sm:py-32">


    <div class="mx-auto max-w-[90rem] px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-20">
        <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral dark:text-white mb-6">
          How <span class="text-primary">TookanAI</span> Works
        </h2>
        <p class="text-xl sm:text-2xl text-base-content/70 max-w-3xl mx-auto leading-relaxed">
          Our Language Learning Platform is designed to train you on your weaknesses so that you improve faster and more efficiently.
        </p>
      </div>

      <!-- Process Steps -->
      <div class="space-y-24">
        <!-- Step 1: Track Progress -->
        <div class="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          <div class="space-y-6 order-2 lg:order-1 lg:col-span-2">
            <div class="flex items-center gap-4">
              <div class="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <ChartBarIcon class="h-6 w-6 text-primary" />
              </div>
              <div class="text-sm font-semibold text-primary uppercase tracking-wider">Step 1</div>
            </div>
            <h3 class="text-3xl sm:text-4xl font-bold text-neutral dark:text-white">
              It Tracks Your <span class="text-warning">Abilities</span> in the <span class="text-warning">50+</span> Most Important Key Concepts
            </h3>
            <p class="text-lg sm:text-xl text-base-content/70 leading-relaxed">
              Tookan knows your weaknesses and strengths. It tracks your progress and provides you with a detailed analysis of your skills.
            </p>
            <div class="flex items-center gap-2 text-primary font-semibold">
              <span>See the Key Concepts related to the targeted language</span>
              <ArrowRightIcon class="h-4 w-4" />
            </div>
          </div>
          <div class="order-1 lg:order-2 lg:col-span-3">
            <div class="relative group">
              <div class="absolute rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <img 
                src="/syllabus_beginner.png" 
                alt="Progress tracking dashboard" 
                class="relative w-full max-w-none rounded-lg ring-1 ring-base-content/10 transition-transform duration-300"
              />
            </div>
          </div>
        </div>

        <!-- Step 2: Vocabulary Mapping -->
        <div class="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          <div class="space-y-6 lg:col-span-2">
            <div class="flex items-center gap-4">
              <div class="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <BookOpenIcon class="h-6 w-6 text-primary" />
              </div>
              <div class="text-sm font-semibold text-primary uppercase tracking-wider">Step 2</div>
            </div>
            <h3 class="text-3xl sm:text-4xl font-bold text-neutral dark:text-white">
              It Tracks your <span class="text-warning">Vocabulary Knowledge</span> among the <span class="text-warning">30%</span> Most Used Words and Expressions
            </h3>
            <p class="text-lg sm:text-xl text-base-content/70 leading-relaxed">
             With the help of a frequency dictionnary, Tookan follows your vocabulary knowledge and train you on your unfamiliar vocabulary.
            </p>
            <div class="flex items-center gap-2 text-primary font-semibold">
              <span>Explore vocabulary insights</span>
              <ArrowRightIcon class="h-4 w-4" />
            </div>
          </div>
          <div class="flex flex-col items-center lg:col-span-3">
            <div class="relative group">
              <div class="absolute rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <img 
                src="/wordsHM.png" 
                alt="Words Learned Visualization" 
                class="relative w-full max-w-none rounded-lg ring-1 ring-base-content/10 transition-transform duration-300"
              />
            </div>
            <div class="mt-4 relative group">
              <div class="absolute rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <img 
                src="/expressionsHM.png" 
                alt="Expressions Learned Visualization" 
                class="relative w-full max-w-none rounded-lg ring-1 ring-base-content/10 transition-transform duration-300"
              />
            </div>
          </div>
        </div>

        <!-- Step 3: Targeted Stories -->
        <div class="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          <div class="space-y-6 order-2 lg:order-1 lg:col-span-2">
            <div class="flex items-center gap-4">
              <div class="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <SparklesIcon class="h-6 w-6 text-primary" />
              </div>
              <div class="text-sm font-semibold text-primary uppercase tracking-wider">Step 3</div>
            </div>
            <h3 class="text-3xl sm:text-4xl font-bold text-neutral dark:text-white">
              Practice with <span class="text-warning">Targeted Stories</span>
            </h3>
            <p class="text-lg sm:text-xl text-base-content/70 leading-relaxed">
            Generate stories using your weak concepts and your unfamiliar vocabulary.
            </p>
            <div class="flex items-center gap-2 text-primary font-semibold">
              <span>Experience personalized stories</span>
              <ArrowRightIcon class="h-4 w-4" />
            </div>
          </div>
          <div class="flex flex-col items-center lg:col-span-3">
            <div class="relative group">
              <div class="absolute group-hover:opacity-100 transition-opacity duration-500"></div>
              <img 
                src="/generate-stories.png" 
                alt="Generate AI Tailored Stories" 
                class="relative w-full max-w-none rounded-lg ring-1 ring-base-content/10 transition-transform duration-300"
              />
            </div>
        
          <div class="mt-4 relative group">
              <div class="absolute group-hover:opacity-100 transition-opacity duration-500"></div>
              <img 
                src="/seriestories.png" 
                alt="Train with these stories" 
                class="relative w-full max-w-none rounded-lg ring-1 ring-base-content/10 transition-transform duration-300"
              />
            </div>
          </div>
        </div>

        <!-- Step 4: Assessment -->
        <div class="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          <div class="space-y-6 lg:col-span-2">
            <div class="flex items-center gap-4">
              <div class="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <AcademicCapIcon class="h-6 w-6 text-primary" />
              </div>
              <div class="text-sm font-semibold text-primary uppercase tracking-wider">Step 4</div>
            </div>
            <h3 class="text-3xl sm:text-4xl font-bold text-neutral dark:text-white">
              Evaluate Your Progress Through <span class="text-warning">Challenging Quizzes</span>
            </h3>
            <p class="text-lg sm:text-xl text-base-content/70 leading-relaxed">
              After each lesson, evaluate your progress with a quiz prepared by our qualified teachers.
            </p>
            <div class="flex items-center gap-2 text-warning font-semibold">
              <span>Who are our teachers ?</span>
              <ArrowRightIcon class="h-4 w-4" />
            </div>
          </div>
          <div class="lg:col-span-3">
            <div class="relative group">
              <div class="absolute -inset-4 bg-gradient-to-r from-warning/20 to-primary/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <img 
                src="/quizcapturepurple.png" 
                alt="Interactive quiz interface" 
                class="relative w-full max-w-none rounded-lg ring-1 ring-base-content/10 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="text-center mt-20">
        <div class="inline-flex items-center gap-3 rounded-lg bg-primary/10 px-6 py-3 hover:bg-primary/20">
            <NuxtLink
              :to="{ path: '/authorization/auth/?toCreateAccount=true', query: { toCreateAccount: 'true' } }"
              class="flex items-center gap-2 cursor-pointer"
            >
              <span class="text-primary font-semibold">Ready to Start Learning Faster ?</span>
              <ArrowLongRightIcon class="h-5 w-5 text-primary" />
            </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
</style>

