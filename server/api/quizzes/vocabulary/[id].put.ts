import { defineEventHandler, getRouterParam, readBody } from "h3";
import { createSupabaseClientWithUserAuthTokenFromHeader } from "~/server/utils/auth/supabaseClient";
import { getRandomQuizzes } from "../../quiz-models/[id].get";


// Generate a new quiz for a given grammar rule != FULL QUIZ

export default defineEventHandler(async (event) => {
  try {
    const ruleId = getRouterParam(event, "id");
    const body = await readBody(event);
    const { numberOfQuestions } = await readBody(event);
    const supabase = createSupabaseClientWithUserAuthTokenFromHeader(event);
    const userId = body.userId;

    // CHECK TOKEN BALANCE (0.25 tokens per quiz)
    const { data: profile } = await supabase
      .from("profiles")
      .select("credits_available")
      .eq("id", userId)
      .single();

    if (!profile || (profile.credits_available || 0) < 0.25) {
      throw new Error(
        "Insufficient tokens. Please purchase more tokens to generate quizzes.",
      );
    }

    // 1 = easy; 2 = intermediate; 3 = difficult
    const difficultyLevels =
      numberOfQuestions === 5
        ? [
            { category: 1, quantity: 2 },
            { category: 2, quantity: 2 },
            { category: 3, quantity: 1 },
          ]
        : [
            { category: 1, quantity: 4 },
            { category: 2, quantity: 3 },
            { category: 3, quantity: 3 },
          ];

    // Creation of the new quiz
    // 2 questions easy, 2 intermediate and 1 difficult
    const quizPromises = difficultyLevels.map(async (level) => {
      if (ruleId) {
        const questionsForLevel = await getRandomQuizzes(
          supabase,
          ruleId,
          level.category,
          level.quantity - 1,
        );
        return questionsForLevel;
      }
    });

    const allQuizzes = await Promise.all(quizPromises);
    const finalQuiz = allQuizzes.flat();
    // register new quiz in result_quizzes
    const { data, error } = await supabase
      .from("turkish_quizzes_result")
      .upsert({
        score_global: null,
        rule_id: ruleId,
        user_id: userId,
      })
      .select("id")
      .single();
    // DEDUCT 0.5 TOKENS AFTER SUCCESSFUL QUIZ GENERATION
    if (data) {
      await supabase
        .from("profiles")
        .update({ credits_available: profile.credits_available! - 0.25 })
        .eq("id", userId);
    }
    if (error) throw error;

    const quizId = data.id;
    const quizQuestionIds =
      numberOfQuestions === 5
        ? [
            Number(finalQuiz[0].id),
            Number(finalQuiz[1].id),
            Number(finalQuiz[2].id),
            Number(finalQuiz[3].id),
            Number(finalQuiz[4].id),
          ]
        : [
            Number(finalQuiz[0].id),
            Number(finalQuiz[1].id),
            Number(finalQuiz[2].id),
            Number(finalQuiz[3].id),
            Number(finalQuiz[4].id),
            Number(finalQuiz[5].id),
            Number(finalQuiz[6].id),
            Number(finalQuiz[7].id),
            Number(finalQuiz[8].id),
            Number(finalQuiz[9].id),
          ];
    const rowsToUpsert = quizQuestionIds.map((id) => ({
      quiz_id: quizId,
      question_id: id,
    }));

    const { error: errorUpsert } = await supabase
      .from("turkish_quizzes_grammar_series")
      .upsert(rowsToUpsert);
    if (errorUpsert) throw errorUpsert;
    return { quizId };
  } catch (error) {
    if (error) throw error;
  }
});
