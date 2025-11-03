import { defineEventHandler, getQuery } from "h3";
import { createSupabaseClientWithUserAuthTokenFromHeader } from "../../utils/auth/supabaseClient";

export default defineEventHandler(async (event) => {
  const supabase = createSupabaseClientWithUserAuthTokenFromHeader(event);
  const query = getQuery(event);
  const page = query.page;
  const size = query.size;
  const from = (Number(page) - 1) * Number(size);
  const to = Number(page) * Number(size) - 1;

  const [countResult, dataResult] = await Promise.all([
    supabase
      .from("turkish_lessons")
      .select("*", { count: "exact", head: true }),
    supabase
      .from("turkish_lessons")
      .select(
        `
        id,
        title,
        title_en,
        img_url,
        user_id,
        quiz_id,
        turkish_grammar_rules (
          id,
          difficulty_class,
          rule_name,
          rule_name_translation,
          intro,
          description,
          extended_description,
          symbol
        ),
        turkish_lesson_words (
          turkish_words (
            text,
            translation,
            word_sentence,
            word_sentence_translation
          )
        ),
        turkish_quizzes_result (
          score_global
        )
      `,
      )
      .order("created_at", { ascending: false })
      .range(from, to),
  ]);
  const error = countResult.error || dataResult.error;
  if (error) {
    console.error("Error fetching lessons :", error);
    throw error;
  }
  return { countResult, dataResult };
});
