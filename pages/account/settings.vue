<script setup lang="ts">
import { UserIcon, CheckCircleIcon, ExclamationCircleIcon, SparklesIcon } from "@heroicons/vue/24/solid";
import { getAuthToken } from "~/utils/auth/auth";

definePageMeta({
  layout: "authenticated",
});

useHead({
  title: "Account Settings",
  titleTemplate: "%s - Tookan AI",
  meta: [
    { name: "settings", content: "width=device-width, initial-scale=1" },
  ],
  link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
});

const route = useRoute();
const userStore = useUserStore();
const { fetchCreditBalance } = useCredits();

// Form state
const formData = ref({
  pseudo: userStore.pseudo || "",
  languageLearned: "tr",
});

// UI state
const isSaving = ref(false);
const showSuccessMessage = ref(false);
const showErrorMessage = ref(false);
const errorMessage = ref("");
const isPurchasing = ref(false);



// Fetch token balance on mount
onMounted(async () => {
  await fetchCreditBalance();
  
  // Check for payment success/cancelled in URL
  if (route.query.payment === 'success') {
    showSuccessMessage.value = true;
    errorMessage.value = "Payment successful! Your credits have been added.";
    await fetchCreditBalance();
    setTimeout(() => {
      showSuccessMessage.value = false;
    }, 5000);
  } else if (route.query.payment === 'cancelled') {
    showErrorMessage.value = true;
    errorMessage.value = "Payment was cancelled.";
    setTimeout(() => {
      showErrorMessage.value = false;
    }, 3000);
  }
});

// Validation
const isPseudoValid = computed(() => {
  return formData.value.pseudo.trim().length >= 3;
});

const isFormValid = computed(() => {
  return isPseudoValid.value;
});

const handleSaveSettings = async () => {
  if (!isFormValid.value || !userStore.id) return;

  try {
    isSaving.value = true;
    showSuccessMessage.value = false;
    showErrorMessage.value = false;

    // Update profile via API
    const headers = await getAuthToken();
    await $fetch(`/api/profiles/${userStore.id}`, {
      method: "PUT",
      headers,
      body: {
        pseudo: formData.value.pseudo.trim(),
        language_learned: "tr", // Turkish only
      },
    });

    // Update local store
    userStore.pseudo = formData.value.pseudo.trim();
    userStore.languageLearned = "tr";

    // Show success message
    showSuccessMessage.value = true;
    setTimeout(() => {
      showSuccessMessage.value = false;
    }, 3000);
  } catch (error: any) {
    showErrorMessage.value = true;
    errorMessage.value = error?.message || "Failed to save settings. Please try again.";
    setTimeout(() => {
      showErrorMessage.value = false;
    }, 5000);
  } finally {
    isSaving.value = false;
  }
};

// Watch for store changes
watch(() => userStore.pseudo, (newPseudo) => {
  if (newPseudo) formData.value.pseudo = newPseudo;
});
</script>

<template>
  <div class="max-w-full min-h-screen">
    <div class="min-h-screen">
      <div class="min-h-screen h-full flex flex-col rounded-lg shadow-md">
        <!-- Header -->
        <div class="p-5 border-b border-gray-100/60">
          <LayoutHeadingPlus
            title="Account Settings"
            description="Manage your profile and preferences"
          >
            <UserIcon class="h-6 w-6 text-primary" />
          </LayoutHeadingPlus>
        </div>

        <!-- Content -->
        <div class="flex-1 p-6">
          <div class="max-w-4xl mx-auto">
            <AccountPaymentWall />
            <!-- Success Alert -->
            <div
              v-if="showSuccessMessage"
              role="alert"
              class="alert alert-success mb-6 shadow-lg"
            >
              <CheckCircleIcon class="h-6 w-6" />
              <span>Your settings have been saved successfully!</span>
            </div>

            <!-- Error Alert -->
            <div
              v-if="showErrorMessage"
              role="alert"
              class="alert alert-error mb-6 shadow-lg"
            >
              <ExclamationCircleIcon class="h-6 w-6" />
              <span>{{ errorMessage }}</span>
            </div>

            <!-- Settings Card -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mt-6">
              <!-- Header -->
              <div class="px-8 py-6 border-b border-gray-200">
                <h2 class="text-2xl font-bold text-gray-900 mb-1">Profile Information</h2>
                <p class="text-gray-600">Manage your account details and preferences</p>
              </div>

              <!-- Content -->
              <div class="p-8">
                <!-- Token Balance -->
                <div class="mb-8 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                        <SparklesIcon class="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p class="text-sm font-medium text-gray-700">Remaining Credits</p>
                        <p class="text-xs text-gray-500">Available for content generation</p>
                      </div>
                    </div>
                    <div class="text-3xl font-bold text-primary">{{ userStore.creditsAvailable }}</div>
                  </div>
                </div>

                <!-- Form -->
                <form @submit.prevent="handleSaveSettings" class="space-y-6">
                  <!-- Pseudo Field -->
                  <div class="space-y-2">
                    <div class="flex items-center justify-between">
                      <label class="text-sm font-semibold text-gray-900">Pseudo</label>
                      <span class="text-xs text-gray-500">Required</span>
                    </div>
                    <input
                      v-model="formData.pseudo"
                      type="text"
                      placeholder="Enter your pseudo"
                      class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      :class="{
                        'border-red-500 focus:border-red-500 focus:ring-red-500/20': formData.pseudo && !isPseudoValid,
                        'border-primary': formData.pseudo && isPseudoValid,
                      }"
                      required
                    />
                    <p
                      class="text-xs"
                      :class="{
                        'text-red-500': formData.pseudo && !isPseudoValid,
                        'text-gray-500': !formData.pseudo || isPseudoValid,
                      }"
                    >
                      {{ formData.pseudo && !isPseudoValid ? 'Pseudo must be at least 3 characters' : 'Minimum 3 characters' }}
                    </p>
                  </div>

                  <!-- Language Learned Field -->
                  <div class="space-y-2">
                    <div class="flex items-center justify-between">
                      <label class="text-sm font-semibold text-gray-900">Targeted Language</label>
                      <span class="text-xs text-gray-500">Fixed</span>
                    </div>
                    <input
                      value="Turkish 🇹🇷"
                      type="text"
                      class="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-500 cursor-not-allowed"
                      disabled
                    />
                    <p class="text-xs text-gray-500">Currently only Turkish is available, Spanish and French will be available soon</p>
                  </div>

                  <!-- Email (Read-only) -->
                  <div class="space-y-2">
                    <div class="flex items-center justify-between">
                      <label class="text-sm font-semibold text-gray-900">Email</label>
                      <span class="text-xs text-gray-500">Read-only</span>
                    </div>
                    <input
                      :value="userStore.email"
                      type="email"
                      class="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-500 cursor-not-allowed"
                      disabled
                    />
                    <p class="text-xs text-gray-500">Your email cannot be changed</p>
                  </div>

                  <!-- Actions -->
                  <div class="flex justify-end pt-4 border-t border-gray-200">
                    <button
                      type="submit"
                      class="px-6 py-2.5 bg-primary text-white rounded-lg font-semibold text-sm hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      :disabled="!isFormValid || isSaving"
                    >
                      <span v-if="isSaving" class="loading loading-spinner loading-sm mr-2"></span>
                      {{ isSaving ? 'Saving...' : 'Save Settings' }}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
