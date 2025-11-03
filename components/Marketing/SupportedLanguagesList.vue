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
const selectedLanguageIndex = ref<number | null>(0);
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
        bgColor: `rounded-lg ring-1 ring-black/5 ${language.background_classes}`,
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

const handleLanguageClick = (index: number) => {
  selectedLanguageIndex.value = index;
  emit("click");
};

getSupportedLanguages();
</script>

<template>
  <div class="mx-auto max-w-5xl">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-if="!isFetchingLanguages"
        v-for="(language, index) in supportedLanguages"
        :key="language.name"
        :class="[
          'rounded-lg ring-1 ring-black/5',
          language.bgColor,
          { 'p-3': props.size === 'small', 'p-6': props.size === 'large' },
          { 'cursor-pointer': props.isLanguageClickable === true },
          {
            'border-2 border-primary': selectedLanguageIndex === index,
          },
        ]"
        @click="handleLanguageClick(index)"
      >
        <div class="flex items-center justify-between">
          <div class="space-y-2">
            <h2
              :class="[
                'text-2xl font-bold transition-colors duration-300',
                selectedLanguageIndex === index
                  ? 'text-primary'
                  : 'text-neutral',
              ]"
            >
              {{ language.name }}
            </h2>
            <div
              v-if="showStatus"
              class="inline-flex items-center gap-1.5 text-xs font-medium text-primary bg-white/60 px-2.5 py-1 rounded-lg"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
              {{ language.status }}
            </div>
          </div>
          <div class="flex-shrink-0">
            <img
              :src="language.image"
              :alt="language.alt"
              :class="[
                'object-contain',
                {
                  'h-10 w-10': props.size === 'small',
                  'h-16 w-16': props.size === 'large',
                },
              ]"
            />
          </div>
        </div>
      </div>
      <!-- Skeleton Loaders -->
      <template v-else>
        <div
          v-for="i in 6"
          :key="'skeleton-' + i"
          :class="[
            'rounded-lg ring-1 ring-base-content/5 bg-base-200/50 animate-pulse',
            { 'p-3': props.size === 'small', 'p-6': props.size === 'large' },
          ]"
        >
          <div class="flex items-center justify-between">
            <div class="space-y-2 flex-1">
              <!-- Name skeleton -->
              <div class="h-7 bg-base-300/50 rounded w-24"></div>
              <!-- Status badge skeleton -->
              <div
                v-if="showStatus"
                class="h-5 bg-base-300/50 rounded w-32"
              ></div>
            </div>
            <!-- Image skeleton -->
            <div class="flex-shrink-0">
              <div
                :class="[
                  'bg-base-300/50 rounded-full',
                  {
                    'h-10 w-10': props.size === 'small',
                    'h-16 w-16': props.size === 'large',
                  },
                ]"
              ></div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
