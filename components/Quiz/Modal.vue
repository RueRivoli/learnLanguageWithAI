<script setup lang="ts">
import { ArrowLeftIcon, BookOpenIcon, EyeIcon, LanguageIcon, Square2StackIcon } from '@heroicons/vue/24/outline';

definePageMeta({
  layout: "authenticated",
});

const props = withDefaults(
  defineProps<{
    grammarRuleMetaData: {level: 'beginner' | 'intermediate' | 'advanced' | 'expert', name: string} | null,
    loading?: boolean;
    detailedResults?: any;
    globalScore?: number | null;
  }>(),
  {
    grammarRuleMetaData: null,
    loading: false,
    rule: null,
    detailedResults: null,
    globalScore: null
  },
);
const greetingMessage = computed(() => {
    if (!props.globalScore) return `You scored some points!`;
    if (props.globalScore === 100) {
      return `Perfect !`;
    }
    else if (props.globalScore  >= 90) {
      return `Close to perfection, some crazy results !`;
    }
    else if (props.globalScore  >= 80) {
      return `Congratulations, your overall score is excellent !`;
    }
    else if (props.globalScore  >= 70)  {
      return `Some very good result here !`;
    }
    else if (props.globalScore  >= 60) {
      return `You did a great job!`;
    }
    else if (props.globalScore  >= 50) {
      return `Quite good!`;
    } else if (props.globalScore  >= 40) {
      return `Promising!`;
    } else if (props.globalScore  >= 30) {
      return `Not bad at all!`;
    } else if (props.globalScore  >= 20) {
      return `You scored some points!`;
    } else if (props.globalScore  >= 10) {
      return `Keep up fighting!`;
    } else if (props.globalScore  >= 0) {
      return `Don't give up! You'll make it`;
    }
});


const congratulationsMessage = computed(() => {
  const scores = [
    { type: 'words', percentage: props.detailedResults.words.percentage, label: 'word list' },
    { type: 'expressions', percentage: props.detailedResults.expressions.percentage, label: 'expression list' },
    { type: 'grammar', percentage: props.detailedResults.grammar.percentage, label: 'grammar rule' }
  ];
  
  // Find the maximum score
  const maxScore = Math.max(...scores.map(s => s.percentage));
  const maxScoreItem = scores.find(s => s.percentage === maxScore);
  
  // If overall score is at least 60%
  if (props.detailedResults.overall.percentage >= 60 && maxScoreItem) {
    if (maxScore >= 60) {
      return `Well done ! You've accomplished ${maxScore}% of success for the ${maxScoreItem.label}`;
    }
  }
  
  // If max score is between 40 and 60% (excluded)
  if (maxScore >= 40 && maxScore < 60) {
    const goodScores = scores.filter(s => s.percentage >= 40 && s.percentage < 60);
    if (goodScores.length > 0) {
      const bestScore = goodScores.reduce((prev, current) => (prev.percentage > current.percentage) ? prev : current);
      return `Congratulations, you have accomplished a correct score: ${bestScore.percentage}% for the ${bestScore.label}`;
    }
  }
  
  // If no score is above 40%
  return "You've been through the lesson and are showing great effort, keep up the work !";
});

const emit = defineEmits(["close"]);
</script>


<template>
    <!-- Results Modal -->
      <div class="modal-container" @click.stop>
        <!-- Modal Header -->
        <div class="modal-header">
          <div class="modal-title-section">
            <h2 class="modal-title">Quiz Results</h2>
          </div>
          <button @click="emit('close')" class="modal-close-button">
            <svg class="close-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal Content -->
        <div class="modal-content">
          <!-- Overall Score Section -->
          <div class="overall-score-section">
            <div class="overall-score-card">
              <div class="score-circle">
                <div class="score-percentage">{{ props.detailedResults.overall.percentage }}%</div>
                <div class="score-label">Overall Score</div>
              </div>
              <div class="score-details">
                <h3 class="score-title">{{ greetingMessage }}</h3>
                <p class="score-description">{{ congratulationsMessage }}</p>
              </div>
            </div>
          </div>

          <!-- Performance Charts Section -->
          <div class="charts-section">
            <!-- Grammar Chart - Full Width -->
            <div class="grammar-chart-container">
              <div class="chart-card grammar-full-width">
                <div class="chart-header">
                  <div class="chart-title">
                <div class="flex items-center">
                <div class="flex-shrink-0">
                    <div class="relative">
                    <div
                        class="absolute inset-0 bg-gradient-to-br from-gray-300/20 to-slate-300/20 rounded-lg blur-sm"
                    />
                    <div
                        class="relative p-2 bg-gradient-to-br from-gray-400 to-slate-500 rounded-lg shadow-lg"
                    >
                        <Square2StackIcon class="h-5 w-5 text-white" />
                    </div>
                    </div>
                </div>
                <div clas="flex items-center ml-3">
                    <h3 class="text-lg font-semibold text-gray-900 ml-3">
                    Grammar / Module
                </h3>
                </div>
        </div>

                  </div>
                  <div class="chart-percentage">{{ props.detailedResults.grammar.percentage }}%</div>
                </div>
                <div class="grammar-chart-content">
                  <div class="chart-visual">
                    <div class="progress-ring">
                      <svg class="progress-ring-svg" width="100" height="100">
                        <circle class="progress-ring-circle-bg" cx="50" cy="50" r="40" />
                        <circle 
                          class="progress-ring-circle" 
                          cx="50" 
                          cy="50" 
                          r="40" 
                          :stroke-dasharray="251"
                          :stroke-dashoffset="251 - (251 * props.detailedResults.grammar.percentage / 100)"
                        />
                      </svg>
                      <div class="progress-ring-text">{{ props.detailedResults.grammar.correct }}/{{ props.detailedResults.grammar.total }}</div>
                    </div>
                  </div>
                  <div class="chart-details">
                    <div class="chart-stat">
                      <div>
                        <span class="stat-label">Rule:</span>
                        <LayoutKeyElementRule class="mb-4" :title="grammarRuleMetaData?.name" :level="grammarRuleMetaData?.level" size="xs" :prefix="false" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Words and Expressions Charts - Side by Side -->
            <div class="vocabulary-charts-grid">
              <!-- Words Chart -->
              <div class="chart-card">
                <div class="chart-header">
                  <div class="chart-title">
                    <div class="flex items-center justify-between">
                        <div class="flex-shrink-0 mr-3">
                        <div class="relative">
                          <div
                            class="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-lg blur-sm"
                          />
                          <div
                            class="relative p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg"
                          >
                            <BookOpenIcon class="h-5 w-5 text-white" />
                          </div>
                        </div>
                      </div>
                    <div class="flex-1">
                      <h3 class="text-base font-semibold text-gray-900 mb-0.5">
                        Words Acquired
                      </h3>
                    </div>

                    </div>
                  </div>
                  <div class="chart-percentage words-gradient">{{ props.detailedResults.words.percentage }}%</div>
                </div>
                                  <div class="chart-visual">
                    <div class="progress-ring">
                      <svg class="progress-ring-svg" width="100" height="100">
                        <defs>
                          <linearGradient id="wordsGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:1" />
                          </linearGradient>
                        </defs>
                        <circle class="progress-ring-circle-bg" cx="50" cy="50" r="40" />
                        <circle 
                          class="progress-ring-circle words" 
                          cx="50" 
                          cy="50" 
                          r="40" 
                          :stroke-dasharray="251"
                          :stroke-dashoffset="251 - (251 * props.detailedResults.words.percentage / 100)"
                        />
                      </svg>
                      <div class="progress-ring-text">{{ props.detailedResults.words.correct }}/{{ props.detailedResults.words.total }}</div>
                    </div>
                  </div>
                <div class="chart-details">
                  <div class="chart-stat">
                    <div class="stat-label">Validated:</div> <span v-if="props.detailedResults.words.validatedList.length > 0" class="stat-value words-gradient">+{{ props.detailedResults.words.validatedList.length }}</span>
                  </div>
                  <div class="flex flex-wrap gap-2">
                    <div v-for="word in props.detailedResults.words.validatedList" :key="word">
                     <LayoutKeyElementWord :text="word" />
                    </div>
                  </div>

                  <div class="chart-stat">
                    <div class="stat-label">Invalidated:</div><span v-if="props.detailedResults.words.invalidatedList.length > 0" class="stat-value words-gradient">{{ props.detailedResults.words.invalidatedList.length ?? 0 }}</span>
                  </div>
                  <div class="flex flex-wrap gap-2">
                    <div v-for="word in props.detailedResults.words.invalidatedList" :key="word">
                     <LayoutKeyElementWord :text="word" />
                    </div>
                  </div>
                  <div class="chart-stat">
                    <div class="stat-label">Note: <p>The quiz may include a few words already known. This is to verify that you truly master them.</p></div>
                  </div>

                </div>
              </div>

              <!-- Expressions Chart -->
              <div class="chart-card">
                <div class="chart-header">
                  <div class="chart-title">
                    <div class="flex items-center justify-between">
                  <div class="flex-shrink-0 mr-3">
                    <div class="relative">
                      <div
                        class="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg blur-sm"
                      />
                      <div
                        class="relative p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg shadow-lg"
                      >
                        <LanguageIcon class="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </div>
                  <div class="flex-1">
                    <h3 class="text-base font-semibold text-gray-900 mb-0.5">
                      Expressions Acquired
                    </h3>
                  </div>
        </div>
                  </div>
                  <div class="chart-percentage expressions-gradient">{{ props.detailedResults.expressions.percentage }}%</div>
                </div>
                                  <div class="chart-visual">
                    <div class="progress-ring">
                      <svg class="progress-ring-svg" width="100" height="100">
                        <defs>
                          <linearGradient id="expressionsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:1" />
                            <stop offset="50%" style="stop-color:#ec4899;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#f472b6;stop-opacity:1" />
                          </linearGradient>
                        </defs>
                        <circle class="progress-ring-circle-bg" cx="50" cy="50" r="40" />
                        <circle 
                          class="progress-ring-circle expressions" 
                          cx="50" 
                          cy="50" 
                          r="40" 
                          :stroke-dasharray="251"
                          :stroke-dashoffset="251 - (251 * props.detailedResults.expressions.percentage / 100)"
                        />
                      </svg>
                      <div class="progress-ring-text">{{ props.detailedResults.expressions.correct }}/{{ props.detailedResults.expressions.total }}</div>
                    </div>
                  </div>
                <div class="chart-details">
                  <div class="chart-stat">
                    <span class="stat-label">Validated:</span><span v-if="props.detailedResults.expressions.validatedList.length > 0" class="expressions-gradient">+{{ props.detailedResults.expressions.validatedList.length }}</span>
                  </div>
                  <div class="flex flex-wrap gap-2">
                    <div v-for="expression in props.detailedResults.expressions.validatedList" :key="expression">
                     <LayoutKeyElementExpression :text="expression" />
                    </div>
                  </div>
                  <div class="chart-stat">
                    <span class="stat-label">Invalidated:</span><span v-if="props.detailedResults.expressions.invalidatedList.length > 0">{{ props.detailedResults.expressions.invalidatedList.length ?? 0 }}</span>
                  </div>
                  <div class="flex flex-wrap gap-2">
                    <div v-for="expression in props.detailedResults.expressions.invalidatedList" :key="expression">
                     <LayoutKeyElementExpression :text="expression" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="modal-actions">
            <button 
              class="px-4 py-2 text-white text-sm font-medium rounded-lg cursor-pointer shadow-sm flex items-center gap-2 bg-gradient-to-r from-gray-500 to-slate-600"
              @click="$router.push(`/learning/stories/`)"
        >
            <ArrowLeftIcon class="h-5 w-5" />
            <span>Back To Lessons</span>
          </button>
            <button
              class="bg-primary hover:bg-primary/90 text-white cursor-pointer font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
              @click="emit('close')" 
            >
              <EyeIcon class="h-5 w-5" />
              <span>See Your Mistakes</span>
            </button>
          </div>
        </div>
      </div>
</template>

<style scoped>
/* Container */
.quiz-container {
  min-height: 100vh;
  background: #f8f9fa;
  display: flex;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Main Quiz Section */
.quiz-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.quiz-header {
  width: 100%;
  margin-bottom: 2rem;
  text-align: center;
  position: relative;
}

.back-button-container {
  margin-bottom: 1.5rem;
  text-align: left;
}

.back-button {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.back-button:hover {
  background: #e5e7eb;
  border-color: #9ca3af;
}

.back-icon {
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
}

.quiz-progress-indicator {
  font-size: 1.1rem;
  color: #6b7280;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.quiz-section-name {
  font-weight: 600;
  color: #374151;
  font-size: 1.2rem;
}

.quiz-counter {
  font-weight: 700;
  color: #4f46e5;
  font-size: 1.4rem;
}

.quiz-total {
  font-weight: 500;
}

.quiz-content {
  width: 100%;
  max-width: 700px;
}

/* Question Section */
.question-section {
  margin-bottom: 3rem;
  text-align: center;
}

.question-text {
  font-size: 2rem;
  font-weight: 600;
  color: #1f2937;
  line-height: 1.4;
  margin: 0;
  letter-spacing: -0.025em;
}

/* Options Section */
.options-section {
  margin-bottom: 3rem;
}

.options-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  max-width: 600px;
  margin: 0 auto;
}

.option-button {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 1.25rem 1.5rem;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: left;
  width: 100%;
  min-height: 100px;
  box-shadow: 
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.option-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.option-button:hover {
  border-color: #d1d5db;
  transform: translateY(-2px);
  box-shadow: 
    0 10px 25px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.option-button:hover::before {
  opacity: 1;
}

.option-button.selected {
  border-color: #4f46e5;
  background: linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #8b5cf6 100%);
  color: white;
  box-shadow: 
    0 10px 25px -3px rgba(79, 70, 229, 0.4),
    0 4px 6px -2px rgba(79, 70, 229, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

.option-button.selected::before {
  opacity: 1;
  background: 
    radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
}

.option-letter {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: #f3f4f6;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
  margin-right: 1rem;
  flex-shrink: 0;
}

.option-button.selected .option-letter {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.option-button.completed-quiz {
  cursor: default;
}

.option-button.correct-answer {
  background: linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%);
  border-color: #10b981;
  color: white;
  box-shadow: 
    0 10px 25px -3px rgba(16, 185, 129, 0.4),
    0 4px 6px -2px rgba(16, 185, 129, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.option-button.correct-answer::before {
  opacity: 1;
  background: 
    radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
}

.option-button.correct-answer .option-letter {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.option-button.incorrect-answer {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%);
  border-color: #ef4444;
  color: white;
  box-shadow: 
    0 10px 25px -3px rgba(239, 68, 68, 0.4),
    0 4px 6px -2px rgba(239, 68, 68, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.option-button.incorrect-answer::before {
  opacity: 1;
  background: 
    radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
}

.option-button.incorrect-answer .option-letter {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.option-text {
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.4;
  text-align: left;
  flex: 1;
}

/* Navigation Buttons */
.navigation-section {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.nav-button {
  display: inline-flex;
  align-items: center;
  padding: 0.875rem 2rem;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}

.nav-button:hover:not(.disabled) {
  background: #4338ca;
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(79, 70, 229, 0.4);
}

.nav-button.disabled {
  background: #9ca3af;
  cursor: not-allowed;
  box-shadow: none;
}

.prev-button {
  background: #6b7280;
  box-shadow: 0 4px 12px rgba(107, 114, 128, 0.3);
}

.prev-button:hover:not(.disabled) {
  background: #4b5563;
  box-shadow: 0 6px 16px rgba(107, 114, 128, 0.4);
}

.nav-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.next-button .nav-icon {
  margin-left: 0.5rem;
}

.prev-button .nav-icon {
  margin-right: 0.5rem;
}

/* Loading Section */
.loading-section {
  text-align: center;
  padding: 4rem 2rem;
}

.loading-spinner {
  width: 3rem;
  height: 3rem;
  border: 3px solid #e5e7eb;
  border-top: 3px solid #4f46e5;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

.loading-text {
  color: #6b7280;
  font-size: 1.1rem;
  font-weight: 500;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Progress Sidebar - Calendar Inspired */
.progress-sidebar {
  width: 320px;
  background: white;
  border-left: 1px solid #e5e7eb;
  padding: 2rem;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.05);
  overflow-y: auto;
}

.sidebar-header {
  margin-bottom: 2rem;
  text-align: center;
}

.sidebar-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
  letter-spacing: -0.025em;
}

.progress-section {
  margin-bottom: 2.5rem;
}

.progress-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 1rem 0;
  letter-spacing: -0.025em;
}

.progress-subsection {
  margin-bottom: 1.5rem;
}

.progress-subtitle {
  font-size: 0.95rem;
  font-weight: 500;
  color: #6b7280;
  margin: 0 0 0.75rem 0;
  letter-spacing: -0.015em;
}

/* Progress Grid - Calendar Style */
.progress-grid {
  display: grid;
  gap: 8px;
}

.grammar-grid {
  grid-template-columns: repeat(5, 1fr);
}

.words-grid {
  grid-template-columns: repeat(5, 1fr);
}

.expressions-grid {
  grid-template-columns: repeat(5, 1fr);
}

.progress-square {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
  color: #6b7280;
  border: 1px solid #e5e7eb;
  box-shadow: 
    0 2px 4px -1px rgba(0, 0, 0, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.progress-square::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.02) 0%, transparent 50%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}



.progress-square.completed:not(.correct):not(.incorrect) {
  background: linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%);
  color: white;
  border-color: #10b981;
  box-shadow: 
    0 4px 8px -2px rgba(16, 185, 129, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.progress-square.completed:not(.correct):not(.incorrect)::before {
  opacity: 1;
  background: 
    radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
}

.progress-square.current {
  background: linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #8b5cf6 100%);
  color: white;
  border-color: #4f46e5;
  box-shadow: 
    0 6px 12px -2px rgba(79, 70, 229, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

.progress-square.current::before {
  opacity: 1;
  background: 
    radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
}

.progress-square.correct {
  background: linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%) !important;
  color: white !important;
  border-color: #10b981 !important;
  box-shadow: 
    0 4px 8px -2px rgba(16, 185, 129, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
}

.progress-square.correct::before {
  opacity: 1 !important;
  background: 
    radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%) !important;
}

.progress-square.incorrect {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%) !important;
  color: white !important;
  border-color: #ef4444 !important;
  box-shadow: 
    0 4px 8px -2px rgba(239, 68, 68, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
}

.progress-square.incorrect::before {
  opacity: 1 !important;
  background: 
    radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%) !important;
}

.progress-square.clickable {
  cursor: pointer;
}

.progress-square.clickable:hover {
  transform: scale(1.05);
  box-shadow: 
    0 6px 16px -4px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.progress-square.clickable:hover::before {
  opacity: 1;
}

/* Score Display Styles */
.score-display {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  padding: 0.5rem 0.75rem;
  background: #f8fafc;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
}

.score-display.small {
  font-size: 0.875rem;
  padding: 0.375rem 0.5rem;
  margin-bottom: 0.5rem;
}

.score-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b;
}

.score-value {
  font-size: 1rem;
  font-weight: 700;
  color: #1e293b;
}

.score-display.small .score-label {
  font-size: 0.75rem;
}

.score-display.small .score-value {
  font-size: 0.875rem;
}

/* Global Score Styles */
.global-score-section {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 2px solid #e5e7eb;
}

.global-score-card {
  background: linear-gradient(135deg, #4f46e5 0%, #6366f1 25%, #8b5cf6 50%, #a855f7 75%, #c084fc 100%);
  color: white;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 
    0 10px 25px -3px rgba(79, 70, 229, 0.4),
    0 4px 6px -2px rgba(79, 70, 229, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
}

.global-score-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%);
  pointer-events: none;
}

.global-score-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  opacity: 0.9;
  position: relative;
  z-index: 1;
}

.global-score-value {
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
}

/* Results Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: modalFadeIn 0.3s ease-out;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-container {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 20px;
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  max-width: 900px;
  width: 90%;
  max-height: 95vh;
  overflow-y: auto;
  position: relative;
  animation: modalSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem 1rem 2rem;
  border-bottom: 1px solid #e5e7eb;
  position: relative;
}

.modal-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(79, 70, 229, 0.02) 0%, transparent 50%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%);
  pointer-events: none;
}

.modal-title-section {
  position: relative;
  z-index: 1;
}

.modal-title {
  font-size: 2rem;
  font-weight: 800;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
  letter-spacing: -0.025em;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}


.modal-close-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 12px;
  background: rgba(239, 68, 68, 0.1);
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  z-index: 1;
}



.close-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #ef4444;
}

.modal-content {
  padding: 1.5rem 2rem;
}

/* Overall Score Section */
.overall-score-section {
  margin-bottom: 2rem;
}

.overall-score-card {
  background: linear-gradient(135deg, #4f46e5 0%, #6366f1 25%, #8b5cf6 50%, #a855f7 75%, #c084fc 100%);
  border-radius: 20px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  position: relative;
  overflow: hidden;
  box-shadow: 
    0 20px 40px -12px rgba(79, 70, 229, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.overall-score-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
  pointer-events: none;
}

.score-circle {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  position: relative;
  z-index: 1;
}

.score-percentage {
  font-size: 1.75rem;
  font-weight: 800;
  color: white;
  line-height: 1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.score-label {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
  text-align: center;
}

.score-details {
  flex: 1;
  position: relative;
  z-index: 1;
}

.score-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: white;
  margin: 0 0 0.75rem 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.score-description {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  line-height: 1.5;
}

/* Charts Section */
.charts-section {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 2rem 0;
  text-align: center;
  letter-spacing: -0.025em;
}

/* Grammar Chart - Full Width */
.grammar-chart-container {
  margin-bottom: 1.5rem;
}

.grammar-full-width {
  width: 100%;
}

.grammar-chart-content {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.grammar-chart-content .chart-visual {
  flex-shrink: 0;
}

.grammar-chart-content .chart-details {
  flex: 1;
}

/* Vocabulary Charts - Side by Side */
.vocabulary-charts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.chart-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 1.25rem;
  box-shadow: 
    0 10px 25px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.chart-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.02) 0%, transparent 50%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}



.chart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
}

.chart-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
  color: #374151;
  font-size: 1.1rem;
}

.chart-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #6b7280;
}

.chart-percentage {
  font-size: 1.5rem;
  font-weight: 700;
  color: #4f46e5;
  background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.chart-visual {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
}

.progress-ring {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.progress-ring-svg {
  transform: rotate(-90deg);
}

.progress-ring-circle-bg {
  fill: none;
  stroke: #e5e7eb;
  stroke-width: 8;
}

.progress-ring-circle {
  fill: none;
  stroke: #4f46e5;
  stroke-width: 8;
  stroke-linecap: round;
  transition: stroke-dashoffset 1s ease-in-out;
}

.progress-ring-circle.words {
  stroke: url(#wordsGradient);
}

.progress-ring-circle.expressions {
  stroke: url(#expressionsGradient);
}

.progress-ring-text {
  position: absolute;
  font-size: 1.25rem;
  font-weight: 700;
  color: #374151;
  text-align: center;
}

.chart-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  position: relative;
  z-index: 1;
}

.chart-stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
}

.stat-value {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}

.stat-value.level {
  text-transform: capitalize;
  color: #7c3aed;
  background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-value.incorrect {
  color: #ef4444;
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-value.words-gradient {
  background: #3b82f6;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-value.expressions-gradient {
  background: linear-gradient(to bottom right, #8b5cf6, #ec4899, #f472b6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.chart-percentage.words-gradient {
  background: #3b82f6;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.chart-percentage.expressions-gradient {
  background: linear-gradient(to bottom right, #8b5cf6, #ec4899, #f472b6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Word boxes styling */
.chart-details .stat-value {
  background: #3b82f6;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  -webkit-background-clip: unset;
  -webkit-text-fill-color: unset;
  background-clip: unset;
}

/* Modal Actions */
.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  padding-top: 1.5rem;
}

.action-button {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  text-decoration: none;
  position: relative;
  overflow: hidden;
}

.action-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}


/* Responsive Design */
@media (max-width: 1024px) {
  .quiz-container {
    flex-direction: column;
  }
  
  .progress-sidebar {
    width: 100%;
    border-left: none;
    border-top: 1px solid #e5e7eb;
    order: 2;
  }
  
  .quiz-main {
    order: 1;
  }
}

@media (max-width: 768px) {
  .quiz-main {
    padding: 1rem;
  }
  
  .question-text {
    font-size: 1.5rem;
  }
  
  .options-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
    max-width: 400px;
  }
  
  .option-button {
    padding: 1rem 1.25rem;
    min-height: 90px;
  }
  
  .option-text {
    font-size: 0.9rem;
  }
  
  .progress-sidebar {
    padding: 1rem;
  }
  
  .progress-square {
    width: 40px;
    height: 40px;
    font-size: 0.75rem;
  }
  
  /* Modal responsive */
  .modal-container {
    width: 95%;
    max-height: 98vh;
  }
  
  .modal-header {
    padding: 1rem 1.5rem 0.75rem 1.5rem;
  }
  
  .modal-title {
    font-size: 1.5rem;
  }
  
  .modal-content {
    padding: 1rem 1.5rem;
  }
  
  .overall-score-card {
    flex-direction: column;
    text-align: center;
    padding: 1.5rem;
    gap: 1rem;
  }
  
  .score-circle {
    width: 80px;
    height: 80px;
  }
  
  .score-percentage {
    font-size: 1.75rem;
  }
  
  .score-title {
    font-size: 1.5rem;
  }
  
  .vocabulary-charts-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .grammar-chart-content {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .chart-card {
    padding: 1rem;
  }
  
  .modal-actions {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .action-button {
    width: 100%;
    justify-content: center;
  }
}
</style>


