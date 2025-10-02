<script setup lang="ts">
import { CheckIcon, PencilSquareIcon } from "@heroicons/vue/24/outline";
import type { GrammarRuleMeta } from "~/types/modules/grammar-rule";
import {
  grammarLevelTabs,
} from "~/utils/learning/grammar";
const props = withDefaults(
  defineProps<{
    initialModuleSelectedId: number | null;
    moduleOptions: Record<string, Array<GrammarRuleMeta & {score: number}>> | null;
    id: string;
    title: string;
  }>(),
  {
    initialModuleSelectedId: null,
    moduleOptions: null,
    id: "",
    title: "",
  },
);
const emit = defineEmits(["applySelection"]);
const activeDifficultyLevelTab = ref(1);
const selectedRuleId = ref<number | null>(null);
const moduleSelection = ref<Record<number,boolean>>({})

const moduleIds = computed(() => {
  if (!props.moduleOptions) return [];
  return [...props.moduleOptions?.Beginner.map(module => module.id), ...props.moduleOptions?.Intermediate.map(module => module.id), ...props.moduleOptions?.Advanced.map(module => module.id)];
});

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

watch(() => props.initialModuleSelectedId, (newModuleId) => {
  if (newModuleId) {
      moduleIds.value.forEach(key => {
        moduleSelection.value[key] = false
      })
      moduleSelection.value[newModuleId] = true
      selectedRuleId.value = newModuleId;
  }
}, { immediate: true })



const handleRuleSelection = (ruleId: number) => {
  console.log("handleRuleSelection", ruleId, "becomes", !moduleSelection.value[ruleId]);
  if (!moduleSelection.value[ruleId]) {
    Object.keys(moduleSelection.value).forEach(key => {
      moduleSelection.value[key] = false
    })
    moduleSelection.value[ruleId] = !moduleSelection.value[ruleId];
    selectedRuleId.value = ruleId;
  }
};

const handleApplySelection = () => {
  console.log("handleApplySelection", selectedRuleId.value);
  emit('applySelection', selectedRuleId.value);
};
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
      <LayoutKeyElementRuleOption v-for="(rule, n) in filteredModuleOptions" :key="n" :selected="moduleSelection[rule.id]" :title="rule.name" :titleEn="rule.nameEn" :symbol="rule.symbol" @click="handleRuleSelection(rule.id)">
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
    </div>
    <div class="modal-action">
            <button class="w-40 bg-secondary cursor-pointer font-medium py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50" @click="$emit('cancel')">
              Cancel
            </button>
            <button
              class="w-40 bg-primary text-white cursor-pointer hover:bg-primary/90 font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
              @click="handleApplySelection"
            >
            <CheckIcon
              class="h-5 w-5 mr-2 text-white group-hover:text-neutral"
            />
              <span>Apply</span>
            </button>
        </div>
  </div>
  </dialog>
</template>
