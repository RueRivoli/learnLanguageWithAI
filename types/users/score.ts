export interface UserScore {
    isLoaded: boolean,
    totalWords: number | null,
    totalExpressions: number | null,
    totalWordsLearned: number | null,
    totalWordsMastered: number | null,
    totalExpressionsLearned: number | null,
    totalExpressionsMastered: number | null,
    rulesScores: GrammarScores | null,
 } 

 export type VocabularyScore = {
   totalWordsLearned: number,
    totalWordsMastered: number,
    totalExpressionsLearned: number,
    totalExpressionsMastered: number,
 } 

 export type GrammarScores = Array<{
    ruleId: string,
    ruleName: string,
    ruleNameEn: string,
    ruleScore: number,
    difficultyClass: number,
    symbol: string,
 }>