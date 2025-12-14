import { defineEventHandler, getHeader, getRouterParam, readBody } from "h3";
import { createSupabaseClientWithUserAuthTokenFromHeader } from "~/server/utils/auth/supabaseClient";

const getVocabularyFromLesson = async (event: any, lessonId: number) => {
  const supabase = createSupabaseClientWithUserAuthTokenFromHeader(event);
  const authHeader = getHeader(event, "authorization");
  const headers: Record<string, string> = {};
  if (authHeader) headers["Authorization"] = authHeader;
  const { data, error } = await supabase
    .from("turkish_lessons")
    .select(
      "id, title, turkish_lesson_words(turkish_words(id)), turkish_lesson_expressions(turkish_expressions(id))",
    )
    .eq("id", lessonId)
    .single();
  if (error) throw error;
  const wordsForQuiz: Array<{ id: number; isMastered: boolean }> = (
    data?.turkish_lesson_words || []
  ).map((word: any) => {
    return { ...word.turkish_words, isMastered: false };
  });
  const expressionsForQuiz: Array<{ id: number; isMastered: boolean }> = (
    data?.turkish_lesson_expressions || []
  ).map((expression: any) => {
    return { ...expression.turkish_expressions, isMastered: false };
  });
  // Get random words and expressions for the quiz
  const { data: randomWords } = await $fetch(
    `/api/words/levels/random/?limit=2`,
    {
      method: "GET",
      headers,
    },
  );
  const { data: randomExpressions } = await $fetch(
    `/api/expressions/levels/random/?limit=2`,
    {
      method: "GET",
      headers,
    },
  );
  wordsForQuiz.push(
    ...randomWords.map((word: any) => {
      return { ...{ id: word.turkish_words.id }, isMastered: true };
    }),
  );
  expressionsForQuiz.push(
    ...randomExpressions.map((expression: any) => {
      return { ...{ id: expression.turkish_expressions.id }, isMastered: true };
    }),
  );
  console.log("wordsForQuiz", wordsForQuiz);
  console.log("expressionsForQuiz", expressionsForQuiz);
  return { wordsForQuiz, expressionsForQuiz };
};

const createWordQuiz = async (
  event: any,
  wordsForQuiz: Array<{ id: number; isMastered: boolean }>,
  quizId: number,
) => {
  const supabase = createSupabaseClientWithUserAuthTokenFromHeader(event);
  let wordQuizzes: any[] = [];
  const wordIds = wordsForQuiz.map((w) => w.id);
  if (wordIds.length > 0) {
    const { data: wordQuizRows, error: wordQuizError } = await supabase
      .from("turkish_word_quizzes")
      .select(
        "id, word_id, text, option_1, option_2, option_3, option_4, correct_answer, note",
      )
      .in("word_id", wordIds);
    if (wordQuizError) throw wordQuizError;
    const byWordId = new Map<number, any[]>();
    for (const row of wordQuizRows || []) {
      const existing = byWordId.get(row.word_id) || [];
      existing.push(row);
      byWordId.set(row.word_id, existing);
    }
    wordQuizzes = wordIds
      .map((id) => {
        const rows = byWordId.get(id) || [];
        return rows.length
          ? rows[Math.floor(Math.random() * rows.length)]
          : null;
      })
      .filter((q): q is any => q !== null);
  }
  const wordSeriesRows = wordQuizzes.map((q: any) => ({
    quiz_id: quizId,
    question_id: q.id,
  }));
  if (wordSeriesRows.length > 0) {
    const { error: insertWordSeriesError } = await supabase
      .from("turkish_quizzes_word_series")
      .insert(wordSeriesRows);
    if (insertWordSeriesError) throw insertWordSeriesError;
  }
  return wordQuizzes;
};

const createExpressionQuiz = async (
  event: any,
  expressionsForQuiz: Array<{ id: number; isMastered: boolean }>,
  quizId: number,
) => {
  const supabase = createSupabaseClientWithUserAuthTokenFromHeader(event);
  let expressionQuizzes = [];
  const expressionIds = expressionsForQuiz.map((exp) => exp.id);
  if (expressionsForQuiz.length > 0) {
    const { data: expressionQuizRows, error: expressionQuizError } =
      await supabase
        .from("turkish_expression_quizzes")
        .select(
          "id, expression_id, text, option_1, option_2, option_3, option_4, correct_answer, note",
        )
        .in("expression_id", expressionIds);
    if (expressionQuizError) throw expressionQuizError;
    const byExpressionId = new Map<number, any[]>();
    for (const row of expressionQuizRows || []) {
      const existing = byExpressionId.get(row.expression_id) || [];
      existing.push(row);
      byExpressionId.set(row.expression_id, existing);
    }
    expressionQuizzes = expressionIds
      .map((id) => {
        const rows = byExpressionId.get(id) || [];
        return rows.length
          ? rows[Math.floor(Math.random() * rows.length)]
          : null;
      })
      .filter((q): q is any => q !== null);
  }
  const expressionSeriesRows = expressionQuizzes.map((q: any) => ({
    quiz_id: quizId,
    question_id: q.id,
  }));
  if (expressionSeriesRows.length > 0) {
    const { error: insertExpressionSeriesError } = await supabase
      .from("turkish_quizzes_expression_series")
      .insert(expressionSeriesRows);
    if (insertExpressionSeriesError) throw insertExpressionSeriesError;
  }
  return expressionQuizzes;
};

const createVocabularyQuiz = async (
  event: any,
  lessonId: number,
  quizId: number,
) => {
  const { wordsForQuiz, expressionsForQuiz } = await getVocabularyFromLesson(
    event,
    lessonId,
  );
  const wordQuizzes = await createWordQuiz(event, wordsForQuiz, quizId);
  const expressionQuizzes = await createExpressionQuiz(
    event,
    expressionsForQuiz,
    quizId,
  );
  return { wordQuizzes: wordQuizzes, expressionQuizzes: expressionQuizzes };
};

// Generate a new quiz for a given grammar rule != FULL QUIZ
export default defineEventHandler(async (event) => {
  try {
    const supabase = createSupabaseClientWithUserAuthTokenFromHeader(event);
    const body = await readBody(event);
    const userId = body.userId;
    const lessonId = getRouterParam(event, "id");
    const quizId = body.quizId;
    // CHECK TOKEN BALANCE (0.5 tokens per quiz)
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

    if (lessonId) {
      const quiz = await createVocabularyQuiz(event, Number(lessonId), quizId);
      console.log("quiz", quiz);
    }
  } catch (error) {
    console.error("Error generating vocabulary quiz:", error);
    throw error;
  }
});
