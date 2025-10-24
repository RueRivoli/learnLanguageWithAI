import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js"

const corsHeaders = {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

Deno.serve(async (req) => {
  const { user_id } = await req.json()

  if (!user_id) {
    return new Response(JSON.stringify({ error: "Missing user_id" }), { status: 400, headers: corsHeaders, })
  }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SERVICE_SUPABASE_ANON_KEY,
  );

  const { data, error } = await supabase
    .from("auth.users") // attention : table système
    .select("email_confirmed_at")
    .eq("id", user_id)
    .single()

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500,  headers: corsHeaders, })
  }

  const confirmed = !!data?.email_confirmed_at

  return new Response(JSON.stringify({ confirmed }), { status: 200,  headers: corsHeaders, })
})
