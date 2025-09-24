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

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const quizId = getRouterParam(event, "id");
    const score = body.score
    const ruleId = body.ruleId
    // const questionValues = body.value

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
    
      // await Promise.all([...updateSelections, updateQuizResult, updateUserGrammarScore]);
      await Promise.all([updateQuizResult(), updateUserGrammarScore()]);
  } catch (error) {
    if (error) throw error;
  }
});