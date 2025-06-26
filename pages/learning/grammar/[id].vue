<script setup lang="ts">
import { regex } from "valibot";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";

import { LightBulbIcon, PlayIcon } from "@heroicons/vue/24/outline";

import { getLevelText } from "~/utils/learning/grammar";
const router = useRouter();

definePageMeta({
  layout: "authenticated",
});

const route = useRoute();
const grammarRuleId = route.params.id;
const isLoading = ref<boolean>(true);
const lastQuizs = ref([]);
const grammarRule = ref({
  name: null,
  nameEn: null,
  difficulty: null,
  intro: null,
  description: null,
  extendedDescription: null,
});

const parseRuleData = (data: any) => {
  return {
    name: data.rule_name ?? null,
    nameEn: data.rule_name_translation ?? null,
    difficulty: data.difficulty_class ?? null,
    description: data.description ?? null,
    extendedDescription: data.extended_description ?? null,
    intro: data.intro ?? null,
  };
};
const getGrammarRule = async () => {
  console.log("grammarRuleId", route.params.id);
  const { data, error } = await useFetch(`/api/grammar/${route.params.id}`);
  if (data) {
    grammarRule.value = parseRuleData(data.value);
    isLoading.value = false;
  }
};

const getLastQuizs = async () => {
  console.log("grammarRuleId", route.params.id);
  const { data, error } = await useFetch(
    `/api/quizzes/rules/${route.params.id}`,
  );
  if (data) {
    lastQuizs.value = data.value?.map(({ id, created_at, score }) => ({
      id,
      createdAt: created_at,
      score,
    }));
    isLoading.value = false;
  }
};

await getGrammarRule();
// await getLastQuizs();

const handleGenerateQuiz = async () => {
  console.log("handleGenerateQuiz");
  const { data, error } = await $fetch(`/api/quizzes/${grammarRuleId}`, {
    method: "PUT",
  });
  if (error) throw error;
  else if (data) {
    router.push(`/learning/quizzes/${data}`);
  }
};
</script>

<template>
  <div>
    <div class="grid grid-cols-5 gap-2 w-full mt-2">
      <div class="col-span-3">
        <div>
          <div>
            <div class="border-b border-zinc-200">
              <div>
                <div>
                  <div class="list bg-base-100 rounded-box shadow-md">
                    <div
                      v-if="isLoading"
                      class="w-full h-72 flex justify-center items-center"
                    >
                      <span class="loading loading-bars loading-xl" />
                    </div>
                    <div v-else class="p-5">
                      <LayoutHeadingPlus
                        :title="grammarRule.nameEn"
                        :description="grammarRule.name"
                      >
                        <LightBulbIcon class="h-6 w-6 text-accent" />
                      </LayoutHeadingPlus>

                      <!-- <LayoutHeadingHighlight
                        :highlighted-text="grammarRule.nameEn"
                        :end-title="grammarRule.name"
                      /> -->

                      <!-- <div>
                        Difficulty :
                        <component
                          :is="getLevelLabel(grammarRule.difficulty)"
                        />
                      </div> -->

                      <!-- Test templates:  -->
                      <RulesPastTenseTemplate />
                      <!-- <RulesPossessivePronounsTemplate /> -->
                      <!-- <RulesPresentContinuousTemplate /> -->
                      <!-- <RulesPresentTenseTemplate /> -->

                      <div class="max-w-4xl mx-auto p-6 space-y-6">
                        <p v-html="grammarRule.intro" />
                        <p v-html="grammarRule.description" />
                        <p v-html="grammarRule.extended_description" />
                      </div>

                      <button
                        class="btn btn-secondary"
                        type="submit"
                        @click="handleGenerateQuiz"
                      >
                        <PlayIcon class="h-5 w-5 font-bold" />
                        <span>Start a quiz to improve your score</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-2 border-l border-zinc-950/5">
        <LearningLastQuizzes
          :loading="false"
          :rule-name="grammarRule.nameEn"
          :quizs="lastQuizs"
        />
      </div>
    </div>
  </div>
</template>
