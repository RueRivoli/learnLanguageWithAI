<script setup lang="ts">
import { ref } from "vue";

// Import images
import turkishFlag from "~/assets/img/language/turkish.png";
import frenchFlag from "~/assets/img/language/french.png";
import spanishFlag from "~/assets/img/language/spanish.png";
import japaneseFlag from "~/assets/img/language/japanese.png";
import italianFlag from "~/assets/img/language/italian.png";
import germanFlag from "~/assets/img/language/german.png";
import { CheckCircleIcon, HandThumbUpIcon, GlobeAltIcon } from "@heroicons/vue/24/outline";
import { HandThumbUpIcon as HandThumbUpIconSolid } from "@heroicons/vue/24/solid";

const unsupportedLanguages = ref<any[]>([]);
const languagesVoted = ref<number[]>([]);
const isFetchingLanguages = ref(false);

const hasVoted = (languageId: number) => {
  return languagesVoted.value.includes(languageId);
};

const getImage = (language: string) => {
    switch (language) {
        case "turkish":
            return turkishFlag;
        case "french":
            return frenchFlag;
        case "spanish":
            return spanishFlag;
        case "japanese":
            return japaneseFlag;
        case "italian":
            return italianFlag;
        case "german":
            return germanFlag;
    }
  return `~/assets/img/language/${language}.png`;
}
const voteForLanguage = async (languageId: number, nbVotes: number) => {
    console.log("voteForLanguage", languageId, nbVotes);
    languagesVoted.value.push(languageId);
  await $fetch(`/api/languages/${languageId}`, {
    method: "PUT",
    body: {
      real_votes: nbVotes,
    },
  });
  await getUnsupportedLanguages();
};
const getUnsupportedLanguages = async () => {
  try { 
    isFetchingLanguages.value = true;
  const { data: languages }= await $fetch("/api/languages/?is_supported=false");
  console.log("languages", languages);
  unsupportedLanguages.value = languages.map((language: any) => 
  {
    return {
        id: language.id,
        name: language.language.charAt(0).toUpperCase() + language.language.slice(1).toLowerCase(),
        image: getImage(language.language), 
        alt: `Learn ${language.language}`, 
        totalVotes: language.a_votes + language.b_votes,
        realVotes: language.a_votes,
        status: language.status, 
        bgColor: `rounded-lg ring-1 ring-black/5 ${language.background_classes}`,
        isReleased: language.is_released
    }});
  } catch (error) {
    isFetchingLanguages.value = false;
    console.error("Error fetching unsupported languages", error);
  } finally {
    isFetchingLanguages.value = false;
  }
};


getUnsupportedLanguages();
</script>

<template>
      <!-- Vote for Future Languages Section -->
      <div class="mt-24">
        <!-- Section Header -->
        <div class="text-center mb-12">
          <div class="flex items-center justify-center gap-3 mb-4">
            <div class="flex-shrink-0 w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center">
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
              v-if="!isFetchingLanguages"
              v-for="language in unsupportedLanguages"
              :key="language.id"
              @click="voteForLanguage(language.id, language.realVotes + 1)"
              :disabled="hasVoted(language.id)"
              class="relative rounded-lg p-4 text-left transition-all duration-200 bg-base-100 ring-1 ring-base-content/10 hover:ring-primary/50 hover:bg-primary/5 cursor-pointer"
            >
              <!-- Vote Count Badge -->
              <div class="absolute bottom-2 right-2">
                <div class="inline-flex items-center gap-1.5 text-xs font-medium text-warning bg-warning/10 px-2.5 py-1 rounded-lg ring-1 ring-warning/20">
                  <HandThumbUpIcon  v-if="!hasVoted(language.id)" class="w-3.5 h-3.5 text-warning" />
                  <HandThumbUpIconSolid  v-else class="w-3.5 h-3.5 text-warning" />
                  <span class="text-neutral dark:text-white">{{ language.totalVotes }}</span>
                </div>
              </div>
              <div class="space-y-1">
                <h3 class="text-base font-semibold text-neutral dark:text-white pr-6">
                  {{ language.name }}
                </h3>
                <p
                  v-if="hasVoted(language.id)"
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
            <!-- Skeleton Loaders -->
            <template v-else>
              <div
                v-for="i in 20"
                :key="'skeleton-' + i"
                class="relative rounded-lg p-4 bg-base-200/50 ring-1 ring-base-content/5 animate-pulse"
              >
                <!-- Vote Count Badge Skeleton -->
                <div class="absolute bottom-2 right-2">
                  <div class="h-6 w-12 bg-base-300/50 rounded-lg"></div>
                </div>
                
                <div class="space-y-1 pr-6">
                  <!-- Language name skeleton -->
                  <div class="h-5 bg-base-300/50 rounded w-20"></div>
                  <!-- Status text skeleton -->
                  <div class="h-4 bg-base-300/50 rounded w-16"></div>
                </div>
              </div>
            </template>
          </div>
        </div>

        <!-- Summary Section -->
        <div v-if="languagesVoted.length > 0" class="mt-8 text-center">
          <div class="inline-flex flex-col items-center gap-3 rounded-lg bg-primary/10 px-6 py-4 ring-1 ring-primary/20">
            <div class="flex items-center gap-2">
              <CheckCircleIcon class="h-5 w-5 text-primary" />
              <span class="font-semibold text-neutral dark:text-white">
                You voted for {{ languagesVoted.length }} {{ languagesVoted.length === 1 ? 'language' : 'languages' }}
              </span>
            </div>
            <p class="text-sm text-base-content/70">
              Thank you for helping us prioritize our language development!
            </p>
          </div>
        </div>
      </div>

      <!-- Coming Soon Section -->
      <div class="mt-16 mb-8 text-center">
        <div class="inline-flex flex-col items-center gap-4 rounded-lg bg-base-200/50 px-8 py-6 ring-1 ring-base-content/10">
          <div class="flex items-center gap-2 text-base-content/70">
            <GlobeAltIcon class="h-5 w-5 text-primary" />
            <span class="font-semibold text-neutral dark:text-white">More languages coming soon</span>
          </div>
          <p class="text-sm text-base-content/60 max-w-md">
            We're constantly expanding our language offerings based on your feedback!
          </p>
        </div>
      </div>
</template>
