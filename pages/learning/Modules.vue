<script setup lang="ts">
import { ArrowTrendingUpIcon, EyeIcon } from "@heroicons/vue/24/solid";
import { Square2StackIcon } from "@heroicons/vue/24/outline";
import {
  modulesFirstTab,
  modulesSecondTab,
  modulesThirdTab,
  getColorStyleClass,
  getGrammarRuleStyleClass,
} from "~/utils/learning/grammar";
import type { GrammarRule } from "~/types/grammar-rule.ts";

definePageMeta({
  layout: "authenticated",
});
useHead({
  title: "Grammar rules",
  titleTemplate: "%s - Learn languages with AI",
  meta: [
    { name: "grammar-rules", content: "width=device-width, initial-scale=1" },
  ],
  link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
});

const router = useRouter();
const grammarRules = ref<GrammarRule[]>([]);
const activeTab = ref(1);

const getDifficultyClass = (tab: number) => {
  switch (tab) {
    case 1:
      return {
        difficulty_class: 1,
        limit: 10,
      };
    case 2:
      return {
        difficulty_class: 2,
        limit: 10,
      };
    case 3:
      return {
        difficulty_class: 3,
        limit: 10,
      };
    default:
      return { limit: 10 };
  }
};
watchEffect(async () => {
  try {
    const query = getDifficultyClass(activeTab.value);
    const grammarModules = await $fetch("/api/grammar", {
      query,
    });
    console.log("grammarModules", grammarModules);
    if (grammarModules && Array.isArray(grammarModules)) {
      grammarRules.value = grammarModules.map((rule: any) => ({
        ...rule,
        score: rule.turkish_grammar_scores || [{ score: 0 }],
        symbol: rule.symbol || rule.rule_name.charAt(0).toUpperCase(),
        highlights: rule.highlights || null,
      }));
    }
    console.log("grammarRules", grammarRules.value);
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <div class="max-w-full max-h-screen grid grid-cols-4 gap-2">
    <div class="max-h-screen col-span-3">
      <div class="h-full bg-white rounded-box shadow-md">
        <div class="p-5">
          <div class="flex items-center justify-between">
            <LayoutHeadingPlus
              title="Modules"
              description="The modules to target"
            >
              <Square2StackIcon class="h-6 w-6 text-primary" />
            </LayoutHeadingPlus>
            <LayoutTabs
              :first-tab="modulesFirstTab"
              :second-tab="modulesSecondTab"
              :third-tab="modulesThirdTab"
              @tab-active-changed="(activeT) => (activeTab = activeT)"
            />
          </div>
        </div>
        <div class="h-full px-6 overflow-auto">
          <div
            class="h-full grid grid-cols-1 cursor-pointer md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <div
              v-for="(rule, n) in grammarRules"
              :key="n"
              class="flex flex-col justify-between bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200"
            >
              <!-- Header -->
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center space-x-3">
                  <div
                    class="w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold"
                    :class="getGrammarRuleStyleClass(rule as any)"
                  >
                    <span class="text-lg">
                      {{ (rule as any).symbol }}
                    </span>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900 text-sm">
                      {{ rule.rule_name_translation }}
                    </h3>
                    <p class="text-gray-500 text-xs">
                      {{ rule.rule_name }}
                    </p>
                  </div>
                </div>
                <!-- <component
                    :is="getLevelLabel(rule.difficulty_class)"
                    class="text-xs"
                  /> -->
                <div />
              </div>

              <!-- Progress -->
              <!-- <div class="mb-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs font-medium text-gray-600">Progress</span>
                  <span
                    class="text-xs font-semibold"
                    :class="getPercentageStyleClass((rule as any).score[0].score)"
                  >
                    {{ (rule as any).score[0].score }}%
                  </span>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex-1 mr-3">
                    <progress
                      class="progress w-full h-2"
                      :class="getProgressBarStyleClass((rule as any).score[0].score)"
                      :value="(rule as any).score[0].score"
                      max="100"
                    />
                  </div>
                </div>
              </div> -->

              <!-- Highlight -->
              <div v-if="(rule as any).highlights" class="mb-4">
                <div class="pb-4">
                  <div class="flex items-start gap-3">
                    <div
                      class="text-gray-700 text-pretty font-semibold leading-relaxed bg-gradient-to-r from-gray-50 to-blue-50 border-l-4 border-blue-300 px-4 py-3 rounded-r-lg shadow-sm"
                      v-text="(rule as any).highlights"
                    />
                  </div>
                </div>
              </div>

              <!-- Actions -->
              <div class="flex items-center justify-between">
                <div>
                  <button
                    class="btn btn-ghost btn-xs btn-primary mr-2"
                    @click="router.push(`/learning/grammar/${rule.id}`)"
                  >
                    <EyeIcon class="h-3 w-3" />
                    View
                  </button>
                  <button class="btn btn-xs btn-outline btn-warning">
                    <ArrowTrendingUpIcon class="h-3 w-3" />
                    Practice
                  </button>
                </div>

                <div class="relative flex-shrink-0">
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
                      <!-- Progress circle -->
                      <path
                        :class="
                          getColorStyleClass((rule as any).score[0].score)
                        "
                        stroke="currentColor"
                        stroke-width="3"
                        stroke-linecap="round"
                        fill="none"
                        :stroke-dasharray="`${((rule as any).score[0].score / 100) * 100}, 100`"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <!-- Center text -->
                    <div
                      class="absolute inset-0 flex items-center justify-center"
                    >
                      <span
                        class="text-[10px] font-bold leading-none"
                        :class="
                          getColorStyleClass((rule as any).score[0].score)
                        "
                      >
                        {{ (rule as any).score[0].score }}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="grammarRules.length === 0" class="text-center py-8">
            <div
              class="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center"
            >
              <Square2StackIcon class="h-6 w-6 text-gray-400" />
            </div>
            <h3 class="text-base font-medium text-gray-900 mb-1">
              No grammar rules found
            </h3>
            <p class="text-gray-500 text-sm">
              Try selecting a different difficulty level.
            </p>
          </div>

          <!-- <table class="table table-pin-rows table-pin-cols">
            <thead>
              <tr>
                <th />
                <th>Grammar Rule</th>
                <th>Difficulty</th>
                <th>Your progress</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(rule, n) in grammarRules">
                <td>
                  <div class="font-bold">{{ rule.id }}</div>
                </td>
                <td>
                  <div
                    class="flex group items-center gap-3 hover:cursor-pointer"
                    @click="router.push(`/learning/grammar/${rule.id}`)"
                  >
                    <div
                      class="avatar group-hover:opacity-70 transition-opacity duration-300"
                    >
                      <div class="avatar avatar-placeholder">
                        <div
                          class="text-neutral-content w-10 h-10 rounded-xl font-semibold"
                          :class="getGrammarRuleStyleClass(rule)"
                        >
                          <span class="text-xl">{{
                            getGrammarRuleInitialLetters(rule.rule_name)
                          }}</span>
                        </div>
                      </div>
                    </div>
                    <div
                      class="hover:cursor-pointer group-hover:opacity-70 transition-opacity duration-300"
                    >
                      <div class="font-bold">{{ rule.rule_name }}</div>
                      <div class="text-sm opacity-50">
                        {{ rule.rule_name_translation }}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <component :is="getLevelLabel(rule.difficulty_class)" />
                </td>
                <td>
                  <div class="flex items-center">
                    <progress
                      class="progress text-base-400 w-56"
                      :class="getProgressBarStyleClass(fakeProgressBar(n))"
                      :value="fakeProgressBar(n)"
                      max="100"
                    />
                    <div
                      class="ml-2 font-bold"
                      :class="getPercentageStyleClass(fakeProgressBar(n))"
                    >
                      {{ fakeProgressBar(n) }}%
                    </div>
                  </div>
                </td>
                <td>
                  <button class="btn btn-ghost">
                    <ArrowTrendingUpIcon
                      class="h-5 w-5 font-bold text-black dark:text-white group-hover:text-white"
                    />
                  </button>
                  <button
                    class="btn btn-ghost"
                    @click="router.push(`/learning/grammar/${rule.id}`)"
                  >
                    <EyeIcon
                      class="h-5 w-5 font-bold text-black dark:text-white group-hover:text-white"
                    />
                  </button>
                </td>
              </tr>
            </tbody>
          </table> -->
        </div>
      </div>
    </div>

    <div class="col-span-1 flex flex-col grow-1 border-l border-zinc-950/5">
      <LearningSidePanel />
    </div>
  </div>
</template>
