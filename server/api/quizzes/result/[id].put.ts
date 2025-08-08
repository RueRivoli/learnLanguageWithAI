import { defineEventHandler, getRouterParam } from "h3";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_SUPABASE_KEY,
);

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const quizId = getRouterParam(event, "id");
    const score = body.score
    const ruleId = body.ruleId
    const questionValues = body.value

    const updateSelections = Object.keys(questionValues).map(async (key) => {
        const { questionId, selectedOption } = questionValues[key];
        const { error } = await supabase
          .from("turkish_quizzes_series")
          .update({ selected_answer: Number(selectedOption) })
          .eq("id", questionId);
      
        if (error) {
          console.error(`Error updating question ${questionId}:`, error);
        }
      });

    const updateQuizResult = (async () => {
        const { error: errorFromQuizzedResult } = await supabase
          .from("turkish_quizzes_result")
          .update({ score_global: score })
          .eq("id", quizId);
      
        if (errorFromQuizzedResult) {
          throw new Error("An error occurred while updating the quiz result. Please try again.");
        }
      })();
   
      const updateUserGrammarScore = (async () => {
        const { error: errorFromGrammarScores } = await supabase
        .from("turkish_grammar_scores")
        .update({
          score: score,
        }).eq('rule_id', ruleId)
        if (errorFromGrammarScores) throw ('An error occured while updating the quiz result, please try again')
      })() 
    
      await Promise.all([...updateSelections, updateQuizResult, updateUserGrammarScore]);
 
  } catch (error) {
    if (error) throw error;
  }
});