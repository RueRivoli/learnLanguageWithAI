<script setup lang="ts">
import { PencilSquareIcon } from "@heroicons/vue/24/solid";
import {
  BoltIcon,
  BookOpenIcon,
  DocumentIcon,
  LanguageIcon,
  ListBulletIcon,
  QueueListIcon,
  SparklesIcon,
  ViewfinderCircleIcon,
} from "@heroicons/vue/24/outline";
import { generateAIPoweredStoryWithParameters } from "~/utils/lesson-generation.ts/openai";
import { useUserStore } from "~/stores/user-store";
definePageMeta({
  layout: "authenticated",
});

const userStore = useUserStore();
const isFetchingData = ref(false);
const moduleOptions = ref([]);
const wordList = ref([]);
const expressionList = ref([]);
const openingModalId = ref(0);
const moduleToTrainId = ref<number>(0);
const ruleNames = ref([]);
const router = useRouter();
const isGeneratingLesson = ref(false);
const userId = computed(() => userStore.$state.id);

const getRuleNameFromSelectedId = computed(() => {
  const module = ruleNames.value.find(({ id }) => id === moduleToTrainId.value);
  if (module) return module.name;
  return null;
});

//${turkish_grammar_rules.rule_name}
const getModulesWithLowScores = async () => {
  if (userId.value) {
    const modules = await $fetch(
      `/api/grammar-scores/${userId.value}?order_by=score`,
    );
    if (modules.error) throw modules.error;
    else if (modules) {
      moduleOptions.value = modules.map(
        ({ rule_id, score, turkish_grammar_rules }) => ({
          value: rule_id,
          label: `${turkish_grammar_rules.rule_name_translation}  —   Score: ${score}%`,
        }),
      );
      ruleNames.value = modules.map(({ rule_id, turkish_grammar_rules }) => ({
        id: rule_id,
        name: turkish_grammar_rules.rule_name_translation,
      }));
      moduleToTrainId.value = modules[0].rule_id;
    }
  }
};

const getWordsWithLowScores = async () => {
  if (userId.value) {
    const words = await $fetch(`/api/words/levels/${userId.value}?limit=50`);
    if (words.error) console.log("error", words.error);
    else if (words) {
      wordList.value = [...words];
    }
  }
};

const getExpressionsWithLowScores = async () => {
  if (userId.value) {
    const expressions = await $fetch(
      `/api/expressions/levels/${userId.value}?limit=50`,
    );
    if (expressions.error) console.log("error", expressions.error);
    else if (expressions) {
      expressionList.value = [...expressions];
    }
  }
};

watchEffect(async () => {
  console.log("IN WATCH FETCHING");
  if (userId.value) {
    isFetchingData.value = true;
    await getModulesWithLowScores();
    await getWordsWithLowScores();
    await getExpressionsWithLowScores();
    isFetchingData.value = false;
  }
});

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
  let newLessonId;
  isGeneratingLesson.value = true;
  if (userId.value)
    newLessonId = await generateAIPoweredStoryWithParameters(
      userId.value,
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
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-8">
    <div class="max-w-4xl mx-auto px-4">
      <!-- Header Section -->
      <div class="text-center mb-8 relative">
        <!-- Background decoration -->
        <div class="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 rounded-3xl -z-10"></div>
        <div class="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10"></div>
        
        <div class="max-w-3xl mx-auto px-6 py-6">
          <!-- Main Title with Gradient -->
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent leading-tight">
            Create a Tailored Lesson with AI
          </h1>
          
          <!-- Subtitle with better styling -->
          <p class="text-lg text-gray-600 mb-6 leading-relaxed max-w-2xl mx-auto font-medium">
            Generate personalized lessons using the latest AI models, perfectly adapted to your progress
          </p>
          
          <!-- Feature highlights -->
          <div class="flex flex-wrap justify-center gap-4 mb-6">
            <div class="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <SparklesIcon class="h-4 w-4 text-primary" />
              <span class="text-sm font-semibold text-gray-700">AI-Powered</span>
            </div>
            <div class="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <DocumentIcon class="h-4 w-4 text-primary" />
              <span class="text-sm font-semibold text-gray-700">Personalized</span>
            </div>
            <div class="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <BoltIcon class="h-4 w-4 text-primary" />
              <span class="text-sm font-semibold text-gray-700">Instant</span>
            </div>
          </div>
          
          <!-- Decorative line -->
          <div class="w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto rounded-full shadow-sm"></div>
        </div>
      </div>

      <!-- Main Content Card -->
      <div class="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <!-- Loading State -->
        <div
          v-if="isFetchingData"
          class="p-8 space-y-6"
        >
          <div class="skeleton h-8 w-64 mx-auto" />
          <div class="skeleton h-32 w-full" />
          <div class="skeleton h-32 w-full" />
          <div class="skeleton h-32 w-full" />
          <div class="skeleton h-12 w-48 mx-auto" />
        </div>

        <!-- Content -->
        <div v-else class="p-8 ">
          <div class="rounded-xl px-6 pb-6 space-y-10">
            <!-- Module Selection Section -->
            <div class="">
              <div class="flex items-center mb-3">
                <div class="bg-primary/10 p-2 rounded-lg mr-3">
                  <ViewfinderCircleIcon class="h-5 w-5 text-primary" />
                </div>
                <h3 class="text-xl font-semibold text-gray-900">The Module You Target</h3>
              </div>
              
              <p class="text-gray-600 mb-4 text-sm">
                We suggest targeting the module with your weakest score for optimal learning
              </p>
              
              <select
                v-model="moduleToTrainId"
                class="select select-primary w-full max-w-md bg-white border-primary/30 focus:border-primary"
              >
                <option
                  v-for="m in moduleOptions"
                  :key="m.value"
                  :value="m.value"
                >
                  {{ m.label }}
                </option>
              </select>
            </div>

            <!-- Stylish Separator 1 -->
            <div class="flex items-center justify-center">
              <div class="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              <div class="mx-4 flex items-center gap-2">
                <div class="w-2 h-2 bg-primary rounded-full"></div>
                <div class="w-1 h-1 bg-primary/60 rounded-full"></div>
                <div class="w-1 h-1 bg-primary/40 rounded-full"></div>
              </div>
              <div class="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </div>

            <!-- Words Section -->
            <div class="">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center">
                  <div class="bg-blue-500/10 p-2 rounded-lg mr-3">
                    <BookOpenIcon class="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 class="text-xl font-semibold text-gray-900">Words To Learn</h3>
                </div>
                <button
                  class="btn btn-sm btn-outline btn-primary"
                  @click="handleModifyWordList"
                >
                  <PencilSquareIcon class="h-4 w-4 mr-1" />
                  Modify
                </button>
              </div>
              
              <p class="text-gray-600 mb-4 text-sm">
                Customize the word list if some terms are already familiar to you
              </p>
              
              <div class="flex flex-wrap gap-2">
                <div
                  v-for="(w, n) in wordList.slice(0, 10)"
                  :key="n"
                  class="badge badge-primary badge-lg hover:bg-primary/90 cursor-pointer transition-colors"
                >
                  {{ w.text }}
                </div>
              </div>
            </div>

            <!-- Stylish Separator 2 -->
            <div class="flex items-center justify-center">
              <div class="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              <div class="mx-4 flex items-center gap-2">
                <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div class="w-1 h-1 bg-blue-500/60 rounded-full"></div>
                <div class="w-1 h-1 bg-blue-500/40 rounded-full"></div>
              </div>
              <div class="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </div>

            <!-- Expressions Section -->
            <!-- bg-emerald-500/10 text-emerald-700 border-emerald-300 hover:bg-emerald-500/20 -->
            <div class="">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center">
                  <div class="bg-accent p-2 rounded-lg mr-3">
                    <LanguageIcon class="h-5 w-5 text-black" />
                  </div>
                  <h3 class="text-xl font-semibold text-gray-900">Expressions To Learn</h3>
                </div>
                <button
                  class="btn btn-sm btn-outline btn-accent"
                  @click="handleModifyExpressionList"
                >
                  <PencilSquareIcon class="h-4 w-4 mr-1" />
                  Modify
                </button>
              </div>
              
              <p class="text-gray-600 mb-4 text-sm">
                Adjust the expression list based on your current knowledge
              </p>
              
              <div class="flex flex-wrap gap-2">
                <div
                  v-for="(e, n) in expressionList.slice(0, 4)"
                  :key="n"
                  class="badge badge-accent badge-lg cursor-pointer bg-accent/50 text-black border-accent transition-colors"
                >
                  {{ e.text }}
                </div>
              </div>
            </div>

            <!-- Stylish Separator 3 -->
            <div class="flex items-center justify-center">
              <div class="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              <div class="mx-4 flex items-center gap-2">
                <div class="w-2 h-2 bg-accent rounded-full"></div>
                <div class="w-1 h-1 bg-accent/60 rounded-full"></div>
                <div class="w-1 h-1 bg-accent/40 rounded-full"></div>
              </div>
              <div class="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </div>
          </div>

          <!-- Generate Button Section -->
          <div class="text-center pt-4">
            <div class="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/20">
              <h3 class="text-lg font-semibold text-gray-900 mb-3">Ready to Create Your Lesson?</h3>
              <p class="text-gray-600 mb-6 text-sm">
                Our AI will generate a personalized lesson combining your selected grammar focus, vocabulary, and expressions
              </p>
              
              <button
                class="btn btn-warning btn-lg px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                :class="{ 'btn-disabled': !userId }"
                @click="handleGenerateStory"
              >
                <span
                  v-if="isGeneratingLesson"
                  class="loading loading-spinner loading-md mr-2"
                />
                <SparklesIcon class="h-6 w-6 mr-2" />
                Generate Tailored Lesson
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modals -->
      <ModalSelection
        id="my_modal_to_change_word_list"
        :key="openingModalId"
        title="Customize Word Selection"
        :list="wordList"
        :limit="Number(5)"
        @apply-selection="(value) => handleWordSelectionChange(value)"
        @cancel="handleCancelModal"
      />
      <ModalSelection
        id="my_modal_to_change_expression_list"
        :key="openingModalId"
        title="Customize Expression Selection"
        :list="expressionList"
        :limit="Number(5)"
        @apply-selection="(value) => handleExpressionSelectionChange(value)"
        @cancel="handleCancelModal"
      />
    </div>
  </div>
</template>
