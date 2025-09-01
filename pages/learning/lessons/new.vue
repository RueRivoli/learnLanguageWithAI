<script setup lang="ts">
import { PencilSquareIcon } from "@heroicons/vue/24/solid";
import {
  BookOpenIcon,
  LanguageIcon,
  PlayIcon,
  SparklesIcon,
  ViewfinderCircleIcon,
} from "@heroicons/vue/24/outline";
import { generateAIPoweredStoryWithParameters, generateImageWithPrompt } from "~/utils/lesson-generation.ts/create";
import { useUserStore } from "~/stores/user-store";
import { getDifficultyNameSafe } from "~/utils/learning/grammar";
definePageMeta({
  layout: "authenticated",
});

const userStore = useUserStore();
const isFetchingData = ref(false);
const moduleOptions = ref<Array<{value: number, label: string}>>([]);
const wordList = ref([]);
const expressionList = ref([]);
const openingModalId = ref(0);
const moduleToTrain = ref<{id: number, level: number, name: string}>({id: 0, level: 0, name: ""});
const selectedModuleId = ref<number>(0);
const ruleNames = ref<Array<{id: number, name: string}>>([]);
const router = useRouter();
const isGeneratingLesson = ref(false);
const userId = computed(() => userStore.$state.id);


// Group modules by rule level and order by score within each group
const groupedModuleOptions = computed(() => {
  if (!originalModulesData.value || originalModulesData.value.length === 0) return {};
  
  // Group by rule difficulty_class
  const grouped: Record<string, Array<{value: number, label: string, score: number}>> = {
    'Beginner': [],
    'Intermediate': [],
    'Advanced': []
  };
  
  originalModulesData.value.forEach((module: any) => {
    const difficultyClass = module?.turkish_grammar_rules?.difficulty_class;
    const score = module?.score || 0;
    const label = `${module?.turkish_grammar_rules?.rule_name_translation}  —   Score: ${score}%`;
    
    if (difficultyClass === 1) {
      grouped['Beginner'].push({ value: module.rule_id, label, score });
    } else if (difficultyClass === 2) {
      grouped['Intermediate'].push({ value: module.rule_id, label, score });
    } else if (difficultyClass === 3) {
      grouped['Advanced'].push({ value: module.rule_id, label, score });
    }
  });
  
  // Sort each group by score (ascending)
  Object.keys(grouped).forEach(level => {
    grouped[level].sort((a, b) => a.score - b.score);
  });
  
  // Return ordered groups: Beginner, Intermediate, Advanced
  return {
    'Beginner': grouped['Beginner'],
    'Intermediate': grouped['Intermediate'],
    'Advanced': grouped['Advanced']
  };
});

// Store original modules data for grouping
const originalModulesData = ref<any[]>([]);

//${turkish_grammar_rules.rule_name}
const getModulesWithLowScores = async () => {
  if (userId.value) {
    const modules = await $fetch(
      `/api/grammar-scores/${userId.value}?order_by=score`,
    );
    if (modules.error) throw modules.error;
    else if (modules) {
      // Store original data for grouping
      originalModulesData.value = modules;
      
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
      moduleToTrain.value.id = modules[0].rule_id;
      moduleToTrain.value.level = modules[0].turkish_grammar_rules.difficulty_class;
      moduleToTrain.value.name = modules[0].turkish_grammar_rules.rule_name_translation;
      selectedModuleId.value = modules[0].rule_id;
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

// Watch for module selection changes
watch(selectedModuleId, (newModuleId) => {
  if (newModuleId && originalModulesData.value) {
    const selectedModule = originalModulesData.value.find(module => module.rule_id === newModuleId);
    if (selectedModule) {
      moduleToTrain.value = {
        id: selectedModule.rule_id,
        level: selectedModule.turkish_grammar_rules.difficulty_class,
        name: selectedModule.turkish_grammar_rules.rule_name_translation
      };
    }
  }
});

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
  let newLesson;
  isGeneratingLesson.value = true;
  console.log('LA', userId.value, moduleToTrain.value)
  if (userId.value && moduleToTrain.value.name) {
    console.log('ICI', userId.value, moduleToTrain.value.name)
    newLesson = await generateAIPoweredStoryWithParameters(
      userId.value,
      moduleToTrain.value.id,
      moduleToTrain.value.name,
      wordList.value.slice(0, 10),
      expressionList.value.slice(0, 3),
      getDifficultyNameSafe(moduleToTrain.value.level),
      10,
    );
    console.log('newLesson', newLesson)
    const promptForImageGeneration = newLesson.promptForImageGeneration;
    console.log('promptForImageGeneration', promptForImageGeneration)
    generateImageWithPrompt(promptForImageGeneration, newLesson.id);
  }


  router.push(`/learning/lessons/${String(newLesson.id)}`);
  isGeneratingLesson.value = false;
};
</script>

<template>
  <div id="new_lesson_page" class="min-h-screen relative overflow-hidden">
    <!-- Stunning Background Cover -->
    <div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"></div>
    
    <!-- Animated Geometric Background Elements -->
    <div class="absolute inset-0">
      <!-- Subtle Grid Pattern -->
      <div class="absolute inset-0 opacity-[0.03]" style="background-image: radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0); background-size: 60px 60px;"></div>
      
      <!-- Floating Geometric Shapes -->
      <div class="absolute top-20 left-10 w-32 h-32 border border-blue-400/20 rounded-full opacity-30 animate-pulse"></div>
      <div class="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-lg transform rotate-45 opacity-40"></div>
      <div class="absolute bottom-32 left-1/4 w-24 h-24 border-2 border-emerald-400/30 rounded-full opacity-25"></div>
      <div class="absolute bottom-40 right-1/3 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-lg transform -rotate-12 opacity-35"></div>
      
      <!-- Subtle Corner Accents -->
      <div class="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-transparent rounded-br-full"></div>
      <div class="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-emerald-500/8 to-transparent rounded-tl-full"></div>
      
      <!-- Floating Particles -->
      <div class="absolute top-1/4 left-1/3 w-2 h-2 bg-cyan-400/40 rounded-full animate-bounce" style="animation-delay: 0s;"></div>
      <div class="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-blue-400/50 rounded-full animate-bounce" style="animation-delay: 1s;"></div>
      <div class="absolute bottom-1/3 left-1/5 w-1 h-1 bg-emerald-400/60 rounded-full animate-bounce" style="animation-delay: 2s;"></div>
      <div class="absolute bottom-1/4 right-1/5 w-2.5 h-2.5 bg-purple-400/40 rounded-full animate-bounce" style="animation-delay: 0.5s;"></div>
      
      <!-- Subtle Wave Patterns -->
      <div class="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-800/20 to-transparent"></div>
      <div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-indigo-800/15 to-transparent rounded-full"></div>
    </div>
    
    <!-- Main Content -->
    <div class="relative z-10 py-16">
      <div class="max-w-4xl mx-auto px-6">
        <!-- Header Section -->
        <div class="text-center mb-16">
          <h1 class="text-4xl md:text-5xl font-light text-white mb-6 tracking-wide text-center mx-auto max-w-4xl leading-tight">
            Create your Turkish Personalized Lesson
          </h1>
          <div class="space-y-3 max-w-2xl mx-auto">
            <div class="flex items-center text-lg text-blue-100 font-light">
              <div class="w-2 h-2 bg-blue-100 rounded-full mr-4 flex-shrink-0"></div>
              <span>Generate stories adapted to your weakest points with the best AI models</span>
            </div>
            <div class="flex items-center text-lg text-blue-100 font-light">
              <div class="w-2 h-2 bg-blue-100 rounded-full mr-4 flex-shrink-0"></div>
              <span>Read the story with attention</span>
            </div>
            <div class="flex items-center text-lg text-blue-100 font-light">
              <div class="w-2 h-2 bg-blue-100 rounded-full mr-4 flex-shrink-0"></div>
              <span>Test your knowledge with a quiz prepared by our real teachers</span>
            </div>
          </div>
        </div>

        <!-- Main Content Card -->
        <div class="relative bg-slate-200 rounded-xl shadow-2xl border border-slate-300 overflow-hidden">
          <!-- Card Background -->
          <div class="absolute inset-0 bg-slate-200"></div>
          
          <!-- Futuristic Grid Pattern -->
          <div class="absolute inset-0 opacity-[0.08]">
            <div class="absolute inset-0" style="background-image: linear-gradient(90deg, #64748b 1px, transparent 1px), linear-gradient(0deg, #64748b 1px, transparent 1px); background-size: 30px 30px;"></div>
          </div>
          
          <!-- Diagonal Tech Lines -->
          <div class="absolute inset-0 opacity-[0.06]">
            <div class="absolute inset-0" style="background-image: linear-gradient(45deg, #3b82f6 1px, transparent 1px), linear-gradient(-45deg, #06b6d4 1px, transparent 1px); background-size: 60px 60px;"></div>
          </div>
          

          
          <!-- Subtle Inner Glow -->
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          
          <!-- Card Content -->
          <div class="relative z-10 p-10 space-y-12">
            <!-- Module Selection Section -->
            <div class="group">
              <div class="flex items-center mb-6">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-600 rounded-xl flex items-center justify-center mr-5 shadow-lg">
                  <ViewfinderCircleIcon class="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 class="text-2xl font-light text-gray-900 mb-1">Module to Work On</h3>
                  <p class="text-gray-500 text-sm font-light">Choose the module you want to improve</p>
                </div>
              </div>
              <select
                v-model="selectedModuleId"
                class="module-selector w-full max-w-lg bg-gradient-to-r from-slate-50 to-blue-50 border-2 border-blue-200/60 rounded-2xl px-6 py-5 text-gray-900 font-light text-lg focus:border-blue-400 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-300 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100/50 shadow-md"
              >
                <optgroup
                  v-for="(options, difficulty) in groupedModuleOptions"
                  :key="difficulty"
                  :label="difficulty"
                  :class="{ 'beginner-group': difficulty === 'Beginner' }"
                >
                  <option
                    v-for="option in options"
                    :key="option.value"
                    :value="option.value"
                    :class="{ 'beginner-option': difficulty === 'Beginner' }"
                  >
                    {{ option.label }}
                  </option>
                </optgroup>
              </select>
            </div>

            <!-- Divider -->
            <div class="flex items-center">
              <div class="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              <div class="mx-6 w-1 h-1 bg-gray-400 rounded-full"></div>
              <div class="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </div>

            <!-- Words Selection Section -->
            <div class="group">
              <div class="flex items-center justify-between mb-6">
                <div class="flex items-center">
                  <div class="w-12 h-12 bg-gradient-to-br from-primary to-primary/90 text-white rounded-xl flex items-center justify-center mr-5 shadow-lg">
                    <BookOpenIcon class="h-6 w-6" />
                  </div>
                  <div>
                    <h3 class="text-2xl font-light text-gray-900 mb-1">Words to Learn</h3>
                    <p class="text-gray-500 text-sm font-light">Select up to 10 words for your lesson</p>
                  </div>
                </div>
                <button
                  class="px-6 py-3 bg-gray-100 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-200 hover:border-gray-300 transition-all duration-200 font-light text-sm shadow-sm"
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
                  class="px-4 py-3 bg-primary border border-primary/80 rounded-lg text-white font-light text-sm hover:bg-primary/90 hover:border-primary transition-all duration-200 cursor-pointer shadow-sm"
                >
                  {{ w.text }}
                </div>
              </div>
            </div>

            <!-- Divider -->
            <div class="flex items-center">
              <div class="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              <div class="mx-6 w-1 h-1 bg-gray-400 rounded-full"></div>
              <div class="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </div>

            <!-- Expressions Selection Section -->
            <div class="group">
              <div class="flex items-center justify-between mb-6">
                <div class="flex items-center">
                  <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-5 shadow-lg">
                    <LanguageIcon class="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 class="text-2xl font-light text-gray-900 mb-1">Expressions to Learn</h3>
                    <p class="text-gray-500 text-sm font-light">Select up to 3 expressions for your lesson</p>
                  </div>
                </div>
                <button
                  class="px-6 py-3 bg-gray-100 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-200 hover:border-gray-300 transition-all duration-200 font-light text-sm shadow-sm"
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
                  class="px-4 py-3 bg-gradient-to-br from-purple-500 to-pink-600 border border-purple-300 rounded-lg text-white font-light text-sm hover:from-purple-600 hover:to-pink-700 hover:border-purple-400 transition-all duration-200 cursor-pointer shadow-sm"
                >
                  {{ e.text }}
                </div>
              </div>
            </div>

            <!-- Generate Button Section -->
            <div class="text-center pt-8">
              <button
              class="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
              @click="handleGenerateStory"
            >
              <span v-if="isLoading" class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              <PlayIcon v-else class="w-5 h-5" />
              <span>Generate My Personalized Lesson</span>
            </button>
<!-- 
              <button
                class="group relative px-16 py-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-xl font-light rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                :class="{ 'opacity-50 cursor-not-allowed': !userId }"
                @click="handleGenerateStory"
              >
                <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-600/20 rounded-2xl"></div>
                <div class="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-2xl"></div>
                
                <div class="relative z-10 flex items-center justify-center">
                  <span
                    v-if="isGeneratingLesson"
                    class="loading loading-spinner loading-md text-white mr-4"
                  />
                  <SparklesIcon class="h-6 w-6 mr-4 group-hover:rotate-6 transition-transform duration-300" />
                  <span>Generate My Personalized Lesson</span>
                </div>
              </button> -->
              
              <!-- <p class="text-gray-500 text-sm mt-6 font-light">
                AI will create a story adapted to your level and selections
              </p> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Loading State Section -->
    <div class="relative z-10 min-h-screen py-8">
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
                  v-model="selectedModuleId"
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
  </div>
</template>

<style scoped>
/* Custom styling for beginner options in the module selector */
.module-selector optgroup[label="Beginner"] {
  color: #16a34a; /* Success green color */
  font-weight: 600;
  background-color: #f0fdf4; /* Light green background */
}

.module-selector .beginner-option {
  background-color: #dcfce7 !important; /* Light success green background */
  color: #15803d !important; /* Success green text */
  font-weight: 500;
}

.module-selector .beginner-option:hover {
  background-color: #bbf7d0 !important; /* Slightly darker green on hover */
  color: #14532d !important; /* Darker green text on hover */
}

.module-selector .beginner-option:selected {
  background-color: #16a34a !important; /* Success green when selected */
  color: white !important;
}

/* Style the optgroup label for Beginner */
.module-selector optgroup.beginner-group {
  background-color: #f0fdf4; /* Light green background */
  color: #16a34a; /* Success green text */
  font-weight: 700;
  font-size: 0.95em;
  padding: 8px 4px;
  border-bottom: 1px solid #dcfce7;
}
</style>
