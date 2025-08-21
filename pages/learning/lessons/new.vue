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
  <div id="new_lesson_page" class="min-h-screen bg-gray-50 py-16">
    <div class="max-w-4xl mx-auto px-6">
      <!-- Header Section -->
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-wide">
          Create a Personalized Lesson
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
          Generate stories adapted to your level with artificial intelligence
        </p>
      </div>

      <!-- Main Content Card -->
      <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <!-- Card Content -->
        <div class="p-10 space-y-12">
          <!-- Module Selection Section -->
          <div class="group">
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mr-5">
                <ViewfinderCircleIcon class="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <h3 class="text-2xl font-light text-gray-900 mb-1">Module to Work On</h3>
                <p class="text-gray-500 text-sm font-light">Choose the module you want to improve</p>
              </div>
            </div>
            
            <select
              v-model="moduleToTrainId"
              class="w-full max-w-lg bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-gray-900 font-light text-lg focus:border-gray-400 focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all duration-200 hover:border-gray-300"
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

          <!-- Divider -->
          <div class="flex items-center">
            <div class="flex-1 h-px bg-gray-200"></div>
            <div class="mx-6 w-1 h-1 bg-gray-300 rounded-full"></div>
            <div class="flex-1 h-px bg-gray-200"></div>
          </div>

          <!-- Words Selection Section -->
          <div class="group">
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-gradient-to-br from-primary to-primary/90 text-white rounded-xl flex items-center justify-center mr-5">
                  <BookOpenIcon class="h-6 w-6 text-gray-600" />
                </div>
                <!-- <div class="bg-gradient-to-br from-primary to-primary/90 text-white p-2 rounded-lg mr-3 shadow-sm">
                    <BookOpenIcon class="h-6 w-6 text-gray-600" />
                  </div> -->
                <div>
                  <h3 class="text-2xl font-light text-gray-900 mb-1">Words to Learn</h3>
                  <p class="text-gray-500 text-sm font-light">Select up to 10 words for your lesson</p>
                </div>
              </div>
              <button
                class="px-6 py-3 bg-gray-100 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-200 hover:border-gray-300 transition-all duration-200 font-light text-sm"
                @click="handleModifyWordList"
              >
                <PencilSquareIcon class="h-4 w-4 inline mr-2" />
                Modifier
              </button>
            </div>
            
            <div class="flex flex-wrap gap-3">
              <div
                v-for="(w, n) in wordList.slice(0, 10)"
                :key="n"
                class="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-light text-sm hover:bg-gray-100 hover:border-gray-300 transition-all duration-200 cursor-pointer"
              >
                {{ w.text }}
              </div>
            </div>
          </div>

          <!-- Divider -->
          <div class="flex items-center">
            <div class="flex-1 h-px bg-gray-200"></div>
            <div class="mx-6 w-1 h-1 bg-gray-300 rounded-full"></div>
            <div class="flex-1 h-px bg-gray-200"></div>
          </div>

          <!-- Expressions Selection Section -->
          <div class="group">
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mr-5">
                  <LanguageIcon class="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h3 class="text-2xl font-light text-gray-900 mb-1">Expressions to Learn</h3>
                  <p class="text-gray-500 text-sm font-light">Select up to 3 expressions for your lesson</p>
                </div>
              </div>
              <button
                class="px-6 py-3 bg-gray-100 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-200 hover:border-gray-300 transition-all duration-200 font-light text-sm"
                @click="handleModifyExpressionList"
              >
                <PencilSquareIcon class="h-4 w-4 inline mr-2" />
                Modifier
              </button>
            </div>
            
            <div class="flex flex-wrap gap-3">
              <div
                v-for="(e, n) in expressionList.slice(0, 3)"
                :key="n"
                class="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-light text-sm hover:bg-gray-100 hover:border-gray-300 transition-all duration-200 cursor-pointer"
              >
                {{ e.text }}
              </div>
            </div>
          </div>

          <!-- Generate Button Section -->
          <div class="text-center pt-8">
            <button
              class="group relative px-16 py-5 bg-gray-900 text-white text-xl font-light rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              :class="{ 'opacity-50 cursor-not-allowed': !userId }"
              @click="handleGenerateStory"
            >
              <!-- Button Content -->
              <div class="relative z-10 flex items-center justify-center">
                <span
                  v-if="isGeneratingLesson"
                  class="loading loading-spinner loading-md text-white mr-4"
                />
                <SparklesIcon class="h-6 w-6 mr-4 group-hover:rotate-6 transition-transform duration-300" />
                <span>Generate My Personalized Lesson</span>
              </div>
            </button>
            
            <p class="text-gray-500 text-sm mt-6 font-light">
              AI will create a story adapted to your level and selections
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="min-h-screen py-8">
    <div class="max-w-4xl mx-auto px-4">

      <!-- Enhanced Main Content Card -->
      <div class="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/60 overflow-hidden relative">
        <!-- Enhanced card background texture -->
        <div class="absolute inset-0 bg-gradient-to-br from-white/80 via-white/90 to-slate-50/80"></div>
        <div class="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_25%,rgba(255,255,255,0.1)_75%,transparent_75%)] bg-[size:20px_20px]"></div>
        
        <!-- Loading State -->
        <div
          v-if="isFetchingData"
          class="p-8 space-y-6 relative z-10"
        >
          <div class="skeleton h-8 w-64 mx-auto" />
          <div class="skeleton h-32 w-full" />
          <div class="skeleton h-32 w-full" />
          <div class="skeleton h-32 w-full" />
          <div class="skeleton h-12 w-48 mx-auto" />
        </div>

        <!-- Content -->
        <div v-else class="p-8 relative z-10">
          <div class="rounded-xl px-6 pb-6 space-y-10">
            <!-- Module Selection Section -->
            <div class="relative">
              <!-- Section background -->
              <div class="absolute inset-0 bg-gradient-to-r from-primary/3 via-transparent to-primary/2 rounded-xl -z-10"></div>
              <div class="absolute inset-0 bg-white/50 rounded-xl -z-10"></div>
              
              <div class="flex items-center mb-3">
                <div class="bg-gradient-to-br from-primary/20 to-primary/10 p-2 rounded-lg mr-3 border border-primary/20">
                  <ViewfinderCircleIcon class="h-5 w-5 text-primary" />
                </div>
                <h3 class="text-xl font-semibold text-gray-900">The Module You Target</h3>
              </div>
              
              <p class="text-gray-600 mb-4 text-sm">
                We suggest targeting the module with your weakest score for optimal learning
              </p>
              
              <select
                v-model="moduleToTrainId"
                class="select select-primary w-full max-w-md bg-white/90 backdrop-blur-sm border-primary/30 focus:border-primary shadow-sm"
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

            <!-- Enhanced Stylish Separator 1 -->
            <div class="flex items-center justify-center">
              <div class="flex-1 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
              <div class="mx-4 flex items-center gap-2">
                <div class="w-2 h-2 bg-gradient-to-br from-primary to-primary/80 rounded-full shadow-sm"></div>
                <div class="w-1 h-1 bg-primary/70 rounded-full"></div>
                <div class="w-1 h-1 bg-primary/50 rounded-full"></div>
              </div>
              <div class="flex-1 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
            </div>

            <!-- Words Section -->
            <div class="relative">
              <!-- Section background -->
              <div class="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-transparent to-blue-50/20 rounded-xl -z-10"></div>
              <div class="absolute inset-0 bg-white/50 rounded-xl -z-10"></div>
              
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center">
                  <div class="bg-gradient-to-br from-primary to-primary/90 text-white p-2 rounded-lg mr-3 shadow-sm">
                    <BookOpenIcon class="h-5 w-5" />
                  </div>
                  <h3 class="text-xl font-semibold text-gray-900">Words To Learn</h3>
                </div>
                <button
                  class="btn btn-primary btn-sm btn-outline shadow-sm hover:shadow-md transition-all duration-200"
                  @click="handleModifyWordList"
                >
                  <PencilSquareIcon class="h-4 w-4 mr-1" />
                  <span>Modify</span>
                </button>
              </div>
              
              <p class="text-gray-600 mb-4 text-sm">
                Customize the word list if some terms are already familiar to you
              </p>
              
              <div class="flex flex-wrap gap-2">
                <div
                  v-for="(w, n) in wordList.slice(0, 10)"
                  :key="n"
                  class="badge badge-primary badge-lg hover:bg-primary/90 cursor-pointer shadow-sm hover:shadow-md transition-all duration-200"
                >
                  {{ w.text }}
                </div>
              </div>
            </div>

            <!-- Enhanced Stylish Separator 2 -->
            <div class="flex items-center justify-center">
              <div class="flex-1 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
              <div class="mx-4 flex items-center gap-2">
                <div class="w-2 h-2 bg-gradient-to-br from-primary to-primary/80 rounded-full shadow-sm"></div>
                <div class="w-1 h-1 bg-primary/70 rounded-full"></div>
                <div class="w-1 h-1 bg-primary/50 rounded-full"></div>
              </div>
              <div class="flex-1 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
            </div>

            <!-- Expressions Section -->
            <div class="relative">
              <!-- Section background -->
              <div class="absolute inset-0 bg-gradient-to-r from-accent/20 via-transparent to-accent/15 rounded-xl -z-10"></div>
              <div class="absolute inset-0 bg-white/50 rounded-xl -z-10"></div>
              
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center">
                  <div class="bg-gradient-to-br from-accent to-accent/90 p-2 rounded-lg mr-3 shadow-sm">
                    <LanguageIcon class="h-5 w-5 text-black" />
                  </div>
                  <h3 class="text-xl font-semibold text-gray-900">Expressions To Learn</h3>
                </div>
                <button
                  class="btn btn-sm btn-outline btn-accent shadow-sm hover:shadow-md transition-all duration-200"
                  @click="handleModifyExpressionList"
                >
                  <PencilSquareIcon class="h-4 w-4 mr-1" />
                  <span>Modify</span>
                </button>
              </div>
              
              <p class="text-gray-600 mb-4 text-sm">
                Adjust the expression list based on your current knowledge
              </p>
              
              <div class="flex flex-wrap gap-2">
                <div
                  v-for="(e, n) in expressionList.slice(0, 4)"
                  :key="n"
                  class="badge badge-accent badge-lg cursor-pointer bg-gradient-to-r from-accent/60 to-accent/80 text-black border-accent/50 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  {{ e.text }}
                </div>
              </div>
            </div>
          </div>

          <!-- Enhanced Generate Button Section -->
          <div class="text-center pt-8">
            <button
              class="btn btn-lg px-8 py-3 text-lg font-semibold bg-gradient-to-r from-warning to-warning/90 border-0 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden"
              :class="{ 'btn-disabled opacity-50 cursor-not-allowed': !userId }"
              @click="handleGenerateStory"
            >
              <!-- Button background texture -->
              <div class="absolute inset-0 bg-gradient-to-r from-warning/20 via-transparent to-warning/10"></div>
              <span
                v-if="isGeneratingLesson"
                class="loading loading-spinner loading-md text-white mr-2 relative z-10"
              />
              <SparklesIcon class="h-5 w-5 mr-2 relative z-10" />
              <span class="relative z-10">Generate Tailored Lesson</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Modals -->
      <ModalSelection
        id="my_modal_to_change_word_list"
        :key="openingModalId"
        title="Customize Word Selection"
        :list="wordList"
        :limit="Number(10)"
        type="word"
        @apply-selection="(value) => handleWordSelectionChange(value)"
        @cancel="handleCancelModal"
      />
      <ModalSelection
        id="my_modal_to_change_expression_list"
        :key="openingModalId"
        title="Customize Expression Selection"
        :list="expressionList"
        :limit="Number(4)"
        type="expression"
        @apply-selection="(value) => handleExpressionSelectionChange(value)"
        @cancel="handleCancelModal"
      />
    </div>
  </div>
</template>
