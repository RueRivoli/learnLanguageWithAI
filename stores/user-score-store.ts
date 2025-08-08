import { defineStore } from "pinia";
import type {VocabularyScore} from "~/stores/user-score";
export const useUserScoreStore = defineStore("user-score", {
  state: (): UserScore => {
    return {
      isLoaded: false,
      totalExpressions: null,
      totalWords: null,
      totalWordsMastered: null,
      totalWordsLearned: null,
      totalExpressionsMastered: null,
      totalExpressionsLearned: null,
      rulesScores: null,
    };
  },
  actions: {
    async setCount () {
      console.log("setCount")
      const { count: totalWords }= await $fetch('/api/words/count/', {
        method: "GET",
      });
      const { count: totalExpressions } = await $fetch('/api/expressions/count/', {
        method: "GET",
      });
      this.totalWords = totalWords
      this.totalExpressions = totalExpressions
      console.log('score', totalWords, totalExpressions)
    },
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
          score,
          symbol: turkish_grammar_rules.symbol,
          difficultyClass: turkish_grammar_rules.difficulty_class,
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
          score,
          difficultyClass: turkish_grammar_rules.difficulty_class,
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
    advancedGrammarRulesInfo(state: UserScore): Array<any> {
      return state.rulesScores?.filter((rule) => rule.difficultyClass === 3).map(({difficultyClass, ruleNameEn, ruleId, ruleName, score, symbol }) => ({ruleNameTranslation: ruleNameEn, difficultyClass, ruleId, ruleName, score, symbol})) ?? [];
    },
    beginnerGrammarRulesInfo(state: UserScore): Array<any> {
      return state.rulesScores?.filter((rule) => rule.difficultyClass === 1).map(({difficultyClass, ruleNameEn, ruleId, score, ruleName, symbol }) => ({ruleNameTranslation: ruleNameEn, difficultyClass, ruleId, score, ruleName, symbol})) ?? [];
    },
    intermediateGrammarRulesInfo(state: UserScore): Array<any> {
      return state.rulesScores?.filter((rule) => rule.difficultyClass === 2).map(({difficultyClass, ruleNameEn, ruleId, ruleName, score, symbol }) => ({ruleNameTranslation: ruleNameEn, difficultyClass, ruleId, ruleName, score, symbol})) ?? [];
    },
    beginnerGrammarRulesScores(state: UserScore): Array<number> {
      return state.rulesScores?.filter((rule) => rule.difficultyClass === 1).map(({ruleScore, ruleId}) => ({ruleId, ruleScore})) ?? [];
    },
    intermediateGrammarRulesScores(state: UserScore): Array<number> {
      return state.rulesScores?.filter((rule) => rule.difficultyClass === 2).map(({ruleScore}) => ruleScore) ?? [];
    },
    advancedGrammarRulesScores(state: UserScore): Array<number> {
      return state.rulesScores?.filter((rule) => rule.difficultyClass === 3).map(({ruleScore}) => ruleScore) ?? [];
    },
    expertGrammarRulesScores(state: UserScore): Array<number> {
      return state.rulesScores?.filter((rule) => rule.difficultyClass === 4).map(({ruleScore}) => ruleScore) ?? [];
    },
    totalWordsMasteredInPercentage(state: UserScore): string {
      const totalWords = state.totalWords ?? 0;
      return totalWords > 0 ? Math.trunc(((state.totalWordsMastered ?? 0) / totalWords) * 100).toFixed(1) : '0.0';
    },
    totalExpressionsMasteredInPercentage(state: UserScore): string {
      const totalExpressions = state.totalExpressions ?? 0;
      return totalExpressions > 0 ? Math.trunc(((state.totalExpressionsMastered ?? 0) / totalExpressions) * 100).toFixed(1) : '0.0';
    },
    totalWordsInK(state: UserScore): string {
      const total = state.totalWords ?? 0;
      const nbK = Math.floor(total / 1000);
      const nbKCent = Math.floor((total - nbK * 1000) / 100);
      return nbKCent !== 0 ? `${nbK}.${nbKCent} K` : `${nbK} K`;
    },
    totalExpressionsInK(state: UserScore): string {
      if (state.totalExpressions && state.totalExpressions > 999) {
        console.log('expes > 999')
        const nbK = Math.floor((state.totalExpressions ?? 0) / 1000);
        const nbKCent = Math.floor(
          ((state.totalExpressions ?? 0) - nbK * 1000) / 100,
        );
        return nbKCent !== 0 ? `${nbK}${nbKCent} K` : `${nbK} K`;
      } else return state.totalExpressions?.toString() ?? '';
    },
  },
});
