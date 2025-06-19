<script setup lang="ts">
import { EyeIcon, TrashIcon } from "@heroicons/vue/24/solid";
import { DocumentIcon } from "@heroicons/vue/24/outline";

import { getGrammarRuleInitialLetters } from "~/utils/learning/grammar";
definePageMeta({
  layout: "authenticated",
});
const router = useRouter();

const lessonNameToDelete = ref<{ title: string; id: number }>({
  title: null,
  id: null,
});
const lessons = ref([]);
const {
  currentPage,
  endItem,
  goToNextPage,
  goToPage,
  goToPreviousPage,
  itemsPerPage,
  pageNumbers,
  startItem,
  totalItems,
  totalPages,
} = usePagination();
const getLessons = async () => {
  const { data } = await useAsyncData("lessons", () =>
    $fetch("/api/lessons?limit=10"),
  );
  if (data) lessons.value = data.value;
  console.log("data", data.value);
};
getLessons();
// const getLessons = async () => {
//   console.log("fetch");
//   const { data, error } = await client.from("turkish_lessons").select(`title,
//     title_en,
//     turkish_grammar_rules ( rule_name, rule_name_translation),
//     turkish_lesson_words ( turkish_words ( word ) )
//     `);
//   lessons.value = data;
// };

const handleLessonDeletion = (id: number, title: string) => {
  lessonNameToDelete.value = { id, title };
};
</script>

<template>
  <div>
    <div class="grid grid-cols-4 gap-2 max-w-full max-h-screen">
      <div class="col-span-3 max-h-screen">
        <div class="list bg-white rounded-box shadow-md h-[95%] p-6">
          <LayoutHeadingPlus
            title="Lessons"
            description="Your list of tailored lessons"
          >
            <DocumentIcon
              class="h-6 w-6 text-primary"
            />
          </LayoutHeadingPlus>

          <div class="p-3 max-h-full overflow-y-auto">
            <table class="table max-h-full border-collapse">
              <thead>
                <tr>
                  <th class="sticky top-0 bg-white z-10" />
                  <th class="sticky top-0 bg-white z-10">Lesson name</th>
                  <th class="sticky top-0 bg-white z-10">Content</th>
                  <th class="sticky top-0 bg-white z-10">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="lesson in lessons">
                  <td>
                    {{ lesson.id }}
                  </td>
                  <td>
                    <div
                      class="flex items-center gap-3 hover:cursor-pointer"
                      @click="router.push(`/learning/lessons/${lesson.id}`)"
                    >
                      <div class="avatar">
                        <div class="avatar avatar-placeholder">
                          <div
                            class="text-neutral-content w-10 h-10 rounded-xl bg-primary font-semibold"
                          >
                            <span class="text-xl">{{
                              getGrammarRuleInitialLetters(lesson.title)
                            }}</span>
                          </div>
                        </div>
                      </div>
                      <div class="hover:cursor-pointer">
                        <div class="font-bold">
                          {{ lesson.title }}
                        </div>
                        <div class="text-sm opacity-50">
                          {{ lesson.title_en }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="">
                      <div class="flex items-center hover:cursor-pointe">
                        <div class="font-bold mr-2">
                          {{ lesson.turkish_grammar_rules.rule_name }}
                        </div>
                        <div class="ml-2 text-sm opacity-50">
                          {{
                            lesson.turkish_grammar_rules.rule_name_translation
                          }}
                        </div>
                      </div>
                      <div class="mt-2 flex flex-wrap gap-y-2">
                        {{ word }}
                        <!-- <div
                                    v-for="word in lesson.turkish_lesson_words"
                                    class="badge cursor-pointer badge-soft badge-neutral mr-2"
                                  >
                                    {{ word.turkish_words.text }}
                                  </div> -->
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="flex">
                      <button
                        class="btn btn-ghost"
                        @click="router.push(`/learning/lessons/${lesson.id}`)"
                      >
                        <EyeIcon
                          class="h-5 w-5 font-bold stroke-width-2 text-black dark:text-white group-hover:text-white"
                        />
                      </button>
                      <button
                        class="btn btn-ghost ml-2"
                        @click="handleLessonDeletion(lesson.id, lesson.title)"
                      >
                        <TrashIcon
                          class="h-5 w-5 font-bold stroke-width-2 text-black dark:text-white group-hover:text-white"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <LayoutTablePagination
            :current-page="currentPage"
            :end-item="endItem"
            :start-item="startItem"
            :items-per-page="itemsPerPage"
            :page-numbers="pageNumbers"
            :total-items="totalItems"
            :total-pages="totalPages"
            @go-to-next-page="goToNextPage"
            @go-to-page="(page) => goToPage(goToPage)"
            @go-to-previous-page="goToPreviousPage"
          />
        </div>
      </div>

      <div class="col-span-1 border-l border-zinc-950/5">
        <div>sidetext</div>
      </div>
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
