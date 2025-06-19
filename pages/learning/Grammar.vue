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

const { data } = await useFetch("/api/grammar");
if (data) grammarRules.value = data.value;

// const getGrammarRules = async () => {

// };

// getGrammarRules();

const getLeveledGrammarRules = async (difficultyClass: number) => {
  const { data } = await useFetch("/api/grammar-rules", {
    query: { difficulty_class: difficultyClass },
  });
  if (data) grammarRules.value = data.value;
};

const handleChange = (_: Event, level: number) => {
  getLeveledGrammarRules(level);
};

const fakeProgressBar = (n: number) => {
  if (n == 0) return 60;
  else if (n == 1) return 25;
  else if (n == 2) return 45;
  else if (n == 3) return 95;
  else if (n == 4) return 50;
  else if (n == 5) return 100;
  else if (n == 6) return 48;
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
            />

            <!-- <div class="tabs tabs-box tabs-sm">
              <input
                type="radio"
                name="my_tabs_1"
                class="tab"
                aria-label="All levels"
                checked="checked"
                @change="(_) => getGrammarRules()"
              />
              <input
                type="radio"
                name="my_tabs_1"
                class="tab"
                aria-label="Beginner"
                @change="(_) => handleChange(_, 1)"
              />
              <input
                type="radio"
                name="my_tabs_1"
                class="tab"
                aria-label="Intermediate"
                @change="(_) => handleChange(_, 2)"
              />
              <input
                type="radio"
                name="my_tabs_1"
                class="tab"
                aria-label="Advanced"
                @change="(_) => handleChange(_, 3)"
              />
            </div> -->
          </div>
        </div>
        <div class="p-3">
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
