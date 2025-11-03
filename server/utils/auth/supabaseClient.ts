import { createClient } from "@supabase/supabase-js";
import { createError, getHeader } from "h3";
// Create Supabase client with user's auth token
export const createSupabaseClientWithUserAuthToken = (authHeader: string) => {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
    global: {
      headers: {
        Authorization: authHeader,
      },
    },
  });
};

export const createSupabaseClientWithUserAuthTokenFromHeader = (event: any) => {
  const authHeader = getHeader(event, "authorization");
  if (!authHeader) {
    throw createError({
      statusCode: 401,
      statusMessage: "Authorization header required",
    });
  }
  return createSupabaseClientWithUserAuthToken(authHeader);
};

export const createServiceRoleClient = () => {
  return createClient(
    process.env.SUPABASE_URL,
    process.env.SERVICE_SUPABASE_ANON_KEY,
  );
};
