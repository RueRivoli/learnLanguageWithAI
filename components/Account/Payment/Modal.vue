<script setup lang="ts">
import { CheckIcon, StarIcon } from "@heroicons/vue/24/outline";
const props = withDefaults(
  defineProps<{
    id: string;
  }>(),
  {
    id: "",
  },
);
const emit = defineEmits(["cancel"]);


const handleConfirm = () => {
  console.log("cancel");
  emit('cancel');
};
</script>

<template>
  <dialog :id="props.id" class="modal">
    <div class="modal-box max-w-4xl h-auto overflow-y-auto">
      <div class="flex flex-col items-center">
        <div class="flex items-center">
          <StarIcon class="h-5 w-5 mr-2 text-gray-900 group-hover:text-neutral" />
          <h3 class="text-xl text-gray-900">Get Tokens to Generate Stories and Grammar Quizzes</h3>
        </div>

        <div>
          <AccountPaymentWall />
        </div>
      </div>
      
      <div class="modal-action">
        <button
          class="bg-secondary cursor-pointer font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
          @click="emit('cancel')"
        >
          <span>Cancel</span>
        </button>
        <button
          class="bg-primary text-white cursor-pointer hover:bg-primary/90 font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
          @click="handleConfirm"
        >
          <CheckIcon class="h-5 w-5 mr-2 text-white group-hover:text-neutral" />
          <span>Confirm</span>
        </button>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button @click="emit('cancel')">close</button>
    </form>
  </dialog>
</template>
