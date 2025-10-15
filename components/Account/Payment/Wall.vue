<script setup lang="ts">
import { SparklesIcon } from "@heroicons/vue/24/solid";
import { getAuthToken } from "~/utils/auth/auth";

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
const { fetchCreditBalance } = useCredits();


// UI state
const showSuccessMessage = ref(false);
const showErrorMessage = ref(false);
const errorMessage = ref("");
const isPurchasing = ref(false);


const creditPackages = [
  { 
    credits: 100, 
    price: 5.99, 
    stories: 10, 
    quizzes: 20,
    popular: false 
  },
  { 
    credits: 300, 
    price: 13.99,
    stories: 30, 
    quizzes: 60,
    popular: true,
    discount: 17.97 
  },
  { 
    credits: 700, 
    price: 24.99, 
    stories: 70, 
    quizzes: 140,
    popular: false,
    discount: 41.93 
  },
  { 
    credits: 1500, 
    price: 39.99, 
    stories: 150, 
    quizzes: 300,
    popular: false,
    discount: 89.85  
  },
];

// Fetch credit balance on mount
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


const handlePurchase = async (credits: number) => {
  if (isPurchasing.value) return;
  
  try {
    isPurchasing.value = true;
    
    const headers = await getAuthToken();
    const response = await $fetch<{ sessionId: string; url: string }>('/api/stripe/create-checkout', {
      method: 'POST',
      headers,
      body: { packageType: credits }
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
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <!-- Header -->
                <div class="px-8 py-6 border-b border-gray-200">
                  <h4 class="text-2xl font-bold text-gray-900 mb-1">Choose Your Credits Package</h4>
                  <p class="text-gray-600">One-time purchase • No subscription</p>
                </div>

                <!-- Pricing Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-x divide-gray-200">
                  <div 
                    v-for="(pkg, index) in creditPackages" 
                    :key="index"
                    class="relative p-6 transition-all duration-200 hover:bg-gray-50 cursor-pointer group"
                    :class="{ 
                      'bg-primary/5 ring-2 ring-primary ring-inset': pkg.popular,
                    }"
                    @click="handlePurchase(pkg.credits)"
                  >
                    <!-- Popular Badge -->
                    <div v-if="pkg.popular" class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <span class="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                        POPULAR
                      </span>
                    </div>

                    <!-- Package Content -->
                    <div class="space-y-5">
                      <!-- Title -->
                      <div>
                        <h5 class="text-xl font-bold text-gray-900">{{ pkg.credits }} Credits</h5>
                      </div>
                      
                      <!-- Pricing -->
                      <div>
                        <div class="flex items-baseline gap-1 mb-1">
                          <span class="text-4xl font-bold text-gray-900">${{ pkg.price }}</span>
                        </div>
                        <div v-if="pkg.discount" class="text-md text-gray-500 line-through">
                          ${{ pkg.discount }}
                        </div>
                        <div v-else>
                          <br/>
                        </div>
                      </div>

                      <!-- Purchase Button -->
                      <button 
                        class="w-full py-2.5 px-4 cursor-pointer rounded-lg font-semibold text-sm transition-all duration-200"
                        :class="pkg.popular 
                          ? 'bg-primary text-white hover:bg-primary/90 shadow-sm' 
                          : 'bg-gray-900 text-white hover:bg-gray-800'"
                        :disabled="isPurchasing"
                      >
                        <span v-if="isPurchasing" class="loading loading-spinner loading-xs mr-2"></span>
                        {{ isPurchasing ? 'Processing...' : 'Buy Now' }}
                      </button>

                      <!-- Divider -->
                      <div class="border-t border-gray-200 pt-5">
                        
                        <!-- Credits/Usage -->
                        <div class="space-y-2 mb-4">
                          <div class="flex items-center gap-2 text-sm">
                            <svg class="w-4 h-4 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"/>
                            </svg>
                            <span class="text-gray-700 font-medium">{{ pkg.stories }} AI Lessons</span>
                          </div>
                          <div class="flex items-center gap-2 text-sm">
                            <svg class="w-4 h-4 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"/>
                            </svg>
                            <span class="text-gray-700 font-medium">{{ pkg.quizzes }} Quizzes</span>
                          </div>
                        </div>

                        <!-- Features List -->
                        <div class="space-y-2">
                          <div class="flex items-center gap-2 text-sm text-gray-600">
                            <svg class="w-4 h-4 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                            </svg>
                            <span>Instant generation</span>
                          </div>
                          <div class="flex items-center gap-2 text-sm text-gray-600">
                            <svg class="w-4 h-4 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                            </svg>
                            <span>No expiration</span>
                          </div>
                          <div class="flex items-center gap-2 text-sm text-gray-600">
                            <svg class="w-4 h-4 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                            </svg>
                            <span>One-time payment</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Footer -->
                <div class="px-8 py-4 bg-gray-50 border-t border-gray-200">
                  <div class="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <svg class="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
                    </svg>
                    <span>Secure payment powered by Stripe</span>
                  </div>
                </div>
              </div>
            </div>
</template>
