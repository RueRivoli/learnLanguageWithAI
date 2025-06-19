<script setup lang="ts">
import { PencilSquareIcon } from "@heroicons/vue/24/solid";
import {
  BoltIcon,
  DocumentIcon,
  ListBulletIcon,
  QueueListIcon,
  SparklesIcon,
} from "@heroicons/vue/24/outline";
import { generateAIPoweredStoryWithParameters } from "~/utils/lesson-generation.ts/openai";
import { useUserStore } from "~/stores/user-store";
definePageMeta({
  layout: "authenticated",
});

const userStore = useUserStore();
const moduleOptions = ref([]);
const wordList = ref([]);
const expressionList = ref([]);
const openingModalId = ref(0);
const moduleToTrainId = ref<number>(0);
const ruleNames = ref([]);
const router = useRouter();
const isGeneratingLesson = ref(false);
const getRuleNameFromSelectedId = computed(() => {
  const module = ruleNames.value.find(({ id }) => id === moduleToTrainId.value);
  if (module) return module.name;
  return null;
});

const getModulesWithLowScores = async () => {
  console.log("userStore", userStore);
  const { data } = await useFetch(
    `/api/grammar-scores/${userStore.$state.id}?order_by=score`,
  );
  if (data.value) {
    moduleOptions.value = data.value.map(
      ({ rule_id, score, turkish_grammar_rules }) => ({
        value: rule_id,
        label: `${turkish_grammar_rules.rule_name} | ${turkish_grammar_rules.rule_name_translation}     ${score}/100`,
      }),
    );
    ruleNames.value = data.value.map(({ rule_id, turkish_grammar_rules }) => ({
      id: rule_id,
      name: turkish_grammar_rules.rule_name_translation,
    }));
    moduleToTrainId.value = data.value[0].rule_id;
  }
};
await getModulesWithLowScores();

const getWordsWithLowScores = async () => {
  const { data, error } = await useFetch(
    `/api/words/levels/${userStore.$state.id}`,
  );
  if (error.value) console.log("error", error.value);
  else if (data.value) {
    wordList.value = [...data.value];
  }
};
await getWordsWithLowScores();

const getExpressionsWithLowScores = async () => {
  const { data, error } = await useFetch(
    `/api/expressions/levels/${userStore.$state.id}`,
  );
  if (error.value) console.log("error", error.value);
  else if (data.value) {
    expressionList.value = [...data.value];
  }
};
await getExpressionsWithLowScores();

const handleModifyWordList = () => {
  my_modal_to_change_word_list.showModal();
};

const handleModifyExpressionList = () => {
  my_modal_to_change_expression_list.showModal();
};

const handleWordSelectionChange = (newSelection: any[]) => {
  console.log("handleWordSelectionChange", newSelection);
  wordList.value = newSelection;
  openingModalId.value = openingModalId.value + 1;
};

const handleExpressionSelectionChange = (newSelection: any[]) => {
  expressionList.value = newSelection;
  my_modal_to_change_expression_list.close();
};

const handleCancelModal = () => {
  openingModalId.value = openingModalId.value + 1;
};

const handleGenerateStory = async () => {
  isGeneratingLesson.value = true;
  const newLessonId = await generateAIPoweredStoryWithParameters(
    userStore.$state.id,
    moduleToTrainId.value,
    getRuleNameFromSelectedId.value,
    wordList.value.slice(0, 10),
    expressionList.value.slice(0, 3),
    "beginner",
    10,
  );
  router.push(`/learning/lessons/${newLessonId}`);
  isGeneratingLesson.value = false;
};
</script>

<template>
  <div>
    <div class="grid grid-cols-4 gap-2 w-full">
      <div class="col-span-3">
        <div>
          <div>
            <div>
              <div>
                <div>
                  <div class="list bg-white rounded-box shadow-md">
                    <div class="p-4">
                      <LayoutHeadingPlus
                        title="Create a tailored lesson with AI"
                        description="use latest LLMM models to generate a tailored lesson"
                      >
                        <DocumentIcon class="h-6 w-6 text-primary" />
                      </LayoutHeadingPlus>
                    </div>
                    <div id="targeted_module" class="p-5">
                      <div class="flex items-center">
                        <BoltIcon
                          class="h-5 w-5 mr-2 font-bold group-hover:text-neutral"
                        />
                        <span
                          class="text-neutral text-lg text-pretty text-md font-semibold"
                          >Focus on ...</span
                        >
                      </div>

                      <div>
                        <span class="italic"
                          >We suggest you to target the module with the weakest
                          score</span
                        >
                      </div>
                      <select
                        v-model="moduleToTrainId"
                        class="select select-primary mt-2 mb-2"
                      >
                        <option
                          v-for="m in moduleOptions"
                          :key="m.value"
                          :value="m.value"
                        >
                          <span>{{ m.label }}</span>
                        </option>
                      </select>
                      <div id="targeted_words" class="mt-5">
                        <div class="flex items-center">
                          <ListBulletIcon
                            class="h-5 w-5 mr-2 font-bold group-hover:text-neutral"
                          />
                          <span
                            class="text-neutral text-lg text-pretty font-semibold"
                            >List of words to learn</span
                          >
                        </div>

                        <div>
                          <span class="italic"
                            >Modify the list below if some words are familiar to
                            you</span
                          >
                        </div>
                        <div id="word_list" class="pt-2">
                          <div
                            v-for="(w, n) in wordList.slice(0, 10)"
                            class="badge badge-outline badge-primary mr-2 mb-2"
                          >
                            {{ w.text }}
                          </div>
                          <button
                            class="btn btn-sm btn-ghost mr-2 mb-2"
                            @click="handleModifyWordList"
                          >
                            <PencilSquareIcon
                              class="h-5 w-5 text-warning font-bold group-hover:text-neutral"
                            />
                            <!-- <span class="text-neutral text-md">Modify</span> -->
                          </button>
                        </div>
                        <div id="targeted_expressions" class="mt-5">
                          <div class="flex items-center">
                            <QueueListIcon
                              class="h-5 w-5 mr-2 font-bold group-hover:text-neutral"
                            />
                            <span
                              class="text-lg text-neutral text-pretty font-semibold"
                              >List of expressions to learn</span
                            >
                          </div>

                          <div>
                            <span class="italic">
                              <span class="italic"
                                >Modify the list below if some expressions are
                                familiar to you</span
                              ></span
                            >
                          </div>
                          <div class="pt-2">
                            <div
                              v-for="(e, n) in expressionList.slice(0, 4)"
                              :key="n"
                              class="badge badge-outline badge-primary mr-2 mb-2"
                            >
                              {{ e.text }}
                            </div>
                            <button
                              class="btn btn-sm btn-ghost mr-2 mb-2"
                              @click="handleModifyExpressionList"
                            >
                              <PencilSquareIcon
                                class="h-5 w-5 text-warning font-bold group-hover:text-neutral"
                                @click="handleDeleteSelectedExpression(e.text)"
                              />
                            </button>
                          </div>
                          <div>
                            <div class="mt-8">
                              <button
                                class="btn btn-primary"
                                @click="handleGenerateStory"
                              >
                                <span
                                  v-if="isGeneratingLesson"
                                  class="loading loading-spinner"
                                />
                                <SparklesIcon
                                  class="h-5 w-5 font-bold group-hover:text-neutral"
                                />
                                <span>Get a tailored lesson</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <ModalSelection
                      id="my_modal_to_change_word_list"
                      :key="openingModalId"
                      title="Change word selection"
                      :list="wordList"
                      :limit="Number(5)"
                      @apply-selection="
                        (value) => handleWordSelectionChange(value)
                      "
                      @cancel="handleCancelModal"
                    />
                    <ModalSelection
                      id="my_modal_to_change_expression_list"
                      :key="openingModalId"
                      title="Change expression selection"
                      :list="expressionList"
                      :limit="Number(5)"
                      @apply-selection="
                        (value) => handleExpressionSelectionChange(value)
                      "
                      @cancel="handleCancelModal"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-span-1 border-l border-zinc-950/5">
          <div />
        </div>
      </div>
    </div>
  </div>
</template>
