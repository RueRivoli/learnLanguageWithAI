<script setup lang="ts">
import {
  grammarLevelTabs,
  optionBeginnerGrammar,
  optionIntermediateGrammar,
  optionAdvancedGrammar,
} from "~/utils/dashboard/graphOptions";
// 1 = Beginner, 2 = Intermediate, 3 = Advanced,

const activeTab = ref(1);
const userScoreStore = useUserScoreStore();

// Get current data based on active tab
const currentScores = computed(() => {
  switch (activeTab.value) {
    case 1:
      return (userScoreStore as any).beginnerGrammarRulesScores;
    case 2:
      return (userScoreStore as any).intermediateGrammarRulesScores;
    case 3:
      return (userScoreStore as any).advancedGrammarRulesScores;
    default:
      return [];
  }
});

const currentNames = computed(() => {
  switch (activeTab.value) {
    case 1:
      return (userScoreStore as any).beginnerGrammarRulesNames;
    case 2:
      return (userScoreStore as any).intermediateGrammarRulesNames;
    case 3:
      return (userScoreStore as any).advancedGrammarRulesNames;
    default:
      return [];
  }
});

// Create numbered data for chart
const numberedScores = computed(() => {
  return currentScores.value.map((score: number, index: number) => ({
    value: score,
    itemStyle: {
      color: {
        type: "linear",
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: "#8b5cf6"
          },
          {
            offset: 1,
            color: "#7c3aed"
          }
        ]
      },
      borderRadius: [4, 4, 0, 0],
      shadowBlur: 10,
      shadowColor: "rgba(139, 92, 246, 0.2)"
    }
  }));
});

const numberedNames = computed(() => {
  return currentNames.value.map((_: string, index: number) => `${index + 1}`);
});

// Grammar statistics
const optionBeginnerRulesGrammar = computed(() => {
  return optionBeginnerGrammar(
    numberedScores.value,
    numberedNames.value,
    currentNames.value,
  );
});

const optionIntermediateRulesGrammar = computed(() => {
  return optionIntermediateGrammar(
    numberedScores.value,
    numberedNames.value,
    currentNames.value,
  );
});

const optionAdvancedRulesGrammar = computed(() => {
  return optionAdvancedGrammar(
    numberedScores.value,
    numberedNames.value,
    currentNames.value,
  );
});

const currentGrammarOption = computed((): any => {
  switch (activeTab.value) {
    case 1:
      return optionBeginnerRulesGrammar.value;
    case 2:
      return optionIntermediateRulesGrammar.value;
    case 3:
      return optionAdvancedRulesGrammar.value;
    default:
      return optionBeginnerGrammar;
  }
});

// Get level title
const levelTitle = computed(() => {
  switch (activeTab.value) {
    case 1:
      return "Beginner";
    case 2:
      return "Intermediate";
    case 3:
      return "Advanced";
    default:
      return "Beginner";
  }
});

// Calculate average score
const averageScore = computed(() => {
  if (currentScores.value.length === 0) return 0;
  return Math.round(currentScores.value.reduce((a: number, b: number) => a + b, 0) / currentScores.value.length);
});
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div class="mb-6">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">
            Grammar Progress
          </h3>
          <p class="text-sm text-gray-600">
            Track your grammar mastery by level
          </p>
        </div>

        <!-- Grammar Level Switch -->
        <LayoutTabs
          :first-tab="grammarLevelTabs.firstTab"
          :second-tab="grammarLevelTabs.secondTab"
          :third-tab="grammarLevelTabs.thirdTab"
          @tab-active-changed="(activeT) => (activeTab = activeT)"
        />
      </div>
    </div>
    
    <!-- Chart and Legend Container -->
    <div class="flex gap-6">
      <!-- Chart Section -->
      <div class="flex-1">
        <div class="relative">
          <VChart
            :option="currentGrammarOption"
            style="width: 100%; height: 400px"
            class="rounded-lg"
          />
        </div>
      </div>
      
      <!-- Legend Section -->
      <div class="w-80 bg-gray-50 rounded-lg p-4 border border-gray-200">
        <div class="mb-4">
          <h4 class="text-sm font-semibold text-gray-900 mb-2">
            {{ levelTitle }} Grammar Rules
          </h4>
          <p class="text-xs text-gray-600">
            Click on bars to see detailed scores
          </p>
        </div>
        
        <div class="space-y-3 max-h-80 overflow-y-auto">
          <div 
            v-for="(name, index) in currentNames" 
            :key="index"
            class="flex items-center gap-3 p-2 rounded-md hover:bg-white transition-colors duration-200"
          >
            <!-- Number Badge -->
            <div class="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
              {{ index + 1 }}
            </div>
            
            <!-- Rule Name -->
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate" :title="name">
                {{ name }}
              </p>
              <p class="text-xs text-gray-500">
                Score: {{ currentScores[index] }}%
              </p>
            </div>
            
            <!-- Score Indicator -->
            <div class="flex-shrink-0">
              <div class="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  class="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-300"
                  :style="{ width: `${currentScores[index]}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Legend Footer -->
        <div class="mt-4 pt-3 border-t border-gray-200">
          <div class="flex items-center justify-between text-xs text-gray-600">
            <span>Total Rules: {{ currentNames.length }}</span>
            <span>Avg Score: {{ averageScore }}%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
