import { defineEventHandler, getRouterParam, readBody, getHeader } from "h3";
import { getRandomQuizzes } from "../quiz-models/[id].get";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_SUPABASE_KEY,
);

export default defineEventHandler(async (event) => {
  try {
    const ruleId = getRouterParam(event, "id");
    console.log('ruleId', ruleId)
    const { lessonId } = await readBody(event);
    // Resolve current user from Authorization header
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
    const userId = user.id
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
    console.log('finalQuiz', finalQuiz[0], finalQuiz[1], finalQuiz[2], finalQuiz[3], finalQuiz[4])
    // register new quiz in result_quizzes
    const { data, error } = await supabase
      .from("turkish_quizzes_result")
      .upsert({
        score_global: 0,
        rule_id: ruleId,
        lesson_id: lessonId,
        user_id: userId,
      })
      .select("id")
      .single();
    if (error) throw error;

    const quizId = data.id;
    const quizQuestionIds = [
      Number(finalQuiz[0].id),
      Number(finalQuiz[1].id),
      Number(finalQuiz[2].id),
      Number(finalQuiz[3].id),
      Number(finalQuiz[4].id),
    ];
    const rowsToUpsert = quizQuestionIds.map((id) => ({
      quiz_id: quizId,
      question_id: id,
    }));

    const { error: errorUpsert } = await supabase
      .from("turkish_quizzes_series")
      .upsert(rowsToUpsert);
    if (errorUpsert) throw errorUpsert;
    return { quizId };
  } catch (error) {
    if (error) throw error;
  }
});
