<script setup lang="ts"></script>

<template>
  <div>
    <div class="py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:mx-0">
          <h2
            class="text-4xl text-neutral font-semibold tracking-tight text-pretty sm:text-5xl"
          >
            Supported languages
          </h2>
        </div>
        <div
          class="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 sm:mt-8 sm:pt-8 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          <div class="card bg-base-100 shadow-sm">
            <div class="card-body">
              <div class="flex items-center justify-between">
                <h2 class="text-3xl text-black font-bold">Turkish</h2>
                <img
                  class="h-14 w-auto"
                  src="~/assets/img/turkish.png"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="card bg-base-100 shadow-sm p-3">
            <div class="card-body">
              <div class="flex items-center justify-between">
                <h2 class="text-3xl text-black text-black font-bold">French</h2>
                <img
                  class="h-14 w-auto"
                  src="~/assets/img/french.png"
                  alt="learn french"
                />
              </div>
            </div>
          </div>

          <div class="card bg-base-100 shadow-sm">
            <div class="card-body">
              <div class="flex items-center justify-between">
                <h2 class="text-3xl text-black font-bold">Spanish</h2>
                <img
                  class="h-14 w-auto"
                  src="~/assets/img/spanish.png"
                  alt=""
                />
              </div>
            </div>
          </div>

          <div class="card bg-base-100 shadow-sm">
            <div class="card-body">
              <div class="flex items-center justify-between">
                <h2 class="text-3xl text-black font-bold">Japanese</h2>
                <img class="h-14 w-auto" src="~/assets/img/japan.png" alt="" />
              </div>
            </div>
          </div>
          <div class="card bg-base-100 shadow-sm">
            <div class="card-body">
              <div class="flex items-center justify-between">
                <h2 class="text-3xl text-black font-bold">Italian</h2>
                <img
                  class="h-14 w-auto"
                  src="~/assets/img/italian.png"
                  alt=""
                />
              </div>
            </div>
          </div>

          <div class="card bg-base-100 shadow-sm">
            <div class="card-body">
              <div class="flex items-center justify-between">
                <h2 class="text-3xl text-black font-bold">Russian</h2>
                <img
                  class="h-14 w-auto"
                  src="~/assets/img/russian.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
