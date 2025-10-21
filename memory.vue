<script setup lang="ts">
import { GlobeAltIcon, HandThumbUpIcon, CheckCircleIcon } from "@heroicons/vue/24/solid";
import { ref } from "vue";

// Import images
import turkishFlag from "~/assets/img/language/turkish.png";
import frenchFlag from "~/assets/img/language/french.png";
import spanishFlag from "~/assets/img/language/spanish.png";
import japaneseFlag from "~/assets/img/language/japanese.png";
import italianFlag from "~/assets/img/language/italian.png";
import germanFlag from "~/assets/img/language/german.png";

const requestedLanguages = ref<string[]>([]);

const notSupportedLanguages = [
  "Portuguese", "Dutch", "Korean", "Chinese", "Greek", "Arabic", 
  "Ukrainian", "Russian", "Armenian", "Swedish", "Norwegian", "Danish", 
  "Finnish", "Polish", "Romanian", "Slovak", "Slovenian", "Uzbek", 
  "Vietnamese", "Khmer", "Thai", "Indonesian", "Estonian", "Hindi", 
  "Mongolian", "Bulgarian", "Croatian", "Czech", "Hungarian", "Icelandic", 
  "Irish", "Latvian", "Lithuanian", "Serbian", "Albanian", "Macedonian"
];

const voteForLanguage = (language: string) => {
  if (!requestedLanguages.value.includes(language)) {
    requestedLanguages.value.push(language);
  }
};

const hasVoted = (language: string) => {
  return requestedLanguages.value.includes(language);
};

const languages = [
  {
    name: "Turkish",
    image: turkishFlag,
    alt: "Learn Turkish",
    status: "Available Now",
    bgColor: "bg-gradient-to-br from-red-100 to-red-200"
  },
  {
    name: "French",
    image: frenchFlag,
    alt: "Learn French",
    status: "Available on the 15th of November 2025",
    bgColor: "bg-gradient-to-br from-blue-100 to-blue-200"
  },
  {
    name: "Spanish",
    image: spanishFlag,
    alt: "Learn Spanish",
    status: "Available on the 1st of December 2025",
    bgColor: "bg-gradient-to-br from-amber-100 to-amber-200"
  },
  {
    name: "Japanese",
    image: japaneseFlag,
    alt: "Learn Japanese",
    status: "Available Soon",
    bgColor: "bg-gradient-to-br from-pink-100 to-pink-200"
  },
  {
    name: "Italian",
    image: italianFlag,
    alt: "Learn Italian",
    status: "Available Soon",
    bgColor: "bg-gradient-to-br from-emerald-100 to-emerald-200"
  },
  {
    name: "German",
    image: germanFlag,
    alt: "Learn German",
    status: "Available Soon",
    bgColor: "bg-gradient-to-br from-slate-100 to-slate-200"
  }
];
</script>

<template>
  <SupportedLanguages />
  <section class="relative overflow-hidden bg-base-100 py-24 sm:py-32">
    <!-- Background Elements -->
    <div class="absolute inset-0 -z-10 pointer-events-none">
      <!-- Subtle gradient -->
      <div class="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5" />
      <!-- Grid pattern -->
      <div class="absolute inset-0 opacity-[0.08] dark:opacity-[0.12] bg-[url('/_nuxt/assets/img/grid/home.png')] bg-top bg-no-repeat bg-[length:min(100%,100%)]" />
      <!-- Floating orbs -->
      <div class="absolute top-20 right-1/4 w-[400px] h-[400px] rounded-full blur-3xl bg-primary/8" />
      <div class="absolute bottom-20 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl bg-primary/6" />
    </div>

    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-16">
        <div class="flex items-center justify-center gap-3 mb-6">
          <div class="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
            <GlobeAltIcon class="h-7 w-7 text-primary" />
          </div>
        </div>
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral dark:text-white mb-6">
          Supported <span class="text-primary">Languages</span>
        </h1>
        <p class="text-xl sm:text-2xl text-base-content/70 max-w-3xl mx-auto leading-relaxed">
          Start your personalized learning journey in any of these languages. More languages coming soon.
        </p>
      </div>

      <!-- Languages Grid -->
      <div class="mx-auto max-w-5xl">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="language in languages"
            :key="language.name"
            :class="['rounded-xl p-6 ring-1 ring-black/5', language.bgColor]"
          >
            <div class="flex items-center justify-between">
              <div class="space-y-2">
                <h2 class="text-2xl font-bold text-neutral">
                  {{ language.name }}
                </h2>
                <div class="inline-flex items-center gap-1.5 text-xs font-medium text-primary bg-white/60 px-2.5 py-1 rounded-lg">
                  <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  {{ language.status }}
                </div>
              </div>
              <div class="flex-shrink-0">
                <img
                  :src="language.image"
                  :alt="language.alt"
                  class="h-16 w-16 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Vote for Future Languages Section -->
      <div class="mt-24">
        <!-- Section Header -->
        <div class="text-center mb-12">
          <div class="flex items-center justify-center gap-3 mb-4">
            <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
              <HandThumbUpIcon class="h-6 w-6 text-warning" />
            </div>
          </div>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-neutral dark:text-white mb-4">
            Vote for <span class="text-warning">Your Language</span>
          </h2>
          <p class="text-lg sm:text-xl text-base-content/70 max-w-2xl mx-auto leading-relaxed">
            Help us prioritize which languages to add next. Vote for the languages you'd like to learn!
          </p>
        </div>

        <!-- Voting Grid -->
        <div class="mx-auto max-w-6xl">
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            <button
              v-for="language in notSupportedLanguages"
              :key="language"
              @click="voteForLanguage(language)"
              :disabled="hasVoted(language)"
              :class="[
                'relative rounded-lg p-4 text-left transition-all duration-200',
                hasVoted(language)
                  ? 'bg-gradient-to-br from-primary/20 to-primary/30 ring-2 ring-primary cursor-default'
                  : 'bg-base-100 ring-1 ring-base-content/10 hover:ring-primary/50 hover:bg-primary/5 cursor-pointer'
              ]"
            >
              <!-- Check Icon for Voted -->
              <div
                v-if="hasVoted(language)"
                class="absolute top-2 right-2"
              >
                <CheckCircleIcon class="h-5 w-5 text-primary" />
              </div>

              <div class="space-y-1">
                <h3 class="text-base font-semibold text-neutral dark:text-white pr-6">
                  {{ language }}
                </h3>
                <p
                  v-if="hasVoted(language)"
                  class="text-xs text-primary font-medium"
                >
                  Vote recorded!
                </p>
                <p
                  v-else
                  class="text-xs text-base-content/60"
                >
                  Click to vote
                </p>
              </div>
            </button>
          </div>
        </div>

        <!-- Summary Section -->
        <div v-if="requestedLanguages.length > 0" class="mt-8 text-center">
          <div class="inline-flex flex-col items-center gap-3 rounded-xl bg-primary/10 px-6 py-4 ring-1 ring-primary/20">
            <div class="flex items-center gap-2">
              <CheckCircleIcon class="h-5 w-5 text-primary" />
              <span class="font-semibold text-neutral dark:text-white">
                You voted for {{ requestedLanguages.length }} {{ requestedLanguages.length === 1 ? 'language' : 'languages' }}
              </span>
            </div>
            <p class="text-sm text-base-content/70">
              Thank you for helping us prioritize our language development!
            </p>
          </div>
        </div>
      </div>

      <!-- Coming Soon Section -->
      <div class="mt-16 text-center">
        <div class="inline-flex flex-col items-center gap-4 rounded-xl bg-base-200/50 px-8 py-6 ring-1 ring-base-content/10">
          <div class="flex items-center gap-2 text-base-content/70">
            <GlobeAltIcon class="h-5 w-5 text-primary" />
            <span class="font-semibold text-neutral dark:text-white">More languages coming soon</span>
          </div>
          <p class="text-sm text-base-content/60 max-w-md">
            We're constantly expanding our language offerings based on your feedback!
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
