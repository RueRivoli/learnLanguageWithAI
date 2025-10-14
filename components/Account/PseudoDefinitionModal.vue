<script setup lang="ts">
import { getInitials } from "~/utils/account/profile";
import { useUserScoreStore } from "~/stores/user-score-store";
import { getAuthToken } from "~/utils/auth/auth";

const props = withDefaults(
  defineProps<{
    userId: any;
    fullName: string;
  }>(),
  {
    userId: null,
    fullName: null,
  },
);
const userStore = useUserStore();
const userScoreStore = useUserScoreStore();
const pseudo = ref(props.fullName);
const pseudoDefinitionModal = ref(null);
const isSavingPseudo = ref(false);

const handleDefinePseudo = async () => {
  isSavingPseudo.value = true;
  const headers = await getAuthToken();
  const profile = await $fetch(`/api/profiles/${props.userId}`, {
    method: "PUT",
    headers,
    body: {
      pseudo: pseudo.value,
      initials: getInitials(pseudo.value),
    },
  });
  pseudoDefinitionModal.value?.close();
  userScoreStore.setAllScores(userStore.$state.id);
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
    <div class="modal-box relative overflow-hidden">
      <!-- Professional background layers -->
      <div
        class="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40"
      />
      <div
        class="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5"
      />

      <!-- Subtle geometric accent -->
      <div
        class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl"
      />
      <div
        class="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-xl"
      />

      <!-- Refined pattern overlay -->
      <div
        class="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.02)_25%,rgba(0,0,0,0.02)_75%,transparent_75%)] bg-[size:20px_20px] opacity-60"
      />

      <!-- Content container with elegant styling -->
      <div
        class="relative z-10 bg-white/95 backdrop-blur-sm rounded-xl border border-white/60 shadow-xl"
      >
        <!-- Inner content background -->
        <div
          class="absolute inset-0 bg-gradient-to-br from-white via-gray-50/30 to-white rounded-xl"
        />

        <!-- Content -->
        <div class="relative z-20 p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-6 text-center">
            What'll be your pseudo?
          </h3>

          <!-- Pseudo input with enhanced styling -->
          <div class="mb-6">
            <div class="relative">
              <!-- Input background effects -->
              <div
                class="absolute inset-0 bg-gradient-to-br from-white via-gray-50/50 to-white rounded-lg border border-gray-200/80 shadow-sm"
              />
              <div
                class="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/3 rounded-lg opacity-0 focus-within:opacity-100 transition-opacity duration-300"
              />
              <div
                class="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.02)_25%,rgba(0,0,0,0.02)_75%,transparent_75%)] bg-[size:8px_8px] rounded-lg opacity-30"
              />

              <!-- Input field -->
              <input
                v-model="pseudo"
                type="text"
                placeholder="Choose a nice pseudo"
                class="relative w-full px-4 py-3 bg-transparent border-0 rounded-lg text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 z-10"
              />

              <!-- Focus ring -->
              <div
                class="absolute inset-0 rounded-lg ring-2 ring-transparent focus-within:ring-primary/20 transition-all duration-300"
              />
            </div>
          </div>

          <!-- Professional save button -->
          <div class="flex justify-center">
            <button
              :class="[
                'relative px-6 py-2.5 text-base font-semibold rounded-lg transition-all duration-300',
                !pseudo
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-primary to-primary/90 text-white shadow-md hover:shadow-lg hover:scale-105',
              ]"
              @click="handleDefinePseudo"
            >
              <!-- Button hover effect -->
              <div
                class="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg"
              />
              <div class="relative z-10 flex items-center gap-2">
                <span
                  v-if="isSavingPseudo"
                  class="loading loading-spinner loading-sm"
                />
                <svg
                  v-else
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>{{ isSavingPseudo ? "Saving..." : "Save" }}</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </dialog>
</template>
