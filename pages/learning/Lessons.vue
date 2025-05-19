<script setup lang="ts">
import { BookOpenIcon, TrashIcon } from "@heroicons/vue/24/outline";

definePageMeta({
  layout: "authenticated",
});

const client = useSupabaseClient();
const lessonNameToDelete = ref({ title: null, id: null });
const lessons = ref([]);
const getLessons = async () => {
  console.log("fetch");
  const { data, error } = await client.from("turkish_lessons").select(`title,
    title_en,
    turkish_grammar_rules ( rule_name, rule_name_translation),
    turkish_lesson_words ( turkish_words ( word ) )
    `);
  lessons.value = data;
};

getLessons();
const handleLessonDeletion = (id, title) => {
  lessonNameToDelete.value = { id, title };
};
</script>

<template>
  <div class="w-full flex mt-2">
    <div class="flex flex-col flex-2">
      <div class="p-3">
        <div>
          <div
            id="lesson_1"
            class="flex justify-between border-b border-zinc-200"
          >
            <div>
              <div
                class="grow-1 flex items-center font-bold text-black dark:text-white"
              >
                <ul class="list bg-base-100 rounded-box shadow-md">
                  <div class="p-5">
                    <h2
                      class="font-bold text-2xl tracking-widest text-indigo-600"
                    >
                      All Lessons
                    </h2>
                    <li v-for="lesson in lessons" class="list-row">
                      <div>
                        <img
                          class="size-10 rounded-box"
                          src="https://img.daisyui.com/images/profile/demo/1@94.webp"
                        />
                      </div>
                      <div>
                        <div>{{ lesson.title }}</div>
                        <div class="text-xs uppercase font-semibold opacity-60">
                          {{ lesson.title_en }}
                        </div>
                      </div>
                      <div class="list-col-wrap text-xs">
                        <div class="badge badge-soft badge-primary mb-2">
                          {{ lesson.turkish_grammar_rules.rule_name }} -
                          {{
                            lesson.turkish_grammar_rules.rule_name_translation
                          }}
                        </div>
                        <div class="flex flex-wrap gap-y-2">
                          <div
                            v-for="word in lesson.turkish_lesson_words"
                            class="badge badge-soft badge-secondary mr-2"
                          >
                            {{ word.turkish_words.word }}
                          </div>
                        </div>
                      </div>
                      <div class="flex items-center">
                        <button
                          class="btn btn-ghost"
                          @click="handleLessonDeletion(lesson.id, lesson.title)"
                        >
                          <TrashIcon
                            class="h-5 w-5 text-black dark:text-white group-hover:text-white"
                          />
                        </button>
                      </div>
                      <button class="btn btn-square btn-ghost">
                        <svg
                          class="size-[1.2em]"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <g
                            stroke-linejoin="round"
                            stroke-linecap="round"
                            stroke-width="2"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path
                              d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
                            />
                          </g>
                        </svg>
                      </button>

                      <div class="flex items-center">
                        <button class="btn btn-ghost">
                          <BookOpenIcon
                            class="h-5 w-5 font-bold stroke-width-2 text-black dark:text-white group-hover:text-white"
                          />
                          Read
                        </button>
                      </div>
                    </li>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col flex-1 border-l border-zinc-950/5">
      <div>sidetext</div>
    </div>

    <dialog id="deletion_modal" :open="lessonNameToDelete.id" class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">Confirmation</h3>
        <p class="py-4">
          Are you sure to delete the lesson
          <span class="font-bold"> "{{ lessonNameToDelete.title }}" ?</span>
        </p>
      </div>
    </dialog>
  </div>
</template>
