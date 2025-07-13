import { defineEventHandler, getRouterParam } from "h3";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_SUPABASE_KEY,
);

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const result = $fetch(process.env.OPENAI_API_URL, {
      method: 'POST',
      headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-4.1",
        messages: [
          { role: 'system', content: 'You are a helpful turkish teacher.' },
          { role: 'user', content: body.prompt.message },
        ],
      }),
    })
    if (result) {
      const { data, error } = await supabase
      .from("turkish_lessons")
      .insert({ title: "title", title_en: 'title_en', grammar_rule_id: body.ruleId, content: "content", content_en: "english" })
      if (error) throw error;
    }

    return result
});
