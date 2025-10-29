<script setup lang="ts">
import { ArrowLongRightIcon } from "@heroicons/vue/24/outline";
import DOMPurify from "dompurify";
import type { GrammarRule } from "~/types/modules/grammar-rule";
import { getAuthToken } from "~/utils/auth/auth";
import { parseRuleData } from "~/utils/learning/grammar";

definePageMeta({
  layout: "authenticated",
});

const route = useRoute();
const isLoading = ref<boolean>(true);
const lastQuizzes = ref([]);
const grammarRule = ref<GrammarRule | null>(null);

const getGrammarRule = async () => {
  const headers = await getAuthToken();
  const { data } = await useFetch(`/api/grammar/${route.params.id}`, 
    {
      headers,
    }
  );
  if (data) {
    grammarRule.value = parseRuleData(data.value);
    isLoading.value = false;
  }
};

const getlastQuizzes = async () => {
  const headers = await getAuthToken();
  const { data } = await useFetch(
    `/api/quizzes/rules/${route.params.id}`,
    {
      headers,
    }
  );
  if (data) {
    lastQuizzes.value = data.value?.map(({ id, created_at, score_global }) => ({
      id,
      createdAt: created_at,
      score: score_global,
    }));
    isLoading.value = false;
  }
};

await getGrammarRule();
await getlastQuizzes();

const sanitizedIntroTemplate = computed(() =>
  DOMPurify.sanitize(grammarRule.value?.intro || ""),
);

const sanitizedDescriptionTemplate = computed(() =>
  DOMPurify.sanitize(grammarRule.value?.description || ""),
);
const sanitizedExtendedDescriptionTemplate = computed(() =>
  DOMPurify.sanitize(grammarRule.value?.extendedDescription || ""),
);
</script>

<template>
  <div class="w-full grid grid-cols-8 gap-2">
    <div class="col-span-5 bg-white rounded-lg">
      <div
        v-if="isLoading"
        class="w-full h-72 flex justify-center items-center"
      >
        <span class="loading loading-bars loading-xl" />
      </div>
      <div v-else class="p-5">
        <div class="max-w-4xl mx-auto px-6">
          <LayoutHeadingRuleTitle :rule="grammarRule" :main-title="true" >
            <NuxtLink
                to="/learning/modules"
                class="btn btn-ghost font-semibold pl-8"
              ><span>Back To Modules</span>
                <ArrowLongRightIcon class="h-5 w-5" />
              </NuxtLink>
          </LayoutHeadingRuleTitle>
          <p v-html="sanitizedIntroTemplate" />
          <p v-html="sanitizedDescriptionTemplate" />
          <p v-html="sanitizedExtendedDescriptionTemplate" />
        </div>
        <!-- <RulesPresentContinuousTemplate /> -->
          <!-- <RulesPreciseLocationTemplate /> -->
      </div>
    </div>
    <div class="col-span-3">
      <LearningLastQuizzes
        :loading="false"
        :rule="grammarRule"
        :quizs="lastQuizzes"
      />
    </div>
  </div>
</template>
