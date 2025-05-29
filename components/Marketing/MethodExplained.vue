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
        class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2"
      >
        <div class="lg:pt-4 lg:pr-8">
          <div class="lg:max-w-lg">
            <h2 class="text-base/7 font-semibold text-primary">
              Accelerate your language learning with AI
            </h2>
            <p
              class="mt-2 text-4xl font-semibold tracking-tight text-pretty text-neutral sm:text-5xl"
            >
              A program designed to evaluate your proficiency and target areas
              for improvement
            </p>
            <p class="mt-6 text-lg/8 text-gray-600">
              Learn through fun, personalized lessons powered by the most
              advanced large language models
            </p>
            <dl
              class="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none"
            >
              <div class="relative pl-9">
                <dt class="inline font-semibold text-primary">
                  <QuestionMarkCircleIcon
                    class="absolute top-1 left-1 size-5"
                  />
                  Fill out a 5 min questionnary.
                </dt>
                <dd class="inline">
                  Our programm using latest AI models assesses your level in the
                  most important targeted language concepts established by our
                  experienced teachers and estimated how many words you have
                  acquired.
                </dd>
              </div>
              <div class="relative pl-9">
                <dt class="inline font-semibold text-primary">
                  <BookOpenIcon class="absolute top-1 left-1 size-5" />
                  Train yourself with fun stories tailored to your level.
                </dt>
                <dd class="inline">
                  Each lesson is made so that you work on your weakness and that
                  you learn the vocabulary you don't know
                </dd>
              </div>
              <div class="relative pl-9">
                <dt class="inline font-semibold text-primary">
                  <ChartBarIcon class="absolute top-1 left-1 size-5" />
                  Follow your progress.
                </dt>
                <dd class="inline">
                  At the end of each lesson, you fill out a short quiz that
                  estimates your progress in the target concept and your
                  knowledge on the new words used. Thus, you can follow with our
                  charts, how well you are doing in the different key concepts
                  and how much of the most used words you know
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <img
          src="~/assets/img/platform_screens/2.png"
          alt="Product screenshot"
          class="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
          width="2432"
          height="1442"
        />
        <!-- <img
          src="https://tailwindcss.com/plus-assets/img/component-images/dark-project-app-screenshot.png"
          alt="Product screenshot"
          class="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
          width="2432"
          height="1442"
        /> -->
      </div>
    </div>
  </div>
</template>

<style scoped></style>
