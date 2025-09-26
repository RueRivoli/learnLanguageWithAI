import { defineEventHandler, getRouterParam, readBody, getHeader } from "h3";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_SUPABASE_KEY,
);

// 1. Update the turkish_quiz_result table with the score
// 2. Update the turkish_grammar_scores table with the score
// 3. Update the turkish_quizzes_series table with the selected answer ?

// Calculate the average score of the user for that rule
const getAverageScore = async (score: number, id: string, ruleId: number) : Promise<number> => {
  const { data: scores } = await supabase.from("turkish_quizzes_result").select("score_global").eq("user_id", id).eq("rule_id", ruleId);
  console.log('xxxxxx scores xxxxxxxxx', scores)
  const sumScores = scores.reduce((acc, curr) => acc + curr.score_global, 0)
  return Math.floor((sumScores + score) / scores.length + 1)
}

const rememberQuizSelection = async () => {
    // Remember quiz selections ??
    // const updateSelections = Object.keys(questionValues).map(async (key) => {
    //     const { questionId, selectedOption } = questionValues[key];
    //     const { error } = await supabase
    //       .from("turkish_quizzes_series")
    //       .update({ selected_answer: Number(selectedOption) })
    //       .eq("id", questionId);
      
    //     if (error) {
    //       console.error(`Error updating question ${questionId}:`, error);
    //     }
    //   });
}

const updateVocabularyKnowledge = async (userId: string, newMasteredWordsIds: number[], newForgottenWordIds: number[], newMasteredExpressionsIds: number[], newForgottenExpressionsIds: number[]) => {
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
    .in("expression_id", newMasteredExpressionsIds)
  if (errorFromForgottenExpressionsKnowledge) throw ('An error occured while updating the forgotten expressions knowledge, please try again')
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const quizId = getRouterParam(event, "id");
    const score = body.score
    const ruleId = body.ruleId
    const detailedResults = body.detailedResults
    // const questionValues = body.value

    // Vocabulary mastering data
    const newMasteredWordsIds = detailedResults.words.validatedList.filter(word => !word.isMastered).map(word => word.id)
    const newForgottenWordIds = detailedResults.words.invalidatedList.filter(word => word.isMastered).map(word => word.id)
    const newMasteredExpressionsIds = detailedResults.expressions.validatedList.filter(expr => !expr.isMastered).map(expr => expr.id)
    const newForgottenExpressionsIds = detailedResults.expressions.invalidatedList.filter(expr => expr.isMastered).map(expr => expr.id)

    // Resolve current user from Authorization header for RLS-safe operations
    const authHeader = getHeader(event, 'authorization')
    if (!authHeader) {
      throw new Error('Authorization header required')
    }
    const supabaseAuth = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY,
      {
        global: {
          headers: {
            Authorization: authHeader
          }
        }
      }
    )
    const { data: { user }, error: userError } = await supabaseAuth.auth.getUser()
    if (userError) throw userError
    if (!user?.id) {
      throw new Error('Unable to resolve authenticated user')
    }

    const grammarRuleScore = await getAverageScore(score, user.id, ruleId)

    const updateQuizResult = async () => {
        const { error: errorFromQuizzedResult } = await supabase.from("turkish_quizzes_result").update({ score_global: score }).eq("id", quizId).eq("user_id", user.id)
      
        if (errorFromQuizzedResult) {
          throw new Error("An error occurred while updating the quiz result. Please try again.");
        }
      };

      const updateUserGrammarScore = async () => {
        const { error: errorFromGrammarScores } = await supabase
        .from("turkish_grammar_scores")
        .update({
          score: grammarRuleScore,
        }).eq('rule_id', ruleId).eq('user_id', user.id)
        if (errorFromGrammarScores) throw ('An error occured while updating the quiz result, please try again')
      }; 

      const updateVocabularyData = async () => {
        if (user?.id) updateVocabularyKnowledge(user.id, newMasteredWordsIds, newForgottenWordIds, newMasteredExpressionsIds, newForgottenExpressionsIds)
      }

      // rememberQuizSelection()
      await Promise.all([updateQuizResult(), updateUserGrammarScore(), updateVocabularyData()])
  } catch (error) {
    if (error) throw error;
  }
});