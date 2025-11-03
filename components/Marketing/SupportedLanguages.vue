<script setup lang="ts">
import { GlobeAltIcon } from "@heroicons/vue/24/solid";
</script>

<template>
  <section
    id="supported-languages-section"
    class="relative overflow-hidden bg-primary/10 py-24 sm:py-32"
  >
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-16">
        <div class="flex items-center justify-center gap-3 mb-6">
          <div
            class="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center"
          >
            <GlobeAltIcon class="h-7 w-7 text-primary" />
          </div>
        </div>
        <h1
          class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral mb-6"
        >
          Supported <span class="text-primary">Languages</span>
        </h1>
        <p
          class="text-xl sm:text-2xl text-base-content/70 max-w-3xl mx-auto leading-relaxed"
        >
          Start your personalized learning journey in any of these languages.
          More languages coming soon.
        </p>
      </div>
      <MarketingSupportedLanguagesList />
    </div>
  </section>
</template>
