<script setup lang="ts">
import type { Word } from "~/types/word.ts";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";

import { ChevronDownIcon } from "@heroicons/vue/24/solid";
import { LightBulbIcon } from "@heroicons/vue/24/outline";

definePageMeta({
  layout: "authenticated",
});

const props = withDefaults(
  defineProps<{
    name?: string;
    translation?: string;
    description?: string;
  }>(),
  {
    name: undefined,
    translation: undefined,
    description: undefined,
  },
);
</script>

<template>
  <div class="w-full rounded-2xl mt-8">
    <Disclosure v-slot="{ open }" as="div" class="bg-secondary rounded-lg">
      <DisclosureButton
        class="cursor-pointer primary flex w-full justify-between rounded-lg px-4 py-2 text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:primary/75"
      >
        <div class="flex items-center">
          <LightBulbIcon class="h-5 w-5 mr-2 text-primary font-bold" />
          <div class="text-center">
            <span class="font-bold mr-2">{{ props.translation }} </span>
            <span class=""> {{ props.name }}</span>
          </div>
        </div>
        <ChevronDownIcon
          :class="open ? 'rotate-180 transform' : ''"
          class="h-5 w-5"
        />
      </DisclosureButton>

      <DisclosurePanel class="px-4 pb-2 pt-2 text-sm">
        {{ props.description }}
      </DisclosurePanel>
    </Disclosure>
  </div>
</template>
