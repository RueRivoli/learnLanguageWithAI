<script setup lang="ts">
import { optionExpressions, optionWords } from "~/utils/dashboard/graphOptions";
import { useUserScoreStore } from "~/stores/user-score-store";
import { BookOpenIcon, LanguageIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/outline";
const userScoreStore = useUserScoreStore();

// Grid navigation state
const currentBatch = ref(0);
const wordsPerBatch = 500;

// Get total words from store
const totalWords = computed(() => userScoreStore.$state.totalWords || 0);

// Calculate total batches
const totalBatches = computed(() => Math.ceil(totalWords.value / wordsPerBatch));

// Calculate how many squares to show in current batch
const currentBatchSize = computed(() => {
  const remainingWords = totalWords.value - (currentBatch.value * wordsPerBatch);
  return Math.min(wordsPerBatch, remainingWords);
});

// Store for actual words data
const wordsData = ref<Array<{id: number, text: string, translation: string, isMastered: boolean}>>([]);
const isLoadingWords = ref(false);

// Fetch words for current batch
const fetchWordsForBatch = async () => {
  if (isLoadingWords.value) return;
  
  isLoadingWords.value = true;
  try {
    const page = Math.floor((currentBatch.value * wordsPerBatch) / 16) + 1;
    const { data } = await $fetch(`/api/words?page=${page}&size=16`, {
      query: { is_learned: 'false' }
    });
    
    if (data) {
      // Map the fetched words to our grid format
      const startIndex = currentBatch.value * wordsPerBatch;
      const endIndex = Math.min(startIndex + wordsPerBatch, totalWords.value);
      
      wordsData.value = Array.from({ length: currentBatchSize.value }, (_, i) => {
        const wordIndex = startIndex + i + 1;
        const wordData = data[i] || null;
        
        return {
          id: wordIndex,
          text: wordData?.text || `Word ${wordIndex}`,
          translation: wordData?.translation || '',
          isMastered: wordIndex % 3 === 0 || wordIndex % 7 === 0 // ~33% mastered
        };
      });
    }
  } catch (error) {
    console.error('Error fetching words:', error);
    // Fallback to original behavior
    wordsData.value = Array.from({ length: currentBatchSize.value }, (_, i) => {
      const wordIndex = currentBatch.value * wordsPerBatch + i + 1;
      return {
        id: wordIndex,
        text: `Word ${wordIndex}`,
        translation: '',
        isMastered: wordIndex % 3 === 0 || wordIndex % 7 === 0
      };
    });
  } finally {
    isLoadingWords.value = false;
  }
};

// Generate grid data for current batch
const gridData = computed(() => {
  return wordsData.value;
});

// Navigation functions
const goToPreviousBatch = () => {
  if (currentBatch.value > 0) {
    currentBatch.value--;
    fetchWordsForBatch();
  }
};

const goToNextBatch = () => {
  if (currentBatch.value < totalBatches.value - 1) {
    currentBatch.value++;
    fetchWordsForBatch();
  }
};

// Computed properties for UI
const currentRangeStart = computed(() => currentBatch.value * wordsPerBatch + 1);
const currentRangeEnd = computed(() => Math.min((currentBatch.value + 1) * wordsPerBatch, totalWords.value));
const canGoBack = computed(() => currentBatch.value > 0);
const canGoForward = computed(() => currentBatch.value < totalBatches.value - 1);

// Expression grid navigation state
const currentExpressionBatch = ref(0);
const expressionsPerBatch = 400;

// Get total expressions from store
const totalExpressions = computed(() => userScoreStore.$state.totalExpressions || 0);

// Calculate total expression batches
const totalExpressionBatches = computed(() => Math.ceil(totalExpressions.value / expressionsPerBatch));

// Calculate how many squares to show in current expression batch
const currentExpressionBatchSize = computed(() => {
  const remainingExpressions = totalExpressions.value - (currentExpressionBatch.value * expressionsPerBatch);
  return Math.min(expressionsPerBatch, remainingExpressions);
});

// Store for actual expressions data
const expressionsData = ref<Array<{id: number, text: string, translation: string, isMastered: boolean}>>([]);
const isLoadingExpressions = ref(false);

// Fetch expressions for current batch
const fetchExpressionsForBatch = async () => {
  if (isLoadingExpressions.value) return;
  
  isLoadingExpressions.value = true;
  try {
    const page = Math.floor((currentExpressionBatch.value * expressionsPerBatch) / 10) + 1;
    const { data } = await $fetch(`/api/expressions?page=${page}&size=10`, {
      query: { is_learned: 'false' }
    });
    
    if (data) {
      // Map the fetched expressions to our grid format
      const startIndex = currentExpressionBatch.value * expressionsPerBatch;
      
      expressionsData.value = Array.from({ length: currentExpressionBatchSize.value }, (_, i) => {
        const expressionIndex = startIndex + i + 1;
        const expressionData = data[i] || null;
        
        return {
          id: expressionIndex,
          text: expressionData?.text || `Expression ${expressionIndex}`,
          translation: expressionData?.translation || '',
          isMastered: expressionIndex % 4 === 0 || expressionIndex % 9 === 0 // ~25% mastered
        };
      });
    }
  } catch (error) {
    console.error('Error fetching expressions:', error);
    // Fallback to original behavior
    expressionsData.value = Array.from({ length: currentExpressionBatchSize.value }, (_, i) => {
      const expressionIndex = currentExpressionBatch.value * expressionsPerBatch + i + 1;
      return {
        id: expressionIndex,
        text: `Expression ${expressionIndex}`,
        translation: '',
        isMastered: expressionIndex % 4 === 0 || expressionIndex % 9 === 0
      };
    });
  } finally {
    isLoadingExpressions.value = false;
  }
};

// Generate expression grid data for current batch
const expressionGridData = computed(() => {
  return expressionsData.value;
});

// Expression navigation functions
const goToPreviousExpressionBatch = () => {
  if (currentExpressionBatch.value > 0) {
    currentExpressionBatch.value--;
    fetchExpressionsForBatch();
  }
};

const goToNextExpressionBatch = () => {
  if (currentExpressionBatch.value < totalExpressionBatches.value - 1) {
    currentExpressionBatch.value++;
    fetchExpressionsForBatch();
  }
};

// Expression computed properties for UI
const currentExpressionRangeStart = computed(() => currentExpressionBatch.value * expressionsPerBatch + 1);
const currentExpressionRangeEnd = computed(() => Math.min((currentExpressionBatch.value + 1) * expressionsPerBatch, totalExpressions.value));
const canGoBackExpression = computed(() => currentExpressionBatch.value > 0);
const canGoForwardExpression = computed(() => currentExpressionBatch.value < totalExpressionBatches.value - 1);


// Watch for batch changes and fetch words
watch(currentBatch, () => {
  fetchWordsForBatch();
}, { immediate: true });

// Watch for total words changes to fetch initial data
watch(totalWords, () => {
  if (totalWords.value > 0) {
    fetchWordsForBatch();
  }
}, { immediate: true });

// Watch for expression batch changes and fetch expressions
watch(currentExpressionBatch, () => {
  fetchExpressionsForBatch();
}, { immediate: true });

// Watch for total expressions changes to fetch initial data
watch(totalExpressions, () => {
  if (totalExpressions.value > 0) {
    fetchExpressionsForBatch();
  }
}, { immediate: true });
</script>

<template>
  <div>
    <!-- Full-width Vocabulary Progress Grid -->
    <div class="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <!-- Header with navigation -->
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center space-x-3">
          <div class="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg">
            <BookOpenIcon class="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 class="text-xl font-semibold text-gray-900">Word Progress</h3>
            <p class="text-sm text-gray-600">
              Words {{ currentRangeStart }}-{{ currentRangeEnd }} of {{ totalWords }} • 
              Batch {{ currentBatch + 1 }} of {{ totalBatches }}
            </p>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <button 
            @click="goToPreviousBatch"
            :disabled="!canGoBack"
            class="group p-2 rounded-lg border transition-all duration-200"
            :class="canGoBack 
              ? 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md' 
              : 'border-gray-100 bg-gray-50 cursor-not-allowed'"
          >
            <ChevronLeftIcon 
              class="h-5 w-5 transition-colors"
              :class="canGoBack ? 'text-gray-600 group-hover:text-blue-600' : 'text-gray-300'"
            />
          </button>
          <button 
            @click="goToNextBatch"
            :disabled="!canGoForward"
            class="group p-2 rounded-lg border transition-all duration-200"
            :class="canGoForward 
              ? 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md' 
              : 'border-gray-100 bg-gray-50 cursor-not-allowed'"
          >
            <ChevronRightIcon 
              class="h-5 w-5 transition-colors"
              :class="canGoForward ? 'text-gray-600 group-hover:text-blue-600' : 'text-gray-300'"
            />
          </button>
        </div>
      </div>
      
      <!-- Grid container -->
      <div class="bg-gray-50 rounded-xl">
        <div class="grid gap-0.5" style="grid-template-columns: repeat(50, minmax(0, 1fr));">
          <div 
            v-for="item in gridData" 
            :key="item.id"
            class="aspect-square rounded-sm cursor-pointer hover:scale-110 transition-transform"
            :class="item.isMastered ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-200 hover:bg-gray-300'"
            :title="`${item.text}${item.translation ? ' - ' + item.translation : ''}: ${item.isMastered ? 'Mastered' : 'Learning'}`"
          ></div>
        </div>
      </div>
      
      <!-- Legend -->
      <div class="flex items-center justify-center space-x-8 mt-6">
        <div class="flex items-center space-x-2 text-sm text-gray-600">
          <div class="w-4 h-4 bg-blue-500 rounded-sm"></div>
          <span class="font-medium">Mastered</span>
        </div>
        <div class="flex items-center space-x-2 text-sm text-gray-600">
          <div class="w-4 h-4 bg-gray-200 rounded-sm"></div>
          <span class="font-medium">Learning</span>
        </div>
      </div>
    </div>

    <!-- Full-width Expression Progress Grid -->
    <div class="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <!-- Header with navigation -->
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center space-x-3">
          <div class="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg shadow-lg">
            <LanguageIcon class="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 class="text-xl font-semibold text-gray-900">Expression Progress</h3>
            <p class="text-sm text-gray-600">
              Expressions {{ currentExpressionRangeStart }}-{{ currentExpressionRangeEnd }} of {{ totalExpressions }} • 
              Batch {{ currentExpressionBatch + 1 }} of {{ totalExpressionBatches }}
            </p>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <button 
            @click="goToPreviousExpressionBatch"
            :disabled="!canGoBackExpression"
            class="group p-2 rounded-lg border transition-all duration-200"
            :class="canGoBackExpression 
              ? 'border-gray-200 hover:border-purple-300 hover:bg-purple-50 hover:shadow-md' 
              : 'border-gray-100 bg-gray-50 cursor-not-allowed'"
          >
            <ChevronLeftIcon 
              class="h-5 w-5 transition-colors"
              :class="canGoBackExpression ? 'text-gray-600 group-hover:text-purple-600' : 'text-gray-300'"
            />
          </button>
          <button 
            @click="goToNextExpressionBatch"
            :disabled="!canGoForwardExpression"
            class="group p-2 rounded-lg border transition-all duration-200"
            :class="canGoForwardExpression 
              ? 'border-gray-200 hover:border-purple-300 hover:bg-purple-50 hover:shadow-md' 
              : 'border-gray-100 bg-gray-50 cursor-not-allowed'"
          >
            <ChevronRightIcon 
              class="h-5 w-5 transition-colors"
              :class="canGoForwardExpression ? 'text-gray-600 group-hover:text-purple-600' : 'text-gray-300'"
            />
          </button>
        </div>
      </div>
      
      <!-- Grid container -->
      <div class="bg-gray-50 rounded-xl">
        <div class="grid gap-0.5" style="grid-template-columns: repeat(40, minmax(0, 1fr));">
          <div 
            v-for="item in expressionGridData" 
            :key="item.id"
            class="aspect-square rounded-sm cursor-pointer hover:scale-110 transition-transform"
            :class="item.isMastered ? 'bg-purple-500 hover:bg-purple-600' : 'bg-gray-200 hover:bg-gray-300'"
            :title="`${item.text}${item.translation ? ' - ' + item.translation : ''}: ${item.isMastered ? 'Mastered' : 'Learning'}`"
          ></div>
        </div>
      </div>
      
      <!-- Legend -->
      <div class="flex items-center justify-center space-x-8 mt-6">
        <div class="flex items-center space-x-2 text-sm text-gray-600">
          <div class="w-4 h-4 bg-purple-500 rounded-sm"></div>
          <span class="font-medium">Mastered</span>
        </div>
        <div class="flex items-center space-x-2 text-sm text-gray-600">
          <div class="w-4 h-4 bg-gray-200 rounded-sm"></div>
          <span class="font-medium">Learning</span>
        </div>
      </div>
    </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <VocabularyChartsWords />
    <VocabularyChartsExpressions />
  </div>
</div>
</template>
