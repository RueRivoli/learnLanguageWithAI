<script setup lang="ts">
import { ArrowRightCircleIcon } from "@heroicons/vue/24/solid";
import { getLevelLabel } from "~/utils/learning/grammar";
import type { GrammarRule } from "~/types/grammar-rule";
import { computed } from "vue";

definePageMeta({
  layout: "authenticated",
});

const grammarRules = ref<GrammarRule>([]);

const getGrammarRules = async () => {
  const { data  } = await useFetch("/api/grammar-rules");
  if (data) grammarRules.value = data.value;
};

getGrammarRules();

useHead({
  title: "Grammar rules",
  titleTemplate: "%s - Learn languages with AI",
  meta: [
    { name: "grammar-rules", content: "width=device-width, initial-scale=1" },
  ],
  link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
});
</script>

<template>
  <div class="w-full mt-2 flex">
    <div class="grow-1">
      <div class="list bg-base-100 rounded-box shadow-md">
        <div class="p-5">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="font-bold text-2xl tracking-widest text-indigo-600">
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
              />
              <input
                type="radio"
                name="my_tabs_1"
                class="tab"
                aria-label="Beginner"
              />
              <input
                type="radio"
                name="my_tabs_1"
                class="tab"
                aria-label="Intermediate"
              />
              <input
                type="radio"
                name="my_tabs_1"
                class="tab"
                aria-label="Advanced"
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
                        class="bg-indigo-600 text-neutral-content w-10 h-10 rounded-xl"
                      >
                        <span class="text-xl">SD</span>
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
                <progress
                  class="progress progress-primary w-56"
                  :value="65"
                  max="100"
                />
                <!-- <div
                  class="radial-progress text-primary"
                  style="--value: 70"
                  aria-valuenow="70"
                  role="progressbar"
                >
                  70%
                </div> -->
              </td>
              <th>
                <button class="btn btn-ghost">
                  <ArrowRightCircleIcon
                    class="h-5 w-5 font-bold text-black dark:text-white group-hover:text-white"
                  />
                  Quiz
                </button>
                <button class="btn btn-ghost">
                  <ArrowRightCircleIcon
                    class="h-5 w-5 font-bold text-black dark:text-white group-hover:text-white"
                  />
                  Read
                </button>
              </th>
            </tr>
          </tbody>
        </table>

        <!-- <li v-for="rule in grammarRules" class="list-row">
            <div>
              <img
                class="size-10 rounded-box"
                src="https://img.daisyui.com/images/profile/demo/1@94.webp"
              />
            </div>
            <div>
              <div>{{ rule.rule_name }}</div>
              <div class="text-xs uppercase font-semibold opacity-60">
                {{ rule.rule_name_translation }}
              </div>
            </div>
            <div class="flex flex-col items-center">
              <div>Level</div>
              <div>intermediate</div>
            </div>
            <div class="flex items-center">
              <progress
                class="progress progress-primary w-56"
                :value="65"
                max="100"
              />
            </div>

            <div class="flex items-center">
              <button class="btn btn-ghost">
                <ArrowRightCircleIcon
                  class="h-5 w-5 font-bold text-black dark:text-white group-hover:text-white"
                />
                Improve your score
              </button>
            </div>
          </li> -->
      </div>
    </div>

    <div class="flex flex-col grow-1 border-l border-zinc-950/5">
      <div>sidetext</div>
    </div>
  </div>
</template>
