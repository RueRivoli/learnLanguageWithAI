<script setup lang="ts">
import { regex } from "valibot";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";

import { ChevronDownIcon, PlayIcon } from "@heroicons/vue/24/solid";

definePageMeta({
  layout: "authenticated",
});

const endOfSentenceRegex = new RegExp("/?!\./");
const route = useRoute();
const lessonId = route.params.id;
const isLoading = ref<boolean>(true);
const lesson = ref([]);
const newWords = ref([]);

const sentences = ref([]);
const sentencesEn = ref([]);
const getLesson = async () => {
  const { data, error } = await useFetch(`/api/lessons/${route.params.id}`);
  if (data) {
    lesson.value = data.value;
    sentences.value = data.value.content.split(endOfSentenceRegex);
    sentencesEn.value = data.value.content_en.split(endOfSentenceRegex);
    newWords.value = data.value.turkish_lesson_words
      .map((w) => w.turkish_words)
      .map(
        ({ word, translation, word_sentence, word_sentence_translation }) => ({
          text: word,
          textEn: translation,
          wordSentence: word_sentence,
          wordSentenceEn: word_sentence_translation,
        }),
      );
    isLoading.value = false;
  }
};

getLesson();
const handleLessonDeletion = (id: number, title: string) => {
  lessonNameToDelete.value = { id, title };
};
</script>

<template>
  <div>
    <div class="grid grid-cols-4 gap-2 w-full mt-2">
      <div class="col-span-3">
        <div>
          <div>
            <div class="border-b border-zinc-200">
              <div>
                <div>
                  <div class="list bg-base-100 rounded-box shadow-md">
                    <div v-if="isLoading" class="w-full h-72 flex justify-center items-center">
                      <span class="loading loading-bars loading-xl" />
                    </div>
                    <div v-else class="p-5">
                      <h2
                        class="font-bold text-xl tracking-widest text-primary"
                      >
                        Lesson {{ lesson.id }}
                      </h2>
                      <h2 class="font-bold text-xl tracking-widest text-center">
                        {{ lesson.title }} - {{ lesson.title_en }}
                      </h2>

                      <!-- <DisclosureButton
                            class="cursor-pointer flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75"
                          >
                        </DisclosureButton> -->
                      <div class="w-full rounded-2xl mt-8">
                        <Disclosure
                          v-slot="{ open }"
                          as="div"
                          class="w-64rounded-lg"
                        >
                          <DisclosureButton
                            class="cursor-pointer primary flex w-full justify-between rounded-lg bg-primary/40 text-white px-4 py-2 text-left text-sm font-medium hover:bg-primary/90 focus:outline-none focus-visible:ring focus-visible:primary/75"
                          >
                            <div>
                              <span class="font-bold text-error mr-2"
                                >{{
                                  lesson.turkish_grammar_rules
                                    .rule_name_translation
                                }}
                              </span>
                              <span class="text-neutral">
                                {{
                                  lesson.turkish_grammar_rules.rule_name
                                }}</span
                              >
                            </div>

                            <ChevronDownIcon
                              :class="open ? 'rotate-180 transform' : ''"
                              class="h-5 w-5 text-white"
                            />
                          </DisclosureButton>

                          <DisclosurePanel
                            class="px-2 pb-2 pt-2 text-sm text-neutral"
                          >
                            {{ lesson.turkish_grammar_rules.description }}
                          </DisclosurePanel>
                        </Disclosure>
                      </div>

                      <div class="mt-5">
                        <div v-for="(sent, i) in sentences">
                          <p class="font-bold">{{ sent }}</p>
                          <p class="mt-2 mb-2">{{ sentencesEn[i] }}</p>
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

      <div class="col-span-1 border-l border-zinc-950/5">
        <LearningNewWords :loading="isLoading" :words="newWords" />
      </div>
    </div>
  </div>
</template>
