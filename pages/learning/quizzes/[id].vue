<script setup lang="ts">
import { CheckIcon } from "@heroicons/vue/24/solid";

definePageMeta({
  layout: "authenticated",
});

const route = useRoute();
const quizId = route.params.id;
const isLoading = ref<boolean>(false);
const quiz = ref([]);

const parseRuleData = (data: any) => {
  return {
    name: data.rule_name ?? null,
    nameEn: data.rule_name_translation ?? null,
    difficulty: data.difficulty_class ?? null,
    description: data.description ?? null,
    sentenceExample: data.sentence_example ?? null,
    sentenceExampleTranslation: data.sentence_example_translation ?? null,
    sentenceExample2: data.sentence_example_2 ?? null,
    sentenceExampleTranslation2: data.sentence_example_2_translation ?? null,
  };
};
const getQuizData = async () => {
  console.log("quizDataId", route.params.id);
  const { data, error } = await useFetch(`/api/grammar/${quizId}`);
  if (data) {
    quiz.value = parseRuleData(data.value);
    isLoading.value = false;
  }
};

await getQuizData();
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
                      <LayoutHeading highlighted-text="quiz" end-title="test" />

                      <div class="mt-2 flex items-center">
                        <span class="font-semibold">Difficulty </span>
                        <mark class="ml-2 p-1 text-white bg-accent rounded-lg">
                          <span>fggggg </span>
                        </mark>
                      </div>
                      <div class="w-full rounded-2xl mt-8">
                        <p>fezezf</p>
                      </div>

                      <div class="w-full rounded-2xl mt-8">
                        <div class="font-semibold">fezfez</div>
                        <div>fzeefz</div>
                      </div>
                      <div class="w-full rounded-2xl mt-8">
                        <div class="font-semibold">fzefze</div>
                        <div>fezfez</div>
                      </div>
                      <button class="btn btn-primary">
                        <CheckIcon class="h-5 w-5 font-bold" />
                        Validate
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-2 border-l border-zinc-950/5">side text</div>
    </div>
  </div>
</template>
