<script setup lang="ts">
import DOMPurify from "dompurify";
import { PlayIcon } from "@heroicons/vue/24/solid";
import { handleGenerationQuiz } from "~/utils/learning/quiz";
import { lessonUpdateBus } from "~/composables/useLessonUpdates";

definePageMeta({
  layout: "authenticated",
});

const route = useRoute();
const lessonId = String(route.params.id);

// Use the new lesson composable
const {
  lesson,
  grammarRule,
  relatedQuiz,
  isLoading,
  grammarRuleLoading,
  sentences,
  imageUrl,
  refresh
} = useLesson(lessonId);

// UI state
const openingModalId = ref(0);
const showEnglishTranslations = ref(false);
const activeSentenceTranslation = ref<number | null>(null);
const isStoryShown = ref<boolean>(true);
const areWordsExampleShown = ref<boolean>(false);
const areExpressionsExampleShown = ref<boolean>(false);
const loadingImage = computed(() => route.query.loadingImage as string);
const user = useSupabaseUser();
const userStore = useUserStore();

const toggleSentenceTranslation = (index: number) => {
  activeSentenceTranslation.value = activeSentenceTranslation.value === index ? null : index;
};

// All data fetching is now handled by the useLesson composable

const handleGenerateQuiz = async () => {
  if (!userStore.isEnoughTokensForOneQuiz) {
    openingModalId.value = openingModalId.value + 1;
    return;
  }
  if (!lesson.value?.grammarRuleId) return;
  if (!user.value?.id) return;
  await handleGenerationQuiz(lesson.value?.grammarRuleId, user.value?.id, `/learning/lessons/${lessonId}/quiz`, lessonId);
  // Refresh lesson data after quiz generation to get updated quizId
  await refresh();
  // Notify other components about the lesson modification
  lessonUpdateBus.notifyLessonModified(lessonId, { quizId: lesson.value?.quizId });
};

const handleCancelModal = () => {
  openingModalId.value = openingModalId.value + 1;
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
          <div v-if="isLoading || !lesson" class="w-full space-y-8 p-6 bg-gradient-to-b from-slate-50/30 to-white/80 backdrop-blur-sm rounded-3xl border border-white/60 shadow-2xl shadow-slate-200/50 animate-fade-in">
            <!-- Title Section Skeleton -->
            <div class="text-center space-y-4">
              <div class="h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg w-3/4 mx-auto animate-shimmer-bg" />
              <div class="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg w-1/2 mx-auto animate-shimmer-bg animation-delay-200" />
              <div class="w-32 h-0.5 bg-gradient-to-r from-blue-200 via-indigo-300 to-purple-200 mx-auto rounded-full animate-pulse" />
            </div>

            <!-- Picture and Introduction Side by Side Skeleton -->
            <div class="flex gap-8 items-start">
              <!-- Left Side - Image Skeleton -->
              <div class="flex-shrink-0 w-96">
                <div class="relative">
                  <div class="relative w-full h-80 rounded-3xl shadow-2xl shadow-slate-300/60 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 animate-shimmer-bg overflow-hidden">
                    <div class="absolute inset-0 flex items-center justify-center">
                      <div class="flex flex-col items-center gap-4">
                        <!-- Image icon skeleton -->
                        <div class="w-20 h-20 bg-gradient-to-br from-gray-300 to-gray-400 rounded-2xl animate-pulse flex items-center justify-center">
                          <svg class="w-10 h-10 text-gray-500 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <!-- Loading text -->
                        <div class="space-y-2">
                          <div class="h-4 bg-gray-300 rounded-full w-32 animate-pulse" />
                          <div class="h-3 bg-gray-300 rounded-full w-24 mx-auto animate-pulse animation-delay-300" />
                        </div>
                      </div>
                    </div>
                    <!-- Shimmer overlay effect -->
                    <div class="absolute inset-0 shimmer-overlay"></div>
                  </div>
                </div>
              </div>

              <!-- Right Side - Introduction Skeleton -->
              <div class="flex-1">
                <div class="relative p-6">
                  <!-- Decorative background elements -->
                  <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/30 to-indigo-100/20 rounded-full blur-2xl -translate-y-16 translate-x-16 animate-pulse" />
                  <div class="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-100/25 to-pink-100/15 rounded-full blur-xl translate-y-12 -translate-x-12 animate-pulse animation-delay-500" />
                  
                  <!-- Content -->
                  <div class="relative z-10">
                    <!-- Heading skeleton -->
                    <div class="flex items-center gap-3 mb-6">
                      <div class="w-1 h-8 bg-gradient-to-b from-blue-400 to-indigo-500 rounded-full animate-pulse" />
                      <div class="h-7 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg w-40 animate-shimmer-bg" />
                    </div>
                    
                    <!-- Text lines skeleton -->
                    <div class="space-y-3">
                      <div class="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg w-full animate-shimmer-bg" />
                      <div class="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg w-11/12 animate-shimmer-bg animation-delay-200" />
                      <div class="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg w-10/12 animate-shimmer-bg animation-delay-400" />
                      <div class="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg w-9/12 animate-shimmer-bg animation-delay-600" />
                    </div>
                    
                    <!-- Decorative bottom accent -->
                    <div class="mt-6 flex justify-center">
                      <div class="w-16 h-0.5 bg-gradient-to-r from-transparent via-blue-300 to-transparent rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Story Section Skeleton -->
            <div class="w-full">
              <div class="p-3">
                <!-- Header with controls -->
                <div class="flex justify-between items-center mb-6 pb-4 border-b border-slate-200/50">
                  <div class="flex items-center gap-4">
                    <div class="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg w-20 animate-shimmer-bg" />
                    <div class="h-8 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 rounded-full w-24 animate-shimmer-bg animation-delay-300" />
                  </div>
                  <div class="flex items-center gap-3">
                    <div class="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-32 animate-shimmer-bg" />
                    <div class="h-6 w-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full animate-shimmer-bg animation-delay-200" />
                  </div>
                </div>

                <!-- Sentences Skeleton -->
                <div class="space-y-4">
                  <div
                    v-for="i in 6"
                    :key="i"
                    class="group relative border border-gray-100 hover:border-blue-100 rounded-xl p-4 transition-all duration-300"
                  >
                    <!-- Original Sentence Skeleton -->
                    <div class="mb-2">
                      <div 
                        class="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg animate-shimmer-bg"
                        :style="{ width: `${Math.random() * 20 + 80}%`, animationDelay: `${i * 100}ms` }"
                      />
                    </div>
                    <!-- Translation Skeleton -->
                    <div class="pl-4 border-l-2 border-gray-200">
                      <div 
                        class="h-5 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 rounded-lg animate-shimmer-bg animation-delay-200"
                        :style="{ width: `${Math.random() * 15 + 70}%` }"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Key Words Section Skeleton -->
            <div class="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 border border-primary/20">
              <div class="flex justify-between items-center mb-6">
                <div class="h-7 bg-gradient-to-r from-primary/30 via-primary/40 to-primary/30 rounded-lg w-32 animate-shimmer-bg" />
                <div class="flex items-center gap-2">
                  <div class="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-28 animate-shimmer-bg" />
                  <div class="h-6 w-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full animate-shimmer-bg animation-delay-200" />
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div v-for="i in 4" :key="i" class="bg-white/80 rounded-xl p-4 border border-primary/10">
                  <div class="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg w-3/4 mb-3 animate-shimmer-bg" :style="{ animationDelay: `${i * 100}ms` }" />
                  <div class="h-4 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 rounded-lg w-full animate-shimmer-bg animation-delay-300" />
                </div>
              </div>
            </div>

            <!-- Key Expressions Section Skeleton -->
            <div class="bg-gradient-to-br from-expression/5 to-expression/10 rounded-2xl p-6 border border-expression/20">
              <div class="flex justify-between items-center mb-6">
                <div class="h-7 bg-gradient-to-r from-expression/30 via-expression/40 to-expression/30 rounded-lg w-40 animate-shimmer-bg" />
                <div class="flex items-center gap-2">
                  <div class="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-28 animate-shimmer-bg" />
                  <div class="h-6 w-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full animate-shimmer-bg animation-delay-200" />
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div v-for="i in 4" :key="i" class="bg-white/80 rounded-xl p-4 border border-expression/10">
                  <div class="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg w-4/5 mb-3 animate-shimmer-bg" :style="{ animationDelay: `${i * 150}ms` }" />
                  <div class="h-4 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 rounded-lg w-full animate-shimmer-bg animation-delay-300" />
                </div>
              </div>
            </div>

            <!-- Action Button Skeleton -->
            <div class="p-8">
              <div class="w-80 h-12 bg-gradient-to-r from-primary/40 via-primary/50 to-primary/40 rounded-lg mx-auto animate-shimmer-bg flex items-center justify-center gap-2">
                <div class="w-5 h-5 rounded-full border-3 border-white/30 border-t-white/70 animate-spin" />
                <div class="h-5 bg-white/30 rounded w-48" />
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
                  <div class="absolute -inset-4"></div>
                  <!-- No image state - image being generated -->
                                     <!-- Actual image -->
                                     <div 
                    v-if="!imageUrl && loadingImage === 'true'"
                    class="relative w-full h-80 rounded-3xl shadow-2xl shadow-slate-300/60 border-white/90 backdrop-blur-sm bg-gradient-to-br from-slate-50 to-gray-100"
                  >
                    <div class="absolute inset-0 flex items-center justify-center">
                      <div class="flex flex-col items-center gap-4">
                        <div class="w-16 h-16 bg-gradient-to-br from-slate-200 to-gray-300 rounded-xl flex items-center justify-center shadow-lg">
                          <svg class="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div class="text-slate-600 text-sm font-medium text-center">
                         Your image will be generated in less than 1 minute
                        </div>
                      </div>
                    </div>
                  </div>
                  <img 
                    v-else-if="!imageUrl"
                    src="~/public/default-image.png" 
                    alt="Lesson illustration" 
                    class="relative w-full h-auto rounded-3xl shadow-2xl shadow-slate-300/60"
                  />

                  

                  <img 
                    v-else
                    :src="imageUrl" 
                    alt="Lesson illustration" 
                    class="relative w-full h-auto rounded-3xl shadow-2xl shadow-slate-300/60"
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
                      class="cursor-pointer"
                    >
                      <h3 class="text-lg font-medium text-slate-700 font-serif">Story</h3>
                    </button>
                   
                    <LayoutKeyElementRuleBadge class="cursor-pointer" :titleEn="lesson?.grammarRuleNameEn" :level="lesson?.level" size="sm"  :symbol="lesson?.symbol" :lightMode="true" @click="isStoryShown = false"/>
                    <LayoutKeyElementQuizBadge v-if="relatedQuiz" :score="relatedQuiz?.score" size="sm"/>
                  </div>
                  <label class="flex items-center gap-3 cursor-pointer group">
                    <span class="text-md text-slate-600 group-hover:text-primary transition-colors">
                      Show Translations
                    </span>
                    <input
                      v-model="showEnglishTranslations"
                      type="checkbox"
                      class="toggle toggle-primary toggle-md"
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
                    <span class="text-md text-slate-600 group-hover:text-primary transition-colors">
                      Show Examples
                    </span>
                    <input
                      v-model="areWordsExampleShown"
                      type="checkbox"
                      class="toggle toggle-primary toggle-md"
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
                  <LayoutKeyElementWordDefinition :word="word" :isActive="areWordsExampleShown" @click="areWordsExampleShown = !areWordsExampleShown"/>
                  </div>
                </div>
                 </template>
              </LayoutKeyElementWordCard>
              
               <!-- Key Expressions Section -->
              <LayoutKeyElementExpressionCard class="mt-8" title="Key Expressions">
                <template #top-right-corner>
                <label class="flex items-center gap-3 cursor-pointer group">
                    <span class="text-md text-slate-600 group-hover:text-expression transition-colors">
                      Show Examples
                    </span>
                    <input
                      v-model="areExpressionsExampleShown"
                      type="checkbox"
                      class="toggle toggle-expression toggle-md"
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
                        <LayoutKeyElementExpressionDefinition :expression="expression" :isActive="areExpressionsExampleShown" @click="areExpressionsExampleShown = !areExpressionsExampleShown"/>
                      </div>
                  </div>
                  </template>
            </LayoutKeyElementExpressionCard>

              <div class="p-8">
                  <button
                    v-if="!lesson?.quizId"
                    class="w-80 m-auto bg-primary cursor-pointer hover:bg-primary/90 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                    :disabled="isLoading"
                    @click="handleGenerateQuiz"
                  >
                    <span v-if="isLoading" class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    <PlayIcon v-else class="w-5 h-5" />
                    <span>Grow your Score with this Quiz</span>
                  </button>
              </div>
              <AccountPaymentModal
            id="my_modal_to_get_credits"
            :key="openingModalId"
            @cancel="handleCancelModal"
          />
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

@keyframes shimmer-bg {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}

.animate-shimmer-bg {
  background-size: 1000px 100%;
  animation: shimmer-bg 2s infinite linear;
}

/* Shimmer overlay effect */
.shimmer-overlay {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.4) 50%,
    transparent 100%
  );
  background-size: 200% 100%;
  animation: shimmer-slide 2s infinite;
}

@keyframes shimmer-slide {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

/* Animation delays for staggered effects */
.animation-delay-200 {
  animation-delay: 200ms;
}

.animation-delay-300 {
  animation-delay: 300ms;
}

.animation-delay-400 {
  animation-delay: 400ms;
}

.animation-delay-500 {
  animation-delay: 500ms;
}

.animation-delay-600 {
  animation-delay: 600ms;
}
</style>
