<script setup lang="ts">
import type { Lesson } from "~/types/lesson.ts";
import DOMPurify from "dompurify";
import { PlayIcon } from "@heroicons/vue/24/solid";
import {
  lessonMapping,
  lessonFirstTab,
  lessonSecondTab,
} from "~/utils/learning/lesson.ts";
definePageMeta({
  layout: "authenticated",
});

const route = useRoute();
const lessonId = route.params.id;
const isLoading = ref<boolean>(true);
const lesson = ref<Lesson | null>(null);
const showEnglishTranslations = ref(false);
const activeLessonTab = ref(1);
const activeSentenceTranslation = ref(null);
const showExpressionTranslations = ref(false);
const activeWordTranslation = ref(null);
const activeExpressionTranslation = ref(null);

const toggleWordTranslation = (index) => {
  activeWordTranslation.value = activeWordTranslation.value === index ? null : index;
};

const toggleExpressionTranslation = (index) => {
  activeExpressionTranslation.value = activeExpressionTranslation.value === index ? null : index;
};

const startQuiz = () => {
  // Navigate to quiz for this lesson
  navigateTo(`/learning/quizzes/${lessonId}`);
};

const toggleSentenceTranslation = (index) => {
  activeSentenceTranslation.value = activeSentenceTranslation.value === index ? null : index;
};

const getLesson = async () => {
  try {
    const { data, error } = await useFetch(`/api/lessons/${lessonId}`);
    if (error.value) throw error;
    else if (data) {
      lesson.value = Object.fromEntries(
        Object.entries(lessonMapping).map(([sourceKey, targetKey]) => [
          targetKey,
          data.value[sourceKey],
        ]),
      );
      // see lesson.ts for individual assignation
      console.log('data', data.value)
      lesson.value.grammarRuleName = data.value.turkish_grammar_rules.rule_name;
      lesson.value.grammarRuleNameEn =
        data.value.turkish_grammar_rules.rule_name_translation;
      lesson.value.grammarRuleIntro = data.value.turkish_grammar_rules.intro;
      lesson.value.grammarRuleDescription =
        data.value.turkish_grammar_rules.description;
      lesson.value.grammarRuleExtendedDescription =
        data.value.turkish_grammar_rules.extended_description;
      lesson.value.introduction = data.value.introduction;
      lesson.value.conclusion = data.value.conclusion;
      lesson.value.newWords = data.value.turkish_lesson_words
        .map((w) => w.turkish_words)
        .map(
          ({
            text,
            translation,
            word_sentence,
            word_sentence_translation,
            word_sentence_2,
            word_sentence_2_translation,
          }) => ({
            text,
            textEn: translation,
            sentence: word_sentence,
            sentenceEn: word_sentence_translation,
            sentence2: word_sentence_2,
            sentence2En: word_sentence_2_translation,
          }),
        );
      lesson.value.newExpressions = data.value.turkish_lesson_expressions
        .map((w) => w.turkish_expressions)
        .map(
          ({
            text,
            translation,
            expression_sentence,
            expression_sentence_translation,
            expression_sentence_2,
            expression_sentence_2_translation,
          }) => ({
            text,
            textEn: translation,
            sentence: expression_sentence,
            sentenceEn: expression_sentence_translation,
            sentence2: expression_sentence_2,
            sentence2En: expression_sentence_2_translation,
          }),
        );
      isLoading.value = false;
      console.log("lesson", lesson.value);
    }
  } catch (error) {
    console.log("error", error);
  }
};

getLesson();

const sentences = computed(() => {
  if (!lesson.value) return [];
  let i = 0;
  const phrases = [];
  while (lesson.value[`sentence${i + 1}`]) {
    phrases.push({
      original: lesson.value[`sentence${i + 1}`],
      translation: lesson.value[`sentence${i + 1}En`],
    });
    i = i + 1;
  }
  return phrases;
});

const handleLessonDeletion = (id: number, title: string) => {
  lessonNameToDelete.value = { id, title };
};

const sanitizedIntroTemplate = computed(() =>
  DOMPurify.sanitize(lesson.value.grammarRuleIntro || ""),
);
const sanitizedDescriptionTemplate = computed(() =>
  DOMPurify.sanitize(lesson.value.grammarRuleDescription || ""),
);
const sanitizedExtendedDescriptionTemplate = computed(() =>
  DOMPurify.sanitize(lesson.value.grammarRuleExtendedDescription || ""),
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
                <div class="relative group">
                  <div class="absolute -inset-4 bg-gradient-to-r from-blue-200/40 to-indigo-200/40 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <img 
                    src="../../../public/toucan.png" 
                    alt="Toucan illustration" 
                    class="relative w-full h-auto rounded-3xl shadow-2xl shadow-slate-300/60 border-8 border-white/90 backdrop-blur-sm transition-all duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
              
              <!-- Right Side - Introduction -->
              <div id="intro" class="flex-1">
                <div class="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-white/70">
                  <h3 class="text-lg font-medium text-slate-700 font-serif mb-4">Introduction</h3>
                  <p class="text-lg text-slate-600 leading-relaxed font-light tracking-wide">
                    {{ lesson?.introduction }}
                  </p>
                </div>
              </div>
            </div>
            
            <!-- Story Section (Full Width Below) -->
            <div id="story" class="w-full">
              <div id="story_content" class="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-white/70">
                <!-- Header with Global Toggle -->
                <div class="flex justify-between items-center mb-6 pb-4 border-b border-slate-200/50">
                  <h3 class="text-lg font-medium text-slate-700 font-serif">Story</h3>
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
                
                <!-- Individual Sentences -->
                <div :class="showEnglishTranslations ? 'space-y-4' : 'space-y-1'">
                  <!-- Compact spacing when translations are off, normal spacing when on -->
                  <div
                    v-for="(sentence, index) in sentences"
                    :key="index"
                    class="group relative border border-transparent hover:border-blue-200/50 rounded-xl p-3 transition-all duration-300"
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
                      class="mt-3 p-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200/60 animate-fade-in"
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
                            <!-- Key Words Section -->
              <div class="p-5 bg-white/70 backdrop-blur-md rounded-3xl border border-white/60 shadow-lg">
                <h3 class="text-lg font-medium text-slate-700 font-serif mb-4">Key Words</h3>
                
                <div class="grid grid-cols-1 gap-3">
                  <div
                    v-for="(word, index) in lesson?.newWords || []"
                    :key="index"
                    class="group relative"
                  >
                    <!-- Enhanced Word Card -->
                    <div 
                      class="bg-gradient-to-r from-primary/15 to-primary/25 border border-primary/20 rounded-2xl p-4 cursor-pointer transition-all duration-300"
                      @click="toggleWordTranslation(index)"
                    >
                      <div class="flex items-center justify-between">
                        <div class="flex items-center gap-4">
                          <span class="text-base font-medium text-slate-800 font-serif">
                            {{ word.text }}
                          </span>
                          <span class="text-sm text-slate-600 font-light italic">
                            {{ word.textEn || 'Translation not available' }}
                          </span>
                        </div>
                        <svg 
                          class="w-4 h-4 text-slate-500 transition-all duration-300"
                          :class="{ 'rotate-180': activeWordTranslation === index }"
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                      </div>
                      
                      <!-- Example Sentences (shows when clicked) -->
                      <div
                        v-if="activeWordTranslation === index && (word.sentence || word.sentenceEn)"
                        class="mt-3 pt-3 border-t border-primary/20 space-y-2 animate-fade-in"
                      >
                        <div
                          v-if="word.sentence"
                          class="text-sm text-slate-700 bg-slate-50/50 p-3 rounded-lg"
                        >
                          <span class="font-medium text-slate-800">Example:</span> {{ word.sentence }}
                        </div>
                        <div
                          v-if="word.sentenceEn"
                          class="text-sm text-slate-600 italic pl-3"
                        >
                          {{ word.sentenceEn }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Key Expressions Section -->
              <div class="p-5 bg-white/70 backdrop-blur-md rounded-3xl border border-white/60 shadow-lg">
                <h3 class="text-lg font-medium text-slate-700 font-serif mb-4">Key Expressions</h3>
                
                <div class="grid grid-cols-1 gap-3">
                  <div
                    v-for="(expression, index) in lesson?.newExpressions || []"
                    :key="index"
                    class="group relative"
                  >
                    <!-- Enhanced Expression Card -->
                    <div 
                      class="bg-gradient-to-r from-primary/15 to-primary/25 border border-primary/20 rounded-2xl p-4 cursor-pointer transition-all duration-300"
                      @click="toggleExpressionTranslation(index)"
                    >
                      <div class="flex items-center justify-between">
                        <div class="flex items-center gap-4">
                          <span class="text-base font-medium text-slate-800 font-serif">
                            {{ expression.text }}
                          </span>
                          <span class="text-sm text-slate-600 font-light italic">
                            {{ expression.textEn || expression.translation || expression.definition || 'Translation not available' }}
                          </span>
                        </div>
                        <svg 
                          class="w-4 h-4 text-slate-500 transition-all duration-300"
                          :class="{ 'rotate-180': activeExpressionTranslation === index }"
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                      </div>
                      
                      <!-- Example Sentences (shows when clicked) -->
                      <div
                        v-if="activeExpressionTranslation === index && (expression.sentence || expression.sentenceEn)"
                        class="mt-3 pt-3 border-t border-primary/20 space-y-2 animate-fade-in"
                      >
                        <div
                          v-if="expression.sentence"
                          class="text-sm text-slate-700 bg-slate-50/50 p-3 rounded-lg"
                        >
                          <span class="font-medium text-slate-800">Example:</span> {{ expression.sentence }}
                        </div>
                        <div
                          v-if="expression.sentenceEn"
                          class="text-sm text-slate-600 italic pl-3"
                        >
                          {{ expression.sentenceEn }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Conclusion Section -->
            <div id="conclusion" class="bg-gradient-to-r from-slate-50/50 to-blue-50/30 rounded-3xl p-8 border border-slate-200/50">
              <div class="max-w-4xl mx-auto">
                <!-- Conclusion Header -->
                <div class="text-center mb-6">
                  <h2 class="text-2xl font-light text-slate-800 mb-3 font-serif">Lesson Summary</h2>
                  <div class="w-20 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-500 mx-auto rounded-full"></div>
                </div>
                
                <!-- Content and Button Layout -->
                <div class="flex flex-col lg:flex-row items-center gap-8">
                  <!-- Conclusion Text -->
                  <div class="flex-1">
                    <p class="text-lg text-slate-700 leading-loose font-light tracking-wide text-left">
                      {{ lesson?.conclusion }}
                    </p>
                  </div>
                  
                  <!-- Quiz Button -->
                  <div class="flex-shrink-0">
                    <button
                class="btn btn-primary btn-lg px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <PlayIcon class="h-6 w-6 mr-2" />
                Finish the lesson and test your level
              </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div v-else class="p-8 min-h-screen flex flex-col">
            <div class="shrink-0 mb-8">
              <div class="mb-6">
                <LayoutBreadcrumbs
                  first-section="Lessons"
                  :second-section="`Lesson #${lesson?.id}`"
                />
              </div>

          
              <div class="text-center mb-8">
                <div
                  class="bg-primary opacity-80 rounded-xl p-6 border border-gray-200"
                >
                  <h1
                    class="text-3xl font-bold text-gray-900 mb-3 leading-tight"
                  >
                    {{ lesson?.title }}
                  </h1>
                  <h2 class="text-xl text-white font-medium italic">
                    {{ lesson?.titleEn }}
                  </h2>
                </div>
              </div>
              <div class="flex items-center justify-between p-4">
                <div class="flex-1">
                  <LayoutTabs
                    :first-tab="lessonFirstTab"
                    :second-tab="lessonSecondTab"
                    @tab-active-changed="
                      (activeTab) => (activeLessonTab = activeTab)
                    "
                  />
                </div>

                <div class="flex items-center gap-3">
                  <label class="flex items-center gap-3 cursor-pointer group">
                    <span
                      class="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors"
                    >
                      Show Translations
                    </span>
                    <input
                      v-model="showEnglishTranslations"
                      type="checkbox"
                      class="toggle toggle-primary toggle-sm"
                    />
                  </label>
                </div>
              </div>
            </div>
            <div v-if="activeLessonTab === 1" class="grow">
              <div class="bg-white rounded-xl p-8">
                <div class="space-y-3">
                  <div
                    v-for="(sentence, index) in sentences"
                    :key="index"
                    class="group hover:bg-gray-50/50 rounded-lg p-3 transition-all duration-200"
                  >
                    <p
                      class="text-lg font-semibold text-gray-900 mb-1 leading-relaxed"
                    >
                      {{ sentence.original }}
                    </p>
                    <p
                      v-if="showEnglishTranslations"
                      class="text-base text-gray-700 font-medium leading-relaxed border-l-4 border-primary/30 pl-4 bg-gray-50/50 rounded-r-lg py-1"
                    >
                      {{ sentence.translation }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div v-else class="grow">
              <div class="bg-white p-8">
                <div
                  class="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-gray-900 prose-strong:font-semibold"
                >
                  <div class="mb-6" v-html="sanitizedIntroTemplate" />
                  <div class="mb-6" v-html="sanitizedDescriptionTemplate" />
                  <div v-html="sanitizedExtendedDescriptionTemplate" />
                </div>
              </div>
            </div>
            <div class="mt-8 text-center">
              <button
                class="btn btn-primary btn-lg px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <PlayIcon class="h-6 w-6 mr-2" />
                Finish the lesson and test your level
              </button>
            </div>
          </div> -->
        </div>
      </div>

      <!-- <div class="col-span-1">
        <div class="space-y-6">
          <div class="bg-white rounded-xl shadow-sm">
            <LearningNewItems
              :loading="isLoading"
              title="New Words"
              :items="lesson?.newWords"
            />
          </div>

          <div class="bg-white rounded-xl shadow-sm">
            <LearningNewItems
              :loading="isLoading"
              title="New Expressions"
              :items="lesson?.newExpressions"
            />
          </div>
        </div>
      </div> -->
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

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
</style>
