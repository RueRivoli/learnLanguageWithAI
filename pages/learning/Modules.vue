<script setup lang="ts">
import { ArrowTrendingUpIcon, EyeIcon } from "@heroicons/vue/24/solid";
import { Square2StackIcon } from "@heroicons/vue/24/outline";
import {
  modulesFirstTab,
  modulesSecondTab,
  modulesThirdTab,
} from "~/utils/learning/grammar";
import type { GrammarRule } from "~/types/grammar-rule.ts";
import { parseRules } from "~/types/grammar-rule.ts";

definePageMeta({
  layout: "authenticated",
});
useHead({
  title: "Language concepts",
  titleTemplate: "%s - Learn languages with AI",
  meta: [
    { name: "concept-units", content: "width=device-width, initial-scale=1" },
  ],
  link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
});

const router = useRouter();
const grammarRules = ref<GrammarRule[]>([]);
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
    const query = getDifficultyClassQuery(activeDifficultyLevelTab.value);
    const grammarModules = await $fetch("/api/grammar", {
      query,
    });
    if (grammarModules && Array.isArray(grammarModules))
      grammarRules.value = parseRules(grammarModules);
    console.log("grammarRules", grammarRules.value);
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <div class="max-w-full max-h-screen grid grid-cols-4 gap-2">
    <div class="max-h-screen col-span-3">
      <div class="h-full bg-white rounded-lg shadow-md">
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
              @tab-active-changed="
                (activeTab) => (activeDifficultyLevelTab = activeTab)
              "
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
              @click="router.push(`/learning/grammar/${rule.id}`)"
            >
              <LayoutHeadingRuleTitle :rule="rule" />
              <!-- <component
                    :is="getLevelLabel(rule.difficulty_class)"
                    class="text-xs"
                  /> -->

              <!-- Highlights -->
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
                    class="btn btn-ghost btn-sm btn-primary mr-2"
                    @click="router.push(`/learning/grammar/${rule.id}`)"
                  >
                    <EyeIcon class="h-3 w-3" />
                    View
                  </button>
                  <button class="btn btn-sm btn-secondary">
                    <ArrowTrendingUpIcon class="h-3 w-3" />
                    Practice
                  </button>
                </div>

                <LearningModuleScore
                  v-if="rule.score[0]"
                  :score="rule.score[0].score"
                />
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
                            getGrammarRuleInitialLetters(rule.ruleName)
                          }}</span>
                        </div>
                      </div>
                    </div>
                    <div
                      class="hover:cursor-pointer group-hover:opacity-70 transition-opacity duration-300"
                    >
                      <div class="font-bold">{{ rule.ruleName }}</div>
                      <div class="text-sm opacity-50">
                        {{ rule.ruleNameTranslation }}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <component :is="getLevelLabel(rule.difficultyClass)" />
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
