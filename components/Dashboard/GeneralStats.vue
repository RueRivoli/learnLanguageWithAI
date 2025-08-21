<script setup lang="ts">
import { grammarLevelTabs } from "~/utils/learning/grammar";
import { Square2StackIcon } from "@heroicons/vue/24/outline";
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
      class="col-span-2"
    >
      <div class="mb-4 flex items-center justify-between">
        <div class="flex">
          <div class="flex-shrink-0">
            <div class="relative">
              <div
                class="absolute inset-0 bg-gradient-to-br from-gray-300/20 to-slate-300/20 rounded-lg blur-sm"
              />
              <div
                class="relative p-2 bg-white rounded-lg shadow-lg border border-gray-200"
              >
                <Square2StackIcon class="h-5 w-5 text-gray-600" />
              </div>
            </div>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 ml-3 flex items-center">
            Progress on Modules
          </h3>
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
        <div 
          id="rules_overview" 
          v-for="(rule, index) in currentInfo" 
          :key="index"
          class="group relative rounded-xl border shadow-sm overflow-hidden h-28 cursor-pointer"
          :class="{
            'border-emerald-200 shadow-emerald-500/10': activeLevelTab === 1,
            'border-warning shadow-warning/10': activeLevelTab === 2,
            'border-error shadow-error/10': activeLevelTab === 3,
          }"
          :style="{
            backgroundColor: activeLevelTab === 1 
              ? `rgba(16, 185, 129, ${(rule.score || 0) / 100 * 0.15 + 0.03})` 
              : activeLevelTab === 2 
              ? `rgba(251, 191, 36, ${(rule.score || 0) / 100 * 0.15 + 0.03})`
              : `rgba(239, 68, 68, ${(rule.score || 0) / 100 * 0.15 + 0.03})`
          }"
        >




          <!-- Content container -->
          <div class="relative z-10 p-4 h-full flex items-center">
            <div class="flex items-center justify-between w-full">
              <!-- Rule information -->
              <div class="flex items-center gap-4 flex-1 min-w-0">
                                 <!-- Rule symbol with enhanced styling -->
                 <div
                   class="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold relative overflow-hidden shadow-lg flex-shrink-0"
                   :class="{
                     'bg-emerald-500': activeLevelTab === 1,
                     'bg-warning': activeLevelTab === 2,
                     'bg-error': activeLevelTab === 3,
                   }"
                 >
                  <!-- Professional texture overlay -->
                  <div class="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10" />
                  <div class="absolute inset-0 bg-[conic-gradient(from_45deg_at_50%_50%,rgba(255,255,255,0.3)_0deg,rgba(255,255,255,0.1)_90deg,rgba(255,255,255,0.2)_180deg,rgba(255,255,255,0.05)_270deg)]" />
                  <span class="relative z-10 text-lg">{{ rule.symbol }}</span>
                </div>

                <!-- Rule details -->
                <div class="flex-1 min-w-0">
                  <h4 class="font-semibold text-gray-900 text-sm leading-tight mb-1 truncate">
                    {{ rule.ruleNameTranslation }}
                  </h4>
                  <p class="text-gray-600 text-xs leading-tight truncate">
                    {{ rule.ruleName }}
                  </p>
                  
                  
                </div>
              </div>

              <!-- Score section -->
              <div class="flex flex-col items-end gap-2 flex-shrink-0 ml-4">
                <!-- Score percentage -->
                <div class="text-right">
                  <div class="text-xs text-gray-500 mb-1 font-medium">Score</div>
                                     <div class="text-2xl font-bold"
                                                 :class="{
                           'text-emerald-700': activeLevelTab === 1,
                           'text-warning': activeLevelTab === 2,
                           'text-error': activeLevelTab === 3,
                         }">
                    {{ rule.score || 0 }}%
                  </div>
                </div>

                                 
              </div>
            </div>
          </div>

          <!-- Progress bar at bottom -->
          <div class="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
            <div class="h-full transition-all duration-500 ease-out"
                 :class="{
                   'bg-emerald-500': activeLevelTab === 1,
                   'bg-warning': activeLevelTab === 2,
                   'bg-error': activeLevelTab === 3,
                 }"
                 :style="{ width: `${rule.score || 0}%` }">
            </div>
          </div>
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
