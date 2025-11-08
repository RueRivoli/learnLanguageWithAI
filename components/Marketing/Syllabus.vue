<script setup lang="ts">
import { ref, computed } from "vue";
import type { GrammarRule } from "~/types/modules/grammar-rule";
import { rulesNames } from "~/utils/syllabus";
import {
  getBorderStyleClassFromGrammarRuleLevel,
  getTextStyleClassFromGrammarRuleLevel,
  grammarLevelTabs,
  parseSyllabusRules,
} from "~/utils/learning/grammar";

// Import images
import turkishFlag from "~/assets/img/language/turkish.png";
import frenchFlag from "~/assets/img/language/french.png";
import spanishFlag from "~/assets/img/language/spanish.png";
import japaneseFlag from "~/assets/img/language/japanese.png";
import italianFlag from "~/assets/img/language/italian.png";
import germanFlag from "~/assets/img/language/german.png";

const isFetchingGrammarRules = ref(false);
const activeDifficultyLevelTab = ref(1);
const supportedLanguages = ref<any[]>([]);
const isFetchingLanguages = ref(false);
const selectedLanguageCode = ref<string>("tr");

const getDifficultyClassQuery = (tabDifficultyLevel: number) => {
  switch (tabDifficultyLevel) {
    case 1:
      return {
        difficulty_class: 1,
      };
    case 2:
      return {
        difficulty_class: 2,
      };
    case 3:
      return {
        difficulty_class: 3,
      };
    default:
      return {};
  }
};

const grammarModules = computed(() => selectedLanguageCode.value ? rulesNames[selectedLanguageCode.value as keyof typeof rulesNames][activeDifficultyLevelTab.value] : []);

const getImage = (language: string) => {
  switch (language) {
    case "turkish":
      return turkishFlag;
    case "french":
      return frenchFlag;
    case "spanish":
      return spanishFlag;
    case "japanese":
      return japaneseFlag;
    case "italian":
      return italianFlag;
    case "german":
      return germanFlag;
  }
  return `~/assets/img/language/${language}.png`;
};

const getSupportedLanguages = async () => {
  try {
    isFetchingLanguages.value = true;
    const { data: languages } = await $fetch(
      "/api/languages/?is_supported=true",
    );
    supportedLanguages.value = languages.map((language: any) => {
      return {
        name:
          language.language.charAt(0).toUpperCase() +
          language.language.slice(1).toLowerCase(),
        code: language.code,
        image: getImage(language.language),
        id: language.id,
        alt: `Learn ${language.language}`,
        totalVotes: language.a_votes + language.b_votes,
        realVotes: language.a_votes,
        status: language.status,
        bgColor: language.background_classes,
        isReleased: language.is_released,
      };
    });
  } catch (error) {
    console.error("Error fetching supported languages", error);
    isFetchingLanguages.value = false;
  } finally {
    isFetchingLanguages.value = false;
  }
};

const handleLanguageClick = (languageCode: string) => {
  selectedLanguageCode.value = languageCode;
};

const getBackgroundClasses = computed(() => {
  return supportedLanguages.value.find((language) => language.code === selectedLanguageCode.value)?.bgColor || '';
});

onMounted( async () => {
  await getSupportedLanguages();
  handleLanguageClick(supportedLanguages.value[0].code);
});

</script>

<template>
  <section
    id="syllabus"
    class="bg-white/20 inset-0 z-[-1] bg-cover px-4 py-12 flex items-center"
  >
    <div class="max-w-7xl mx-auto">
      <h1
        class="text-5xl tracking-tight text-pretty text-center text-neutral mb-16"
      >
        Syllabus in your Targeted Language
      </h1>

      <MarketingSupportedLanguagesList
        class="mb-16"
        size="small"
        :showStatus="false"
        :isLanguageClickable="true"
        :selectedLanguageCode="selectedLanguageCode"
        :supportedLanguages="supportedLanguages"
        :isFetchingLanguages="isFetchingLanguages"
        @click="(languageCode) => handleLanguageClick(languageCode)"
      />
      <!-- Syllabus Content -->
      <LayoutTabs
        :first-tab="grammarLevelTabs.firstTab"
        :second-tab="grammarLevelTabs.secondTab"
        :third-tab="grammarLevelTabs.thirdTab"
        @tab-active-changed="
          (activeTab) => (activeDifficultyLevelTab = activeTab)
        "
      />
      <div class="mt-4 grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-4">
        <div v-for="(rule, n) in grammarModules" :key="n" class="col-span-1">
          <transition name="fade" mode="out-in">
            <LayoutKeyElementRuleOverview
              class="h-full cursor-pointer"
              :backgroundClasses="getBackgroundClasses"
              :title="rule.ruleName"
              :titleEn="rule.ruleNameTranslation"
              :symbol="rule.symbol"
              :level="rule.difficultyClass"
              size="large"
            >
              <template #content>
                <!-- Professional description box -->
                <div v-if="(rule as any).highlights" class="mt-3 mb-4">
                  <div
                    class="relative rounded-xl p-4 shadow-sm overflow-hidden"
                    :class="
                      getBorderStyleClassFromGrammarRuleLevel(
                        rule.difficultyClass ?? 0,
                      )
                    "
                  >
                    <!-- Subtle texture overlay -->
                    <div
                      class="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-black/5 opacity-60"
                    ></div>
                    <div
                      class="absolute inset-0 opacity-20 bg-[conic-gradient(from_45deg_at_50%_50%,rgba(255,255,255,0.4)_0deg,rgba(255,255,255,0.1)_90deg,rgba(255,255,255,0.2)_180deg,rgba(255,255,255,0.05)_270deg)]"
                    ></div>

                    <!-- Content -->
                    <div class="relative z-10">
                      <div class="flex items-center gap-2 mb-2">
                        <!-- <div class="w-2 h-2 bg-emerald-500 rounded-full shadow-sm"></div> -->
                        <svg
                          class="h-3 w-3"
                          :class="
                            getTextStyleClassFromGrammarRuleLevel(
                              rule.difficultyClass ?? 0,
                            )
                          "
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                            fill="none"
                          />
                          <circle cx="12" cy="12" r="3" fill="currentColor" />
                        </svg>
                        <span
                          class="text-xs font-semibold uppercase tracking-wide"
                          :class="
                            getTextStyleClassFromGrammarRuleLevel(
                              rule.difficultyClass ?? 0,
                            )
                          "
                          >Key Point</span
                        >
                      </div>
                      <p
                        class="leading-relaxed"
                      >
                        {{ (rule as any).highlights }}
                      </p>
                    </div>
                  </div>
                </div>
              </template>
            </LayoutKeyElementRuleOverview>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
