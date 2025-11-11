<script setup lang="ts">
import { ChartBarIcon } from "@heroicons/vue/24/solid";
import { useUserStore } from "~/stores/user-store";
import { useUserScoreStore } from "~/stores/user-score-store";
import { dashboardCategoryTabs } from "~/utils/dashboard/tabs";
import { getAuthToken } from "~/utils/auth/auth";

definePageMeta({
  layout: "authenticated",
});

const user = useSupabaseUser();
const client = useSupabaseClient();
const userStore = useUserStore();
const userScoreStore = useUserScoreStore();
const accountSettingsModal = ref<{ openModal: () => void } | null>(null);

// 1 = Overview, 2 = Vocabulary,  3 = Modules
const activeTab = ref(1);

onMounted(async () => {
  if (!userScoreStore.$state.isLoaded) {
    if (user.value?.id) userScoreStore.setAllScores(user.value?.id);
    userScoreStore.setCount();
  }
});

watchEffect(async () => {
  if (user.value) {
    const userId = user.value.id;
    try {
      const headers = await getAuthToken();
      const profile = await $fetch(`/api/profiles/${userId}`, {
        method: "GET",
        headers,
      });
    } catch (error) {
      console.log(error);
    }
  }
});


const getInfoUser = async () => {
  const {
    data: { user },
  } = await client.auth.getUser();
};

getInfoUser();
</script>

<template>
  <!-- Subtle Background -->
  <div class="min-h-screen bg-base-100 relative">
    <!-- Content -->
    <div class="relative z-10 rounded-lg p-5">
      <div class="max-w-7xl mx-auto">
        <!-- Header Section -->
        <div class="mb-4">
          <div class="flex items-center justify-between">
            <LayoutHeadingPlus
              title="Progress on Vocabulary"
              description="Your Knowledge on the Most Important Vocabulary in Turkish"
            >
              <ChartBarIcon class="h-6 w-6 text-neutral" />
            </LayoutHeadingPlus>
            <LayoutTabs
              :first-tab="dashboardCategoryTabs.firstTab"
              :second-tab="dashboardCategoryTabs.secondTab"
              :third-tab="dashboardCategoryTabs.thirdTab"
              @tab-active-changed="(activeT: number) => (activeTab = activeT)"
            />
          </div>
        </div>

        <!-- Stats Highlights Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <template v-if="activeTab === 1">
            <DashboardGeneralStatsHighlights
              :pseudo="userStore.$state.pseudo"
            />
          </template>
          <template v-else-if="activeTab === 2">
            <DashboardVocabularyStatsHighlights />
          </template>
          <template v-else>
            <DashboardGrammarStatsHighlights />
          </template>
        </div>

        <!-- Charts Section -->
        <template v-if="activeTab === 1">
          <DashboardGeneralStats />
        </template>
        <template v-else-if="activeTab === 2">
          <DashboardVocabularyStats />
        </template>
        <template v-else-if="activeTab === 3">
          <!-- <DashboardGrammarStats /> -->
          <DashboardGeneralStats />
        </template>
      </div>

      <AccountSelectionModal
        ref="accountSettingsModal"
        :user-id="user?.id"
        :full-name="user?.user_metadata?.full_name || ''"
      />
    </div>
  </div>
</template>

<style scoped>
/* Custom styles for better chart appearance */
:deep(.echarts-tooltip) {
  border-radius: 8px !important;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1) !important;
}

/* Subtle background styling */
.bg-gradient-to-br {
  background-attachment: fixed;
}

/* Ensure cards maintain proper contrast */
:deep(.card) {
  background-color: hsl(var(--b1));
  border: 1px solid hsl(var(--b3));
}

/* Very subtle pattern animation */
@keyframes subtle-shift {
  0%,
  100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(2px);
  }
}

.absolute.inset-0.opacity-5 {
  animation: subtle-shift 30s ease-in-out infinite;
}

/* Performance optimization */
@media (prefers-reduced-motion: reduce) {
  .absolute.inset-0.opacity-5 {
    animation: none;
  }
}
</style>
