<script setup lang="ts">
import type { Word } from "~/types/word.ts";
import { BookOpenIcon, LanguageIcon  } from "@heroicons/vue/24/outline";
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
        <LayoutHeadingPlus
          v-if="props.title == 'New Words'"
          title="New Words"
          description=""
        >
          <BookOpenIcon class="h-6 w-6 text-primary" />
        </LayoutHeadingPlus>
        <LayoutHeadingPlus
          v-else-if="props.title == 'New Expressions'"
          title="New Expressions"
          description=""
        >
          <LanguageIcon class="h-6 w-6 text-primary" />
        </LayoutHeadingPlus>
        <div class="w-full mt-3">
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
