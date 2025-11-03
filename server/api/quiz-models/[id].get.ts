import { defineEventHandler, getRouterParam } from "h3";
import { createSupabaseClientWithUserAuthTokenFromHeader } from "../../utils/auth/supabaseClient";

export const getRandomQuizzes = async (
  supabase: any,
  ruleId: string,
  difficulty: number,
  quantity: number,
) => {
  const { data, error } = await supabase
    .from("turkish_grammar_quizzes")
    .select("id")
    .eq("grammar_rule_id", Number(ruleId))
    .eq("difficulty_status", Number(difficulty))
    .range(0, Number(quantity));
  if (error) throw error;
  return data;
};

export default defineEventHandler(async (event) => {
  const supabase = createSupabaseClientWithUserAuthTokenFromHeader(event);
  const ruleId = getRouterParam(event, "id");
  const difficultyClass = Number(getRouterParam(event, "difficultyClass"));
  const quantity = Number(getRouterParam(event, "quantity"));

  return getRandomQuizzes(supabase, ruleId, difficultyClass, quantity);
});
