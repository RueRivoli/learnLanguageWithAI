<script setup lang="ts">
import { UserIcon, CheckCircleIcon, ExclamationCircleIcon, SparklesIcon } from "@heroicons/vue/24/solid";
import { loadStripe } from '@stripe/stripe-js';

definePageMeta({
  layout: "authenticated",
});

useHead({
  title: "Account Settings",
  titleTemplate: "%s - Learn languages with AI",
  meta: [
    { name: "settings", content: "width=device-width, initial-scale=1" },
  ],
  link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
});

const route = useRoute();
const userStore = useUserStore();
const { fetchTokenBalance } = useTokens();

// Form state
const formData = ref({
  pseudo: userStore.pseudo || "",
  languageLearned: "tr", // Fixed to Turkish only
});

// UI state
const isSaving = ref(false);
const showSuccessMessage = ref(false);
const showErrorMessage = ref(false);
const errorMessage = ref("");
const isPurchasing = ref(false);

// Token packages with NEW pricing
const tokenPackages = [
  { 
    tokens: 10, 
    price: 4.99, 
    stories: 10, 
    quizzes: 20,
    popular: false 
  },
  { 
    tokens: 30, 
    price: 9.99, 
    stories: 30, 
    quizzes: 60,
    popular: true,
    discount: 17 
  },
  { 
    tokens: 70, 
    price: 14.99, 
    stories: 70, 
    quizzes: 140,
    popular: false,
    discount: 36 
  },
  { 
    tokens: 150, 
    price: 21.99, 
    stories: 150, 
    quizzes: 300,
    popular: false,
    discount: 51 
  },
];

// Fetch token balance on mount
onMounted(async () => {
  await fetchTokenBalance();
  
  // Check for payment success/cancelled in URL
  if (route.query.payment === 'success') {
    showSuccessMessage.value = true;
    errorMessage.value = "Payment successful! Your tokens have been added.";
    await fetchTokenBalance();
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
    await $fetch(`/api/profiles/${userStore.id}`, {
      method: "PUT",
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

const handlePurchase = async (tokens: number) => {
  if (isPurchasing.value) return;
  
  try {
    isPurchasing.value = true;
    
    const { data: { session } } = await useSupabaseClient().auth.getSession();
    const headers: Record<string, string> = {};
    if (session?.access_token) {
      headers['Authorization'] = `Bearer ${session.access_token}`;
    }

    // Create Stripe checkout session
    const response = await $fetch<{ sessionId: string; url: string }>('/api/stripe/create-checkout', {
      method: 'POST',
      headers,
      body: { packageType: tokens }
    });

    if (response?.url) {
      // Redirect to Stripe checkout
      window.location.href = response.url;
    }
  } catch (error: any) {
    showErrorMessage.value = true;
    errorMessage.value = error?.message || 'Failed to start checkout. Please try again.';
    setTimeout(() => {
      showErrorMessage.value = false;
    }, 5000);
  } finally {
    isPurchasing.value = false;
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
      <div class="min-h-screen h-full flex flex-col bg-white rounded-lg shadow-md">
        <!-- Header -->
        <div class="bg-gradient-to-r from-gray-50/50 to-white p-5 border-b border-gray-100/60">
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
            <div class="card bg-base-100 shadow-xl border border-gray-100 mt-4">
              <div class="card-body">
                <h2 class="card-title text-xl mb-6 text-neutral">Profile Information</h2>
                                  <!-- Language Learned Field -->
                                  <div class="form-control w-full">
                    <label class="label">
                      <span class="label-text font-semibold">Remaining Tokens</span>
                    </label>
                   <span class="ml-2 text-2xl font-bold text-primary">{{ userStore.tokensAvailable }}</span>
                  </div>

                <!-- Form -->
                <form @submit.prevent="handleSaveSettings" class="space-y-6">
                  <!-- Pseudo Field -->
                  <div class="form-control w-full">
                    <label class="label">
                      <span class="label-text font-semibold">Pseudo</span>
                      <span class="label-text-alt text-gray-500">Required</span>
                    </label>
                    <input
                      v-model="formData.pseudo"
                      type="text"
                      placeholder="Enter your pseudo"
                      class="input input-bordered w-full"
                      :class="{
                        'input-error': formData.pseudo && !isPseudoValid,
                        'input-primary': formData.pseudo && isPseudoValid,
                      }"
                      required
                    />
                    <label class="label">
                      <span
                        class="label-text-alt"
                        :class="{
                          'text-error': formData.pseudo && !isPseudoValid,
                          'text-success': formData.pseudo && isPseudoValid,
                        }"
                      >
                        {{ formData.pseudo && !isPseudoValid ? 'Pseudo must be at least 3 characters' : 'Minimum 3 characters' }}
                      </span>
                    </label>
                  </div>

                  <!-- Language Learned Field -->
                  <div class="form-control w-full">
                    <label class="label">
                      <span class="label-text font-semibold">Language Learning</span>
                      <span class="label-text-alt text-gray-500">Fixed</span>
                    </label>
                    <input
                      value="Turkish 🇹🇷"
                      type="text"
                      class="input input-bordered w-full"
                      disabled
                    />
                    <label class="label">
                      <span class="label-text-alt">Currently only Turkish is available</span>
                    </label>
                  </div>

                  <!-- Email (Read-only) -->
                  <div class="form-control w-full">
                    <label class="label">
                      <span class="label-text font-semibold">Email</span>
                      <span class="label-text-alt text-gray-500">Read-only</span>
                    </label>
                    <input
                      :value="userStore.email"
                      type="email"
                      class="input input-bordered w-full"
                      disabled
                    />
                    <label class="label">
                      <span class="label-text-alt">Your email cannot be changed</span>
                    </label>
                  </div>

                  <!-- Actions -->
                  <div class="card-actions justify-end pt-4">
                    <button
                      type="submit"
                      class="btn btn-primary"
                      :disabled="!isFormValid || isSaving"
                    >
                      <span v-if="isSaving" class="loading loading-spinner loading-sm"></span>
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
