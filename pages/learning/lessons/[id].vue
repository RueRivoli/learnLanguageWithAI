<script setup lang="ts">
import type { Lesson } from "~/types/lesson.ts";
import { PlayIcon } from "@heroicons/vue/24/solid";
import { lessonMapping } from "~/utils/learning/lesson.ts";
definePageMeta({
  layout: "authenticated",
});

const route = useRoute();
const lessonId = route.params.id;
const isLoading = ref<boolean>(true);
const lesson = ref<Lesson | null>(null);
const showEnglishTranslations = ref(true);

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
      lesson.value.grammarRuleNameDescription =
        data.value.turkish_grammar_rules.description;
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
</script>

<template>
  <div>
    <div class="max-h-full grid grid-cols-4 gap-2 w-full">
      <div class="col-span-3">
        <div>
          <div>
            <div class="border-b border-zinc-200">
              <div>
                <div>
                  <div class="bg-white list rounded-box shadow-md">
                    <div
                      v-if="isLoading"
                      class="w-full h-72 flex justify-center items-center"
                    >
                      <span class="loading loading-bars loading-xl" />
                    </div>
                    <div v-else class="p-5 h-[calc(100vh-30px)] flex flex-col">
                      <div class="shrink-0">
                        <div class="flex items-center justify-between">
                          <LayoutBreadcrumbs
                            first-section="Lessons"
                            :second-section="`Lesson${lesson?.id}`"
                          />
                          <label
                            class="label"
                            :class="{
                              'text-primary': showEnglishTranslations,
                            }"
                            >Show English
                            <input
                              v-model="showEnglishTranslations"
                              type="checkbox"
                              class="toggle toggle-primary"
                            />
                          </label>
                        </div>
                        <h2
                          class="font-bold text-xl tracking-widest text-center"
                        >
                          {{ lesson?.title }}
                        </h2>
                        <h2 class="text-xl tracking-widest italic text-center">
                          {{ lesson?.titleEn }}
                        </h2>
                        <LearningModule
                          :name="lesson?.grammarRuleName"
                          :translation="lesson?.grammarRuleNameEn"
                          :description="lesson?.grammarRuleNameDescription"
                        />
                      </div>
                      <div class="h-2"></div>
                      <div class="h-80 overflow-auto grow">
                        <div class="px-5 mb-5">
                          <div
                            v-for="(sentence, index) in sentences"
                            :key="index"
                          >
                            <p class="font-bold mt-2 mb-2">
                              {{ sentence.original }}
                            </p>
                            <p v-if="showEnglishTranslations" class="italic">
                              {{ sentence.translation }}
                            </p>
                          </div>
                        </div>
                        <button class="btn btn-secondary">
                          <PlayIcon class="h-5 w-5 font-bold" />
                          Finish the lesson and test your level
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-1 border-l border-zinc-950/5">
        <LearningNewItems
          :loading="isLoading"
          title="New Words"
          :items="lesson?.newWords"
        />
        <LearningNewItems
          class="mt-2"
          :loading="isLoading"
          title="New Expressions"
          :items="lesson?.newExpressions"
        />
      </div>
    </div>
  </div>
</template>
