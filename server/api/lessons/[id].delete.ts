import { createClient } from "@supabase/supabase-js";
import { defineEventHandler, getRouterParam, getHeader, createError } from "h3";

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
  const supabase = createClient(
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

  // Verify the user is authenticated
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError) throw userError
  if (!user?.id) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unable to resolve authenticated user'
    })
  }

  const lessonId = getRouterParam(event, "id");
  if (!lessonId) throw('Deletion error, no lesson id')
  
  // First verify the lesson belongs to the authenticated user
  const { data: lesson, error: lessonError } = await supabase
    .from("turkish_lessons")
    .select("id, user_id")
    .eq("id", lessonId)
    .single()
    
  if (lessonError) throw lessonError
  if (!lesson) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Lesson not found'
    })
  }
  
  if (lesson.user_id !== user.id) {
    throw createError({
      statusCode: 403,
      statusMessage: 'You can only delete your own lessons'
    })
  }
  
  const { error: errorSuppressionLessonWords } = await supabase
  .from("turkish_lesson_words")
  .delete().eq("lesson_id", lessonId)
  if (errorSuppressionLessonWords) throw(errorSuppressionLessonWords) 
  const { error: errorSuppressionLessonExpressions } = await supabase
  .from("turkish_lesson_expressions")
  .delete().eq("lesson_id", lessonId)
  if (errorSuppressionLessonExpressions) throw(errorSuppressionLessonExpressions) 
  const { error: errorLessonDeletion } = await supabase
    .from("turkish_lessons")
    .delete().eq("id", lessonId)
  if (errorLessonDeletion) throw errorLessonDeletion;
});
