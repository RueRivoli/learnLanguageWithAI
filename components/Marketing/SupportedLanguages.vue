<script setup lang="ts">
import { GlobeAltIcon } from "@heroicons/vue/24/solid";

// Import images
import turkishFlag from "~/assets/img/language/turkish.png";
import frenchFlag from "~/assets/img/language/french.png";
import spanishFlag from "~/assets/img/language/spanish.png";
import japaneseFlag from "~/assets/img/language/japanese.png";
import italianFlag from "~/assets/img/language/italian.png";
import germanFlag from "~/assets/img/language/german.png";

const supportedLanguages = ref<any[]>([]);
const isFetchingLanguages = ref(false);

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
};

const getSupportedLanguages = async () => {
  try {
    isFetchingLanguages.value = true;
    const { data: languages } = await $fetch(
      "/api/languages/?is_supported=true",
    );
    supportedLanguages.value = languages.map((language: any) => {
      return {
        name:
          language.language.charAt(0).toUpperCase() +
          language.language.slice(1).toLowerCase(),
        image: getImage(language.language),
        alt: `Learn ${language.language}`,
        totalVotes: language.a_votes + language.b_votes,
        realVotes: language.a_votes,
        status: language.status,
        bgColor: `${language.background_classes}`,
        isReleased: language.is_released,
      };
    });
  } catch (error) {
    console.error("Error fetching supported languages", error);
    isFetchingLanguages.value = false;
  } finally {
    isFetchingLanguages.value = false;
  }
};
getSupportedLanguages();
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
