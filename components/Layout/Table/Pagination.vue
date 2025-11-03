<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/outline";

const emit = defineEmits(["goToNextPage", "goToPage", "goToPreviousPage"]);

const props = withDefaults(
  defineProps<{
    currentPage?: number | null;
    endItem?: number | null;
    pageNumbers?: Array<number | string> | null;
    startItem?: number | null;
    totalItems?: number | null;
    totalPages?: number | null;
  }>(),
  {
    currentPage: null,
    endItem: null,
    pageNumbers: null,
    startItem: null,
    totalItems: null,
    totalPages: null,
  },
);
</script>
<template>
  <!-- Professional Pagination -->
  <div class="bg-white px-6 py-4 border-t border-gray-200">
    <div class="flex items-center justify-between">
      <!-- Results info -->
      <div class="text-sm text-gray-700">
        Showing
        <span class="font-medium">{{ props.startItem }}</span>
        to
        <span class="font-medium">{{ props.endItem }}</span>
        of
        <span class="font-medium">{{ props.totalItems }}</span>
        results
      </div>

      <!-- Pagination controls -->
      <div class="flex items-center space-x-2">
        <!-- Previous button -->
        <button
          :disabled="props.currentPage === 1"
          :class="[
            'flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-150',
            props.currentPage === 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 cursor-pointer hover:text-primary hover:bg-gray-100',
          ]"
          @click="emit('goToPreviousPage')"
        >
          <ChevronLeftIcon class="h-4 w-4 mr-1" />
          Previous
        </button>

        <!-- Page numbers -->
        <div class="flex items-center space-x-1">
          <button
            v-for="page in props.pageNumbers"
            :key="page"
            :class="[
              'px-3 py-2 text-sm cursor-pointer font-medium rounded-lg transition-all duration-150',
              typeof page === 'number'
                ? page === props.currentPage
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:text-primary hover:bg-gray-100'
                : 'text-gray-400 cursor-default',
            ]"
            :disabled="typeof page !== 'number'"
            @click="typeof page === 'number' ? emit('goToPage', page) : null"
          >
            {{ page }}
          </button>
        </div>

        <!-- Next button -->
        <button
          :disabled="props.currentPage === props.totalPages"
          :class="[
            'flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-150',
            props.currentPage === props.totalPages
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 cursor-pointer hover:text-primary hover:bg-gray-100',
          ]"
          @click="emit('goToNextPage')"
        >
          Next
          <ChevronRightIcon class="h-4 w-4 ml-1" />
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* Custom scrollbar for the table body */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
