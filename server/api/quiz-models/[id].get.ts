import { createClient } from "@supabase/supabase-js";
import { defineEventHandler, getRouterParam } from "h3";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_SUPABASE_KEY,
);

export const getRandomQuizzes = async (
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
  const ruleId = getRouterParam(event, "id");
  const difficultyClass = Number(getRouterParam(event, "difficultyClass"));
  const quantity = Number(getRouterParam(event, "quantity"));

  return getRandomQuizzes(ruleId, difficultyClass, quantity);
});
