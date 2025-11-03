<script setup lang="ts">
import { CheckIcon, PencilSquareIcon } from "@heroicons/vue/24/outline";
import type { GrammarRuleMeta } from "~/types/modules/grammar-rule";
import {
  getBorderStyleClassFromGrammarRuleLevel,
  getTextStyleClassFromGrammarRuleLevel,
  grammarLevelTabs,
} from "~/utils/learning/grammar";
const props = withDefaults(
  defineProps<{
    initialModuleSelectedId: number | null;
    moduleOptions: Record<
      string,
      Array<GrammarRuleMeta & { score: number }>
    > | null;
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
const emit = defineEmits(["applySelection", "cancel"]);
const activeDifficultyLevelTab = ref(1);
const selectedRuleId = ref<number | null>(null);
const moduleSelection = ref<Record<number, boolean>>({});

const moduleIds = computed(() => {
  if (!props.moduleOptions) return [];
  return [
    ...props.moduleOptions?.Beginner.map((module) => module.id),
    ...props.moduleOptions?.Intermediate.map((module) => module.id),
    ...props.moduleOptions?.Advanced.map((module) => module.id),
  ];
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

watch(
  () => props.initialModuleSelectedId,
  (newModuleId) => {
    if (newModuleId) {
      moduleIds.value.forEach((key) => {
        moduleSelection.value[key] = false;
      });
      moduleSelection.value[newModuleId] = true;
      selectedRuleId.value = newModuleId;
    }
  },
  { immediate: true },
);

const handleRuleSelection = (ruleId: number) => {
  if (!moduleSelection.value[ruleId]) {
    Object.keys(moduleSelection.value).forEach((key) => {
      moduleSelection.value[key] = false;
    });
    moduleSelection.value[ruleId] = !moduleSelection.value[ruleId];
    selectedRuleId.value = ruleId;
  }
};

const handleApplySelection = () => {
  emit("applySelection", selectedRuleId.value);
};
</script>

<template>
  <dialog :id="props.id" class="modal">
    <div class="modal-box w-11/12 max-w-5xl max-h-[80vh] overflow-y-auto">
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
        class="mb-4"
        :first-tab="grammarLevelTabs.firstTab"
        :second-tab="grammarLevelTabs.secondTab"
        :third-tab="grammarLevelTabs.thirdTab"
        @tab-active-changed="
          (activeTab) => (activeDifficultyLevelTab = activeTab)
        "
      />
      <div class="p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <LayoutKeyElementRuleOption
          class="h-full cursor-pointer"
          v-for="(rule, n) in filteredModuleOptions"
          :key="n"
          :selected="moduleSelection[rule.id]"
          :title="rule.name"
          :titleEn="rule.nameEn"
          :symbol="rule.symbol"
          :level="rule.level"
          @click="handleRuleSelection(rule.id)"
          :lightMode="true"
        >
          <template #content>
            <!-- Professional description box -->
            <div v-if="rule.highlights" class="mt-3 mb-4">
              <div
                class="relative rounded-xl p-4 shadow-sm overflow-hidden"
                :class="
                  getBorderStyleClassFromGrammarRuleLevel(rule.level ?? 0)
                "
              >
                <!-- Subtle texture overlay -->
                <div
                  class="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-black/5 opacity-60"
                ></div>
                <div
                  class="absolute inset-0 opacity-20 bg-[conic-gradient(from_45deg_at_50%_50%,rgba(255,255,255,0.4)_0deg,rgba(255,255,255,0.1)_90deg,rgba(255,255,255,0.2)_180deg,rgba(255,255,255,0.05)_270deg)]"
                ></div>

                <!-- Content -->
                <div class="relative z-10">
                  <div class="flex items-center gap-2 mb-2">
                    <!-- <div class="w-2 h-2 bg-emerald-500 rounded-full shadow-sm"></div> -->
                    <svg
                      class="h-3 w-3"
                      :class="
                        getTextStyleClassFromGrammarRuleLevel(rule.level ?? 0)
                      "
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                        fill="none"
                      />
                      <circle cx="12" cy="12" r="3" fill="currentColor" />
                    </svg>
                    <span
                      class="text-xs font-semibold uppercase tracking-wide"
                      :class="
                        getTextStyleClassFromGrammarRuleLevel(rule.level ?? 0)
                      "
                      >Key Point</span
                    >
                  </div>
                  <p class="text-sm text-slate-700 font-medium leading-relaxed">
                    {{ rule.highlights }}
                  </p>
                </div>
              </div>
            </div>
          </template>
          <template #details>
            <div class="rounded-lg p-2">
              <div class="flex items-center">
                <div class="flex items-center gap-2">
                  <div class="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  <span class="text-xs text-gray-600 ml-2">current score</span>
                  <span class="text-md font-medium text-gray-700"
                    >{{ rule.score }}%</span
                  >
                </div>
              </div>
            </div>
          </template>
        </LayoutKeyElementRuleOption>
      </div>
      <div class="modal-action">
        <button
          class="bg-secondary cursor-pointer font-medium py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50"
          @click="$emit('cancel')"
        >
          <span>Cancel</span>
        </button>
        <button
          class="bg-primary text-white cursor-pointer hover:bg-primary/90 font-medium px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
          @click="handleApplySelection"
        >
          <CheckIcon class="h-5 w-5 mr-2 text-white group-hover:text-neutral" />
          <span>Apply</span>
        </button>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button @click="emit('cancel')">close</button>
    </form>
  </dialog>
</template>
