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
        class="w-full"
      >
        <!-- Header Skeleton -->
        <div class="flex items-center gap-3 mb-4">
          <div class="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
          <div class="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
        </div>
        
        <!-- Word/Expression Skeletons -->
        <div class="space-y-3">
          <div v-for="i in 4" :key="i" class="bg-secondary rounded-lg p-3">
            <!-- Main word/expression line -->
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <div class="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                <div class="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
              </div>
              <div class="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
            
            <!-- Sentence skeletons (collapsed state) -->
            <div class="space-y-2">
              <div class="h-3 bg-gray-200 rounded w-full animate-pulse"></div>
              <div class="h-3 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            </div>
          </div>
        </div>
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
