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

// Get grammar rule level for color matching
const grammarRuleLevel = computed(() => {
  return props.grammarRuleMetaData?.level || 'beginner';
});

// Get grammar colors based on rule level (matching KeyElementRule)
const grammarColors = computed(() => {
  switch (grammarRuleLevel.value) {
    case 'beginner':
      return {
        stroke: '#10b981', // emerald-500 #10b981
        text: '#10b981'
      };
    case 'intermediate':
      return {
        stroke: '#f59e0b', // amber-500
        text: '#f59e0b'
      };
    case 'advanced':
      return {
        stroke: '#ec4899', // pink-500
        text: '#ec4899'
      };
    case 'expert':
    default:
      return {
        stroke: '#2563eb', // blue-600
        text: '#2563eb'
      };
  }
});
const grammarClass = computed(() => {
  switch (grammarRuleLevel.value) {
    case 'beginner':
      return 'grammar-achievement__beginner';
    case 'intermediate':
        return 'grammar-achievement__intermediate';
    case 'advanced':
        return 'grammar-achievement__advanced';
    case 'expert':
        return 'grammar-achievement__expert';
    default:
        return 'grammar-achievement__beginner';
  }
});
</script>


<template>
    <!-- Results Modal -->
      <div class="modal-container" @click.stop>
        <!-- Modal Header -->
        <div class="modal-header">
          <div class="modal-title-section">
            <h2 class="modal-title">Quiz Results: {{ greetingMessage }}</h2>
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
              <div>
                <div class="score-percentage">{{ props.detailedResults.overall.percentage }}%</div>
                <div class="score-label">Overall Score</div>
              </div>
              <div class="score-details">
                <p class="score-description">{{ congratulationsMessage }}</p>
              </div>
            </div>
          </div>

          <!-- Performance Charts Section -->
          <div class="charts-section">
            <!-- Grammar Chart - Full Width -->
            <div class="grammar-chart-container">
              <div class="chart-card grammar-full-width" :class="grammarClass">
                <div class="chart-header">
                  <div class="chart-title">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <div class="relative">
                                <div
                                    :class="[
                                        'absolute inset-0 rounded-lg blur-sm',
                                        grammarRuleLevel === 'beginner' ? 'bg-gradient-to-br from-emerald-300/20 to-teal-300/20' :
                                        grammarRuleLevel === 'intermediate' ? 'bg-gradient-to-br from-amber-300/20 to-orange-300/20' :
                                        grammarRuleLevel === 'advanced' ? 'bg-gradient-to-br from-pink-300/20 to-rose-300/20' :
                                        'bg-gradient-to-br from-blue-300/20 to-indigo-300/20'
                                    ]"
                                />
                                <div
                                    :class="[
                                        'relative p-2 rounded-lg shadow-lg',
                                        grammarRuleLevel === 'beginner' ? 'bg-gradient-to-br from-emerald-500 to-teal-600' :
                                        grammarRuleLevel === 'intermediate' ? 'bg-gradient-to-br from-amber-500 to-orange-600' :
                                        grammarRuleLevel === 'advanced' ? 'bg-gradient-to-br from-pink-500 to-rose-600' :
                                        'bg-gradient-to-br from-blue-600 to-indigo-700'
                                    ]"
                                >
                                    <Square2StackIcon class="h-5 w-5 text-white" />
                                </div>
                            </div>
                        </div>
                        <div clas="flex items-center ml-3">
                            <h3 class="text-lg font-semibold text-gray-900 ml-3">Key Module & Scores</h3>
                        </div>
                    </div>
                </div>
                <div class="chart-details">   
                    <div class="chart-percentage" :style="{ color: grammarColors.text }">{{ props.detailedResults.grammar.percentage }}%</div>
                </div>
                </div>
                
                <div class="grammar-chart-content">
                    <div class="chart-details">
                        <div>
                            <div class="chart-stat">
                            <div class="stat-label mb-1">Rule:</div>
                        </div>
                        <div class="flex flex-wrap gap-2">
                            <LayoutKeyElementRule class="mb-4" :title="grammarRuleMetaData?.name" :level="grammarRuleMetaData?.level" size="xs" :prefix="false" />
                        </div>
                        </div>
 
                    </div>
                    <!-- <div class="chart-visual">
                      <div class="flex items-center gap-2">
                        <div class="stat-label">Rule:</div>
                        <LayoutKeyElementRule class="mb-4" :title="grammarRuleMetaData?.name" :level="grammarRuleMetaData?.level" size="xs" :prefix="false" />
                      </div>
                    </div> -->

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
                          :stroke="grammarColors.stroke"
                        />
                      </svg>
                      <!-- <div class="progress-ring-text">{{ props.detailedResults.grammar.correct }}/{{ props.detailedResults.grammar.total }}</div> -->
                      <div class="progress-ring-text">
                        <div class="flex items-baseline gap-1">
                            <span :class="grammarClass" class="text-2xl font-bold text-gray-900">
                                {{ props.detailedResults.grammar.correct }}
                            </span>
                            <span class="text-base text-gray-500"
                                >/{{ props.detailedResults.grammar.total }}</span
                            >
                            </div>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Words and Expressions Charts - Side by Side -->
            <div class="vocabulary-charts-grid">
              <!-- Words Chart -->
              <div class="chart-card words-chart-bg">
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
                      <!-- <div class="progress-ring-text">{{ props.detailedResults.words.correct }}/{{ props.detailedResults.words.total }}</div> -->
                      <div class="progress-ring-text">
                    <div class="flex items-baseline gap-1">
                        <span class="word-achievement text-2xl font-bold text-gray-900">
                            {{ props.detailedResults.words.correct }}
                        </span>
                        <span class="text-base text-gray-500"
                            >/{{ props.detailedResults.words.total }}</span
                        >
                        </div>
                    </div>
                    </div>
                  </div>
                <div class="chart-details">
                    <div>
                        <div class="chart-stat">
                            <div class="stat-label mb-1">Validated:</div> <span class="stat-value words-gradient">+{{ props.detailedResults.words.validatedList.length }}</span>
                        </div>
                        <div class="flex flex-wrap gap-2">
                            <div v-for="word in props.detailedResults.words.validatedList" :key="word">
                                <LayoutKeyElementWord :text="word" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="chart-stat">
                        <div class="stat-label mb-1">Invalidated:</div><span class="stat-value words-gradient">{{ props.detailedResults.words.invalidatedList.length }}</span>
                    </div>
                    <div class="flex flex-wrap gap-2">
                        <div v-for="word in props.detailedResults.words.invalidatedList" :key="word">
                        <LayoutKeyElementWord :text="word" />
                    </div>
                </div>
                    </div>
                <div>
                    <div class="chart-stat">
                    <div class="stat-label mb-1">Note:</div>
                  </div>
                  <div class="text-xs text-gray-600">*The quiz may include a few words already known because repetition is the way to memorize</div>
                </div>

                </div>
              </div>

              <!-- Expressions Chart -->
              <div class="chart-card expressions-chart-bg">
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
                      <!-- <div class="progress-ring-text">{{ props.detailedResults.expressions.correct }}/{{ props.detailedResults.expressions.total }}</div> -->
                    </div>
                    <div class="progress-ring-text">
                    <div class="flex items-baseline gap-1">
                        <span class="expression-achievement text-2xl font-bold text-gray-900">
                            {{ props.detailedResults.expressions.correct }}
                        </span>
                        <span class="text-base text-gray-500"
                            >/{{ props.detailedResults.expressions.total }}</span
                        >
                        </div>
                    </div>
                  </div>
                <div class="chart-details">
                    <div>
                        <div class="chart-stat">
                    <span class="stat-label mb-1">Validated:</span><span class="stat-value expressions-gradient">+{{ props.detailedResults.expressions.validatedList.length }}</span>
                  </div>
                  <div class="flex flex-wrap gap-2">
                    <div v-for="expression in props.detailedResults.expressions.validatedList" :key="expression">
                     <LayoutKeyElementExpression :text="expression" />
                    </div>
                  </div>
                    </div>

                    <div>
                        <div class="chart-stat">
                    <span class="stat-label mb-1">Invalidated:</span><span class="stat-value expressions-gradient">{{ props.detailedResults.expressions.invalidatedList.length }}</span>
                  </div>
                  <div class="flex flex-wrap gap-2">
                    <div v-for="expression in props.detailedResults.expressions.invalidatedList" :key="expression">
                        <LayoutKeyElementExpression :text="expression" />
                    </div>
                  </div>
                </div>
                <div>
                    <div class="chart-stat">
                    <div class="stat-label mb-1">Note:</div>
                  </div>
                  <div class="text-xs text-gray-600">*The quiz may include a few expressions already known because repetition is the way to memorize</div>
                </div>

                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="modal-actions">
            <button 
              class="btn-ghost px-4 py-2 text-sm font-medium cursor-pointer flex items-center gap-2"
              @click="$router.push(`/learning/stories/`)"
            >
                <ArrowLeftIcon class="h-5 w-5" />
                <span>Back To Lessons</span>
          </button>
            <button
              class="bg-primary hover:bg-primary/90 cursor-pointer text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
              @click="emit('close')"
            >
              <EyeIcon class="h-5 w-5" />
              <span>See Answers</span>
            </button>
          </div>
        </div>
      </div>
</template>

<style scoped>

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
  background: #4f46e5;
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
  justify-content: normal;
  gap: 1.5rem;
}

.grammar-chart-content .chart-visual {
  flex-shrink: 0;
}

/* .grammar-chart-content .chart-details {
  flex: 1;
} */

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

/* Chart Background Colors */
.grammar-achievement__beginner {
  background: linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%);
  border: 1px solid #dcfce7;
}

.grammar-achievement__intermediate {
  background: linear-gradient(135deg, #ffffff 0%, #fffbeb 100%);
  border: 1px solid #fed7aa;
}

.grammar-achievement__advanced {
  background: linear-gradient(135deg, #ffffff 0%, #fdf2f8 100%);
  border: 1px solid #fce7f3;
}

.grammar-achievement__expert {
  background: linear-gradient(135deg, #ffffff 0%, #eff6ff 100%);
  border: 1px solid #dbeafe;
}

.words-chart-bg {
  background: linear-gradient(135deg, #ffffff 0%, #eff6ff 100%);
  border: 1px solid #dbeafe;
}

.expressions-chart-bg {
  background: linear-gradient(135deg, #ffffff 0%, #fdf2f8 100%);
  border: 1px solid #fce7f3;
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

.chart-percentage {
  font-size: 1.5rem;
  font-weight: 700;
  /* color: #4f46e5;
  background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%); */
  /* -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; */
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
  /* stroke: #4f46e5; */
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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.25rem;
  font-weight: 700;
  color: #374151;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  .word-achievement {
    color: #3b82f6;
  }
  .expression-achievement {
    color: #f472b6;
  }
  .grammar-achievement__beginner {
    color: #10b981;
  }
  .expression-achievement__intermediate {
    color: #f472b6;
  }
  .expression-achievement__advanced {
    color: #f472b6;
  }
  .expression-achievement__expert {
    color: #f472b6;
  }

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

.stat-value.words-gradient {
  color: #3b82f6;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.chart-details .stat-value.expressions-gradient {
  color: #f472b6;
}

.chart-percentage.words-gradient {
  color: #3b82f6;
  /* -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; */
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
  color: #3b82f6;
  font-size: 0.975rem;
  font-weight: 700;
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

/* Responsive Design */
@media (max-width: 768px) {
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
}
</style>


