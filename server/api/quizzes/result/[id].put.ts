import { defineEventHandler, getRouterParam, readBody } from "h3";
import { createSupabaseClientWithUserAuthTokenFromHeader } from "../../../utils/auth/supabaseClient";


// 1. Update the turkish_quiz_result table with the score
// 2. Update the turkish_grammar_scores table with the score
// 3. Update the turkish_quizzes_series table with the selected answer ?

// Calculate the average score of the user for that rule
const getAverageScore = async (supabase: any, score: number, id: string, ruleId: number) : Promise<number> => {
  const { data: scores } = await supabase.from("turkish_quizzes_result").select("score_global").eq("user_id", id).eq("rule_id", ruleId);
  const sumScores = scores.reduce((acc, curr) => acc + curr.score_global, 0)
  return Math.floor((sumScores + score) / (scores.length + 1))
}

// Uncomment this function if you want to remember the quiz selection
const rememberQuizSelection = async () => {
}

const updateVocabularyCountScores = async (supabase: any, userId: string) => {
  const countWordsMastered = await supabase.from("turkish_words_knowledge").select('*', { count: 'exact', head: true }).eq("user_id", userId).eq("word_mastered", true)
  const countExpressionsMastered = await supabase.from("turkish_expressions_knowledge").select('*', { count: 'exact', head: true }).eq("user_id", userId).eq("expression_mastered", true)
  const { error: errorFromVocabularyScores } = await supabase.from("turkish_vocabulary_scores").update({ words_mastered_count: countWordsMastered.count, expressions_mastered_count: countExpressionsMastered.count }).eq("user_id", userId).eq("language", 'tr')
  if (errorFromVocabularyScores) throw ('An error occured while updating the vocabulary scores, please try again')
}

const updateVocabularyKnowledge = async (supabase: any, userId: string, newMasteredWordsIds: number[], newForgottenWordIds: number[], newMasteredExpressionsIds: number[], newForgottenExpressionsIds: number[]) => {
  // New Words have been learned
  const { error: errorFromWordsKnowledge } = await supabase
    .from("turkish_words_knowledge")
    .upsert(newMasteredWordsIds.map(wordId => ({user_id: userId, word_id: wordId, word_learned: true, word_mastered: true})))
  if (errorFromWordsKnowledge) throw ('An error occured while updating the words knowledge, please try again')
  
  // Words previously learned are now forgotten
  const { error: errorFromForgottenWordsKnowledge } = await supabase
    .from("turkish_words_knowledge")
    .delete()
    .eq("user_id", userId)
    .in("word_id", newForgottenWordIds)
  if (errorFromForgottenWordsKnowledge) throw ('An error occured while updating the forgotten words knowledge, please try again')
  
  // New Expressions have been learned
  const { error: errorFromExpressionsKnowledge } = await supabase
    .from("turkish_expressions_knowledge")
    .upsert(newMasteredExpressionsIds.map(exprId => ({user_id: userId, expression_id: exprId, expression_learned: true, expression_mastered: true})))
  if (errorFromExpressionsKnowledge) throw ('An error occured while updating the expressions knowledge, please try again')

  // Expressions previously learned are now forgotten
  const { error: errorFromForgottenExpressionsKnowledge } = await supabase
    .from("turkish_expressions_knowledge")
    .delete()
    .eq("user_id", userId)
    .in("expression_id", newForgottenExpressionsIds)
  if (errorFromForgottenExpressionsKnowledge) throw ('An error occured while updating the forgotten expressions knowledge, please try again')
  
  // Update counts
  await updateVocabularyCountScores(supabase, userId)
}

export default defineEventHandler(async (event) => {
  try {
    const supabase = createSupabaseClientWithUserAuthTokenFromHeader(event)
    const body = await readBody(event);
    const quizId = getRouterParam(event, "id");
    const score = body.score
    const ruleId = body.ruleId
    const detailedResults = body.detailedResults
    const type = body.type
    const userId = body.userId
    // const questionValues = body.value

     // Grammar mastering data
    const grammarRuleScore = await getAverageScore(supabase, score, userId, ruleId)

    const updateQuizResult = async () => {
      const { error: errorFromQuizzedResult } = await supabase.from("turkish_quizzes_result").update({ score_global: score }).eq("id", quizId).eq("user_id", userId)
          
      if (errorFromQuizzedResult) {
        throw new Error("An error occurred while updating the quiz result. Please try again.");
        }
      };
    
    const updateUserGrammarScore = async () => {
      const { error: errorFromGrammarScores } = await supabase.from("turkish_grammar_scores").update({
              score: grammarRuleScore,
          }).eq('rule_id', ruleId).eq('user_id', userId)
          if (errorFromGrammarScores) throw ('An error occured while updating the quiz result, please try again')
      }; 

      if (type === 'grammar') { 
        await updateQuizResult()
        await updateUserGrammarScore()
        return
      }

    // Vocabulary mastering data
    const newMasteredWordsIds = detailedResults.words.validatedList.filter(word => !word.isMastered).map(word => word.id)
    const newForgottenWordIds = detailedResults.words.invalidatedList.filter(word => word.isMastered).map(word => word.id)
    const newMasteredExpressionsIds = detailedResults.expressions.validatedList.filter(expr => !expr.isMastered).map(expr => expr.id)
    const newForgottenExpressionsIds = detailedResults.expressions.invalidatedList.filter(expr => expr.isMastered).map(expr => expr.id)
      const updateVocabularyData = async () => {
        if (userId) updateVocabularyKnowledge(supabase, userId, newMasteredWordsIds, newForgottenWordIds, newMasteredExpressionsIds, newForgottenExpressionsIds)
      }
      // rememberQuizSelection()
      await Promise.all([updateQuizResult(), updateUserGrammarScore(), updateVocabularyData()])
  } catch (error) {
    if (error) throw error;
  }
});