<script setup lang="ts">
import { getInitials } from "~/utils/account/profile";
import { useUserScoreStore } from "~/stores/user-score-store";
import { getAuthToken } from "~/utils/auth/auth";

const props = withDefaults(
  defineProps<{
    userId: any;
    fullName: string | null;
  }>(),
  {
    userId: null,
    fullName: null,
  },
);
const user = useSupabaseUser();
const userStore = useUserStore();
const userScoreStore = useUserScoreStore();
const profileFormData = ref({
  pseudo: props.fullName,
  languageLearned: null,
});
const accountSettingsModal = ref<HTMLDialogElement | null>(null);
const isSavingProfileSettings = ref(false);

const handleSaveProfileData = async () => {
  if (!profileFormData.value.pseudo || !profileFormData.value.languageLearned) return;

  isSavingProfileSettings.value = true;
  const headers = await getAuthToken();
  const profile = await $fetch(`/api/profiles/${props.userId}`, {
    method: "PUT",
    headers,
    body: {
      pseudo: profileFormData.value.pseudo,
      initials: getInitials(profileFormData.value.pseudo),
      language_learned: profileFormData.value.languageLearned,
      hasFilledProfileSettings: true,
    },
  });
  await $fetch(`/api/grammar-scores/fill/${user.value?.id}`, {
    method: "POST",
    headers,
      body: {
        language_learned: profileFormData.value.languageLearned,
      },
    });
  accountSettingsModal.value?.close();
  if (userStore.$state.id) {
    userScoreStore.setAllScores(userStore.$state.id);
  }
  userStore.setProfile(profile[0]);
  isSavingProfileSettings.value = false;
};

const openModal = () => {
  accountSettingsModal.value?.showModal();
};

defineExpose({
  openModal,
});
</script>

<template>
  <dialog ref="accountSettingsModal" class="modal">
    <div class="modal-box max-w-md bg-white p-0 shadow-xl">
      <!-- Content Container -->
      <div class="flex flex-col items-center px-12 py-12">
        <!-- Logo -->
        <div class="mb-8">
          <img
            alt="LinguaLab Logo"
            class="h-25 w-auto m-auto"
            src="~/assets/logo/transparent/language-lab-black.png"
          />
        </div>

        <!-- Heading -->
        <h3 class="text-3xl font-bold text-black mb-12 text-center">
          Welcome to TookanAI
        </h3>

        <!-- Input Field -->
        <div class="w-full mb-6">
          <fieldset class="fieldset">
            <legend class="fieldset-legend">Pseudo</legend>
            <input
              type="text"
              class="input rounded-lg"
              placeholder="Choose a Pseudo"
              v-model="profileFormData.pseudo"
              required
            />
          </fieldset>

          <fieldset class="fieldset">
            <legend class="fieldset-legend">Targeted Language</legend>
            <select class="select rounded-lg" v-model="profileFormData.languageLearned">
              <option disabled selected>Language</option>
              <option value="fr">French</option>
              <option value="sp">Spanish</option>
              <option value="tr">Turkish</option>
              <option value="jp">Japanese</option>
              <option value="it">Italian</option>
              <option value="ge">German</option>
            </select>
          </fieldset>
        </div>

        <!-- Continue Button -->
        <button
          :disabled="!profileFormData.pseudo || !profileFormData.languageLearned || isSavingProfileSettings"
          :class="[
            'w-full py-3 cursor-pointer rounded-lg font-semibold transition-all duration-200',
            'text-white',
            profileFormData.pseudo && !isSavingProfileSettings
              ? 'bg-black hover:bg-gray-800'
              : 'bg-gray-300 cursor-not-allowed',
          ]"
          @click="handleSaveProfileData"
        >
          <span
            v-if="isSavingProfileSettings"
            class="loading loading-spinner loading-sm"
          />
          <span v-else>Continue</span>
        </button>

        <!-- Privacy Statement -->
        <p class="text-sm text-gray-600 text-center mt-6">
          We will never share your information with anyone else.
        </p>
      </div>
    </div>
  </dialog>
</template>
