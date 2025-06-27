// import { createClient } from "@supabase/supabase-js";

// const supabase = createClient(
//   "https://dmwvccsjbfhzjyoajgyw.supabase.co",
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtd3ZjY3NqYmZoemp5b2FqZ3l3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjAxNjY0OSwiZXhwIjoyMDYxNTkyNjQ5fQ.EnTAB4Y1x-eirpMBDclxrntgyoykOJRjc_VYc3XJd24",
// );

// export default defineEventHandler(async (event) => {
//   async function createQuiz(grammarRuleId: number) {
//     console.log("grammarRuleId", grammarRuleId);
//     const { data, error } = await supabase
//       .from("turkish_grammar_quizzes")
//       .select("text, translation, option_1, option_2, option_3, option_4")
//       .eq("grammar_rule_id", grammarRuleId)
//       .eq("difficulty_status", 1)
//       .range(0, 1);
//     if (error) throw error;
//     return data;
//   }

//   return { createQuiz };
// });
