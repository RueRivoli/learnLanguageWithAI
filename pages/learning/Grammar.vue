<script setup lang="ts">
import { ArrowTrendingUpIcon, EyeIcon } from "@heroicons/vue/24/solid";
import { Square2StackIcon } from "@heroicons/vue/24/outline";
import {
  modulesFirstTab,
  modulesSecondTab,
  modulesThirdTab,
  getLevelLabel,
  getGrammarRuleInitialLetters,
  getGrammarRuleStyleClass,
  getProgressBarStyleClass,
  getPercentageStyleClass,
  getRadialProgressClass,
  getRadialGradientStart,
  getRadialGradientEnd,
  getRadialTextClass,
  getRadialGlowClass,
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
    const query = getDifficultyClass(activeTab.value);
    query.limit = 10;
    const grammarModules = await $fetch("/api/grammar", {
      query,
    });
    if (grammarModules.error) throw grammarModules.error;
    else if (grammarModules) grammarRules.value = grammarModules;
    console.log("grammar rules", grammarModules);
  } catch (error) {
    console.log(error);
  }
});

const fakeProgressBar = (n: number) => {
  if (n == 0) return 60;
  else if (n == 1) return 25;
  else if (n == 2) return 45;
  else if (n == 3) return 95;
  else if (n == 4) return 50;
  else if (n == 5) return 100;
  else if (n == 6) return 48;
  else if (n == 7) return 50;
  else if (n == 8) return 20;
  else if (n == 9) return 28;
  else if (n == 10) return 80;
  else if (n == 11) return 78;
};
</script>

<template>
  <div class="w-full grid grid-cols-4 gap-2">
    <div class="col-span-3">
      <div class="list bg-white rounded-box shadow-md">
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
        <div class="p-3">
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <article
                v-for="(rule, n) in grammarRules"
                :key="n"
                class="group relative bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                <!-- Compact Header -->
                <div
                  class="relative h-20 bg-gradient-to-r from-indigo-400 to-indigo-500"
                >
                  <div class="absolute inset-0 bg-black/5" />
                  <div class="relative p-4 flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                      <div
                        class="w-8 h-8 rounded-lg bg-white/25 flex items-center justify-center shadow-sm"
                      >
                        <span class="text-sm font-bold text-white">
                          {{ getGrammarRuleInitialLetters(rule.rule_name) }}
                        </span>
                      </div>
                      <div class="min-w-0 flex-1">
                        <h3
                          class="text-sm font-semibold text-white leading-tight truncate"
                        >
                          {{ rule.rule_name_translation }}
                        </h3>
                        <p class="text-indigo-100 text-xs truncate">
                          {{ rule.rule_name }}
                        </p>
                      </div>
                    </div>
                    <div class="flex items-center space-x-2">
                      <component
                        :is="getLevelLabel(rule.difficulty_class)"
                        class="bg-white/20 rounded-full px-2 py-1 text-xs"
                      />
                    </div>
                  </div>
                </div>

                <!-- Compact Content -->
                <div class="p-4">
                  <!-- Progress Section -->
                  <div class="mb-4">
                    <!-- <div class="flex items-center justify-between mb-1">
                      <span class="text-xs font-medium text-gray-600"
                        >Progress</span
                      >
                      <span
                        class="text-xs font-bold"
                        :class="getPercentageStyleClass(fakeProgressBar(n))"
                      >
                        {{ fakeProgressBar(n) }}%
                      </span>
                    </div> -->
                    <div class="relative">
                      <div class="w-full">
                        <p v-html="rule.intro" />
                        <!-- <div 
                        class="h-1.5 rounded-full transition-all duration-300 ease-out"
                        :class="getProgressBarStyleClass(fakeProgressBar(n))"
                        :style="{ width: `${fakeProgressBar(n)}%` }"
                      ></div> -->
                        <progress
                          class="h-1.5 rounded-full transition-all duration-300 ease-out progress w-56"
                          :class="getProgressBarStyleClass(fakeProgressBar(n))"
                          :value="fakeProgressBar(n)"
                          max="100"
                        />
                      </div>
                    </div>
                  </div>

                  <!-- Quick Description -->
                  <div class="mb-4">
                    <!-- <p
                      class="text-gray-600 text-xs leading-relaxed line-clamp-2"
                      v-html="rule.intro"
                    >
                      {{
                        rule.description ||
                        "Master this grammar rule to improve your skills."
                      }}
                    </p> -->
                  </div>

                  <!-- Compact Action Buttons -->
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                      <button
                        class="btn btn-xs btn-ghost btn-secondary inline-flex items-center transition-colors duration-200"
                        @click="router.push(`/learning/grammar/${rule.id}`)"
                      >
                        <EyeIcon class="h-3 w-3 mr-1" />
                        <span>View</span>
                      </button>
                      <button
                        class="btn btn-xs btn-ghost btn-warning inline-flex items-center px-3 py-1.5 rounded-md transition-colors duration-200"
                      >
                        <ArrowTrendingUpIcon class="h-3 w-3 mr-1" />
                        <span>Practice</span>
                      </button>
                    </div>

                    <!-- Awesome Radial Progress Bar -->
                    <div class="relative">
                      <div class="relative w-8 h-8">
                        <!-- Background Circle -->
                        <svg
                          class="w-8 h-8 transform -rotate-90"
                          viewBox="0 0 36 36"
                        >
                          <path
                            class="text-gray-200"
                            stroke="currentColor"
                            stroke-width="2"
                            fill="none"
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <!-- Progress Circle with Gradient -->
                          <path
                            class="transition-all duration-1000 ease-out"
                            :class="getRadialProgressClass(fakeProgressBar(n))"
                            stroke="url(#gradient)"
                            stroke-width="2"
                            stroke-linecap="round"
                            fill="none"
                            :stroke-dasharray="`${fakeProgressBar(n) * 1.01}, 100`"
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <!-- Gradient Definition -->
                          <defs>
                            <linearGradient
                              id="gradient"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="0%"
                            >
                              <stop
                                offset="0%"
                                :stop-color="
                                  getRadialGradientStart(fakeProgressBar(n))
                                "
                              />
                              <stop
                                offset="100%"
                                :stop-color="
                                  getRadialGradientEnd(fakeProgressBar(n))
                                "
                              />
                            </linearGradient>
                          </defs>
                        </svg>

                        <!-- Center Content -->
                        <div
                          class="absolute inset-0 flex items-center justify-center"
                        >
                          <div class="text-center">
                            <div
                              class="text-xs font-bold leading-none"
                              :class="getRadialTextClass(fakeProgressBar(n))"
                            >
                              {{ fakeProgressBar(n) }}%
                            </div>
                          </div>
                        </div>

                        <!-- Glow Effect -->
                        <div
                          class="absolute inset-0 rounded-full opacity-20 blur-sm transition-all duration-300"
                          :class="getRadialGlowClass(fakeProgressBar(n))"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Subtle hover effect -->
                <div
                  class="absolute inset-0 bg-gradient-to-r from-indigo-400/3 to-purple-400/3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                />
              </article>
            </div>

            <!-- Compact Empty State -->
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
          </div>
          <table class="table table-pin-rows table-pin-cols">
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
          </table>
        </div>
      </div>
    </div>

    <div class="col-span-1 flex flex-col grow-1 border-l border-zinc-950/5">
      <LearningSidePanel />
    </div>
  </div>
</template>
