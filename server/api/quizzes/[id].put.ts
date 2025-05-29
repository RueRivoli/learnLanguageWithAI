import { defineEventHandler, getRouterParam } from "h3";
import { getRandomQuizzes } from "../quiz-models/[id].get";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_SUPABASE_KEY,
);

export default defineEventHandler(async (event) => {
  try {
    const ruleId = getRouterParam(event, "id");
    // 1 = easy; 2 = intermediate; 3 = difficult
    const difficultyLevels = [
      { category: 1, quantity: 2 },
      { category: 2, quantity: 2 },
      { category: 3, quantity: 1 },
    ];

    // Creation of the new quiz
    // 2 questions easy, 2 intermediate and 1 difficult
    const quizPromises = difficultyLevels.map(async (level) => {
      const questionsForLevel = await getRandomQuizzes(
        ruleId,
        level.category,
        level.quantity - 1,
      );
      return questionsForLevel;
    });

    const allQuizzes = await Promise.all(quizPromises);

    const finalQuiz = allQuizzes.flat();

    // register new quiz in result_quizzes
    const { data, error } = await supabase
      .from("turkish_result_quizzes")
      .upsert({
        grammar_rule_id: ruleId,
        user_id: 1,
        question_1: Number(finalQuiz[0].id),
        question_2: Number(finalQuiz[1].id),
        question_3: Number(finalQuiz[2].id),
        question_4: Number(finalQuiz[3].id),
        question_5: Number(finalQuiz[4].id),
      })
      .select("id")
      .single();
    return { data };
  } catch (error) {
    if (error) throw error;
  }
});
