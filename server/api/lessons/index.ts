import { createClient } from "@supabase/supabase-js";
import { defineEventHandler, getQuery, getHeader, createError } from "h3";
import { createSupabaseClientWithUserAuthToken } from "../../utils/auth/supabaseClient";

export default defineEventHandler(async (event) => {
  // Get the authorization header from the request
  const authHeader = getHeader(event, 'authorization')
  if (!authHeader) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Authorization header required'
    })
  }
  // Create Supabase client with user's auth token
  const supabase = createSupabaseClientWithUserAuthToken(authHeader)



  // Verify the user is authenticated
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError) throw userError
  if (!user?.id) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unable to resolve authenticated user'
    })
  }

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
        user_id,
        turkish_grammar_rules (
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
