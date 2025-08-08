<script setup lang="ts">
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
const selectedLanguage = ref(null);
const languageSelectionModal = ref(null);
const isSavingLanguageLearned = ref(false);

const handleSelectLanguage = async () => {
  isSavingLanguageLearned.value = true;
  try {
    const profile = await $fetch(`/api/profiles/${props.userId}`, {
      method: "PUT",
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
  <dialog ref="languageSelectionModal" class="modal">
    <div class="modal-box relative overflow-hidden">
      <!-- Professional background layers -->
      <div class="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5"></div>
      
      <!-- Subtle geometric accent -->
      <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl"></div>
      <div class="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-xl"></div>
      
      <!-- Refined pattern overlay -->
      <div class="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.02)_25%,rgba(0,0,0,0.02)_75%,transparent_75%)] bg-[size:20px_20px] opacity-60"></div>
      
      <!-- Content container with elegant styling -->
      <div class="relative z-10 bg-white/95 backdrop-blur-sm rounded-xl border border-white/60 shadow-xl">
        <!-- Inner content background -->
        <div class="absolute inset-0 bg-gradient-to-br from-white via-gray-50/30 to-white rounded-xl"></div>
        
        <!-- Content -->
        <div class="relative z-20 p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-6 text-center">
            Which language do you want to learn?
          </h3>
          
          <!-- Language selection with enhanced styling -->
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
            <button
              v-for="lang in activatedLanguages"
              :key="lang.code"
              :class="[
                'group cursor-pointer relative p-3 rounded-lg font-semibold focus:outline-none transition-all duration-300 hover:shadow-md',
                selectedLanguage === lang.code 
                  ? 'bg-gradient-to-br from-primary to-primary/90 text-white shadow-lg shadow-primary/20' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200/60 shadow-sm',
                lang.activated === false ? 'opacity-50 cursor-not-allowed' : '',
              ]"
              :aria-pressed="selectedLanguage === lang.code"
              @click="selectedLanguage = lang.code"
            >
              <!-- Subtle hover effect -->
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              
              <!-- Content -->
              <div class="relative z-10 flex flex-col items-center gap-2">
                <img class="h-8 w-auto" :src="lang.imgSrc" alt="" />
                <span class="font-medium text-sm">{{ lang.label }}</span>
              </div>
              
              <!-- Selection indicator -->
              <div v-if="selectedLanguage === lang.code" class="absolute top-2 right-2 w-2 h-2 bg-white rounded-full shadow-sm"></div>
            </button>
          </div>
          
          <!-- Professional save button -->
          <div class="flex justify-center">
            <button
              :class="[
                'relative px-6 py-2.5 text-base font-semibold rounded-lg transition-all duration-300',
                !selectedLanguage 
                  ? 'btn-disabled cursor-not-allowed' 
                  : 'btn btn-primary shadow-md hover:shadow-lg hover:scale-105',
              ]"
              @click="handleSelectLanguage"
            >
              <!-- Button hover effect -->
              <div class="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              <div class="relative z-10 flex items-center gap-2">
                <span
                  v-if="isSavingLanguageLearned"
                  class="loading loading-spinner loading-sm"
                />
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>{{ isSavingLanguageLearned ? 'Saving...' : 'Continue' }}</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </dialog>
</template>
