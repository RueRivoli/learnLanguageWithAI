<script setup lang="ts">
import { PencilSquareIcon } from "@heroicons/vue/24/outline";
import {
  PlayIcon,
  SparklesIcon,
} from "@heroicons/vue/24/outline";
import { generateAIPoweredStoryWithParameters, generateImageWithPrompt } from "~/utils/lesson-generation.ts/create";
import { useUserStore } from "~/stores/user-store";
import { getBorderStyleClassFromGrammarRuleLevel, getTextStyleClassFromGrammarRuleLevel } from "~/utils/learning/grammar";
import type { WordMetadata } from "~/types/vocabulary/word";
import type { ExpressionMetadata } from "~/types/vocabulary/expression";
import type { GrammarRuleMeta } from "~/types/modules/grammar-rule";
import { getAuthToken } from "~/utils/auth/auth";
import { CREDITS_FOR_ONE_LESSON } from "~/utils/credits";
import { STORY_LEVELS } from "~/utils/learning/lesson";

definePageMeta({
  layout: "authenticated",
});

const userStore = useUserStore();
const router = useRouter();
const userId = computed(() => userStore.$state.id);


// Store original modules data for grouping
const originalModulesData = ref<Array<GrammarRuleMeta & {score: number}>>([]);

// Options for modules, words and expressions
const moduleOptions = ref<Array<{value: number, label: string}>>([]);
const wordList = ref<WordMetadata[]>([]);
const expressionList = ref<ExpressionMetadata[]>([]);

const targetedModule = ref<GrammarRuleMeta & {score: number} | undefined>(undefined);
const targetedModuleId = ref<number>(0);

// Id of the opened modal
const openingModalId = ref(0);
// Boolean for loading and fetching status
const isGeneratingLesson = ref(false);
const isFetchingData = ref<boolean>(false);

const initialModuleSelectedId = ref<number | null>(null);
const quizGenerationModal = ref<{ openModal: () => void; closeModal: () => void } | null>(null);
const myModalToGetCredits = ref<{ openModal: () => void; closeModal: () => void } | null>(null);
// Group modules by rule level and order by score within each group
const groupedModuleOptions = computed(() => {
  if (!originalModulesData.value || originalModulesData.value.length === 0) return {};
  
  // Group by rule difficulty_class
  const grouped: Record<string, Array<GrammarRuleMeta & {score: number}>> = {
    'Beginner': [],
    'Intermediate': [],
    'Advanced': []
  };
  
  originalModulesData.value.forEach((module: any) => {
    const {id, name, nameEn, symbol, level, score } = module;
    if (level === 1) {
      grouped['Beginner'].push({ id, name, nameEn, symbol, score, level });
    } else if (level === 2) {
      grouped['Intermediate'].push({ id, name, nameEn, symbol, score, level });
    } else if (level === 3) {
      grouped['Advanced'].push({ id, name, nameEn, symbol, score, level });
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

//${turkish_grammar_rules.rule_name}
const getModulesWithLowScores = async () => {
  if (userId.value) {
    try {
      const headers = await getAuthToken();
      const modules = await $fetch(
        `/api/grammar-scores/${userId.value}?order_by=score`,
        { headers },
      );
      if (modules) {
        // Store original data for grouping
        originalModulesData.value = modules.map(({rule_id, score, turkish_grammar_rules}) => ({
          id: rule_id,
          highlights: turkish_grammar_rules.highlights,
          level: turkish_grammar_rules.difficulty_class,
          name: turkish_grammar_rules.rule_name,
          nameEn: turkish_grammar_rules.rule_name_translation,
          symbol: turkish_grammar_rules.symbol,
          score: score,
        })).sort((a, b) => a.level - b.level);
        moduleOptions.value = modules.map(
          ({ rule_id, score, turkish_grammar_rules }) => ({
            value: rule_id,
            label: `${turkish_grammar_rules.rule_name_translation}  —   Score: ${score}%`,
          }),
        );
        targetedModule.value = originalModulesData.value[0];
        targetedModuleId.value = originalModulesData.value[0].id;
        initialModuleSelectedId.value = targetedModuleId.value;
      }
    } catch (error) {
      console.log("Error fetching modules with low scores", error);
    }
}
};

const getWordsWithLowScores = async () => {
  if (userId.value) {
    try {
      const headers = await getAuthToken();
      const words = await $fetch(`/api/words/levels/${userId.value}?limit=50`, {headers});
    if (words) wordList.value = words;
  } catch (error) {
    console.log("Error fetching words with low scores", words.error);
  }
  }
};

const getExpressionsWithLowScores = async () => {
  if (userId.value) {
    try {
    const headers = await getAuthToken();
    const expressions = await $fetch(
      `/api/expressions/levels/${userId.value}?limit=50`,
      {headers}
    );
    if (expressions) expressionList.value = expressions;
  } catch (error) {
    console.log("Error fetching expressions with low scores", expressions.error);
  }
  }
};

// Watch for module selection changes
watch(targetedModuleId, (newModuleId) => {
  if (newModuleId && originalModulesData.value) {
    const selectedModule = originalModulesData.value.find(module => module.id === Number(newModuleId));
    if (selectedModule) {
      targetedModule.value = {
        id: selectedModule.id,
        highlights: selectedModule.highlights,
        level: selectedModule.level,
        name: selectedModule.name,
        nameEn: selectedModule.nameEn,
        score: selectedModule.score,
        symbol: selectedModule.symbol
      };
    }
  }
});

watchEffect(async () => {
  if (userId.value) {
    isFetchingData.value = true;
    await Promise.all([
      getModulesWithLowScores(),
      getWordsWithLowScores(),
      getExpressionsWithLowScores()
  ]);
    isFetchingData.value = false;
  }
});

const handleModifyWordList = () => {
  my_modal_to_change_word_list.showModal();
};

const handleModifyExpressionList = () => {
  my_modal_to_change_expression_list.showModal();
};

const handleModifyTargetedModule = () => {
  my_modal_to_change_targeted_module.showModal();
};

const handleWordSelectionChange = (newSelection: any[]) => {
  wordList.value = newSelection;
  openingModalId.value = openingModalId.value + 1;
};

const handleExpressionSelectionChange = (newSelection: any[]) => {
  expressionList.value = newSelection;
  my_modal_to_change_expression_list.close();
};

const handleModuleSelectionChange = (newModuleId: number) => {
  targetedModuleId.value = newModuleId;
  my_modal_to_change_targeted_module.close();
};

const handleCancelModal = () => {
  myModalToGetCredits.value?.closeModal();
};

const handleGenerateStory = async () => {
  let newLesson;
  if (!userStore.isEnoughTokensForOneLesson) {
    myModalToGetCredits.value?.openModal();
    return;
  }
  quizGenerationModal.value?.openModal();
  isGeneratingLesson.value = true;
  if (userId.value && targetedModule.value?.name) {
    newLesson = await generateAIPoweredStoryWithParameters(
      userId.value,
      targetedModule.value.id,
      targetedModule.value.name,
      wordList.value.slice(0, 10),
      expressionList.value.slice(0, 3),
      STORY_LEVELS[1],
      10,
    );
    const promptForImageGeneration = newLesson.promptForImageGeneration;
    if (newLesson.id) {
      generateImageWithPrompt(promptForImageGeneration, newLesson.id, "gpt-4.1", userId.value);
      userStore.creditsUsageUpdate(CREDITS_FOR_ONE_LESSON);
    }
    router.push(`/learning/lessons/${String(newLesson.id)}?loadingImage=true`);
    isGeneratingLesson.value = false;
    quizGenerationModal.value?.closeModal();
  }
};
</script>

<template>
  <div id="new_lesson_page" class="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 relative overflow-hidden">

<!-- Background Elements -->
<div class="absolute inset-0 overflow-hidden pointer-events-none">
  <!-- Beautiful base gradient with warm undertone -->
  <div class="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-violet-100/50"></div>
  
  <!-- Soft primary glow - top right -->
  <div class="absolute -top-40 -right-48 w-[550px] h-[550px] bg-gradient-to-br from-violet-200/40 via-purple-100/25 to-transparent rounded-full blur-3xl opacity-85" style="filter: blur(50px)"></div>
  
  <!-- Soft neutral glow - bottom left -->
  <div class="absolute -bottom-40 -left-48 w-[600px] h-[600px] bg-gradient-to-tr from-slate-200/35 via-slate-100/20 to-transparent rounded-full blur-3xl opacity-80" style="filter: blur(55px)"></div>
  
  <!-- Harmonious center accent -->
  <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-violet-100/28 via-purple-50/18 to-slate-50/12 rounded-full blur-3xl opacity-75" style="filter: blur(70px)"></div>
  
  <!-- Ambient light layer for warmth -->
  <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(168,85,247,0.16)_0%,transparent_40%),radial-gradient(ellipse_at_70%_60%,rgba(148,113,233,0.12)_0%,transparent_50%),radial-gradient(ellipse_at_50%_100%,rgba(100,116,139,0.09)_0%,transparent_70%)]"></div>
  
  <!-- Subtle premium texture -->
  <div class="absolute inset-0 opacity-[0.06] bg-[linear-gradient(45deg,transparent_24%,rgba(168,85,247,0.08)_25%,rgba(168,85,247,0.08)_26%,transparent_27%,transparent_74%,rgba(168,85,247,0.08)_75%,rgba(168,85,247,0.08)_76%,transparent_77%,transparent_100%),linear-gradient(-45deg,transparent_24%,rgba(168,85,247,0.08)_25%,rgba(168,85,247,0.08)_26%,transparent_27%,transparent_74%,rgba(168,85,247,0.08)_75%,rgba(168,85,247,0.08)_76%,transparent_77%,transparent_100%)] bg-[length:60px_60px]"></div>
  
  <!-- Gentle vignette for depth -->
  <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.05)_100%)]"></div>
</div>

<!-- Main Content -->
<div class="relative py-12">
  <div class="max-w-7xl mx-auto px-6">
    <!-- Header Section -->
    <div class="text-center mb-20">
      <div class="inline-flex items-center gap-3 mb-8">
        <div class="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/25">
          <SparklesIcon class="w-6 h-6 text-white" />
        </div>
        <div class="h-8 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
        <div class="text-sm font-medium text-gray-600 uppercase tracking-wider">Tailored Lessons with AI</div>
      </div>
      
      <h1 class="text-5xl md:text-4xl font-light text-gray-900 mb-6 tracking-tight leading-tight">
        Create Your
        <span class="font-semibold bg-primary bg-clip-text text-transparent">
          Personalized
        </span>
        <br class="md:hidden" />
        Turkish Lesson
      </h1>
      
      <p class="text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed mb-8">
        Generate intelligent stories tailored to your learning needs, featuring your weakest grammar points and vocabulary
      </p>

      <!-- Feature highlights -->
      <div class="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
        <div class="flex items-center gap-3 text-gray-700">
          <div class="w-2 h-2 bg-neutral rounded-full"></div>
          <!-- <span class="font-medium">Adaptive AI Stories</span> -->
          <span class="font-medium">Select your Weakest Module</span>
        </div>
        <div class="flex items-center gap-3 text-gray-700">
          <div class="w-2 h-2 bg-primary rounded-full"></div>
          <!-- <span class="font-medium">Personalized Content</span> -->
          <span class="font-medium">Select 10 New Words</span>
        </div>
        <div class="flex items-center gap-3 text-gray-700">
          <div class="w-2 h-2 bg-warning rounded-full"></div>
          <!-- <span class="font-medium">Smart Quizzes</span> -->
          <span class="font-medium">Select 3 New Expressions</span>
        </div>
      </div>
    </div>

        <!-- Main Content Card -->
        <div class="relative rounded-xl overflow-hidden">
          <!-- Card Background -->
          <div class="absolute inset-0"></div>
          <!-- Card Content -->
          <div class="relative p-5 space-y-12">

            <div class="grid grid-cols-2 gap-4">
                          <!-- Module Selection Section -->
            <!-- Loading Skeleton for Module -->
            <div v-if="isFetchingData" class="col-span-1 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 shadow-lg rounded-2xl p-6 border border-emerald-200/60 animate-pulse">
              <div class="flex items-center justify-between mb-4">
                <div class="skeleton h-6 w-40 bg-emerald-200 rounded"></div>
                <div class="skeleton h-5 w-5 bg-emerald-200 rounded"></div>
              </div>
              <div class="skeleton h-4 w-48 bg-emerald-200 rounded mb-6"></div>
              <div class="w-[60%] m-auto">
                <div class="bg-white/80 rounded-xl p-4 border border-emerald-200">
                  <div class="flex items-center justify-center mb-4">
                    <div class="skeleton h-16 w-16 bg-emerald-200 rounded-full"></div>
                  </div>
                  <div class="skeleton h-5 w-32 bg-emerald-200 rounded mx-auto mb-2"></div>
                  <div class="skeleton h-4 w-24 bg-emerald-200 rounded mx-auto mb-4"></div>
                  <div class="skeleton h-20 w-full bg-emerald-200 rounded"></div>
                  <div class="mt-3 flex items-center justify-center gap-2">
                    <div class="skeleton h-4 w-24 bg-emerald-200 rounded"></div>
                    <div class="skeleton h-4 w-12 bg-emerald-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <LayoutKeyElementRuleCard v-else backgroundClasses="bg-gradient-to-br from-slate-100/90 via-slate-50/95 to-slate-100/80 shadow-lg border border-slate-200/70 hover:border-slate-300/80 transition-all duration-300" class="col-span-1" title="Targeted Module" titleEn="Targeted Module" description="Select the Module you want to work on">
                <template #top-right-corner>
                  <PencilSquareIcon class="h-5 w-5 cursor-pointer inline" @click="handleModifyTargetedModule"/>
                </template>
                <template #content>
                  <div class="w-[60%] m-auto">
                  <LayoutKeyElementRuleOverview class="h-full cursor-pointer" :title="targetedModule?.name" :titleEn="targetedModule?.nameEn" :symbol="targetedModule?.symbol" :score="targetedModule?.score" :level="targetedModule?.level" :lightMode="true">
                      <template #content>
                  <!-- Professional description box -->
                  <div v-if="targetedModule?.highlights" class="mt-3 mb-4">
                    <div class="relative rounded-xl p-4 shadow-sm overflow-hidden" :class="getBorderStyleClassFromGrammarRuleLevel(targetedModule?.level ?? 0)">
                      <!-- Subtle texture overlay -->
                      <div class="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-black/5 opacity-60"></div>
                      <div class="absolute inset-0 opacity-20 bg-[conic-gradient(from_45deg_at_50%_50%,rgba(255,255,255,0.4)_0deg,rgba(255,255,255,0.1)_90deg,rgba(255,255,255,0.2)_180deg,rgba(255,255,255,0.05)_270deg)]"></div>
                      
                      <!-- Content -->
                      <div class="relative z-10">
                        <div class="flex items-center gap-2 mb-2">
                          <!-- <div class="w-2 h-2 bg-emerald-500 rounded-full shadow-sm"></div> -->
                          <svg class="h-3 w-3" :class="getTextStyleClassFromGrammarRuleLevel(targetedModule.level ?? 0)" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
                            <circle cx="12" cy="12" r="3" fill="currentColor"/>
                          </svg>
                          <span class="text-xs font-semibold uppercase tracking-wide" :class="getTextStyleClassFromGrammarRuleLevel(targetedModule.level ?? 0)">Key Point</span>
                        </div>
                        <p class="text-sm text-slate-700 font-medium leading-relaxed">
                          {{ targetedModule.highlights }}
                        </p>
                      </div>
                    </div>
                  </div>
                </template>

                
                <template #details>
              <div class="rounded-lg p-2"
          >
            <div class="flex items-center">
              <div class="flex items-center gap-2">
                <div class="w-1.5 h-1.5 bg-green-500 rounded-full" />
                <span class="text-xs text-gray-600 ml-2"
                >current score</span
              >
                <span class="text-md font-medium text-gray-700"
                  >{{ targetedModule?.score }}%</span
                >
              </div>

            </div>
          </div>
            </template>
                </LayoutKeyElementRuleOverview>
              </div>
                </template>
            </LayoutKeyElementRuleCard>

            <div class="col-span-1 flex flex-col justify-between gap-6">
            <!-- Loading Skeleton for Words -->
            <div v-if="isFetchingData" class="bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50 border border-blue-200/60 shadow-lg rounded-2xl p-6 animate-pulse">
              <div class="flex items-center justify-between mb-4">
                <div class="skeleton h-6 w-32 bg-blue-200 rounded"></div>
                <div class="skeleton h-5 w-5 bg-blue-200 rounded"></div>
              </div>
              <div class="skeleton h-4 w-40 bg-blue-200 rounded mb-4"></div>
              <div class="flex flex-wrap gap-3">
                <div v-for="i in 10" :key="i" class="skeleton h-8 w-20 bg-blue-200 rounded-full"></div>
              </div>
            </div>
                    
            <!-- Words Selection Section -->
             <LayoutKeyElementWordCard v-else backgroundClasses="bg-gradient-to-br from-violet-100/90 via-purple-50/95 to-violet-100/80 shadow-lg" title="New Words" description="Select 10 words for your lesson">
                <template #top-right-corner>
                    <PencilSquareIcon class="h-5 w-5 cursor-pointer inline" @click="handleModifyWordList"/>
                </template>
              <template #content>
                <div class="flex flex-wrap gap-3">
                <div v-for="(w, n) in wordList.slice(0, 10)" :key="w.text">
                    <LayoutKeyElementWordBadge :text="w.text" :lightMode="true" />
                </div>
              </div>
                 </template>
              </LayoutKeyElementWordCard>


              <!-- Loading Skeleton for Expressions -->
              <div v-if="isFetchingData" class="bg-warning/20 shadow-lg rounded-2xl p-6 animate-pulse">
                <div class="flex items-center justify-between mb-4">
                  <div class="skeleton h-6 w-40 bg-purple-200 rounded"></div>
                  <div class="skeleton h-5 w-5 bg-purple-200 rounded"></div>
                </div>
                <div class="skeleton h-4 w-48 bg-purple-200 rounded mb-4"></div>
                <div class="flex flex-wrap gap-3">
                  <div v-for="i in 3" :key="i" class="skeleton h-8 w-32 bg-purple-200 rounded-full"></div>
                </div>
              </div>

              <!-- Expressions Selection Section -->
              <LayoutKeyElementExpressionCard v-else backgroundClasses="bg-gradient-to-br from-amber-100/90 via-yellow-50/95 to-amber-100/80 shadow-lg" title="Expressions to Learn" description="Select 3 expressions for your lesson">
                <template #top-right-corner>
                  <PencilSquareIcon class="h-5 w-5 cursor-pointer inline" @click="handleModifyExpressionList"/>
                </template>
              <template #content>
                  <div class="flex flex-wrap gap-3">
                    <div v-for="(expr, n) in expressionList.slice(0, 3)" :key="expr.text">
                        <LayoutKeyElementExpressionBadge :text="expr.text"  :lightMode="true" />
                    </div>
                </div>
                </template>
              </LayoutKeyElementExpressionCard>
            </div>
            </div>

            <!-- Generate Button Section -->
            <div class="text-center pt-8">
              <button
              class="w-80 m-auto bg-warning hover:bg-warning/90 cursor-pointer text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
              @click="handleGenerateStory"
              :disabled="isFetchingData || isGeneratingLesson"
            >
                <span v-if="isGeneratingLesson" class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                <PlayIcon v-else class="w-5 h-5" />
                <span>Generate My Personalized Lesson</span>
              </button>
              <p class="text-sm text-gray-500 mt-2">
                {{ isFetchingData ? 'Loading your personalized options...' : 'Your personalized Turkish Lesson ready in less than 10 seconds' }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
        <!-- Modals -->
        <ModalSelection
          id="my_modal_to_change_word_list"
          :key="openingModalId"
          title="Edit the Words List"
          :list="wordList"
          :limit="Number(10)"
          type="word"
          @apply-selection="(value) => handleWordSelectionChange(value)"
          @cancel="handleCancelModal"
        />
          <ModalSelection
            id="my_modal_to_change_expression_list"
            :key="openingModalId"
            title="Edit the Expressions List"
            :list="expressionList"
            :limit="Number(3)"
            type="expression"
            @apply-selection="(value) => handleExpressionSelectionChange(value)"
            @cancel="handleCancelModal"
          />
          <LayoutKeyElementRuleModalSelection
            id="my_modal_to_change_targeted_module"
            :key="openingModalId"
            title="Edit the Targeted Module"
            :listModules="originalModulesData.map((module) => module.id)"
            :moduleOptions="groupedModuleOptions"
            :initialModuleSelectedId="initialModuleSelectedId"
            @apply-selection="(newModuleId: number) => handleModuleSelectionChange(newModuleId)"
            @cancel="handleCancelModal"
          />
          <AccountPaymentModal
            ref="myModalToGetCredits"
            @cancel="handleCancelModal"
          />
          <QuizGenerationLoadingModal ref="quizGenerationModal" type="quiz"/>
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
.blue-bg{
    background: #3b82f6;
}  
</style>
