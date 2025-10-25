<script setup lang="ts">
import { ref } from "vue";
import type { GrammarRule } from "~/types/modules/grammar-rule";
import { getBorderStyleClassFromGrammarRuleLevel, getTextStyleClassFromGrammarRuleLevel, grammarLevelTabs, parseSyllabusRules } from "~/utils/learning/grammar";

const selectedLang = ref("tr");
const syllabusRules = ref<Array<GrammarRule>>([]);
const isFetchingGrammarRules = ref(false);
const activeDifficultyLevelTab = ref(1);

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

watchEffect(async () => {
  try {
    isFetchingGrammarRules.value = true;
    const query = getDifficultyClassQuery(activeDifficultyLevelTab.value);
    const grammarModules = await $fetch("/api/grammar/syllabus?order_by=id", {
      query,
    });
    if (grammarModules && Array.isArray(grammarModules))
      syllabusRules.value = parseSyllabusRules(grammarModules);
    isFetchingGrammarRules.value = false;
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <section
    class="bg-primary/10 border border-t-primary border-l-0 border-r-0 border-b-0 inset-0 z-[-1] bg-cover px-4 py-12 flex items-center"
  >
    <div class="max-w-7xl mx-auto">
      <h1
        class="text-4xl font-semibold tracking-tight text-pretty text-center text-neutral mb-8"
      >
        Syllabus in your Targeted Language
      </h1>

      <MarketingSupportedLanguagesList size="small" :showStatus="false" :isLanguageClickable="true" />
       <div class="flex justify-center space-x-3 mb-8 p-6">
      <!-- <button
          v-for="lang in languages"
          :key="lang.code"
          :class="[
            'px-4 py-2 btn btn-primary rounded-md font-semibold focus:outline-none',
            selectedLang === lang.code ? 'btn-primary' : 'btn-secondary',
          ]"
          :aria-pressed="selectedLang === lang.code"
          @click="selectedLang = lang.code"
        >
          <img class="h-8 w-auto" :src="lang.imgSrc" alt="" />
          {{ lang.label }}
        </button> -->
      </div>
      <!-- Syllabus Content -->
      <LayoutTabs
              :first-tab="grammarLevelTabs.firstTab"
              :second-tab="grammarLevelTabs.secondTab"
              :third-tab="grammarLevelTabs.thirdTab"
              @tab-active-changed="
                (activeTab) => (activeDifficultyLevelTab = activeTab)
              "
            />
      <div
            class="mt-4 grid grid-cols-5 md:grid-cols-5 lg:grid-cols-5 gap-4"
          >
        <div v-for="(rule, n) in syllabusRules" :key="n" class="col-span-1">
          <transition name="fade" mode="out-in">
              <LayoutKeyElementRuleOverview class="h-full cursor-pointer" :title="rule.ruleName" :titleEn="rule.ruleNameTranslation" :symbol="rule.symbol" :score="rule.score" :level="rule.difficultyClass" :lightMode="true" size="small">
                <template #content>
                  <!-- Professional description box -->
                  <div v-if="(rule as any).highlights" class="mt-3 mb-4">
                    <div class="relative rounded-xl p-4 shadow-sm overflow-hidden" :class="getBorderStyleClassFromGrammarRuleLevel(rule.difficultyClass ?? 0)">
                      <!-- Subtle texture overlay -->
                      <div class="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-black/5 opacity-60"></div>
                      <div class="absolute inset-0 opacity-20 bg-[conic-gradient(from_45deg_at_50%_50%,rgba(255,255,255,0.4)_0deg,rgba(255,255,255,0.1)_90deg,rgba(255,255,255,0.2)_180deg,rgba(255,255,255,0.05)_270deg)]"></div>
                      
                      <!-- Content -->
                      <div class="relative z-10">
                        <div class="flex items-center gap-2 mb-2">
                          <!-- <div class="w-2 h-2 bg-emerald-500 rounded-full shadow-sm"></div> -->
                          <svg class="h-3 w-3" :class="getTextStyleClassFromGrammarRuleLevel(rule.difficultyClass ?? 0)" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
                            <circle cx="12" cy="12" r="3" fill="currentColor"/>
                          </svg>
                          <span class="text-xs font-semibold uppercase tracking-wide" :class="getTextStyleClassFromGrammarRuleLevel(rule.difficultyClass ?? 0)">Key Point</span>
                        </div>
                        <p class="text-xs text-slate-700 font-medium leading-relaxed">
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
