<script setup lang="ts">
import { ArrowLongRightIcon } from "@heroicons/vue/24/solid";
</script>

<template>
  <div class="relative px-6 pt-14 lg:px-8">
    <div
      class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-xl sm:-top-80"
      aria-hidden="true"
    >
      <div
        class="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-primary/40 to-primary opacity-80 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        style="
          clip-path: polygon(
            74.1% 44.1%,
            100% 61.6%,
            97.5% 26.9%,
            85.5% 0.1%,
            80.7% 2%,
            72.5% 32.5%,
            60.2% 62.4%,
            52.4% 68.1%,
            47.5% 58.3%,
            45.2% 34.5%,
            27.5% 76.7%,
            0.1% 64.9%,
            17.9% 100%,
            27.6% 76.8%,
            76.1% 97.7%,
            74.1% 44.1%
          );
        "
      />
    </div>
    <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
      <div
        class="absolute inset-0 z-[-1] bg-cover bg-color-base-200 bg-top bg-no-repeat opacity-40"
        style="background-image: url(&quot;/_nuxt/assets/img/grid8.png&quot;)"
      />
      <div class="text-center">
        <h1
          class="text-5xl font-semibold tracking-tight text-balance text-gray dark:text-white sm:text-7xl"
        >
          Learn a language
          <span class="text-primary font-bold">more efficiently</span> with AI
        </h1>
        <p
          class="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8"
        >
          Have acess to stories tailored to your specific level
        </p>
        <p class="text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
          containing the concepts you don't master and the vocabulary you need
          to know
        </p>

        <!-- <details class="dropdown">
          <summary class="btn m-1">open or close</summary>
          <ul
            class="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            <li><a>Item 1</a></li>
            <li><a>Item 2</a></li>
          </ul>
        </details> -->
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <NuxtLink
            :to="{
              path: '/authorization/auth/',
              params: { toCreateAccount: true },
            }"
          >
            <button class="btn btn-primary">Start Now !</button>
          </NuxtLink>

          <NuxtLink
            class="flex items-center w-30"
            to="/marketing/working-explanation"
          >
            <div class="flex-1 text-right">Learn more</div>
            <ArrowLongRightIcon class="ml-2 h-5 w-5" />
          </NuxtLink>
        </div>
      </div>
    </div>
    <div
      class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      aria-hidden="true"
    >
      <div
        class="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-linear-to-tr from-primary/40 to-primary opacity-80 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        style="
          clip-path: polygon(
            74.1% 44.1%,
            100% 61.6%,
            97.5% 26.9%,
            85.5% 0.1%,
            80.7% 2%,
            72.5% 32.5%,
            60.2% 62.4%,
            52.4% 68.1%,
            47.5% 58.3%,
            45.2% 34.5%,
            27.5% 76.7%,
            0.1% 64.9%,
            17.9% 100%,
            27.6% 76.8%,
            76.1% 97.7%,
            74.1% 44.1%
          );
        "
      />
    </div>
  </div>
</template>

<style scoped></style>
