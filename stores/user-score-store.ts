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
  actions: {
    setScores(grammarScores: GrammarScores, vocabScores: VocabularyScore) {
      this.isLoaded = true;
      this.totalWordsMastered = vocabScores.totalWordsMastered;
      this.totalWordsLearned = vocabScores.totalWordsLearned;
      this.totalExpressionsMastered = vocabScores.totalExpressionsMastered;
      this.totalExpressionsLearned = vocabScores.totalExpressionsLearned;
      this.rulesScores = grammarScores;
    },
    async setAllScores(userId: string) {
      const scores = await $fetch(`/api/general-scores/${userId}`, {
        method: "GET",
      });
      const grammarScores = scores.grammarScores.data.map(
        ({ rule_id, score, turkish_grammar_rules }) => ({
          ruleId: rule_id,
          ruleName: turkish_grammar_rules.rule_name,
          ruleNameEn: turkish_grammar_rules.rule_name_translation,
          ruleScore: score,
          ruleDifficulty: turkish_grammar_rules.difficulty_class,
        }),
      );
      console.log('grammarScores', grammarScores)
      const vocabScores = scores.vocabScores.data.map(
        ({
          expressions_learned_count,
          expressions_mastered_count,
          words_learned_count,
          words_mastered_count,
        }) => ({
          totalWordsMastered: words_mastered_count,
          totalWordsLearned: words_learned_count,
          totalExpressionsMastered: expressions_mastered_count,
          totalExpressionsLearned: expressions_learned_count,
        }),
      );
      const score = vocabScores[0] || {};
      this.isLoaded = true;
      this.totalWordsMastered = score.totalWordsMastered;
      this.totalWordsLearned = score.totalWordsLearned;
      this.totalExpressionsMastered = score.totalExpressionsMastered;
      this.totalExpressionsLearned = score.totalExpressionsLearned;
      this.rulesScores = grammarScores;
    },
    async setGrammarScores(userId: string) {
      const scores = await $fetch(`/api/general-scores/${userId}`, {
        method: "GET",
      });
      const grammarScores = scores.grammarScores.data.map(
        ({ rule_id, score, turkish_grammar_rules }) => ({
          ruleId: rule_id,
          ruleName: turkish_grammar_rules.rule_name,
          ruleNameEn: turkish_grammar_rules.rule_name_translation,
          ruleScore: score,
          ruleDifficulty: turkish_grammar_rules.difficulty_class,
        }),
      );
      this.isLoaded = true;
      this.rulesScores = grammarScores;
    },
    async setVocabularyScores(userId: string) {
      const scores = await $fetch(`/api/general-scores/${userId}`, {
        method: "GET",
      });
      const vocabScores = scores.vocabScores.data.map(
        ({
          expressions_learned_count,
          expressions_mastered_count,
          words_learned_count,
          words_mastered_count,
        }) => ({
          totalWordsMastered: words_mastered_count,
          totalWordsLearned: words_learned_count,
          totalExpressionsMastered: expressions_mastered_count,
          totalExpressionsLearned: expressions_learned_count,
        }))
      const score = vocabScores[0] || {};
      console.log('WM', score.totalWordsMastered)
      this.isLoaded = true;
      this.totalWordsMastered = score.totalWordsMastered;
      this.totalWordsLearned = score.totalWordsLearned;
      this.totalExpressionsMastered = score.totalExpressionsMastered;
      this.totalExpressionsLearned = score.totalExpressionsLearned;
    }
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
});
