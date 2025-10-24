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
const languageSelectionModal = ref<{ openModal: () => void } | null>(null);
const pseudoDefinitionModal = ref<{ openModal: () => void } | null>(null);

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
      // TODO: Uncomment this when the language selection modal is ready
      // if (profile && !profile[0].language_learned) {
      //   languageSelectionModal.value?.openModal();
      // }
      // For a fresh new user:
      if (profile && !profile[0].hasFilledPseudo) {
        pseudoDefinitionModal.value?.openModal();
        await $fetch(`/api/grammar-scores/fill/${user.value?.id}`, {
          method: "POST",
          headers,
          body: {
            language_learned: 'tr',
          },
        });
      }
      userStore.setProfile(profile[0]);
    } catch (error) {
      console.log(error);
    }
  }
});

const handleLanguageUpdated = async (profile: any) => {
  pseudoDefinitionModal.value?.openModal();
  if (user.value) {
    // const headers = await getAuthToken();
    // TODO: Uncomment this when the language selection is ready
    // await $fetch(`/api/grammar-scores/fill/${user.value?.id}`, {
    //   method: "POST",
    //   headers,
    //   body: {
    //     language_learned: profile.language_learned,
    //   },
    // });
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
            :first-tab="dashboardCategoryTabs.firstTab"
            :second-tab="dashboardCategoryTabs.secondTab"
            :third-tab="dashboardCategoryTabs.thirdTab"
            @tab-active-changed="(activeT) => (activeTab = activeT)"
          />
        </div>
      </div>

      <!-- Stats Highlights Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <template v-if="activeTab === 1">
          <DashboardGeneralStatsHighlights :pseudo="userStore.$state.pseudo" />
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

    <!-- Modals -->
    <!-- TODO: Uncomment this when the language selection is ready -->
    <!-- <AccountSelectionLanguageModal
      ref="languageSelectionModal"
      :user-id="user?.id"
      @language-updated="(profile) => handleLanguageUpdated(profile)"
    /> -->
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
