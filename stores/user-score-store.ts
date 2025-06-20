import { defineStore } from "pinia";
import type {VocabularyScore} from "~/stores/user-score";
export const useUserScoreStore = defineStore("user-score", {
  state: (): UserScore => {
    return {
      isLoaded: false,
      totalWordsMastered: null,
      totalWordsLearned: null,
      totalExpressionsMastered: null,
      totalExpressionsLearned: null,
      rulesScores: null,
    };
  },
  getters: {
    percentageLearnedWords(state: UserScore, totalWords: number): number {
      if (state.totalWordsLearned) return Math.trunc((state.totalWordsLearned / totalWords) * 100);
      return 0
    },
    percentageMasterWords(state: UserScore, totalWords: number): number {
      if (state.totalWordsMastered) return Math.trunc((state.totalWordsMastered / totalWords) * 100);
      return 0
    },
    beginnerGrammarRulesNames(state: UserScore): Array<string> {
      return state.rulesScores?.filter((rule) => rule.ruleDifficulty === 1).map(({ruleNameEn}) => ruleNameEn) ?? [];
    },
    intermediateGrammarRulesNames(state: UserScore): Array<string> {
      return state.rulesScores?.filter((rule) => rule.ruleDifficulty === 2).map(({ruleNameEn}) => ruleNameEn) ?? [];
    },
    advancedGrammarRulesNames(state: UserScore): Array<string> {
      return state.rulesScores?.filter((rule) => rule.ruleDifficulty === 3).map(({ruleNameEn}) => ruleNameEn) ?? [];
    },
    expertGrammarRulesNames(state: UserScore): Array<string> {
      return state.rulesScores?.filter((rule) => rule.ruleDifficulty === 4).map(({ruleNameEn}) => ruleNameEn) ?? [];
    },
    beginnerGrammarRulesScores(state: UserScore): Array<number> {
      return state.rulesScores?.filter((rule) => rule.ruleDifficulty === 1).map(({ruleScore}) => ruleScore) ?? [];
    },
    intermediateGrammarRulesScores(state: UserScore): Array<number> {
      return state.rulesScores?.filter((rule) => rule.ruleDifficulty === 2).map(({ruleScore}) => ruleScore) ?? [];
    },
    advancedGrammarRulesScores(state: UserScore): Array<number> {
      return state.rulesScores?.filter((rule) => rule.ruleDifficulty === 3).map(({ruleScore}) => ruleScore) ?? [];
    },
    expertGrammarRulesScores(state: UserScore): Array<number> {
      return state.rulesScores?.filter((rule) => rule.ruleDifficulty === 4).map(({ruleScore}) => ruleScore) ?? [];
    },
  },
  actions: {
    setScores(grammarScores: GrammarScores, vocabScores: VocabularyScore) {
      this.isLoaded = true;
      this.totalWordsMastered = vocabScores.totalWordsMastered;
      this.totalWordsLearned = vocabScores.totalWordsLearned;
      this.totalExpressionsMastered = vocabScores.totalExpressionsMastered;
      this.totalExpressionsLearned = vocabScores.totalExpressionsLearned;
      this.rulesScores = grammarScores;
    }
  },
});
