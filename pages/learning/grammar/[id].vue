<script setup lang="ts">
import DOMPurify from "dompurify";
import type { GrammarRule } from "~/types/grammar-rule";
import { parseRuleData } from "~/utils/learning/grammar";

definePageMeta({
  layout: "authenticated",
});

const route = useRoute();
const grammarRuleId = route.params.id;
const isLoading = ref<boolean>(true);
const lastQuizzes = ref([]);
const grammarRule = ref<GrammarRule | null>(null);

const getGrammarRule = async () => {
  const { data, error } = await useFetch(`/api/grammar/${route.params.id}`);
  if (data) {
    grammarRule.value = parseRuleData(data.value);
    isLoading.value = false;
  }
  console.log("grammarRule", grammarRule.value);
};

const getlastQuizzes = async () => {
  console.log("grammarRuleId", route.params.id);
  const { data, error } = await useFetch(
    `/api/quizzes/rules/${route.params.id}`,
  );
  console.log("last quizzes", data.value);
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
  DOMPurify.sanitize(grammarRule.value.intro || ""),
);

const sanitizedDescriptionTemplate = computed(() =>
  DOMPurify.sanitize(grammarRule.value.description || ""),
);
const sanitizedExtendedDescriptionTemplate = computed(() =>
  DOMPurify.sanitize(grammarRule.value.extendedDescription || ""),
);
</script>

<template>
  <div class="w-full grid grid-cols-5 gap-2">
    <div class="col-span-3 bg-white rounded-lg">
      <div
        v-if="isLoading"
        class="w-full h-72 flex justify-center items-center"
      >
        <span class="loading loading-bars loading-xl" />
      </div>
      <div v-else class="p-5">
        <LayoutHeadingRuleTitle :rule="grammarRule" :main-title="true" />
        <div class="max-w-4xl mx-auto p-6">
          <p v-html="sanitizedIntroTemplate" />
          <p v-html="sanitizedDescriptionTemplate" />
          <p v-html="sanitizedExtendedDescriptionTemplate" />
        </div>
        <!-- <RulesPresentContinuousTemplate /> -->
          <!-- <RulesPreciseLocationTemplate /> -->
      </div>
    </div>
    <div class="col-span-2">
      <LearningLastQuizzes
        :loading="false"
        :rule="grammarRule"
        :quizs="lastQuizzes"
      />
    </div>
  </div>
</template>
