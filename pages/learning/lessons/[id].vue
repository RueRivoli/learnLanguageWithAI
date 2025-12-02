<script setup lang="ts">
import DOMPurify from "dompurify";
import { PlayIcon } from "@heroicons/vue/24/solid";
import { handleGenerationQuiz } from "~/utils/learning/quiz";
import { lessonUpdateBus } from "~/composables/useLessonUpdates";
import {
  LanguageIcon,
  LightBulbIcon,
  MagnifyingGlassIcon,
  ClipboardDocumentIcon,
  SparklesIcon,
  BookOpenIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/vue/24/outline";

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
  refresh,
} = useLesson(lessonId);

const showAllEnglishTranslations = ref(true);
const showExplanations = ref(false);
const activeSentenceTranslation = ref<number | null>(null);
// 1: My Lesson, 2: The Rule, 3: The Quiz
const menuSelected = ref<number>(1);
const isGeneratingQuiz = ref<boolean>(false);
const areWordsExampleShown = ref<boolean>(false);
const areExpressionsExampleShown = ref<boolean>(false);
const loadingImage = computed(() => route.query.loadingImage as string);
const user = useSupabaseUser();
const userStore = useUserStore();
const notes = ref<string>("");
const hoveredSentenceIndex = ref<number | null>(null);
const hoveredTooltipIndex = ref<number | null>(null);
const addSentenceToNotes = (s: { original: string; translation: string }) => {
  const formatted = `• ${s.original}\n   — ${s.translation}`;
  notes.value = notes.value ? `${notes.value}\n${formatted}` : formatted;
};
let hoverHideTimeout: ReturnType<typeof setTimeout> | null = null;
const clearHoverHideTimeout = () => {
  if (hoverHideTimeout) {
    clearTimeout(hoverHideTimeout);
    hoverHideTimeout = null;
  }
};
const scheduleHideHover = (index: number) => {
  clearHoverHideTimeout();
  hoverHideTimeout = setTimeout(() => {
    // If the tooltip is currently hovered for this index, do not hide.
    if (hoveredTooltipIndex.value === index) return;
    hoveredSentenceIndex.value = null;
  }, 120);
};
const quizGenerationModal = ref<{
  openModal: () => void;
  closeModal: () => void;
} | null>(null);
const myModalToGetCredits = ref<{
  openModal: () => void;
  closeModal: () => void;
} | null>(null);

definePageMeta({
  layout: "quiz",
});

const isStoryShown = computed(() => menuSelected.value === 1);
const isRuleShown = computed(() => menuSelected.value === 2);
const isQuizShown = computed(() => menuSelected.value === 3);
const toggleSentenceTranslation = (index: number) => {
  activeSentenceTranslation.value =
    activeSentenceTranslation.value === index ? null : index;
};

// All data fetching is now handled by the useLesson composable

const handleGenerateQuiz = async () => {
  if (!userStore.isEnoughTokensForOneQuiz) {
    myModalToGetCredits.value?.openModal();
    return;
  }

  isGeneratingQuiz.value = true;
  // Open the loading modal
  quizGenerationModal.value?.openModal();

  if (!lesson.value?.grammarRuleId || !user.value?.id) {
    quizGenerationModal.value?.closeModal();
    isGeneratingQuiz.value = false;
    return;
  }

  await handleGenerationQuiz(
    lesson.value?.grammarRuleId,
    user.value?.id,
    `/learning/lessons/${lessonId}/quiz`,
    lessonId,
  );
  // Refresh lesson data after quiz generation to get updated quizId
  // await refresh();
  // Notify other components about the lesson modification
  // lessonUpdateBus.notifyLessonModified(lessonId, { quizId: lesson.value?.quizId });

  // Close the loading modal
};

const handleCancelModal = () => {
  myModalToGetCredits.value?.closeModal();
};

const copySentence = async (text: string) => {
  try {
    if (typeof navigator !== "undefined" && navigator.clipboard)
      await navigator.clipboard.writeText(text);
  } catch (e) {
    console.warn("Copy failed", e);
  }
};

const searchOnGoogle = (text: string) => {
  if (process.client)
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(text)}`,
      "_blank",
    );
};

const handleTranslate = (index: number) => {
  showAllEnglishTranslations.value = false;
  activeSentenceTranslation.value =
    activeSentenceTranslation.value === index ? null : index;
};

const sanitizedIntroTemplate = computed(() =>
  DOMPurify.sanitize(
    lesson.value?.grammarRuleIntro || grammarRule.value?.intro || "",
  ),
);
const sanitizedDescriptionTemplate = computed(() =>
  DOMPurify.sanitize(
    lesson.value?.grammarRuleDescription ||
      grammarRule.value?.description ||
      "",
  ),
);
const sanitizedExtendedDescriptionTemplate = computed(() =>
  DOMPurify.sanitize(
    lesson.value?.grammarRuleExtendedDescription ||
      grammarRule.value?.extendedDescription ||
      "",
  ),
);
</script>

<template>
  <div class="min-h-screen bg-base-100 scroll-smooth">
    <div class="rounded-lg shadow-lg overflow-hidden">
      <div class="grid grid-cols-12">
        <div class="col-span-3">
          <!-- Left column (1/6) -->
          <div class="row-span-1 p-6 border-b border-slate-200/70"><br /></div>
          <div
            class="pl-6 py-6 row-span-9 w-full sticky top-6 space-y-6 border-r border-slate-200/70"
          >
            <div class="bg-custom-base h-full w-full">
              <div class="flex flex-col items-start justify-between gap-3">
                <div class="row-span-1 space-y-3">
                  <div @click="menuSelected = 1">
                    <span
                      class="text-xl mb-3 cursor-pointer"
                      :class="{
                        'font-medium': isStoryShown,
                        'font-light': !isStoryShown,
                      }"
                      >My Lesson</span
                    >
                  </div>
                  <div
                    class="space-y-2 group:cursor-pointer"
                    :class="{
                      'font-medium': isRuleShown,
                      'font-light': !isRuleShown,
                    }"
                    @click="menuSelected = 2"
                  >
                    <div>
                      <span class="text-xl mb-3 cursor-pointer">The Rule</span>
                    </div>

                    <LayoutKeyElementRuleBadge
                      class="cursor-pointer ml-10"
                      :title="lesson?.grammarRuleName ?? null"
                      :titleEn="lesson?.grammarRuleNameEn ?? null"
                      :level="lesson?.level ?? null"
                      size="sm"
                      :symbol="lesson?.symbol ?? null"
                      :lightMode="true"
                    />
                  </div>
                  <div
                    class="space-y-2"
                    :class="{
                      'font-medium': isQuizShown,
                      'font-light': !isQuizShown,
                    }"
                    @click="menuSelected = 3"
                  >
                    <div>
                      <span class="text-xl mb-3 cursor-pointer">The Quiz</span>
                    </div>
                    <LayoutKeyElementQuizBadge
                      v-if="relatedQuiz"
                      class="ml-10"
                      :score="relatedQuiz?.score"
                      :filledOut="Boolean(relatedQuiz)"
                      size="sm"
                    />
                    <button
                      v-else
                      class="ml-10 btn btn-sm btn-error mx-2 btn-outline hover:text-white"
                      :disabled="isGeneratingQuiz || isLoading"
                      @click="handleGenerateQuiz"
                    >
                      <span
                        v-if="isLoading"
                        class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"
                      />
                      <span>Fill out the quiz</span>
                    </button>
                  </div>
                </div>
                <div class="py-6 w-full border-t border-slate-200/70">
                  <span class="text-xl font-light mb-3">My Notes</span>
                  <div class="w-full">
                    <fieldset class="fieldset">
                      <textarea
                        v-model="notes"
                        class="textarea h-50"
                        placeholder="..."
                      ></textarea>
                    </fieldset>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-6">
          <div class="p-4 row-span-1 border-b border-l border-slate-200/70">
            <div class="w-full flex items-center justify-between gap-2">
              <LayoutBreadcrumbs :firstSection="{ title: `Lessons`, link: '/learning/stories' }" :secondSection="{ title: `Lesson ${lessonId}`, link: null }" />
              <div class="cursor-pointer">
                <ArrowsPointingOutIcon class="h-5 w-5 text-neutral" />
                <!-- <ArrowsPointingInIcon class="h-5 w-5 text-neutral" /> -->
              </div>
            </div>
          </div>
          <div
            id="lesson_content"
            class="row-span-9 space-y-0 divide-y divide-slate-200"
          >
            <!-- Content below with padding -->
            <div class="p-6">
              <!-- Story Section (Full Width Below) -->
              <div id="story" class="w-full">
                <div
                  id="story_content"
                  class="rounded-lg bg-white"
                  :class="{ 'p-8 ': !isRuleShown }"
                >
                  <!-- Header with Rule Button and Global Toggle -->

                  <!-- Grammar Rule Content Section -->
                  <div
                    v-if="grammarRule && isRuleShown"
                    id="grammar"
                    class="mb-6"
                  >
                    <div
                      class="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-lg p-6 border border-blue-200/30 shadow-sm"
                    >
                      <!-- Grammar Rule Header -->
                      <div
                        class="flex items-center gap-4 mb-4 pb-3 border-b border-blue-200/40"
                      >
                        <div
                          class="w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md"
                        >
                          <span class="text-lg">{{
                            grammarRule.symbol ||
                            grammarRule.ruleName?.charAt(0)
                          }}</span>
                        </div>
                        <div>
                          <h4 class="text-lg font-semibold text-slate-800">
                            {{ grammarRule.ruleNameTranslation }}
                          </h4>
                          <p class="text-sm text-slate-600">
                            {{ grammarRule.ruleName }}
                          </p>
                        </div>
                      </div>

                      <!-- Grammar Rule Content -->
                      <div class="space-y-4 text-slate-700">
                        <div
                          v-if="sanitizedIntroTemplate"
                          class="prose prose-sm max-w-none prose-slate"
                          v-html="sanitizedIntroTemplate"
                        />
                        <div
                          v-if="sanitizedDescriptionTemplate"
                          class="prose prose-sm max-w-none prose-slate"
                          v-html="sanitizedDescriptionTemplate"
                        />
                        <div
                          v-if="sanitizedExtendedDescriptionTemplate"
                          class="prose prose-sm max-w-none prose-slate"
                          v-html="sanitizedExtendedDescriptionTemplate"
                        />
                      </div>
                    </div>
                  </div>
                  <!-- Individual Sentences -->
                  <div
                    v-else-if="isStoryShown"
                    class="bg-white"
                    :class="
                      showAllEnglishTranslations ? 'space-y-4' : 'space-y-1'
                    "
                  >
                    <div class="pb-4">
                      <span
                        class="text-2xl mr-4 font-semibold text-slate-800"
                      >
                        {{ lesson?.title }}
                      </span>
                      <span
                        class="text-lg font-light text-slate-600 tracking-wide"
                      >
                        {{ lesson?.titleEn }}
                      </span>
                    </div>
                    <div class="grid grid-cols-3 gap-4">
                      <div class="col-span-1 flex items-center justify-center">
                        <img
                          v-if="imageUrl"
                          :src="imageUrl"
                          alt="Lesson illustration"
                          class="w-auto h-auto rounded-lg h-auto object-cover"
                        />
                      </div>
                      <div class="relative z-10 p-2 col-span-2">
                        <div class="prose prose-lg max-w-none">
                          <h2
                            class="text-xl font-medium leading-relaxed tracking-wide"
                          >
                            Introduction
                          </h2>
                          <p class="text-md leading-relaxed font-light text-slate-600 font-light">
                            {{ lesson?.introduction }}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div class="py-4">
                      <h2
                        class="text-xl font-medium leading-relaxed tracking-wide"
                      >
                        Story
                      </h2>
                      <div class="p-2">
                      <div
                        v-for="(sentence, index) in sentences"
                        :key="'hover-' + index"
                        class="relative inline-block group mr-1 mt-2"
                        @mouseenter="
                          clearHoverHideTimeout();
                          hoveredSentenceIndex = index;
                        "
                        @mouseleave="scheduleHideHover(index)"
                      >
                        <span
                          class="items-center gap-2 border border-transparent px-0.5 py-0.5 leading-relaxed rounded-md transition-all duration-300 text-md text-base"
                          :class="{
                            'hover:border-blue-200/50 cursor-pointer': !showExplanations,
                            'flex items-center': showExplanations,
                            'bg-primary/15':
                              !showExplanations && (hoveredSentenceIndex === index ||
                              hoveredTooltipIndex === index),
                          }"
                        >
                          {{ sentence.original }}
                          <span v-if="showExplanations" class="cursor-pointer" @click="addSentenceToNotes(sentence)">
                            <ClipboardDocumentIcon
                              class="w-4 h-4"
                            />
                          </span>
                        </span>
                        <div class="p-2 font-light text-slate-600" v-if="showExplanations">
                          <div
                                class="flex items-center gap-3 rounded px-2 py-1 cursor-pointer"
                                @click="handleTranslate(index)"
                              >
                                <span
                                  class="w-5 h-5 flex items-center justify-center"
                                >
                                  <LanguageIcon
                                    class="w-4 h-4"
                                  />
                                </span>
                                <span class="">{{sentence.translation}}</span>
                          </div>

                          <div
                                class="font-light text-slate-600 flex items-center gap-3 rounded px-2 py-1 cursor-pointer"
                                @click="copySentence(sentence.original)"
                              >
                                <span
                                  class="w-5 h-5 flex items-center justify-center shrink-0"
                                >
                                  <LightBulbIcon
                                    class="w-4 h-4"
                                  />
                                </span>
                                <span>{{
                                  sentence.tip
                                }}</span>
                              </div>

                        </div>
                  
                        <!-- Hover Card -->
                        <div
                          v-if="!showExplanations"
                          class="absolute left-0 mt-2 z-30 w-72 transition-all"
                          :class="{
                            'opacity-100 translate-y-0 pointer-events-auto':
                              hoveredSentenceIndex === index ||
                              hoveredTooltipIndex === index,
                            'opacity-0 translate-y-1 pointer-events-none': !(
                              hoveredSentenceIndex === index ||
                              hoveredTooltipIndex === index
                            ),
                          }"
                          @mouseenter="
                            clearHoverHideTimeout();
                            hoveredTooltipIndex = index;
                          "
                          @mouseleave="
                            hoveredTooltipIndex = null;
                            scheduleHideHover(index);
                          "
                        >
                          <div
                            class="rounded-xl border border-slate-200/70 bg-white shadow-xl p-3"
                          >
                            <ul class="space-y-1">
                              <li
                                class="flex items-start gap-3 rounded px-2 py-1 cursor-pointer"
                                @click="handleTranslate(index)"
                              >
                                <span
                                  class="w-5 h-5 flex items-center justify-center shrink-0"
                                >
                                  <LanguageIcon
                                    class="w-4 h-4 text-slate-600"
                                  />
                                </span>
                                <span class="text-sm text-slate-700">{{
                                  sentence.translation
                                }}</span>
                              </li>
                              <li
                                class="flex items-start gap-3 rounded px-2 py-1 cursor-pointer"
                                @click="copySentence(sentence.original)"
                              >
                                <span
                                  class="w-5 h-5 flex items-center justify-center shrink-0"
                                >
                                  <LightBulbIcon
                                    class="w-4 h-4 text-slate-600"
                                  />
                                </span>
                                <span class="text-sm text-slate-700">{{sentence.tip}}</span>
                              </li>
                              <!-- <li
                                class="flex items-start gap-3 rounded px-2 py-1 cursor-pointer"
                                @click="searchOnGoogle(sentence.original)"
                              >
                                <span class="w-5 h-5 flex items-center justify-center shrink-0">
                                  <MagnifyingGlassIcon class="w-4 h-4 text-slate-600" />
                                </span>
                                <span class="text-sm text-slate-700">Search Google</span>
                              </li> -->
                            </ul>
                            <div
                              class="text-xs font-semibold text-slate-500 mt-3 mb-1"
                            >
                              Actions
                            </div>
                            <ul class="space-y-1">
                              <li
                                class="flex items-start gap-3 rounded px-2 py-1 cursor-pointer"
                                @click="addSentenceToNotes(sentence)"
                              >
                                <span
                                  class="w-5 h-5 flex items-center justify-center shrink-0"
                                >
                                  <SparklesIcon
                                    class="w-4 h-4 text-slate-600"
                                  />
                                </span>
                                <span class="text-sm text-slate-700"
                                  >Add this sentence to your notes</span
                                >
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>
                  </div>
                  <div v-else-if="isQuizShown" id="quiz" class="mb-6"></div>
                </div>
              </div>

              <AccountPaymentModal
                ref="myModalToGetCredits"
                @cancel="handleCancelModal"
              />
              <QuizGenerationLoadingModal
                id="my_modal_generate_quiz"
                ref="quizGenerationModal"
                type="quiz"
              />
            </div>
            <!-- </div> -->
          </div>
        </div>
        <div class="border-l border-slate-200/70 col-span-3">
          <div class="row-span-1 p-6 border-b border-slate-200/70">
            <br />
          </div>
          <!-- Right column (2/6) -->
          <div class="row-span-9 sticky top-6">
            <div class="p-4">
              <h3 class="text-lg font-medium mb-3">View Options</h3>
              <div class="flex flex-col gap-3">
                <label
                  class="flex items-center justify-between gap-3 cursor-pointer"
                >
                  <span class="text-md font-light">Show Explanations</span>
                  <input
                    v-model="showExplanations"
                    type="checkbox"
                    class="checkbox checkbox-neutral"
                  />
                </label>
              </div>
            </div>
            <div class="p-4">
              <div class="dotted-divider"></div>
            </div>
         
            <div class="p-4">
              <div class="mb-4 flex items-center gap-2">
                <div
                  class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-2 shadow-lg"
                >
                  <BookOpenIcon class="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 class="text-lg font-medium">Key Words</h3>
                </div>
              </div>
              <div class="flex flex-col items-start">
                <div
                  v-for="(word, index) in lesson?.newWords || []"
                  :key="index"
                  class="group relative mb-2"
                >
                  <LayoutKeyElementWordBadge
                    :text="word.text"
                    :translation="word.translation"
                    :role="word.role"
                    :lightMode="true"
                    @click="areWordsExampleShown = !areWordsExampleShown"
                  />
                </div>
              </div>
              <div class="mt-6 dotted-divider"></div>
            </div>
            <div class="p-4">
              <div class="mb-4 flex items-center gap-2">
                <div
                  class="w-8 h-8 bg-warning rounded-lg flex items-center justify-center mr-2 shadow-lg"
                >
                  <LanguageIcon class="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 class="text-lg font-medium">Key Expressions</h3>
                </div>
              </div>
              <div class="flex flex-col items-start">
                <div
                  v-for="(expression, index) in lesson?.newExpressions || []"
                  :key="index"
                  class="group relative mb-2"
                >
                  <LayoutKeyElementExpressionBadge
                    :text="expression.text"
                    :translation="expression.translation"
                    :lightMode="true"
                    @click="areWordsExampleShown = !areWordsExampleShown"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-custom-base {
  background-color: #f4f6f7;
}

/* Larger, spaced dotted divider (slate-300 color) */
.dotted-divider {
  position: relative;
}
.dotted-divider::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 0;
  height: 6px; /* track height for better visibility */
  width: 80%; /* slightly wider but still centered */
  transform: translateX(-50%); /* center the dotted segment */
  /* Bigger dots with more spacing, using slate-300 (#cbd5e1) */
  background-image: radial-gradient(#cbd5e1 2px, transparent 2px);
  background-size: 14px 6px; /* increase spacing between dots */
  background-repeat: repeat-x;
  background-position: center bottom;
  /* Subtle fade on sides so it's less pronounced at the edges */
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
}
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

</style>
