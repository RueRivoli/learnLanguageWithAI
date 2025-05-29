<script setup lang="ts">
import {
  CheckCircleIcon,
  CheckIcon,
  EyeIcon,
  //   TagIcon,
  XMarkIcon,
  StarIcon,
} from "@heroicons/vue/24/solid";
import { TagIcon } from "@heroicons/vue/24/outline";
import type { GrammarRule } from "~/types/grammar-rule.ts";

definePageMeta({
  layout: "authenticated",
});
useHead({
  title: "Words",
  titleTemplate: "%s - Learn languages with AI",
  meta: [{ name: "words", content: "width=device-width, initial-scale=1" }],
  link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
});

const router = useRouter();
const words = ref<GrammarRule[]>([]);
const expressions = ref<GrammarRule[]>([]);

const getWords = async () => {
  const { data } = await useFetch("/api/words/:id");
  console.log("data", data.value);
  if (data) words.value = data.value;
};

const getExpressions = async () => {
  const { data } = await useFetch("/api/expressions/:id");
  if (data) expressions.value = data.value;
};

getWords();
getExpressions();
</script>

<template>
  <div class="w-full mt-2 grid grid-cols-4 gap-2">
    <div class="col-span-3">
      <div class="list bg-base-100 rounded-box shadow-md">
        <div class="p-5">
          <div class="flex items-center justify-between">
            <div>
              <LayoutHeadingPlus title="Words to learn" />
            </div>
          </div>
        </div>
        <div class="overflow-x-auto h-96 w-auto">
          <table class="table table-pin-rows table-pin-cols">
            <thead>
              <tr>
                <th />
                <th>Word</th>
                <th>Translation</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(w, n) in words"
                class="cursor-pointer hover:opacity-60"
              >
                <td>
                  <div class="font-bold">{{ w.id }}</div>
                </td>
                <td>
                  <div class="font-bold">{{ w.word }} ({{ w.function }})</div>
                </td>
                <td>
                  <div class="font-bold">{{ w.translation }}</div>
                </td>
                <td class="flex items-center">
                  <TagIcon
                    class="h-5 w-5 mr-4 font-bold text-black dark:text-white group-hover:text-white"
                  />
                  <XMarkIcon
                    class="h-5 w-5  font-bold text-black dark:text-white group-hover:text-white"
                  />

                  <!-- <button
                    class="btn btn-ghost btn-xs"
                    @click="router.push(`/learning/grammar/${rule.id}`)"
                  > -->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="overflow-x-auto h-96 w-auto mt-4">
          <div class="p-5">
            <div class="flex items-center justify-between">
              <div>
                <LayoutHeadingPlus title="Expressions to learn" />
              </div>
            </div>
          </div>
          <table class="table table-pin-rows table-pin-cols">
            <thead>
              <tr>
                <th />
                <th>Expression</th>
                <th>Translation</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(expr, n) in expressions" class="cursor-pointer">
                <td>
                  <div class="font-bold">{{ expr.id }}</div>
                </td>
                <td>
                  <div class="font-bold">{{ expr.text }}</div>
                </td>
                <td>
                  <div class="font-bold">{{ expr.translation }}</div>
                </td>
                <td class="flex items-center">
                  <TagIcon
                    class="h-5 w-5 mr-4 font-bold text-black dark:text-white group-hover:text-white"
                  />
                  <XMarkIcon
                    class="h-5 w-5  font-bold text-black dark:text-white group-hover:text-white"
                  />
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
