<script setup lang="ts">
import type { Word } from "~/types/word.ts";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";

import { ChevronDownIcon } from "@heroicons/vue/24/solid";

definePageMeta({
  layout: "authenticated",
});

const props = withDefaults(
  defineProps<{
    word: Word | null;
  }>(),
  {
    word: null,
  },
);
console.log("Valeur reçue :", props.word);
</script>

<template>
  <div class="w-full">
    <Disclosure v-slot="{ open }" as="div" class="w-64rounded-lg">
      <DisclosureButton
        class="cursor-pointer primary flex w-full justify-between rounded-lg bg-primary/40 text-white px-4 py-2 text-left text-sm font-medium hover:bg-primary/50 focus:outline-none focus-visible:ring focus-visible:primary/75"
      >
        <div>
          <span class="font-bold text-error mr-2">{{ word.text }} </span>
          <span class="text-neutral"> {{ word.textEn }}</span>
        </div>

        <ChevronDownIcon
          :class="open ? 'rotate-180 transform' : ''"
          class="h-5 w-5 text-white"
        />
      </DisclosureButton>

      <DisclosurePanel class="px-2 pb-2 pt-2 text-sm text-neutral">
        <div class="font-semibold">{{ word.wordSentence }}</div>
        <div>{{ word.wordSentenceEn }}</div>
      </DisclosurePanel>
    </Disclosure>
  </div>
</template>
