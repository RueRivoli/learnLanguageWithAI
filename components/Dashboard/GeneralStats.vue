<script setup lang="ts">
import { grammarLevelTabs } from "~/utils/learning/grammar";

import { useUserScoreStore } from "~/stores/user-score-store";

const userScoreStore = useUserScoreStore();
const activeLevelTab = ref(1);

const currentInfo = computed(() => {
  switch (activeLevelTab.value) {
    case 1:
      return userScoreStore.beginnerGrammarRulesInfo;
    case 2:
      return userScoreStore.intermediateGrammarRulesInfo;
    case 3:
      return userScoreStore.advancedGrammarRulesInfo;
    default:
      return [];
  }
});
</script>

<template>
  <!-- General Dashboard -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <div
      class="col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6"
    >
      <div class="mb-4 flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">
          Your Progress on the Different Themes
        </h3>
        <LayoutTabs
          :first-tab="grammarLevelTabs.firstTab"
          :second-tab="grammarLevelTabs.secondTab"
          :third-tab="grammarLevelTabs.thirdTab"
          @tab-active-changed="(activeT) => (activeLevelTab = activeT)"
        />
      </div>

      <!-- Professional small rectangle grammar rules -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div
          v-for="(rule, index) in currentInfo"
          :key="index"
          class="group relative bg-white rounded-lg border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 overflow-hidden h-24"
          :class="{
            'border-green-200 shadow-green-500/10': (rule.score || 0) >= 80,
            'border-gray-200': (rule.score || 0) < 80,
          }"
        >
          <!-- Professional background pattern -->
          <div
            class="absolute inset-0 bg-gradient-to-br from-white via-gray-50/30 to-white opacity-60"
          />

          <!-- Success celebration for mastered rules -->
          <div
            v-if="(rule.score || 0) >= 80"
            class="absolute inset-0 bg-gradient-to-br from-green-500/8 via-emerald-500/5 to-green-500/8 opacity-0 group-hover:opacity-100 transition-all duration-300"
          />

          <!-- Subtle hover effect for non-mastered rules -->
          <div
            v-else
            class="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-indigo-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:via-indigo-500/3 group-hover:to-purple-500/5 transition-all duration-300"
          />

          <!-- Success indicator for mastered rules -->
          <div
            v-if="(rule.score || 0) >= 80"
            class="absolute top-2 right-2 w-1.5 h-1.5 bg-green-500 rounded-full shadow-lg shadow-green-500/50 animate-pulse"
          />

          <!-- Content container -->
          <div class="relative z-10 p-3 h-full flex items-center">
            <!-- Compact row layout: RuleTitle + Radial Progress -->
            <div class="flex items-center justify-between w-full">
              <!-- Rule title (untouched) -->
              <div class="flex-1 min-w-0">
                <LayoutHeadingRuleTitle :rule="rule" :main-title="false" />
              </div>

              <!-- Radial progress -->
              <div class="flex-shrink-0 ml-4">
                <div class="relative w-10 h-10">
                  <!-- Background circle -->
                  <svg
                    class="w-10 h-10 transform -rotate-90"
                    viewBox="0 0 36 36"
                  >
                    <path
                      class="text-gray-200"
                      stroke="currentColor"
                      stroke-width="3"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <!-- Progress circle - continuous standard -->
                    <path
                      class="transition-all duration-1000 ease-out"
                      :class="{
                        'text-green-500': (rule.score || 0) >= 80,
                        'text-yellow-500':
                          (rule.score || 0) >= 50 && (rule.score || 0) < 80,
                        'text-red-500': (rule.score || 0) < 50,
                      }"
                      stroke="currentColor"
                      stroke-width="3"
                      stroke-linecap="round"
                      fill="none"
                      :stroke-dasharray="`${(rule.score || 0) * 0.314}, 31.415`"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>

                  <!-- Center percentage with more space -->
                  <div
                    class="absolute inset-0 flex items-center justify-center"
                  >
                    <span
                      class="text-xs font-bold px-1"
                      :class="{
                        'text-green-600': (rule.score || 0) >= 80,
                        'text-yellow-600':
                          (rule.score || 0) >= 50 && (rule.score || 0) < 80,
                        'text-red-600': (rule.score || 0) < 50,
                      }"
                    >
                      {{ rule.score || 0 }}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
