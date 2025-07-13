<script setup lang="ts">
import {
  ArrowTrendingUpIcon,
  BookmarkIcon as BookmarkSolidIcon,
  EyeIcon,
} from "@heroicons/vue/24/solid";
import { BookmarkIcon, Square2StackIcon } from "@heroicons/vue/24/outline";
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
const isFetchingGrammarRules = ref(false)
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
    isFetchingGrammarRules.value = true
    const query = getDifficultyClassQuery(activeDifficultyLevelTab.value);
    const grammarModules = await $fetch("/api/grammar?order_by=id", {
      query,
    });
    if (grammarModules && Array.isArray(grammarModules))
      grammarRules.value = parseRules(grammarModules);
      isFetchingGrammarRules.value = false
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <div class="max-w-full max-h-screen grid grid-cols-4 gap-2">
    <div class="max-h-screen col-span-3">
      <div class="bg-white shadow-md">
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
        <div class="h-full px-6 overflow-auto pb-5">
          <div
            class="h-full grid grid-cols-1 cursor-pointer md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
          <!-- Empty State -->
           <div v-if="isFetchingGrammarRules" class="text-center py-8">
            
          </div>
            <div
              v-else
              v-for="(rule, n) in grammarRules"
              :key="n"
              class="flex flex-col justify-between bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200"
              @click="router.push(`/learning/grammar/${rule.id}`)"
            >
              <div class="flex items-start justify-between">
                <LayoutHeadingRuleTitle :rule="rule" />
                <BookmarkSolidIcon v-if="rule.bookmarked" class="h-5 w-5" />
                <BookmarkIcon v-else class="h-5 w-5" />
              </div>


              <!-- Highlights -->
              <div v-if="(rule as any).highlights" class="mb-4">
                <div class="bg-gradient-to-br from-slate-50 to-blue-50 border border-slate-200 rounded-xl p-4 shadow-sm">
                  <div class="flex items-start">
                    <div class="flex-1">
                      <div class="flex items-center gap-2 mb-2">
                        <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span class="text-xs font-semibold text-blue-700 uppercase tracking-wide">Key Point</span>
                      </div>
                      <p class="text-sm text-slate-800 font-medium leading-relaxed">
                        {{ (rule as any).highlights }}
                      </p>
                    </div>
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
          <!-- Table layout if necessary -->
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

    <div class="col-span-1 flex flex-col grow-1 mt-3 mr-3">
      <LearningSidePanel />
    </div>
  </div>
</template>
