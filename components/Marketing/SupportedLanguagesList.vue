<script setup lang="ts">
import { ref } from "vue";

const props = withDefaults(
  defineProps<{
    isFetchingLanguages: boolean;
    isLanguageClickable?: boolean;
    selectedLanguageCode: string | null;
    size?: "small" | "large";
    showStatus?: boolean;
    supportedLanguages: Array<any> | null;
  }>(),
  {
    isFetchingLanguages: false,
    isLanguageClickable: false,
    selectedLanguageCode: null,
    size: "large",
    showStatus: true,
    supportedLanguages: null,
  },
);

const emit = defineEmits(["click"]);

const handleLanguageClick = (languageCode: string) => {
  emit("click", languageCode);
};
</script>

<template>
  <div class="mx-auto max-w-5xl">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-if="!isFetchingLanguages && supportedLanguages !== null"
        v-for="(language, index) in supportedLanguages"
        :key="language.name"
        :class="[
          'rounded-lg ring-1 ring-black/5',
          language.bgColor,
          { 'p-3': props.size === 'small', 'p-6': props.size === 'large' },
          { 'cursor-pointer': props.isLanguageClickable === true },
          // {
          //   'border-primary': selectedLanguageId === language.id,
          // },
        ]"
        @click="handleLanguageClick(language.code)"
      >
        <div class="flex items-center justify-between">
          <div class="space-y-2">
            <h2
              :class="[
                'text-2xl duration-300',
                selectedLanguageCode === language.code
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
