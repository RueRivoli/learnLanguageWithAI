<script setup lang="ts">
import {
  Square2StackIcon,
} from "@heroicons/vue/24/solid";
import {
  grammarLevelTabs,
  getGrammarRuleStyleClass,
  getBorderStyleClassFromGrammarRuleLevel,
  getTextStyleClassFromGrammarRuleLevel,
} from "~/utils/learning/grammar";
import type { GrammarRule } from "~/types/modules/grammar-rule";
import { parseRules } from "~/utils/learning/grammar";
import { getAuthToken } from "~/utils/auth/auth";

definePageMeta({
  layout: "authenticated",
});
useHead({
  title: "Language concepts",
  titleTemplate: "%s - Tookan AI",
  meta: [
    { name: "concept-units", content: "width=device-width, initial-scale=1" },
  ],
  link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
});

const router = useRouter();
const grammarRules = ref<GrammarRule[]>([]);
const isFetchingGrammarRules = ref(false);
const activeDifficultyLevelTab = ref(1);


const getDifficultyClassQuery = (tab: number) => {
  switch (tab) {
    case 1:
      return {
        difficulty_class: 1,
      };
    case 2:
      return {
        difficulty_class: 2,
      };
    case 3:
      return {
        difficulty_class: 3,
      };
    default:
      return {};
  }
};
watchEffect(async () => {
  try {
    isFetchingGrammarRules.value = true;
    const query = getDifficultyClassQuery(activeDifficultyLevelTab.value);
    const headers = await getAuthToken();
    const grammarModules = await $fetch("/api/grammar?order_by=id", {
      headers,
      query,
    });
    if (grammarModules && Array.isArray(grammarModules))
      grammarRules.value = parseRules(grammarModules);
    isFetchingGrammarRules.value = false;
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <div class="max-w-full max-h-screen grid grid-cols-4 gap-2">
    <div class="max-h-screen col-span-3">
      <div class="bg-white shadow-md rounded-lg">
        <div class="p-5">
          <div class="flex items-center justify-between">
            <LayoutHeadingPlus
              title="Modules"
              description="Area of Improvements"
            >
              <Square2StackIcon class="h-6 w-6 text-primary" />
            </LayoutHeadingPlus>
            <LayoutTabs
              :first-tab="grammarLevelTabs.firstTab"
              :second-tab="grammarLevelTabs.secondTab"
              :third-tab="grammarLevelTabs.thirdTab"
              @tab-active-changed="
                (activeTab) => (activeDifficultyLevelTab = activeTab)
              "
            />
          </div>
        </div>
        <div class="h-full px-6 overflow-auto pb-3">
          <div
            class="h-full grid grid-cols-1 cursor-pointer md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <!-- Loading Skeletons -->
            <template v-if="isFetchingGrammarRules">
              <div
                v-for="n in 12"
                :key="`skeleton-${n}`"
                class="flex flex-col justify-between bg-white rounded-lg border border-gray-200 p-3 animate-pulse h-44"
              >
                <!-- Header skeleton -->
                <div class="flex items-start justify-between mb-3">
                  <div class="flex-1">
                    <div class="skeleton h-6 w-3/4 mb-2" />
                    <div class="skeleton h-4 w-1/2" />
                  </div>
                  <div class="skeleton h-5 w-5 rounded-full ml-3" />
                </div>

                <!-- Highlights skeleton (randomly shown) -->
                <div v-if="n % 2 === 0" class="mb-3 flex-1">
                  <div
                    class="rounded-xl p-3 shadow-sm relative overflow-hidden border border-slate-200/50 h-full"
                  >
                    <!-- Light background with neutral color tint -->
                    <div class="absolute inset-0 bg-white/90" />
                    <div class="absolute inset-0 opacity-20 bg-slate-200" />

                    <!-- Professional texture overlay with low opacity -->
                    <div
                      class="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/10"
                    />
                    <div
                      class="absolute inset-0 opacity-30 bg-[conic-gradient(from_45deg_at_50%_50%,rgba(255,255,255,0.6)_0deg,rgba(255,255,255,0.2)_90deg,rgba(255,255,255,0.3)_180deg,rgba(255,255,255,0.1)_270deg)]"
                    />
                    <div
                      class="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:4px_4px]"
                    />

                    <div class="flex items-start h-full relative z-10">
                      <div class="flex-1">
                        <div class="flex items-center gap-2 mb-2">
                          <div
                            class="skeleton w-2 h-2 rounded-full shadow-sm bg-slate-300"
                          />
                          <div class="skeleton h-3 w-16 bg-slate-300" />
                        </div>
                        <div class="skeleton h-4 w-full mb-1" />
                        <div class="skeleton h-4 w-3/4 mb-1" />
                        <div class="skeleton h-4 w-2/3" />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Spacer for cards without highlights -->
                <div v-else class="flex-1" />

                <!-- Actions skeleton -->
                <div class="flex items-center justify-between mt-auto">
                  <div class="flex gap-2">
                    <div class="skeleton h-8 w-16 rounded-lg" />
                    <div class="skeleton h-8 w-20 rounded-lg" />
                  </div>
                  <div class="skeleton h-8 w-12 rounded-full" />
                </div>
              </div>
            </template>
            <div v-else v-for="(rule, n) in grammarRules" :key="n" @click="router.push(`/learning/modules/${rule.id}`)">
              <LayoutKeyElementRuleOverview class="h-full cursor-pointer" :title="rule.ruleName" :titleEn="rule.ruleNameTranslation" :symbol="rule.symbol" :score="rule.score" :level="rule.difficultyClass" :lightMode="true">
                <template #content>
                  <!-- Professional description box -->
                  <div v-if="(rule as any).highlights" class="mt-3 mb-4">
                    <div class="relative rounded-xl p-4 shadow-sm overflow-hidden" :class="getBorderStyleClassFromGrammarRuleLevel(rule.difficultyClass ?? 0)">
                      <!-- Subtle texture overlay -->
                      <div class="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-black/5 opacity-60"></div>
                      <div class="absolute inset-0 opacity-20 bg-[conic-gradient(from_45deg_at_50%_50%,rgba(255,255,255,0.4)_0deg,rgba(255,255,255,0.1)_90deg,rgba(255,255,255,0.2)_180deg,rgba(255,255,255,0.05)_270deg)]"></div>
                      
                      <!-- Content -->
                      <div class="relative z-10">
                        <div class="flex items-center gap-2 mb-2">
                          <!-- <div class="w-2 h-2 bg-emerald-500 rounded-full shadow-sm"></div> -->
                          <svg class="h-3 w-3" :class="getTextStyleClassFromGrammarRuleLevel(rule.difficultyClass ?? 0)" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
                            <circle cx="12" cy="12" r="3" fill="currentColor"/>
                          </svg>
                          <span class="text-xs font-semibold uppercase tracking-wide" :class="getTextStyleClassFromGrammarRuleLevel(rule.difficultyClass ?? 0)">Key Point</span>
                        </div>
                        <p class="text-sm text-slate-700 font-medium leading-relaxed">
                          {{ (rule as any).highlights }}
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
          </div>

        </div>
      </div>
    </div>

    <div class="col-span-1 flex flex-col grow-1">
      <LearningSidePanel />
    </div>
  </div>
</template>
