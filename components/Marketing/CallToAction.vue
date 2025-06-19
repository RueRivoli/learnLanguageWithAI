<script setup lang="ts">
import {
  ArrowLongRightIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/vue/24/solid";
</script>

<template>
  <div class="relative px-6 pt-14 lg:px-8">
    <div
      class="absolute inset-0 z-[-10] bg-cover overflow-hidden bg-top bg-no-repeat opacity-30 dark:opacity-80 bg-[url('/_nuxt/assets/img/grid/home.png')] bg-[length:min(100%,100%)] [mask-image:radial-gradient(ellipse_at_center,rgba(0,0,0,0.6)_30%,black_80%)]"
    />
    <div
      class="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-[85px] sm:-top-80"
      aria-hidden="true"
    >
      <div
        class="relative z-[-1] left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary/50 to-primary/90 opacity-95 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] rotate-[30deg]"
        style="
          clip-path: polygon(
            60% 35%,
            90% 45%,
            85% 25%,
            75% 10%,
            65% 15%,
            55% 35%,
            50% 45%,
            45% 40%,
            40% 35%,
            35% 30%,
            25% 50%,
            15% 45%,
            20% 75%,
            30% 60%,
            70% 75%,
            60% 35%
          );
        "
      />
    </div>
    <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 relative z-10">
      <!-- <div
        class="absolute inset-0 z-[-1] bg-cover bg-color-base-200 bg-top bg-no-repeat opacity-40"
        style="background-image: url(&quot;/_nuxt/assets/img/grid8.png&quot;)"
      /> -->
      <div class="text-center">
        <!-- <client-only>
          <Vue3Lottie
            animation-link="_nuxt/assets/lottie/toucan.json"
            :height="400"
            :width="400"
          />
        </client-only> -->
        <h1
          class="text-5xl font-semibold tracking-tight text-balance text-neutral dark:text-white sm:text-7xl"
        >
          Learn a language
          <span class="text-primary font-bold">more efficiently</span> with AI
        </h1>
        <p
          class="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8"
        >
          Make progress faster by training on lessons tailored to your weaknesses.
        </p>
        <p class="text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
          Train on vocabulary to know the most used words and expressions
        </p>

        <div class="mt-10 z-[100] flex items-center justify-center gap-x-6">
          <NuxtLink
            :to="{
              path: '/authorization/auth/',
              query: { toCreateAccount: 'true' }
            }"
            class="btn btn-primary animation-bounce cursor-pointer hover:scale-105 transition-transform flex items-center"
          >
            <span class="text-lg">Get Started</span>
            <ArrowLongRightIcon class="ml-1 h-5 w-5" />
          </NuxtLink>

          <NuxtLink
            to="/marketing/working-explanation"
            class="btn btn-ghost cursor-pointer hover:scale-105 transition-transform flex items-center"
          >
            <ArrowTopRightOnSquareIcon class="ml-2 h-5 w-5" />
            <span class="text-lg">Learn More</span>
          </NuxtLink>
        </div>
        <MarketingUsedBy />
      </div>
    </div>
    <!-- -z-10 -->
    <div
      class="absolute inset-x-0 top-[calc(100%-13rem)] transform-gpu overflow-hidden blur-[85px] sm:top-[calc(100%-30rem)]"
      aria-hidden="true"
    >
      <div
        class="relative z-[-1] left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary/50 to-primary/90 opacity-95 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem] rotate-[30deg]"
        style="
          clip-path: polygon(
            60% 35%,
            90% 45%,
            85% 25%,
            75% 10%,
            65% 15%,
            55% 35%,
            50% 45%,
            45% 40%,
            40% 35%,
            35% 30%,
            25% 50%,
            15% 45%,
            20% 75%,
            30% 60%,
            70% 75%,
            60% 35%
          );
        "
      />
    </div>
  </div>
</template>

<style scoped></style>
