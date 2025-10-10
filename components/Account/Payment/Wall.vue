<script setup lang="ts">
import { SparklesIcon } from "@heroicons/vue/24/solid";

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


// UI state
const showSuccessMessage = ref(false);
const showErrorMessage = ref(false);
const errorMessage = ref("");
const isPurchasing = ref(false);


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

</script>

<template>
            <!-- Token Balance & Purchase Card -->
            <div class="mt-6">
              <!-- Pricing Plans -->
              <div class="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div class="p-6 border-b border-gray-200">
                  <h4 class="text-xl font-bold text-gray-800 mb-2">Choose Your Token Package</h4>
                  <p class="text-gray-600">One-time purchase • No subscription</p>
                </div>

                <!-- Pricing Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
                  <div 
                    v-for="(pkg, index) in tokenPackages" 
                    :key="pkg.tokens"
                    class="relative p-6 border-r border-gray-200 last:border-r-0 hover:bg-gray-50 transition-colors duration-200"
                    :class="{ 
                      'bg-gradient-to-b from-blue-50 to-indigo-50 border-blue-200': pkg.popular,
                      'border-r border-gray-200': index < tokenPackages.length - 1
                    }"
                  >
                    <!-- Popular Badge -->
                    <div v-if="pkg.popular" class="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span class="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                        POPULAR
                      </span>
                    </div>

                    <!-- Package Header -->
                    <div class="text-center mb-4">
                      <h5 class="text-lg font-bold text-gray-800 mb-2">{{ pkg.tokens }} Tokens</h5>
                      
                      <!-- Pricing -->
                      <div class="mb-3">
                        <div class="text-3xl font-bold text-gray-900">€{{ pkg.price }}</div>
                        <div v-if="pkg.discount" class="text-sm text-green-600 font-medium">
                          Save {{ pkg.discount }}%
                        </div>
                      </div>

                      <!-- Purchase Button -->
                      <button 
                        class="w-full py-2 px-4 rounded-lg font-semibold text-sm transition-colors duration-200"
                        :class="pkg.popular 
                          ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
                        :disabled="isPurchasing"
                        @click="handlePurchase(pkg.tokens)"
                      >
                        <span v-if="isPurchasing" class="loading loading-spinner loading-xs mr-2"></span>
                        {{ isPurchasing ? 'Processing...' : 'Buy Now' }}
                      </button>
                    </div>

                    <!-- Features -->
                    <div class="space-y-3">
                      <!-- Credits/Usage -->
                      <div class="bg-gray-50 rounded-lg p-3">
                        <div class="flex items-center gap-2 mb-2">
                          <svg class="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                          <span class="text-sm font-medium text-gray-700">{{ pkg.tokens }} Tokens</span>
                        </div>
                        <div class="text-xs text-gray-600">
                          <div>{{ pkg.stories }} AI Stories</div>
                          <div>{{ pkg.quizzes }} Grammar Quizzes</div>
                        </div>
                      </div>

                      <!-- Features List -->
                      <div class="space-y-2">
                        <div class="flex items-center gap-2">
                          <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                          </svg>
                          <span class="text-sm text-gray-700">Instant generation</span>
                        </div>
                        <div class="flex items-center gap-2">
                          <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                          </svg>
                          <span class="text-sm text-gray-700">No expiration</span>
                        </div>
                        <div class="flex items-center gap-2">
                          <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                          </svg>
                          <span class="text-sm text-gray-700">One-time payment</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Footer -->
                <div class="p-6 bg-gray-50 rounded-b-xl border-t border-gray-200">
                  <div class="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
                    </svg>
                    <span>Secure payment powered by Stripe</span>
                  </div>
                </div>
              </div>
            </div>
</template>
