<script setup>
import { ref } from "vue";

import { languages, rulesNames } from "~/utils/syllabus";

const selectedLang = ref("tr");
</script>

<template>
  <section
    class="bg-primary/20 inset-0 z-[-1] bg-cover px-4 py-12 flex items-center "
  >
    <div>
      <client-only>
        <Vue3Lottie
          animation-link="_nuxt/assets/lottie/languages.json"
          :height="400"
          :width="400"
        />
      </client-only>
    </div>
    <div class="max-w-4xl mx-auto">
      <h1
        class="text-4xl font-semibold tracking-tight text-pretty text-center text-neutral mb-8"
      >
        Syllabus
      </h1>

      <div class="flex justify-center space-x-3 mb-8 p-6">
        <button
          v-for="lang in languages"
          :key="lang.code"
          :class="[
            'px-4 py-2 btn btn-primary rounded-md font-semibold focus:outline-none',
            selectedLang === lang.code ? 'btn-primary' : 'btn-secondary',
          ]"
          :aria-pressed="selectedLang === lang.code"
          @click="selectedLang = lang.code"
        >
          <img class="h-8 w-auto" :src="lang.imgSrc" alt="" />
          {{ lang.label }}
        </button>
      </div>
      <!-- Syllabus Content -->
      <transition name="fade" mode="out-in">
        <!-- <div
          :key="selectedLang"
          class="w-full text-center text-neutral text-pretty"
        >
          <ul class="w-full m-auto bg-base-200 rounded-box shadow-xl p-4">
            <li
              v-for="(less, n) in rulesNames[selectedLang]"
              :key="less.title"
              class="group transition-all duration-300 rounded-lg my-2"
            >
              <div class="flex items-center justify-center gap-4 p-4">
                <div
                  class="text-4xl font-extralight text-primary opacity-50 group-hover:opacity-100 transition-opacity duration-300 tabular-nums"
                >
                  {{ n + 1 }}
                </div>
                <div class="flex flex-col gap-1">
                  <div
                    class="text-lg font-medium group-hover:text-primary transition-colors duration-300"
                  >
                    {{ less.title }}
                  </div>
                  <div
                    class="text-xs uppercase tracking-wider font-semibold text-base-content/50 group-hover:text-primary/70 transition-colors duration-300"
                  >
                    {{ less.titleEn }}
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div> -->

        <div :key="selectedLang" class="overflow-x-auto">
          <table class="bg-base-200 table table-zebra rounded-lg">
            <!-- head -->
            <thead class="bg-neutral/80 text-white">
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Translation</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(less, n) in rulesNames[selectedLang]" :key="n">
                <th>{{ n + 1 }}</th>
                <td>{{ less.title }}</td>
                <td>{{ less.titleEn }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </transition>
    </div>
  </section>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
