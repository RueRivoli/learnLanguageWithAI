import { defineEventHandler, getQuery } from "h3";
import { createSupabaseClientWithUserAuthTokenFromHeader } from "../../../utils/auth/supabaseClient";

export default defineEventHandler(async (event) => {
  const supabase = createSupabaseClientWithUserAuthTokenFromHeader(event);
  const query = getQuery(event);
  const page = query.page;
  const size = query.size;
  const from = (Number(page) - 1) * Number(size);
  const to = Number(page) * Number(size) - 1;

  const expressionsOverall = supabase
    .from("turkish_expressions")
    .select(
      "id, text, translation, turkish_expressions_knowledge!left(expression_mastered)",
      { count: "exact" },
    )
    .order("id", { ascending: true })
    .range(from, to);
  //   if (error) throw error;
  return expressionsOverall;
});
