import type { Database } from "~/supabase/types";


export interface UserScore {
    isLoaded: boolean,
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
    ruleDifficulty: number,
 }>