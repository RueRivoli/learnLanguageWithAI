<script setup lang="ts">
import { languages } from "~/utils/syllabus";
const emit = defineEmits(["languageUpdated"]);
const props = withDefaults(
  defineProps<{
    userId: string | null;
  }>(),
  {
    userId: null,
  },
);

const activatedLanguages = languages.filter((lan) => lan.activated);
const selectedLanguage = ref(null);
const languageSelectionModal = ref(null);
const isSavingLanguageLearned = ref(false);

const handleSelectLanguage = async () => {
  isSavingLanguageLearned.value = true;
  const profile = await $fetch(`/api/profiles/${props.userId}`, {
    method: "PUT",
    body: {
      language_learned: selectedLanguage.value,
    },
  });
  emit("languageUpdated", profile[0]);
  isSavingLanguageLearned.value = false;
};
const openModal = () => {
  languageSelectionModal.value?.showModal();
};

defineExpose({
  openModal,
});
</script>

<template>
  <dialog ref="languageSelectionModal" class="modal">
    <div class="modal-box">
      <h3 class="text-lg font-bold">Which language do you want to learn ?</h3>
      <!-- <p class="py-4">You'll be able to chose a 2nd language afterwards</p> -->

      <div class="flex flex-wrap space-x-3 mb-8 p-6">
        <button
          v-for="lang in activatedLanguages"
          :key="lang.code"
          :class="[
            'mb-4 btn btn-primary rounded-md font-semibold focus:outline-none',
            selectedLanguage === lang.code ? 'btn-primary' : 'btn-secondary',
            lang.activated === false ? 'btn-disabled' : '',
          ]"
          :aria-pressed="selectedLanguage === lang.code"
          @click="selectedLanguage = lang.code"
        >
          <img class="h-8 w-auto" :src="lang.imgSrc" alt="" />
          {{ lang.label }}
        </button>
      </div>
      <div class="modal-action">
        <form method="dialog">
          <button
            :class="[
              'mb-4 btn btn-primary',
              !selectedLanguage ? 'btn-disabled' : '',
            ]"
            @click="handleSelectLanguage"
          >
            <span
              v-if="isSavingLanguageLearned"
              class="loading loading-spinner"
            />
            <span>Save</span>
          </button>
        </form>
      </div>
    </div>
  </dialog>
</template>
