<script setup lang="ts">
import type { Lesson } from "~/types/lessons/lesson";
import DOMPurify from "dompurify";
import { PlayIcon } from "@heroicons/vue/24/solid";
import {
  lessonMapping,
} from "~/utils/learning/lesson";
import { parseRuleData} from "~/utils/learning/grammar";
import type { GrammarRule } from "~/types/modules/grammar-rule";
import { getDifficultyNameSafe } from "~/utils/learning/grammar";
import { handleGenerationQuiz } from "~/utils/learning/quiz";
definePageMeta({
  layout: "authenticated",
});

const route = useRoute();
const lessonId = String(route.params.id);
const isLoading = ref<boolean>(true);
const lesson = ref<Lesson | null>(null);
const showEnglishTranslations = ref(false);
const activeSentenceTranslation = ref<number | null>(null);
const activeWordTranslation = ref<number | null>(null);
const activeExpressionTranslation = ref<number | null>(null);
const grammarRule = ref<GrammarRule | null>(null);
const grammarRuleLoading = ref<boolean>(false);
const isStoryShown = ref<boolean>(true);
const relatedQuiz = ref<any>(null);
const areWordsExampleShown = ref<boolean>(false);
const areExpressionsExampleShown = ref<boolean>(false);
const toggleWordTranslation = (index: number) => {
  activeWordTranslation.value = activeWordTranslation.value === index ? null : index;
};

const toggleExpressionTranslation = (index: number) => {
  activeExpressionTranslation.value = activeExpressionTranslation.value === index ? null : index;
};

const toggleSentenceTranslation = (index: number) => {
  activeSentenceTranslation.value = activeSentenceTranslation.value === index ? null : index;
};

const getGrammarRule = async () => {
  if (!lesson.value?.grammarRuleId) return;
  try {
    grammarRuleLoading.value = true;
    const { data, error } = await useFetch(`/api/grammar/${lesson.value.grammarRuleId}`);
    if (error.value) throw error;
    if (data.value) {
      grammarRule.value = parseRuleData(data.value as any);
    }
  } catch (error) {
    console.log("Error fetching grammar rule:", error);
  } finally {
    grammarRuleLoading.value = false;
  }
};


const getLesson = async () => {
  try {
    const { data, error } = await useFetch(`/api/lessons/${lessonId}`)
    if (error.value) throw error;
    else if (data.value) {
      const rawData = data.value as any;
      console.log("lesson", lesson.value);
        lesson.value = { 
          ...Object.fromEntries(
            Object.entries(lessonMapping).map(([sourceKey, targetKey]) => [
              targetKey,
              rawData[sourceKey],
            ]),
          ),
          grammarRuleName: rawData.turkish_grammar_rules.rule_name,
          grammarRuleNameEn: rawData.turkish_grammar_rules.rule_name_translation,
          grammarRuleIntro: rawData.turkish_grammar_rules.intro,
          grammarRuleDescription: rawData.turkish_grammar_rules.description,
          grammarRuleExtendedDescription: rawData.turkish_grammar_rules.extended_description,
          introduction: rawData.introduction,
          grammarRuleId: rawData.grammar_rule_id,
          level: rawData.turkish_grammar_rules.difficulty_class,
          imgUrl: rawData.img_url,
          quizId: rawData.quiz_id,
          newWords: rawData.turkish_lesson_words
            .map((w: any) => w.turkish_words)
            .map(
              ({
                text,
                translation,
                word_sentence,
                word_sentence_translation,
                word_sentence_2,
                word_sentence_2_translation,
              }: any) => ({
                text,
                textEn: translation,
                sentence: word_sentence,
                sentenceEn: word_sentence_translation,
                sentence2: word_sentence_2,
                sentence2En: word_sentence_2_translation,
              }),
            ),
          newExpressions: rawData.turkish_lesson_expressions
            .map((w: any) => w.turkish_expressions)
            .map(
              ({
                text,
                translation,
                expression_sentence,
                expression_sentence_translation,
                expression_sentence_2,
                expression_sentence_2_translation,
              }: any) => ({
                text,
                textEn: translation,
                sentence: expression_sentence,
                sentenceEn: expression_sentence_translation,
                sentence2: expression_sentence_2,
                sentence2En: expression_sentence_2_translation,
              }))
            }
    
            if (rawData.turkish_quizzes_result) {
        relatedQuiz.value = { score: rawData.turkish_quizzes_result.score_global, createdAt: rawData.turkish_quizzes_result.created_at, id: rawData.turkish_quizzes_result.id };
      }

      isLoading.value = false;
      // Fetch grammar rule after lesson is loaded
      await getGrammarRule();
    }
  } catch (error) {
    console.log("error", error);
  }
};

getLesson();

const handleGenerateQuiz = async () => {
  isLoading.value = true;
  if (!lesson.value?.grammarRuleId) return;
  await handleGenerationQuiz(lesson.value?.grammarRuleId, `/learning/lessons/${lessonId}/quiz`, lessonId);
};

const sentences = computed(() => {
  if (!lesson.value) return [];
  let i = 0;
  const phrases = [];
  while ((lesson.value as any)[`sentence${i + 1}`]) {
    phrases.push({
      original: (lesson.value as any)[`sentence${i + 1}`],
      translation: (lesson.value as any)[`sentence${i + 1}En`],
    });
    i = i + 1;
  }
  return phrases;
});

const imageUrl = computed(() => {
  return lesson.value?.imgUrl || '../../../public/toucan.png';
});

// Image loading state
const imageLoading = ref(true);
const imageError = ref(false);


const handleImageError = () => {
  imageLoading.value = false;
  imageError.value = true;
};

const sanitizedIntroTemplate = computed(() =>
  DOMPurify.sanitize(lesson.value?.grammarRuleIntro || grammarRule.value?.intro || ""),
);
const sanitizedDescriptionTemplate = computed(() =>
  DOMPurify.sanitize(lesson.value?.grammarRuleDescription || grammarRule.value?.description || ""),
);
const sanitizedExtendedDescriptionTemplate = computed(() =>
  DOMPurify.sanitize(lesson.value?.grammarRuleExtendedDescription || grammarRule.value?.extendedDescription || ""),
);
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-white">
    <div class="max-w-7xl p-6">
      <div class="max-w-6xl mx-auto">
        <div
          class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden"
        >
          <div v-if="isLoading" class="w-full p-8">
            <!-- Lesson Header Skeleton -->
            <div class="mb-8">
              <!-- Breadcrumbs Skeleton -->
              <div class="mb-6 flex items-center gap-2">
                <div class="h-4 bg-gray-200 rounded w-16 animate-pulse" />
                <div class="h-4 bg-gray-200 rounded w-4 animate-pulse" />
                <div class="h-4 bg-gray-200 rounded w-20 animate-pulse" />
              </div>

              <!-- Title Skeleton -->
              <div class="text-center mb-8">
                <div class="bg-gray-100 rounded-xl p-6 border border-gray-200">
                  <div
                    class="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-3 animate-pulse"
                  />
                  <div
                    class="h-6 bg-gray-200 rounded w-1/2 mx-auto animate-pulse"
                  />
                </div>
              </div>

              <!-- Controls Skeleton -->
              <div
                class="flex items-center justify-between bg-gray-50/50 rounded-xl p-4 border border-gray-200/50"
              >
                <div class="flex-1">
                  <div class="flex gap-4">
                    <div class="h-8 bg-gray-200 rounded w-24 animate-pulse" />
                    <div class="h-8 bg-gray-200 rounded w-24 animate-pulse" />
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <div class="h-4 bg-gray-200 rounded w-32 animate-pulse" />
                  <div class="h-6 bg-gray-200 rounded w-12 animate-pulse" />
                </div>
              </div>
            </div>

            <!-- Content Skeleton -->
            <div
              class="bg-white rounded-xl p-8 border border-gray-100 shadow-sm"
            >
              <div class="space-y-6">
                <!-- Sentence Skeletons -->
                <div
                  v-for="i in 5"
                  :key="i"
                  class="group rounded-lg p-4 border border-gray-100"
                >
                  <!-- Turkish Sentence Skeleton -->
                  <div class="mb-3">
                    <div class="h-6 bg-gray-200 rounded w-full animate-pulse" />
                  </div>
                  <!-- English Translation Skeleton -->
                  <div class="border-l-4 border-gray-200 pl-4 py-2">
                    <div class="h-5 bg-gray-200 rounded w-3/4 animate-pulse" />
                  </div>
                </div>
              </div>

              <!-- Action Button Skeleton -->
              <div class="mt-8 text-center">
                <div
                  class="h-12 bg-gray-200 rounded-lg w-64 mx-auto animate-pulse"
                />
              </div>
            </div>
          </div>
          <div id="lesson_content" v-else class="space-y-8 p-6 bg-gradient-to-b from-slate-50/30 to-white/80 backdrop-blur-sm rounded-3xl border border-white/60 shadow-2xl shadow-slate-200/50">
            <!-- Lesson Title Section -->
            <div class="text-center">
              <h1 class="text-4xl font-light text-slate-800 mb-2 font-serif tracking-tight">
                {{ lesson?.title }}
              </h1>
              <h2 class="text-2xl font-light text-slate-600 italic tracking-wide">
                {{ lesson?.titleEn }}
              </h2>
              <div class="w-32 h-0.5 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 mx-auto mt-3 rounded-full"></div>
            </div>
            
            <!-- Picture and Introduction Side by Side -->
            <div class="flex gap-8 items-center">
              <!-- Left Side - Image -->
              <div id="picture" class="flex-shrink-0 w-96">
                <div class="relative">
                  <div class="absolute -inset-4 bg-gradient-to-r from-blue-200/40 to-indigo-200/40 rounded-3xl blur-xl"></div>
                  
                  <!-- Skeleton placeholder -->
                  <div 
                    v-if="imageLoading"
                    class="relative w-full h-80 rounded-3xl shadow-2xl shadow-slate-300/60 border-8 border-white/90 backdrop-blur-sm bg-gradient-to-br from-slate-100 to-slate-200 animate-pulse"
                  >
                    <div class="absolute inset-0 flex items-center justify-center">
                      <div class="flex flex-col items-center gap-4">
                        <!-- Image icon skeleton -->
                        <div class="w-16 h-16 bg-slate-300 rounded-lg animate-pulse"></div>
                        <!-- Loading text -->
                        <div class="text-slate-500 text-sm font-medium">Image loading...</div>
                      </div>
                    </div>
                    <!-- Shimmer effect -->
                    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer rounded-3xl"></div>
                  </div>
                  
                  <!-- Error state -->
                  <div 
                    v-else-if="imageError"
                    class="relative w-full h-80 rounded-3xl shadow-2xl shadow-slate-300/60 border-8 border-white/90 backdrop-blur-sm bg-gradient-to-br from-red-50 to-pink-50"
                  >
                    <div class="absolute inset-0 flex items-center justify-center">
                      <div class="flex flex-col items-center gap-4">
                        <!-- Error icon -->
                        <div class="w-16 h-16 bg-red-200 rounded-lg flex items-center justify-center">
                          <svg class="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                        </div>
                        <!-- Error text -->
                        <div class="text-red-500 text-sm font-medium text-center">
                          Image non disponible
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Actual image -->
                  <img 
                    v-else
                    :src="imageUrl" 
                    alt="Lesson illustration" 
                    class="relative w-full h-auto rounded-3xl shadow-2xl shadow-slate-300/60 border-8 border-white/90 backdrop-blur-sm"
                    @error="handleImageError"
                  />
                </div>
              </div>
              
              <!-- Right Side - Introduction -->
              <div id="intro" class="flex-1">
                <div class="relative p-6 overflow-hidden">
                  <!-- Decorative background elements -->
                  <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/30 to-indigo-100/20 rounded-full blur-2xl -translate-y-16 translate-x-16"></div>
                  <div class="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-100/25 to-pink-100/15 rounded-full blur-xl translate-y-12 -translate-x-12"></div>
                  
                  <!-- Content -->
                  <div class="relative z-10">
                    <!-- Enhanced heading -->
                    <div class="flex items-center gap-3 mb-6">
                      <div class="w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                      <h3 class="text-2xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent tracking-tight">
                        Introduction
                      </h3>
                    </div>
                    
                    <!-- Beautiful typography for the introduction text -->
                    <div class="prose prose-lg max-w-none">
                      <p class="text-xl leading-loose text-slate-700 font-light tracking-wide mb-0">
                        {{ lesson?.introduction }}
                      </p>
                    </div>
                    
                    <!-- Decorative bottom accent -->
                    <div class="mt-6 flex justify-center">
                      <div class="w-16 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded-full opacity-60"></div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div class="mt-5 italic" v-if="!lesson?.quizId">
              When you're done with the lesson, don't forget <span class="text-primary font-semibold">
                
                <button
                    class="btn btn-sm btn-error mx-2 btn-outline hover:text-white"
                    @click="handleGenerateQuiz"
                  >
                  <span v-if="isLoading" class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  <span>to fill out the quiz</span>
                  </button>
                
                </span> to update your scores
            </div>
            <!-- Story Section (Full Width Below) -->
            <div id="story" class="w-full">
              <div id="story_content" class="p-3">
                <!-- Header with Rule Button and Global Toggle -->
                <div class="flex justify-between items-center mb-6 pb-4 border-b border-slate-200/50">
                  <div class="flex items-center gap-4">
                    <button 
                      @click="isStoryShown = true"
                    >
                      <h3 class="text-lg font-medium text-slate-700 font-serif">Story</h3>
                    </button>
                   
                    <!-- <button 
                      class="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-2"
                      @click="isStoryShown = false"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                      </svg>
                      Key Rule : {{ lesson.grammarRuleNameEn }}
                    </button> -->
                    <LayoutKeyElementRuleBadge :title="lesson?.grammarRuleNameEn" :level="getDifficultyNameSafe(lesson?.level)" size="sm"  @click="isStoryShown = false"/>
                    <LayoutKeyElementQuizBadge v-if="relatedQuiz" :score="relatedQuiz?.score" size="sm"/>
                  </div>
                  <label class="flex items-center gap-3 cursor-pointer group">
                    <span class="text-sm font-medium text-slate-600 group-hover:text-primary transition-colors">
                      Show All Translations
                    </span>
                    <input
                      v-model="showEnglishTranslations"
                      type="checkbox"
                      class="toggle toggle-primary toggle-sm"
                    />
                  </label>
                                  </div>
                  
                  <!-- Grammar Rule Content Section -->
                  <div v-if="grammarRule && !isStoryShown" class="mb-6">
                    <div class="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-2xl p-6 border border-blue-200/30 shadow-sm">
                      <!-- Grammar Rule Header -->
                      <div class="flex items-center gap-4 mb-4 pb-3 border-b border-blue-200/40">
                        <div class="w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md">
                          <span class="text-lg">{{ grammarRule.symbol || grammarRule.ruleName?.charAt(0) }}</span>
                        </div>
                        <div>
                          <h4 class="text-lg font-semibold text-slate-800">{{ grammarRule.ruleNameTranslation }}</h4>
                          <p class="text-sm text-slate-600">{{ grammarRule.ruleName }}</p>
                        </div>
                      </div>
                      
                      <!-- Grammar Rule Content -->
                      <div class="space-y-4 text-slate-700">
                        <div v-if="sanitizedIntroTemplate" class="prose prose-sm max-w-none prose-slate" v-html="sanitizedIntroTemplate" />
                        <div v-if="sanitizedDescriptionTemplate" class="prose prose-sm max-w-none prose-slate" v-html="sanitizedDescriptionTemplate" />
                        <div v-if="sanitizedExtendedDescriptionTemplate" class="prose prose-sm max-w-none prose-slate" v-html="sanitizedExtendedDescriptionTemplate" />
                      </div>
                    </div>
                  </div>
                  
                  <!-- Loading state for grammar rule -->
                  <div v-else-if="grammarRuleLoading && !isStoryShown" class="mb-6">
                    <div class="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-2xl p-6 border border-blue-200/30 shadow-sm animate-pulse">
                      <div class="flex items-center gap-4 mb-4">
                        <div class="w-10 h-10 rounded-lg bg-gray-200"></div>
                        <div class="flex-1">
                          <div class="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>
                          <div class="h-4 bg-gray-200 rounded w-1/4"></div>
                        </div>
                      </div>
                      <div class="space-y-3">
                        <div class="h-4 bg-gray-200 rounded w-full"></div>
                        <div class="h-4 bg-gray-200 rounded w-5/6"></div>
                        <div class="h-4 bg-gray-200 rounded w-4/5"></div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Individual Sentences -->
                <div v-else :class="showEnglishTranslations ? 'space-y-4' : 'space-y-1'">
                  <!-- Compact spacing when translations are off, normal spacing when on -->
                  <div
                    v-for="(sentence, index) in sentences"
                    :key="index"
                    class="group relative border border-transparent hover:border-blue-200/50 rounded-xl p-1 transition-all duration-300"
                  >
                    <!-- Original Sentence -->
                    <p 
                      class="text-xl font-light text-slate-700 leading-relaxed font-serif tracking-wide cursor-pointer hover:bg-primary/10 hover:rounded-lg px-2 py-1 transition-all duration-300"
                      @click="toggleSentenceTranslation(index)"
                    >
                      <span class="inline-flex items-center gap-2">
                        {{ sentence.original }}
                        <svg class="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
                        </svg>
                      </span>
                    </p>
                    
                    <!-- Translation (shows on click or global toggle) -->
                    <div
                      v-if="showEnglishTranslations || activeSentenceTranslation === index"
                      class="mt-1 p-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200/60 animate-fade-in"
                    >
                      <div class="flex items-start gap-3">
                        <div class="flex-shrink-0 mt-1">
                          <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
                          </svg>
                        </div>
                        <p class="text-base text-slate-700 font-light leading-relaxed flex-1">
                          {{ sentence.translation }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Key Words and Expressions Section -->
            <div class="space-y-2">
              <!-- Words Selection Section -->
             <LayoutKeyElementWordCard title="Key Words">
              <template #top-right-corner>
                <label class="flex items-center gap-3 cursor-pointer group">
                    <span class="text-sm font-medium text-slate-600 group-hover:text-primary transition-colors">
                      Show Examples
                    </span>
                    <input
                      v-model="areWordsExampleShown"
                      type="checkbox"
                      class="toggle toggle-primary toggle-sm"
                    />
                  </label>
              </template>
              <template #content>
                <div class="grid grid-cols-2 gap-3">
                <div
                    v-for="(word, index) in lesson?.newWords || []"
                    :key="index"
                    class="group relative"
                  >
                  <LayoutKeyElementWordDefinition :word="word" :isActive="areWordsExampleShown" @click="toggleWordTranslation(index)"/>
                  </div>
                </div>
                 </template>
              </LayoutKeyElementWordCard>
              
               <!-- Key Expressions Section -->
              <LayoutKeyElementExpressionCard title="Key Expressions">
                <template #top-right-corner>
                <label class="flex items-center gap-3 cursor-pointer group">
                    <span class="text-sm font-medium text-slate-600 group-hover:text-primary transition-colors">
                      Show Examples
                    </span>
                    <input
                      v-model="areExpressionsExampleShown"
                      type="checkbox"
                      class="toggle toggle-primary toggle-sm"
                    />
                  </label>
              </template>
                <template #content>
                    <div class="grid grid-cols-2 gap-3">
                      <div
                        v-for="(expression, index) in lesson?.newExpressions || []"
                        :key="index"
                        class="group relative"
                      >
                      <LayoutKeyElementExpressionDefinition :expression="expression" :isActive="areExpressionsExampleShown" @click="toggleExpressionTranslation(index)"/>
                      </div>
                  </div>
                  </template>
            </LayoutKeyElementExpressionCard>

              <div class="pt-4 border-t border-gray-100">
                  <button
                    v-if="!lesson?.quizId"
                    class="w-full bg-primary cursor-pointer hover:bg-primary/90 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                    :disabled="isLoading"
                    @click="handleGenerateQuiz"
                  >
                    <span v-if="isLoading" class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    <PlayIcon v-else class="w-5 h-5" />
                    <span>Grow Your Score With this Quiz</span>
                  </button>
              </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}
</style>
