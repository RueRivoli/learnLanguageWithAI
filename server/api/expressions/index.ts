import { createClient } from "@supabase/supabase-js";
import { defineEventHandler, getQuery } from "h3";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_SUPABASE_KEY,
);

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const page = query.page
  const size = query.size
  const from = (Number(page) - 1) * Number(size)
  const to = (Number(page) * Number(size) - 1)
  let request
  if (query.is_learned === 'true') {
    request = supabase
    .from("turkish_expressions")
    .select(
      "id, text, translation, expression_sentence, expression_sentence_translation, expression_sentence_2, expression_sentence_2_translation, turkish_expressions_knowledge!inner(expression_mastered)", { count: "exact"}
    ).eq("turkish_expressions_knowledge.expression_mastered", true)
    .order("id", { ascending: true }).range(from, to)
  } else {
    const {data} = await supabase
    .from("turkish_expressions")
    .select(
      "id, turkish_expressions_knowledge!inner(expression_mastered)").eq("turkish_expressions_knowledge.expression_mastered", true)
      console.log('data', data)
      if (data) {
        const learnedExpressionIdsToExclude = data.map(({id}) => id)
        const IdToExclude = `(${learnedExpressionIdsToExclude.join(',')})`
        console.log('IdToExclude', IdToExclude)
        request = supabase
        .from("turkish_expressions")
        .select("id, text, translation, expression_sentence, expression_sentence_translation, expression_sentence_2, expression_sentence_2_translation", { count: "exact"}).not('id', 'in', IdToExclude).range(from, to).order("id", { ascending: true })
      }
  }
  const { data, count, error } = await request;
  if (error) throw error;
  return {data, count};
});
