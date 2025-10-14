import { defineEventHandler, getRouterParam, readBody, getHeader } from "h3";
import { getRandomQuizzes } from "../quiz-models/[id].get";
import { createSupabaseClientWithUserAuthTokenFromHeader } from "../../utils/auth/supabaseClient";


export default defineEventHandler(async (event) => {
  console.log('quizzes/[id].put.ts ==> start')
  try {
    const ruleId = getRouterParam(event, "id");
    const body = await readBody(event);
    const { numberOfQuestions } = await readBody(event);
    const supabase = createSupabaseClientWithUserAuthTokenFromHeader(event)
    const userId = body.userId

    // CHECK TOKEN BALANCE (0.5 tokens per quiz)
    const { data: profile } = await supabase
      .from('profiles')
      .select('tokens_available')
      .eq('id', userId)
      .single();

    if (!profile || (profile.tokens_available || 0) < 0.5) {
      throw new Error('Insufficient tokens. Please purchase more tokens to generate quizzes.');
    }

    // 1 = easy; 2 = intermediate; 3 = difficult
    const difficultyLevels = numberOfQuestions === 5 ? [
      { category: 1, quantity: 2 },
      { category: 2, quantity: 2 },
      { category: 3, quantity: 1 },
    ] : [
      { category: 1, quantity: 4 },
      { category: 2, quantity: 3 },
      { category: 3, quantity: 3 },
    ];

    // Creation of the new quiz
    // 2 questions easy, 2 intermediate and 1 difficult
    const quizPromises = difficultyLevels.map(async (level) => {
      const questionsForLevel = await getRandomQuizzes(
        supabase,
        ruleId,
        level.category,
        level.quantity - 1,
      );
      return questionsForLevel;
    });

    const allQuizzes = await Promise.all(quizPromises);
    console.log('allQuizzes', allQuizzes)
    const finalQuiz = allQuizzes.flat();
    console.log('finalQuiz', finalQuiz[0], finalQuiz[1], finalQuiz[2], finalQuiz[3], finalQuiz[4])
    // register new quiz in result_quizzes
    const { data, error } = await supabase
      .from("turkish_quizzes_result")
      .upsert({
        score_global: 0,
        rule_id: ruleId,
        user_id: userId,
      })
      .select("id")
      .single();
      console.log('data', data)
    // DEDUCT 0.5 TOKENS AFTER SUCCESSFUL QUIZ GENERATION
    if (data) {
      await supabase
        .from('profiles')
        .update({ tokens_available: profile.tokens_available! - 0.5 })
        .eq('id', userId);
    }
    if (error) throw error;

    const quizId = data.id;
    const quizQuestionIds = numberOfQuestions === 5 ? [
      Number(finalQuiz[0].id),
      Number(finalQuiz[1].id),
      Number(finalQuiz[2].id),
      Number(finalQuiz[3].id),
      Number(finalQuiz[4].id),
    ] : [
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
      .from("turkish_quizzes_series")
      .upsert(rowsToUpsert);
    if (errorUpsert) throw errorUpsert;
    return { quizId };
  } catch (error) {
    if (error) throw error;
  }
});
