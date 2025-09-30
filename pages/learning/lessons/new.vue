<script setup lang="ts">
import { PencilSquareIcon } from "@heroicons/vue/24/outline";
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
import type { WordMetadata } from "~/types/vocabulary/word";
import type { ExpressionMetadata } from "~/types/vocabulary/expression";
import type { GrammarRuleMeta } from "~/types/modules/grammar-rule";

definePageMeta({
  layout: "authenticated",
});

const userStore = useUserStore();
const isFetchingData = ref<boolean>(false);
const moduleOptions = ref<Array<{value: number, label: string}>>([]);
// Store original modules data for grouping
const originalModulesData = ref<any[]>([]);
const wordList = ref<WordMetadata[]>([]);
const expressionList = ref<ExpressionMetadata[]>([]);
const openingModalId = ref(0);
const moduleToTrain = ref<GrammarRuleMeta & {score: number} | null>(null);
const selectedModuleId = ref<number>(0);
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

//${turkish_grammar_rules.rule_name}
const getModulesWithLowScores = async () => {
  if (userId.value) {
    try {
      const modules = await $fetch(
        `/api/grammar-scores/${userId.value}?order_by=score`,
      );
    if (modules) {
      // Store original data for grouping
      originalModulesData.value = modules;
      
      moduleOptions.value = modules.map(
        ({ rule_id, score, turkish_grammar_rules }) => ({
          value: rule_id,
          label: `${turkish_grammar_rules.rule_name_translation}  —   Score: ${score}%`,
        }),
      );
      moduleToTrain.value =  {
        id: modules[0].rule_id,
        highlights: modules[0].turkish_grammar_rules.highlights,
        level: modules[0].turkish_grammar_rules.difficulty_class,
        name: modules[0].turkish_grammar_rules.rule_name_translation,
        symbol: modules[0].turkish_grammar_rules.symbol,
        score: modules[0].score,
      };
      selectedModuleId.value = modules[0].rule_id;
    }
  } catch (error) {
  console.log("Error fetching modules with low scores", error);
} finally {
  isFetchingData.value = false;
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
        highlights: selectedModule.turkish_grammar_rules.highlights,
        level: selectedModule.turkish_grammar_rules.difficulty_class,
        name: selectedModule.turkish_grammar_rules.rule_name_translation,
        score: selectedModule.score,
        symbol: selectedModule.turkish_grammar_rules.symbol
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
  if (userId.value && moduleToTrain.value?.name) {
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

    <!-- Main Content -->
    <div class="relative py-8">
      <div class="max-w-6xl mx-auto px-6">
        <!-- Header Section -->
        <div class="text-center mb-16">
          <h1 class="text-4xl md:text-5xl font-light text-white mb-6 tracking-wide text-center mx-auto max-w-4xl leading-tight">
            Create your Turkish Personalized Lesson
          </h1>
          <div class="space-y-3 max-w-2xl mx-auto">
            <!-- <div class="flex items-center text-lg text-blue-100 font-light">
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
            </div> -->
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
            <LayoutKeyElementRuleCard class="col-span-1" v-if="moduleToTrain" title="Module to Work On" titleEn="Module to Work On" description="Select the Module you want to work on">
                <template #top-right-corner>
                  <PencilSquareIcon class="h-5 w-5 cursor-pointer inline" @click="handleModifyExpressionList"/>
                </template>
                <template #content>
                  <div class="w-[60%] m-auto">
                  <LayoutKeyElementRuleOverview class="h-full cursor-pointer" :title="moduleToTrain.name" :titleEn="moduleToTrain.name" :symbol="moduleToTrain.symbol" :score="moduleToTrain.score" :darkerMode="true">
                    <template #content>
                      <!-- Professional description box -->
                      <div v-if="moduleToTrain.highlights" class="mt-3 mb-4">
                        <div class="relative rounded-xl p-4 bg-gradient-to-br from-emerald-50/80 via-green-50/70 to-teal-50/60 border border-emerald-200/50 shadow-sm overflow-hidden">
                          <!-- Subtle texture overlay -->
                          <div class="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-black/5 opacity-60"></div>
                          <div class="absolute inset-0 opacity-20 bg-[conic-gradient(from_45deg_at_50%_50%,rgba(255,255,255,0.4)_0deg,rgba(255,255,255,0.1)_90deg,rgba(255,255,255,0.2)_180deg,rgba(255,255,255,0.05)_270deg)]"></div>
                          
                          <!-- Content -->
                          <div class="relative z-10">
                            <div class="flex items-center gap-2 mb-2">
                              <!-- <div class="w-2 h-2 bg-emerald-500 rounded-full shadow-sm"></div> -->
                              <svg class="h-3 w-3 text-emerald-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
                              <circle cx="12" cy="12" r="3" fill="currentColor"/>
                            </svg>
                              <span class="text-xs font-semibold uppercase tracking-wide text-emerald-600">Key Point</span>
                            </div>
                            <p class="text-sm text-slate-700 font-medium leading-relaxed">
                              {{ moduleToTrain.highlights }}
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
                  >{{ moduleToTrain.score }}%</span
                >
              </div>

            </div>
          </div>
            </template>
                </LayoutKeyElementRuleOverview>
              </div>
                </template>
            </LayoutKeyElementRuleCard>

            <div class="col-span-1 flex flex-col justify-between">                    
            <!-- Words Selection Section -->
             <LayoutKeyElementWordCard title="Words to Learn" description="Select 10 words for your lesson">
                <template #top-right-corner>
                    <PencilSquareIcon class="h-5 w-5 cursor-pointer inline" @click="handleModifyWordList"/>
                </template>
              <template #content>
                <div class="flex flex-wrap gap-3">
                <div v-for="(w, n) in wordList.slice(0, 10)" :key="w.text">
                    <LayoutKeyElementWordBadge :text="w.text"  />
                </div>
              </div>
                 </template>
              </LayoutKeyElementWordCard>


              <!-- Expressions Selection Section -->
              <LayoutKeyElementExpressionCard title="Expressions to Learn" description="Select 3 expressions for your lesson">
                <template #top-right-corner>
                  <PencilSquareIcon class="h-5 w-5 cursor-pointer inline" @click="handleModifyExpressionList"/>
                </template>
              <template #content>
                  <div class="flex flex-wrap gap-3">
                    <div v-for="(expr, n) in expressionList.slice(0, 3)" :key="expr.text">
                        <LayoutKeyElementExpressionBadge :text="expr.text"  />
                    </div>
                </div>
                </template>
              </LayoutKeyElementExpressionCard>
            </div>
            </div>




            <!-- Generate Button Section -->
            <div class="text-center pt-8">
              <button
              class="w-full bg-primary hover:bg-primary/90 cursor-pointer text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
              @click="handleGenerateStory"
            >
              <span v-if="isGeneratingLesson" class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              <PlayIcon v-else class="w-5 h-5" />
              <span>Generate My Personalized Lesson</span>
            </button>
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
