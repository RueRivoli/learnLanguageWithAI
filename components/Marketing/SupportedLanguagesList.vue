<script setup lang="ts">
import { ref } from "vue";

// Import images
import turkishFlag from "~/assets/img/language/turkish.png";
import frenchFlag from "~/assets/img/language/french.png";
import spanishFlag from "~/assets/img/language/spanish.png";
import japaneseFlag from "~/assets/img/language/japanese.png";
import italianFlag from "~/assets/img/language/italian.png";
import germanFlag from "~/assets/img/language/german.png";

const props = withDefaults(
  defineProps<{
    isLanguageClickable?: boolean;
    size?: "small" | "large";
    showStatus?: boolean;
  }>(),
  {
    isLanguageClickable: false,
    size: "large",
    showStatus: true,
  },
);
const supportedLanguages = ref<any[]>([]);
const isFetchingLanguages = ref(false);
const emit = defineEmits(["click"]);

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

const getSupportedLanguages = async () => {
  try {
    isFetchingLanguages.value = true;
  const { data: languages }= await $fetch("/api/languages/?is_supported=true");
  supportedLanguages.value = languages.map((language: any) => 
  {
    return {
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
    console.error("Error fetching supported languages", error);
    isFetchingLanguages.value = false;
  } finally {
    isFetchingLanguages.value = false;
  }
};

const handleLanguageClick = (language: any) => {
  emit("click", language);
}
// const languages = [
//   {
//     name: "Turkish",
//     image: turkishFlag,
//     alt: "Learn Turkish",
//     status: "Available Now",
//     bgColor: "bg-gradient-to-br from-red-100 to-red-200"
//   },
//   {
//     name: "French",
//     image: frenchFlag,
//     alt: "Learn French",
//     status: "Available on the 15th of November 2025",
//     bgColor: "bg-gradient-to-br from-blue-100 to-blue-200"
//   },
//   {
//     name: "Spanish",
//     image: spanishFlag,
//     alt: "Learn Spanish",
//     status: "Available on the 1st of December 2025",
//     bgColor: "bg-gradient-to-br from-amber-100 to-amber-200"
//   },
//   {
//     name: "Japanese",
//     image: japaneseFlag,
//     alt: "Learn Japanese",
//     status: "Available Soon",
//     bgColor: "bg-gradient-to-br from-pink-100 to-pink-200"
//   },
//   {
//     name: "Italian",
//     image: italianFlag,
//     alt: "Learn Italian",
//     status: "Available Soon",
//     bgColor: "bg-gradient-to-br from-emerald-100 to-emerald-200"
//   },
//   {
//     name: "German",
//     image: germanFlag,
//     alt: "Learn German",
//     status: "Available Soon",
//     bgColor: "bg-gradient-to-br from-slate-100 to-slate-200"
//   }
// ];
getSupportedLanguages();
</script>

<template>
      <div class="mx-auto max-w-5xl">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-if="!isFetchingLanguages"
            v-for="language in supportedLanguages"
            :key="language.name"
            :class="['rounded-lg ring-1 ring-black/5', language.bgColor, {'p-3': props.size === 'small', 'p-6': props.size === 'large'}, {'cursor-pointer': props.isLanguageClickable === true}]"
            @click="handleLanguageClick(language)"
          >
            <div class="flex items-center justify-between">
              <div class="space-y-2">
                <h2 class="text-2xl font-bold text-neutral">
                  {{ language.name }}
                </h2>
                <div v-if="showStatus" class="inline-flex items-center gap-1.5 text-xs font-medium text-primary bg-white/60 px-2.5 py-1 rounded-lg">
                  <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  {{ language.status }}
                </div>
              </div>
              <div class="flex-shrink-0">
                <img
                  :src="language.image"
                  :alt="language.alt"
                  :class="['object-contain', {'h-10 w-10': props.size === 'small', 'h-16 w-16': props.size === 'large'}]"
                />
              </div>
            </div>
          </div>
          <!-- Skeleton Loaders -->
          <template v-else>
            <div
              v-for="i in 6"
              :key="'skeleton-' + i"
              :class="['rounded-lg ring-1 ring-base-content/5 bg-base-200/50 animate-pulse', {'p-3': props.size === 'small', 'p-6': props.size === 'large'}]"
            >
              <div class="flex items-center justify-between">
                <div class="space-y-2 flex-1">
                  <!-- Name skeleton -->
                  <div class="h-7 bg-base-300/50 rounded w-24"></div>
                  <!-- Status badge skeleton -->
                  <div v-if="showStatus" class="h-5 bg-base-300/50 rounded w-32"></div>
                </div>
                <!-- Image skeleton -->
                <div class="flex-shrink-0">
                  <div :class="['bg-base-300/50 rounded-full', {'h-10 w-10': props.size === 'small', 'h-16 w-16': props.size === 'large'}]"></div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
</template>
