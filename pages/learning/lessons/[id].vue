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
const showEnglishTranslations = ref(true);
const activeLessonTab = ref(1);

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
      lesson.value.grammarRuleName = data.value.turkish_grammar_rules.rule_name;
      lesson.value.grammarRuleNameEn =
        data.value.turkish_grammar_rules.rule_name_translation;
      lesson.value.grammarRuleIntro = data.value.turkish_grammar_rules.intro;
      lesson.value.grammarRuleDescription =
        data.value.turkish_grammar_rules.description;
      lesson.value.grammarRuleExtendedDescription =
        data.value.turkish_grammar_rules.extended_description;
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
    <div class="max-w-7xl mx-auto grid grid-cols-4 gap-6 p-6">
      <div class="col-span-3">
        <div class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden">
          <div
            v-if="isLoading"
            class="w-full p-8"
          >
            <!-- Lesson Header Skeleton -->
            <div class="mb-8">
              <!-- Breadcrumbs Skeleton -->
              <div class="mb-6 flex items-center gap-2">
                <div class="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                <div class="h-4 bg-gray-200 rounded w-4 animate-pulse"></div>
                <div class="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
              </div>
              
              <!-- Title Skeleton -->
              <div class="text-center mb-8">
                <div class="bg-gray-100 rounded-xl p-6 border border-gray-200">
                  <div class="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-3 animate-pulse"></div>
                  <div class="h-6 bg-gray-200 rounded w-1/2 mx-auto animate-pulse"></div>
                </div>
              </div>
              
              <!-- Controls Skeleton -->
              <div class="flex items-center justify-between bg-gray-50/50 rounded-xl p-4 border border-gray-200/50">
                <div class="flex-1">
                  <div class="flex gap-4">
                    <div class="h-8 bg-gray-200 rounded w-24 animate-pulse"></div>
                    <div class="h-8 bg-gray-200 rounded w-24 animate-pulse"></div>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <div class="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                  <div class="h-6 bg-gray-200 rounded w-12 animate-pulse"></div>
                </div>
              </div>
            </div>

            <!-- Content Skeleton -->
            <div class="bg-white rounded-xl p-8 border border-gray-100 shadow-sm">
              <div class="space-y-6">
                <!-- Sentence Skeletons -->
                <div v-for="i in 5" :key="i" class="group rounded-lg p-4 border border-gray-100">
                  <!-- Turkish Sentence Skeleton -->
                  <div class="mb-3">
                    <div class="h-6 bg-gray-200 rounded w-full animate-pulse"></div>
                  </div>
                  <!-- English Translation Skeleton -->
                  <div class="border-l-4 border-gray-200 pl-4 py-2">
                    <div class="h-5 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                  </div>
                </div>
              </div>
              
              <!-- Action Button Skeleton -->
              <div class="mt-8 text-center">
                <div class="h-12 bg-gray-200 rounded-lg w-64 mx-auto animate-pulse"></div>
              </div>
            </div>
          </div>
          
          <div v-else class="p-8 min-h-screen flex flex-col">
            <!-- Header Section -->
            <div class="shrink-0 mb-8">
              <!-- Breadcrumbs -->
              <div class="mb-6">
                <LayoutBreadcrumbs
                  first-section="Lessons"
                  :second-section="`Lesson #${lesson?.id}`"
                />
              </div>
              
              <!-- Lesson Title Section -->
              <div class="text-center mb-8">
                <div class="bg-primary opacity-80 rounded-xl p-6 border border-gray-200">
                  <h1 class="text-3xl font-bold text-gray-900 mb-3 leading-tight">
                    {{ lesson?.title }}
                  </h1>
                  <h2 class="text-xl text-white font-medium italic">
                    {{ lesson?.titleEn }}
                  </h2>
                </div>
              </div>
              
              <!-- Controls Section -->
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
                    <span class="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors">
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

            <!-- Content Section -->
            <div v-if="activeLessonTab === 1" class="grow">
              <div class="bg-white rounded-xl p-8">
                <div class="space-y-3">
                  <div
                    v-for="(sentence, index) in sentences"
                    :key="index"
                    class="group hover:bg-gray-50/50 rounded-lg p-3 transition-all duration-200"
                  >
                    <p class="text-lg font-semibold text-gray-900 mb-1 leading-relaxed">
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
                
                <!-- Action Button -->
                <div class="mt-8 text-center">
                  <button class="btn btn-primary btn-lg px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <PlayIcon class="h-6 w-6 mr-2" />
                    Finish the lesson and test your level
                  </button>
                </div>
              </div>
            </div>
            
            <div v-else class="grow">
              <div class="bg-white p-8">
                <div class="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-gray-900 prose-strong:font-semibold">
                  <div v-html="sanitizedIntroTemplate" class="mb-6" />
                  <div v-html="sanitizedDescriptionTemplate" class="mb-6" />
                  <div v-html="sanitizedExtendedDescriptionTemplate" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-1">
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
      </div>
    </div>
  </div>
</template>
