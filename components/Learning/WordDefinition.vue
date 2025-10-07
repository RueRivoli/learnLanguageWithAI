<script setup lang="ts">
import type { Word } from "~/types/vocabulary/word";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/24/solid";

definePageMeta({
  layout: "authenticated",
});

const props = withDefaults(
  defineProps<{
    word: Word | null;
    open: boolean;
  }>(),
  {
    word: null,
    open: false,
  },
);

const roles = computed(() => {
  if (!props.word) return '';
  return props.word?.role3 ? `${props.word?.role}, ${props.word?.role2}, ${props.word?.role3}` : props.word?.role2 ? `${props.word?.role}, ${props.word?.role2}` : props.word?.role;
});
</script>

<template>
  <div class="w-full">
    <Disclosure v-slot="{ open }" as="div" class="bg-secondary m-auto max-w-full rounded-lg">
      <DisclosureButton
        class="cursor-pointer text-pretty flex items-center w-full justify-between rounded-lg text-neutral px-3 py-2 text-left text-sm font-medium hover:opacity-90 focus:outline-none focus-visible:ring focus-visible:primary/75"
      >
        <div>
          <span class="font-bold text-md mr-2">{{ word.text }} </span>
          <span class="text-md italic mr-2"> {{ roles.value }}</span>
          <span class="text-md italic"> {{ word.translation }}</span>
        </div>

        <ChevronDownIcon
          :class="open ? 'rotate-180 transform' : ''"
          class="h-5 w-5"
        />
      </DisclosureButton>

      <DisclosurePanel class="px-4 pb-2 pt-2 text-sm text-neutral text-pretty">
        <div>
          <div class="font-semibold">{{ word.sentence }}</div>
          <div>{{ word.sentenceEn }}</div>
        </div>
        <div v-if="word?.sentence2" class="mt-2">
          <div class="font-semibold italic">{{ word.sentence2 }}</div>
          <div>{{ word.sentence2En }}</div>
        </div>
        <!-- <div v-if="word?.sentence3" class="mt-2">
          <div class="font-semibold italic">{{ word.sentence3 }}</div>
          <div>{{ word.sentence3En }}</div>
        </div> -->
      </DisclosurePanel>
    </Disclosure>
  </div>
</template>
