import type { Database } from "~/supabase/types";


export interface UserScore {
    isLoaded: boolean,
    totalExpressions: number | null,
    totalWords: number | null,
    totalWordsMastered: number | null,
    totalWordsLearned: number | null,
    totalExpressionsMastered: number | null,
    totalExpressionsLearned: number | null,
    rulesScores: GrammarScores | null,
 } 

 export type VocabularyScore = {
    totalWordsMastered: number,
    totalWordsLearned: number,
    totalExpressionsMastered: number,
    totalExpressionsLearned: number,
 } 

 export type GrammarScores = Array<{
    ruleId: string,
    ruleName: string,
    ruleNameEn: string,
    ruleScore: number,
    difficultyClass: number,
    symbol: string,
 }>