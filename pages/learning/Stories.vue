<script setup lang="ts">
import { EyeIcon, TrashIcon, DocumentIcon } from "@heroicons/vue/24/outline";

import { getGrammarRuleInitialLetters } from "~/utils/learning/grammar";
definePageMeta({
  layout: "authenticated",
});
const router = useRouter();
const lessons = ref([]);
const count = ref(0);
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
  const { data, error } = await useAsyncData("lessons", () =>
    $fetch(`/api/lessons?page=${currentPage.value}&size=10`),
  );
  isFetchingData.value = false;
  if (error.value) throw error.value;
  else if (data.value) {
    lessons.value = data.value?.dataResult.data;
    count.value = data.value?.countResult.count;
  }
};

watchEffect(async () => {
  console.log("currentPage", currentPage.value);
  await fetchLessons();
});

const handleDeleteLesson = async () => {
  console.log("");
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
    <div class="grid grid-cols-4 gap-2 max-w-full max-h-screen">
      <div class="col-span-3 max-h-screen">
        <div class="list bg-white rounded-box shadow-md h-[95%] p-6">
          <LayoutHeadingPlus
            title="Lessons"
            description="Your list of tailored lessons"
          >
            <DocumentIcon class="h-6 w-6 text-primary" />
          </LayoutHeadingPlus>

          <div class="p-3 max-h-full overflow-y-auto">
            <div v-if="isFetchingData" class="h-full flex w-full flex-col gap-4">
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
                <tr>
                  <th class="sticky top-0 bg-white z-10" />
                  <th class="sticky top-0 bg-white z-10">Lesson name</th>
                  <th class="sticky top-0 bg-white z-10">Content</th>
                  <th class="sticky top-0 bg-white z-10">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="lesson in lessons">
                  <td>{{ lesson.id }}</td>
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
                        class="btn btn-ghost"
                        @click="handleLessonToDelete(lesson.id, lesson.title)"
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
            @go-to-page="(page) => goToPage(page)"
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
