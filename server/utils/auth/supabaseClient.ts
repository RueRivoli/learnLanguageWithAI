
import { createClient } from "@supabase/supabase-js";
  // Create Supabase client with user's auth token
  export const createSupabaseClientWithUserAuthToken = (authHeader: string) => {
    return createClient(
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
  }
