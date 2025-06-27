<script setup lang="ts">
import type { Database } from "~/supabase/types";
import { dashboardFirstTab, dashboardSecondTab } from "~/utils/dashboard/tabs";
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
  console.log("userScoreStore", userScoreStore.$state.isLoaded);
  if (!userScoreStore.$state.isLoaded) {
    const scores = await $fetch(`/api/general-scores/${user.value?.id}`, {
      method: "GET",
    });
    console.log("loading scores into userScoreStore", scores);
    const grammarScores = scores.grammarScores.data.map(
      ({ rule_id, score, turkish_grammar_rules }) => ({
        ruleId: rule_id,
        ruleName: turkish_grammar_rules.rule_name,
        ruleNameEn: turkish_grammar_rules.rule_name_translation,
        ruleScore: score,
        ruleDifficulty: turkish_grammar_rules.difficulty_class,
      }),
    );
    const vocabScores = scores.vocabScores.data.map(
      ({
        expressions_learned_count,
        expressions_mastered_count,
        words_learned_count,
        words_mastered_count,
      }) => ({
        totalWordsMastered: expressions_learned_count,
        totalWordsLearned: expressions_mastered_count,
        totalExpressionsMastered: words_learned_count,
        totalExpressionsLearned: words_mastered_count,
      }),
    );
    console.log("vocabScores", vocabScores);
    userScoreStore.setScores(grammarScores, vocabScores[0]);
    console.log("userScoreStore.state", userScoreStore.$state);
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
            @tab-active-changed="(activeT) => (activeTab = activeT)"
          />
        </div>
      </div>

      <!-- Stats Highlights Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <template v-if="activeTab === 1">
          <DashboardVocabularyStatsHighlights />
        </template>
        <template v-else>
          <DashboardGrammarStatsHighlights />
        </template>
      </div>

      <!-- Charts Section -->
      <template v-if="activeTab === 1">
        <DashboardVocabularyStats />
      </template>
      <template v-else>
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
