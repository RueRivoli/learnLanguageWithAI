<script setup lang="ts">
import { getAuthToken } from "~/utils/auth/auth";
import { languages } from "~/utils/syllabus";
const emit = defineEmits(["languageUpdated"]);
const props = withDefaults(
  defineProps<{
    userId?: string | null;
  }>(),
  {
    userId: null,
  },
);

const activatedLanguages = languages.filter((lan) => lan.activated);
const selectedLanguage = ref<string | null>(null);
const languageSelectionModal = ref<HTMLDialogElement | null>(null);
const isSavingLanguageLearned = ref(false);

const handleSelectLanguage = async () => {
  isSavingLanguageLearned.value = true;
  try {
    const headers = await getAuthToken();
    const profile = await $fetch(`/api/profiles/${props.userId}`, {
      method: "PUT",
      headers,
      body: {
        language_learned: selectedLanguage.value,
      },
    });
    emit("languageUpdated", profile[0]);
    // Close the modal after successful save
    languageSelectionModal.value?.close();
  } catch (error) {
    console.error('Error saving language:', error);
  } finally {
    isSavingLanguageLearned.value = false;
  }
};
const openModal = () => {
  languageSelectionModal.value?.showModal();
};

defineExpose({
  openModal,
});
</script>

<template>
  <dialog class="modal" ref="languageSelectionModal">
    <div class="modal-box max-w-2xl bg-base-100 p-0">
      <!-- Header -->
      <div class="px-8 pt-8 pb-6 border-b border-base-300">
        <h3 class="text-2xl font-semibold text-base-content tracking-tight" style="font-family: 'Inter', sans-serif;">
          Which language do you want to learn?
        </h3>
        <p class="mt-2 text-sm text-base-content/60">
          Select the language you'd like to start learning today
        </p>
      </div>
      
      <!-- Language selection grid -->
      <div class="px-8 py-6">
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
          <button
            v-for="lang in activatedLanguages"
            :key="lang.code"
            :class="[
              'group relative cursor-pointer p-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20',
              selectedLanguage === lang.code 
                ? 'bg-primary text-primary-content shadow-sm ring-2 ring-primary' 
                : 'bg-base-200 text-base-content hover:bg-base-300 hover:shadow-sm',
              lang.activated === false ? 'opacity-50 cursor-not-allowed' : '',
            ]"
            :aria-pressed="selectedLanguage === lang.code"
            :disabled="!lang.activated"
            @click="selectedLanguage = lang.code"
          >
            <div class="flex flex-col items-center gap-2.5">
              <div class="h-10 w-10 flex items-center justify-center">
                <img 
                  class="h-10 w-auto object-contain" 
                  :src="lang.imgSrc" 
                  :alt="`${lang.label} flag`" 
                />
              </div>
              <span class="text-sm font-medium">{{ lang.label }}</span>
            </div>
            
            <!-- Selection indicator -->
            <div 
              v-if="selectedLanguage === lang.code" 
              class="absolute top-2 right-2 flex items-center justify-center"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
            </div>
          </button>
        </div>
      </div>
      
      <!-- Footer -->
      <div class="px-8 pb-8 flex justify-end gap-3 border-t border-base-300 pt-6">
        <!-- <button
          class="btn btn-ghost"
          @click="languageSelectionModal?.close()"
        >
          Cancel
        </button> -->
        <button
          :disabled="!selectedLanguage || isSavingLanguageLearned"
          :class="[
            'btn btn-primary min-w-[120px]',
            !selectedLanguage && 'btn-disabled',
          ]"
          @click="handleSelectLanguage"
        >
          <span
            v-if="isSavingLanguageLearned"
            class="loading loading-spinner loading-sm"
          />
          <span v-else>Continue</span>
        </button>
      </div>
    </div>
    
    <!-- Backdrop -->
    <!-- <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form> -->
  </dialog>
</template>
