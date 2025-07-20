<script setup lang="ts">
import type { Database } from "~/supabase/types";
import {
  dashboardFirstTab,
  dashboardSecondTab,
  dashboardThirdTab,
} from "~/utils/dashboard/tabs";
import { ChartBarIcon } from "@heroicons/vue/24/outline";
import { useUserStore } from "~/stores/user-store";
import { useUserScoreStore } from "~/stores/user-score-store";

definePageMeta({
  layout: "authenticated",
});

const user = useSupabaseUser();
const client = useSupabaseClient();
const userStore = useUserStore();
const userScoreStore = useUserScoreStore();
const languageSelectionModal = ref<{ openModal: () => void } | null>(null);
const pseudoDefinitionModal = ref<{ openModal: () => void } | null>(null);

// 1 = Vocabulary, 2 = Grammar
const activeTab = ref(1);

onMounted(async () => {
  console.log("is dashboard data loaded ?", userScoreStore.$state.isLoaded);
  if (!userScoreStore.$state.isLoaded) {
    console.log("fetch all dashboard data");
    userScoreStore.setAllScores(user.value?.id);
    userScoreStore.setCount();
  }
});
watchEffect(async () => {
  if (user.value) {
    const userId = user.value.id;
    try {
      const profile = await $fetch(`/api/profiles/${userId}`, {
        method: "GET",
      });
      if (profile && !profile[0].language_learned) {
        languageSelectionModal.value?.openModal();
      }
      userStore.setProfile(profile[0]);
    } catch (error) {
      console.log(error);
    }
  }
});

const handleLanguageUpdated = async (
  profile: Database["public"]["Tables"]["profiles"]["Row"],
) => {
  userStore.setProfile(profile);
  pseudoDefinitionModal.value?.openModal();
  if (user.value) {
    await $fetch(`/api/grammar-scores/fill/${user.value.id}`, {
      method: "POST",
      body: {
        language_learned: profile.language_learned,
      },
    });
  }
};

const getInfoUser = async () => {
  const {
    data: { user },
  } = await client.auth.getUser();
};

getInfoUser();
</script>

<template>
  <div class="min-h-screen rounded-lg bg-white p-5">
    <div class="max-w-7xl mx-auto">
      <!-- Header Section -->
      <div class="mb-4">
        <div class="flex items-center justify-between">
          <LayoutHeadingPlus
            title="Dashboard"
            description="Track your learning progress"
          >
            <ChartBarIcon class="h-6 w-6 text-primary" />
          </LayoutHeadingPlus>
          <LayoutTabs
            :first-tab="dashboardFirstTab"
            :second-tab="dashboardSecondTab"
            :third-tab="dashboardThirdTab"
            @tab-active-changed="(activeT) => (activeTab = activeT)"
          />
        </div>
      </div>

      <!-- Stats Highlights Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <template v-if="activeTab === 1">
          <!-- <div
            class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">WELCOME!</p>
                <p class="text-2xl font-bold text-gray-900">
                  Start here with a short quiz to initiate your level
                </p>
              </div>
              <div class="p-3 bg-white rounded-lg">
                <BookOpenIcon class="h-6 w-6 text-neutral" />
              </div>
            </div>
          </div> -->
          <DashboardGeneralStatsHighlights />
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
        <DashboardGrammarStats />
      </template>
    </div>

    <!-- Modals -->
    <AccountSelectionLanguageModal
      ref="languageSelectionModal"
      :user-id="user?.id"
      @language-updated="(profile) => handleLanguageUpdated(profile)"
    />
    <AccountPseudoDefinitionModal
      ref="pseudoDefinitionModal"
      :user-id="user?.id"
      :full-name="user?.user_metadata?.full_name || ''"
    />
  </div>
</template>

<style scoped>
/* Custom styles for better chart appearance */
:deep(.echarts-tooltip) {
  border-radius: 8px !important;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1) !important;
}
</style>
