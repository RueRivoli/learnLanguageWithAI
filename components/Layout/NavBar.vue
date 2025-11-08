<script setup lang="ts">
import { ArrowLongRightIcon } from "@heroicons/vue/24/solid";
const showVoucherPromo = ref<boolean>(true);
</script>

<template>
  <div class="w-full fixed z-50 shadow bg-primary/90 text-white">
    <!-- Uncomment if Voucher Promo -->
    <!-- <div
      v-if="showVoucherPromo"
      class="bg-secondary text-primary relative inset-0 bottom-auto border-b border-secondary px-8 py-1.5 text-center text-xs transition-all duration-200"
    >
      <a class="block font-normal" href="/#pricing"
        >Use the voucher with the code <b>🙂 7590</b> until the 15th June to get
        <b>30%</b> discount.</a
      >
      <button
        class="inline-flex items-center justify-center text-sm font-semibold tracking-wide transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 underline-offset-4 hover:underline rounded-xl text-primary absolute right-0 top-0 h-7 w-7 p-0 opacity-60 hover:opacity-80"
        type="button"
        @click="showVoucherPromo = false"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-x size-6"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    </div> -->
    <div class="w-full navbar shadow-sm">
      <LayoutLogo />
      <div class="navbar-center">
        <NuxtLink to="/#how-it-works">
          <div class="cursor ml-20 mr-10">How does it work ?</div>
        </NuxtLink>
        <NuxtLink to="/#syllabus">
          <div class="cursor ml-20 mr-10">What is the program about ?</div>
        </NuxtLink>
        <NuxtLink to="/marketing/supported-languages">
          <div class="cursor">Which language is supported ?</div>
        </NuxtLink>
      </div>
      <div class="navbar-end grow">
        <NuxtLink
          class="flex items-center w-20"
          to="/authorization/auth/?toCreateAccount=false"
        >
          <div class="flex-1 text-right">Log In</div>
          <ArrowLongRightIcon class="ml-2 h-5 w-5" />
        </NuxtLink>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu open state. -->
    <!-- <div class="lg:hidden" role="dialog" aria-modal="true">
      <div class="fixed inset-0 z-50" />
      <div
        class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
      >
        <div class="flex items-center justify-between">
          <NuxtLink to="/">Learn Languages Fast With AI</NuxtLink>
          <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700">
            <span class="sr-only">Close menu</span>
            <svg
              class="size-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <NuxtLink to="/#how-it-works">
                <div>How does it work ?</div>
              </NuxtLink>
              <NuxtLink to="/marketing/supported-languages"
                ><div>Which language is supported ?</div></NuxtLink
              >
            </div>
            <div class="py-6">
              <NuxtLink to="/authorization/auth">
                <span class="text-xl">Log In</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>
