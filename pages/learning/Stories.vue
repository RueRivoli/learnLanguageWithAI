<script setup lang="ts">
import { EyeIcon, TrashIcon } from "@heroicons/vue/24/outline";
import { DocumentIcon } from "@heroicons/vue/24/solid";

definePageMeta({
  layout: "authenticated",
});
const router = useRouter();
const lessons = ref<any[]>([]);
const count = ref<number>(0);
const lessonNameToDelete = ref<{ title: string; id: number } | null>(null);
const isFetchingData = ref(false);
const isDeletingLesson = ref(false);
const itemsPerPage = ref(10);
const {
  currentPage,
  endItem,
  goToNextPage,
  goToPage,
  goToPreviousPage,
  pageNumbers,
  startItem,
  totalItems,
  totalPages,
} = usePagination(count, itemsPerPage);

const fetchLessons = async () => {
  isFetchingData.value = true;
  
  // Get the current session for authentication
  const { data: { session } } = await useSupabaseClient().auth.getSession()
  const headers: Record<string, string> = {}
  if (session?.access_token) {
    headers['Authorization'] = `Bearer ${session.access_token}`
  }
  
  const results = await $fetch(
    `/api/lessons?page=${currentPage.value}&size=10`,
    { headers }
  );
  if (results.error) throw results.error;
  else if (results) {
    lessons.value = results?.dataResult.data.map(({title_en, img_url, ...lesson}) => ({ ...lesson, titleEn: title_en, imgUrl: img_url})) || [];
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
    const { data: { session } } = await useSupabaseClient().auth.getSession()
    const headers: Record<string, string> = {}
    if (session?.access_token) {
      headers['Authorization'] = `Bearer ${session.access_token}`
    }
    
    await $fetch(`/api/lessons/${lessonNameToDelete.value.id}`, {
      method: "DELETE",
      headers
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
    <div class="max-w-full min-h-screen flex grid grid-cols-4">
      <div class="min-h-screen col-span-3">
        <div class="bg-white shadow-md h-full flex flex-col p-5">
          <LayoutHeadingPlus
            title="Lessons"
            description="Your History of Tailored Lessons"
          >
            <DocumentIcon class="h-6 w-6 text-primary" />
          </LayoutHeadingPlus>

          <div class="mt-3 max-h-full grow overflow-auto">
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

            <!-- Empty state placeholder -->
            <div
              v-if="!isFetchingData && lessons.length === 0"
              class="flex flex-col items-center justify-center py-16 px-4"
            >
              <div
                class="w-24 h-24 mb-6 rounded-full bg-indigo-100 flex items-center justify-center"
              >
                <DocumentIcon class="h-12 w-12 text-primary" />
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">
                No lessons yet
              </h3>
              <p class="text-gray-500 text-center max-w-md mb-6">
                You haven't created any lessons yet. Start your learning journey
                by creating your first personalized lesson.
              </p>
              <button
                class="btn btn-primary rounded-lg px-6 py-3 flex items-center gap-2 hover:shadow-lg transition-shadow"
                @click="router.push('/learning/lessons/new-lesson')"
              >
                <DocumentIcon class="h-5 w-5" />
                <span>Create Your First Lesson</span>
              </button>
            </div>

            <!-- Table with data -->
            <table
              v-else-if="!isFetchingData && lessons.length > 0"
              class="table max-h-full border-collapse"
            >
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
                    Lesson name
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
                <tr v-for="(lesson, index) in lessons" :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'">
                  <td class="px-4 py-3">
                    <div class="flex items-center justify-center">
                      <span
                        class="text-sm font-semibold text-indigo-700 tracking-wide"
                      >
                        #{{ lesson.id }}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div
                      class="flex items-center gap-3 hover:cursor-pointer"
                      @click="router.push(`/learning/lessons/${lesson.id}`)"
                    >
                      <LayoutHeadingLesson class="hover:cursor-pointer" :title="lesson.title" :titleEn="lesson.titleEn" :storyImgUrl="lesson.imgUrl" />
                      <!-- <div class="hover:cursor-pointer">
                        <div class="text-md tracking-tight font-semibold text-slate-800 tracking-wide">
                          {{ lesson.title }}
                        </div>
                        <div class="text-sm font-light text-slate-600">
                          {{ lesson.title_en }}
                        </div> 
                      </div> -->
                    </div>
                  </td>
                  <td>
                      <div class="flex items-center hover:cursor-pointe">
                        <LayoutKeyElementRuleBadge class="mr-2" :title="lesson.turkish_grammar_rules.rule_name" :titleEn="lesson.turkish_grammar_rules.rule_name_translation" :level="lesson.turkish_grammar_rules.difficulty_class" :symbol="lesson.turkish_grammar_rules.symbol" :lightMode="true" size="xs"/>
                        <LayoutKeyElementQuizBadge v-if="lesson.turkish_quizzes_result?.score_global" :score="lesson.turkish_quizzes_result.score_global" size="sm" :quizId="lesson.quiz_id" :filledOut="true"/>
                        <LayoutKeyElementQuizBadge v-else :score="null" size="sm" :quizId="null" :filledOut="false"/>
                      </div>
                    </td>
                  <td class="px-4 py-3">
                    <div class="flex items-center gap-2">
                      <button
                        class="w-8 h-8 btn btn-soft btn-circle btn-primary rounded-lg cursor-pointer group"
                        title="View lesson"
                        @click="router.push(`/learning/lessons/${lesson.id}`)"
                      >
                        <EyeIcon class="h-5 w-5" />
                      </button>
                      <button
                        class="w-8 h-8 btn btn-soft btn-circle btn-error rounded-lg hover:text-white cursor-pointer group"
                        title="Delete lesson"
                        @click="handleLessonToDelete(lesson.id, lesson.title)"
                      >
                        <TrashIcon class="h-5 w-5" />
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
