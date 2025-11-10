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
const userStore = useUserStore();
const userScoreStore = useUserScoreStore();
const pseudo = ref(props.fullName);
const pseudoDefinitionModal = ref<HTMLDialogElement | null>(null);
const isSavingPseudo = ref(false);

const handleDefinePseudo = async () => {
  if (!pseudo.value) return;

  isSavingPseudo.value = true;
  const headers = await getAuthToken();
  const profile = await $fetch(`/api/profiles/${props.userId}`, {
    method: "PUT",
    headers,
    body: {
      pseudo: pseudo.value,
      initials: getInitials(pseudo.value),
      hasFilledPseudo: true,
    },
  });
  pseudoDefinitionModal.value?.close();
  if (userStore.$state.id) {
    userScoreStore.setAllScores(userStore.$state.id);
  }
  userStore.setProfile(profile[0]);
  isSavingPseudo.value = false;
};

const openModal = () => {
  pseudoDefinitionModal.value?.showModal();
};

defineExpose({
  openModal,
});
</script>

<template>
  <dialog ref="pseudoDefinitionModal" class="modal">
    <div class="modal-box max-w-md bg-base-100 p-0">
      <!-- Header -->
      <div class="bg-primary text-white px-8 pt-8 pb-6 border-b border-base-300">
        <h3
          class="text-2xl tracking-tight"
        >
          Welcome to TookanAI!
        </h3>
      </div>

      <!-- Content -->
      <div class="px-8 py-6">
        <div class="form-control w-full">
          <label class="label mb-4">
            <span class="label-text text-sm font-medium text-base-content"
              >Pseudo</span
            >
          </label>
          <input
            v-model="pseudo"
            type="text"
            placeholder="Pseudo"
            class="input input-bordered w-full bg-base-200 focus:bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            @keyup.enter="pseudo && handleDefinePseudo()"
          />
        </div>
      </div>

      <!-- Footer -->
      <div
        class="px-8 pb-8 flex justify-end gap-3 border-t border-base-300 pt-6"
      >
        <button
          :disabled="!pseudo || isSavingPseudo"
          :class="['btn btn-primary min-w-[120px]', !pseudo && 'btn-disabled']"
          @click="handleDefinePseudo"
        >
          <span
            v-if="isSavingPseudo"
            class="loading loading-spinner loading-sm"
          />
          <span v-else>Save</span>
        </button>
      </div>
    </div>
  </dialog>
</template>
