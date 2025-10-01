<script setup lang="ts">
import { PencilSquareIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import type { GrammarRuleMeta } from "~/types/modules/grammar-rule";
import {
  grammarLevelTabs,
} from "~/utils/learning/grammar";
const props = withDefaults(
  defineProps<{
    moduleOptions: Record<string, Array<GrammarRuleMeta & {score: number}>> | null;
    id: string;
    title: string;
  }>(),
  {
    moduleOptions: null,
    id: "",
    title: "",
  },
);

const activeDifficultyLevelTab = ref(1);

const filteredModuleOptions = computed(() => {
    switch (activeDifficultyLevelTab.value) {
        case 1:
            return props.moduleOptions?.Beginner;
        case 2:
            return props.moduleOptions?.Intermediate;
        case 3:
            return props.moduleOptions?.Advanced;
        default:
            return props.moduleOptions?.Beginner;
    }
});


</script>

<template>
  <dialog :id="props.id" class="modal">
    <div class="modal-box w-11/12 max-w-4xl max-h-[80vh] overflow-y-auto">
      <div class="flex items-center">
        <PencilSquareIcon
          class="h-5 w-5 mr-2 text-gray-900 group-hover:text-neutral"
        />
        <h3 class="text-xl text-gray-900">{{ props.title }}</h3>
      </div>

      <p class="pt-2 pb-4 italic">
        <!-- Add description here -->
      </p>
      <LayoutTabs
        :first-tab="grammarLevelTabs.firstTab"
        :second-tab="grammarLevelTabs.secondTab"
        :third-tab="grammarLevelTabs.thirdTab"
        @tab-active-changed="(activeTab) => (activeDifficultyLevelTab = activeTab)"
    />
      <div
        class="p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
      >
      <LayoutKeyElementRuleOption v-for="(rule, n) in filteredModuleOptions" :key="n" :title="rule.name" :titleEn="rule.nameEn" :symbol="rule.symbol">
        <template #details>
              <div class="rounded-lg p-2"
          >
            <div class="flex items-center">
              <div class="flex items-center gap-2">
                <div class="w-1.5 h-1.5 bg-green-500 rounded-full" />
                <span class="text-xs text-gray-600 ml-2"
                >current score:</span
              >
                <span class="text-md font-medium text-gray-700"
                  >{{rule.score}}%</span
                >
              </div>

            </div>
          </div>
            </template>
        </LayoutKeyElementRuleOption>
      <div class="modal-action">
          <button class="btn btn-sm btn-secondary" @click="$emit('cancel')">
            Cancel
          </button>
        <button
          class="btn btn-sm btn-primary"
          @click="$emit('applySelection')"
        >
          Apply
        </button>
      </div>
    </div>
  </div>
  </dialog>
</template>
