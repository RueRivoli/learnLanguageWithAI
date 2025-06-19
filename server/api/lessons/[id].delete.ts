import { createClient } from "@supabase/supabase-js";
import { defineEventHandler, getRouterParam } from "h3";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_SUPABASE_KEY,
);

export default defineEventHandler(async (event) => {
  const lessonId = getRouterParam(event, "id");
  if (!lessonId) throw('Deletion error, no lesson id')
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
