import { createClient } from "@supabase/supabase-js";
import { defineEventHandler, getQuery } from "h3";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_SUPABASE_KEY,
);

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const page = query.page
  const size = query.size
  const from = (Number(page) - 1) * Number(size)
  const to = (Number(page) * Number(size) - 1)

  const [countResult, dataResult] = await Promise.all([
    supabase
      .from("turkish_lessons")
      .select("*", { count: "exact", head: true }),
    supabase
      .from("turkish_lessons")
      .select(`
        id,
        title,
        title_en,
        turkish_grammar_rules (
          rule_name,
          rule_name_translation,
          description,
          sentence_example,
          sentence_example_translation,
          sentence_example_2,
          sentence_example_2_translation
        ),
        turkish_lesson_words (
          turkish_words (
            text,
            translation,
            word_sentence,
            word_sentence_translation
          )
        )
      `).order('created_at', {ascending: false})
      .range(from, to)
  ])
  const error = countResult.error || dataResult.error
  if (error) {
    console.error("Error fetching lessons :", error)
    throw error;
  }
  return { countResult, dataResult};
});

// import { createClient } from "@supabase/supabase-js";

// const supabase = createClient(
//   process.env.SUPABASE_URL,
//   process.env.SERVICE_SUPABASE_KEY,
// );

// export default defineEventHandler(async (event) => {
//   const request = supabase
//     .from("turkish_lessons")
//     .select(
//       "id, title, title_en,  turkish_grammar_rules ( rule_name, rule_name_translation), turkish_lesson_words ( turkish_words ( word ) )",
//     );

//   const { data, error } = await request;
//   if (error) throw error;
//   else if (data) return data;
// });
