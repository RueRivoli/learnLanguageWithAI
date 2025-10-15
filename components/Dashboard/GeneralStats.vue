<script setup lang="ts">
import { grammarLevelTabs } from "~/utils/learning/grammar";
import { Square2StackIcon } from "@heroicons/vue/24/solid";
import { useUserScoreStore } from "~/stores/user-score-store";

const userScoreStore = useUserScoreStore();
const activeLevelTab = ref(1);
const router = useRouter();

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
      class="col-span-2"
    >
      <div class="mb-4 flex items-center justify-between">
        <div class="flex">
          <LayoutHeadingPlus
            title="Progress on Modules"
          >
            <Square2StackIcon class="h-6 w-6 text-primary" />
          </LayoutHeadingPlus>
          <!-- <h3 class="text-lg font-semibold text-gray-900 ml-3 flex items-center">
            Progress on Modules
          </h3> -->
        </div>
        <LayoutTabs
          :first-tab="grammarLevelTabs.firstTab"
          :second-tab="grammarLevelTabs.secondTab"
          :third-tab="grammarLevelTabs.thirdTab"
          @tab-active-changed="(activeT) => (activeLevelTab = activeT)"
        />
      </div>

      <!-- Professional small rectangle grammar rules -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        <div v-if="!currentInfo.length" class="col-span-full">
          <!-- Empty state placeholder -->
          <div
            class="flex flex-col items-center justify-center py-12 px-6 text-center"
          >
            <!-- Decorative icon -->
            <div class="relative mb-6">
              <div
                class="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-8 h-8 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <!-- Subtle background accent -->
              <div
                class="absolute inset-0 w-16 h-16 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 rounded-full blur-xl"
              />
            </div>

            <!-- Main message -->
            <h4 class="text-lg font-semibold text-gray-800 mb-2">
              No Progress Data Available
            </h4>
            <p class="text-gray-600 mb-6 max-w-md">
              Start your learning journey by completing lessons and quizzes to
              see your progress here.
            </p>
            <!-- Subtle decorative elements -->
            <div class="mt-8 flex items-center gap-4 text-sm text-gray-400">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-blue-400 rounded-full" />
                <span>Complete lessons</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-green-400 rounded-full" />
                <span>Track progress</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-purple-400 rounded-full" />
                <span>See results</span>
              </div>
            </div>
          </div>
        </div>
        <div id="rules_overview" v-for="(rule, index) in currentInfo"  :key="index">
          <LayoutKeyElementRuleOverview class="h-full cursor-pointer" :title="rule.ruleName" :titleEn="rule.ruleNameTranslation" :symbol="rule.symbol" :score="rule.score" :level="rule.difficultyClass" :lightMode="true" @click="router.push(`/learning/modules/${rule.ruleId}`)">
            <template #details>
              <div class="rounded-lg p-2"
          >
            <div class="flex items-center">
              <div class="flex items-center gap-2">
                <div class="w-1.5 h-1.5 bg-green-500 rounded-full" />
                <span class="text-md font-medium text-gray-700"
                  >{{ rule.score }}%</span
                >
              </div>
              <span class="text-xs text-gray-600 ml-2"
                >of correct answers</span
              >
            </div>
          </div>
            </template>

            </LayoutKeyElementRuleOverview>
        </div>
        <div
          v-for="(rule, index) in currentInfo"
          v-if="false"
          :key="index"
          class="group relative bg-white rounded-lg border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 overflow-hidden h-24"
          :class="{
            'border-green-200 shadow-green-500/10 bg-gradient-to-br from-green-50/80 via-emerald-50/60 to-green-50/80':
              (rule.score || 0) >= 80,
            'border-gray-200': (rule.score || 0) < 80,
          }"
        >
          <!-- Professional background pattern -->
          <div
            class="absolute inset-0 bg-gradient-to-br from-white via-gray-50/30 to-white opacity-60"
            :class="{
              'opacity-0': (rule.score || 0) >= 80,
            }"
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
                <div
                  class="radial-progress text-xs"
                  :class="{
                    'text-success': rule.score > 80,
                    'text-warning': rule.score > 40,
                    'text-error': rule.score > 0,
                  }"
                  :style="`--value: ${rule.score};--size:2.5rem;`"
                  aria-valuenow="70"
                  role="progressbar"
                >
                  {{ rule.score }}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
