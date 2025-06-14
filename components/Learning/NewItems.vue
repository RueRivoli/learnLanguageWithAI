<script setup lang="ts">
import type { Word } from "~/types/word.ts";
import { LanguageIcon, RadioIcon } from "@heroicons/vue/24/outline";
const props = withDefaults(
  defineProps<{
    loading: boolean;
    items?: Word[];
    title: string;
  }>(),
  {
    loading: false,
    items: [],
    title: "",
  },
);
console.log("Valeur reçue :", props.items);
</script>

<template>
  <div class="w-full">
    <div class="bg-white rounded-box shadow-md p-5">
      <div
        v-if="props.loading"
        class="w-full h-72 flex justify-center items-center"
      >
        <span class="loading loading-bars loading-xl" />
      </div>
      <div v-else class="flex flex-col items-center justify-between">
        <div class="flex items-center self-start mb-3">
            <LanguageIcon
              v-if="props.title == 'New Words'"
              class="h-5 w-5 mr-2 font-bold text-black dark:text-white group-hover:text-white"
            />
            <RadioIcon
              v-else="props.title == 'New Expressions'"
              class="h-5 w-5 mr-2 font-bold text-black dark:text-white group-hover:text-white"
            />
          <LayoutHeadingPlus :title="props.title" />
        </div>
        <div class="w-full">
          <LearningWordDefinition
            v-for="w in props.items"
            class="mb-2"
            :word="w"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<!-- grid-template-columns: [card] 80% [gap] 3% [additional] 17% -->
