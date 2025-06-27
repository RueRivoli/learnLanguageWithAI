<script setup lang="ts">
import { EyeIcon, TrashIcon, DocumentIcon } from "@heroicons/vue/24/outline";

import { getGrammarRuleInitialLetters } from "~/utils/learning/grammar";
definePageMeta({
  layout: "authenticated",
});
const router = useRouter();
const lessons = ref<any[]>([]);
const count = ref<number>(0);
const lessonNameToDelete = ref<{ title: string; id: number } | null>(null);
const isFetchingData = ref(false);
const isDeletingLesson = ref(false);
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
} = usePagination(count);

const fetchLessons = async () => {
  isFetchingData.value = true;
  console.log("fetchLesson");
  // const { data, error } = await useAsyncData("lessons", () =>
  //   $fetch(`/api/lessons?page=${currentPage.value}&size=10`),
  // );
  // isFetchingData.value = false;
  // if (error.value) throw error.value;
  // else if (data.value) {
  //   lessons.value = data.value?.dataResult.data || [];
  //   count.value = data.value?.countResult.count || 0;
  // }
  const results = await $fetch(
    `/api/lessons?page=${currentPage.value}&size=10`,
  );
  if (results.error) throw results.error;
  else if (results) {
    lessons.value = results?.dataResult.data || [];
    count.value = results?.countResult.count || 0;
  }
  isFetchingData.value = false;
};

watchEffect(async () => {
  console.log("currentPage", currentPage.value);
  if (currentPage.value) await fetchLessons();
});

const handleDeleteLesson = async () => {
  isDeletingLesson.value = true;
  if (lessonNameToDelete.value?.id) {
    console.log("lessonId");
    await $fetch(`/api/lessons/${lessonNameToDelete.value.id}`, {
      method: "DELETE",
    });
  }
  isDeletingLesson.value = false;
  lessonNameToDelete.value = null;
  await fetchLessons();
};

const handleLessonToDelete = (id: number, title: string) => {
  lessonNameToDelete.value = { id, title };
};
const handleCancel = () => {
  lessonNameToDelete.value = null;
};
</script>

<template>
  <div>
    <div class="max-w-full max-h-screen grid grid-cols-4 gap-2">
      <div class="col-span-3 max-h-screen">
        <div class="list bg-white rounded-lg shadow-md h-[95%] p-5">
          <LayoutHeadingPlus
            title="Lessons"
            description="Your list of tailored lessons"
          >
            <DocumentIcon class="h-6 w-6 text-primary" />
          </LayoutHeadingPlus>

          <div class="mt-3 max-h-full overflow-auto">
            <div
              v-if="isFetchingData"
              class="h-full flex w-full flex-col gap-4"
            >
              <div class="skeleton h-32 w-full" />
              <div class="skeleton h-32 w-full" />
              <div class="skeleton h-4 w-28" />
              <div class="skeleton h-4 w-full" />
              <div class="skeleton h-4 w-full" />
              <div class="skeleton h-4 w-full" />
              <div class="skeleton h-4 w-full" />
              <div class="skeleton h-4 w-full" />
              <div class="skeleton h-4 w-full" />
              <div class="skeleton h-4 w-full" />
              <div class="skeleton h-4 w-full" />
            </div>

            <table v-else class="table max-h-full border-collapse">
              <thead>
                <tr
                  class="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200"
                >
                  <th
                    class="sticky top-0 bg-gradient-to-r from-gray-50 to-gray-100 z-10 px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    #
                  </th>
                  <th
                    class="sticky top-0 bg-gradient-to-r from-gray-50 to-gray-100 z-10 px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    Lesson name {{ currentPage }}
                  </th>
                  <th
                    class="sticky top-0 bg-gradient-to-r from-gray-50 to-gray-100 z-10 px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    Content
                  </th>
                  <th
                    class="sticky top-0 bg-gradient-to-r from-gray-50 to-gray-100 z-10 px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="lesson in lessons">
                  <td class="px-4 py-3">
                    <div class="flex items-center justify-center">
                      <span
                        class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700 shadow-sm"
                      >
                        {{ lesson.id }}
                      </span>
                    </div>
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
                    <div>
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
                        <div
                          v-for="(word, index) in lesson.turkish_lesson_words"
                          :key="index"
                          class="badge cursor-pointer badge-soft badge-neutral mr-2"
                        >
                          {{ word.turkish_words.text }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-3">
                    <div class="flex items-center gap-2">
                      <button
                        class="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-green-100 hover:text-green-700 transition-all duration-200 group"
                        title="View lesson"
                        @click="router.push(`/learning/lessons/${lesson.id}`)"
                      >
                        <EyeIcon
                          class="h-4 w-4 group-hover:scale-110 transition-transform duration-200"
                        />
                      </button>
                      <button
                        class="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-all duration-200 group"
                        title="Delete lesson"
                        @click="handleLessonToDelete(lesson.id, lesson.title)"
                      >
                        <TrashIcon
                          class="h-4 w-4 group-hover:scale-110 transition-transform duration-200"
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
            @go-to-page="(page: number) => goToPage(page)"
            @go-to-previous-page="goToPreviousPage"
          />
        </div>
      </div>

      <div class="col-span-1 border-l border-zinc-950/5">
        <div>sidetext {{ lessonNameToDelete?.id }}</div>
      </div>
    </div>
    <LearningModalDelete
      :is-deleting-lesson="isDeletingLesson"
      :object-id="lessonNameToDelete?.id"
      :object-title="lessonNameToDelete?.title"
      object-name="lesson"
      @cancel="handleCancel"
      @delete="handleDeleteLesson"
    />
  </div>
</template>
