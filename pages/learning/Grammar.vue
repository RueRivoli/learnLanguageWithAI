<script setup lang="ts">
import { ArrowTrendingUpIcon, EyeIcon } from "@heroicons/vue/24/solid";
import {
  getLevelLabel,
  getGrammarRuleInitialLetters,
  getGrammarRuleStyleClass,
  getProgressBarStyleClass,
  getPercentageStyleClass,
} from "~/utils/learning/grammar";
import type { GrammarRule } from "~/types/grammar-rule";

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

const grammarRules = ref<GrammarRule[]>([]);

const getGrammarRules = async () => {
  const { data } = await useFetch("/api/grammar-rules");
  if (data) grammarRules.value = data.value;
};

getGrammarRules();

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
};
</script>

<template>
  <div class="w-full mt-2 flex">
    <div class="grow-1">
      <div class="list bg-base-100 rounded-box shadow-md">
        <div class="p-5">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="font-bold text-xl tracking-widest text-primary">
                Grammar rules
              </h2>
            </div>
            <div class="tabs tabs-box tabs-sm">
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
            </div>
          </div>
        </div>
        <table class="table table-zebra">
          <thead>
            <tr>
              <th>ID</th>
              <th>Grammar Rule</th>
              <th>Difficulty</th>
              <th>Your progress</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="rule in grammarRules">
              <td>
                <div class="font-bold">{{ rule.id }}</div>
              </td>
              <td>
                <div class="flex items-center gap-3 hover:cursor-pointer">
                  <div class="avatar">
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
                  <div class="hover:cursor-pointer">
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
                    class="progress w-56"
                    :class="getProgressBarStyleClass(75)"
                    :value="fakeProgressBar(1)"
                    max="100"
                  />
                  <div
                    class="ml-2 font-bold"
                    :class="getPercentageStyleClass(75)"
                  >
                    65%
                  </div>
                </div>
              </td>
              <th>
                <button class="btn btn-ghost">
                  <ArrowTrendingUpIcon
                    class="h-5 w-5 font-bold text-black dark:text-white group-hover:text-white"
                  />
                </button>
                <button class="btn btn-ghost">
                  <EyeIcon
                    class="h-5 w-5 font-bold text-black dark:text-white group-hover:text-white"
                  />
                </button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="flex flex-col grow-1 border-l border-zinc-950/5">
      <div>sidetext</div>
    </div>
  </div>
</template>
