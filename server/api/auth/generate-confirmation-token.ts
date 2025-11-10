import { defineEventHandler, createError, readBody } from "h3";
import { createClient } from "@supabase/supabase-js";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const { email } = await readBody(event);

  if (!email) {
    throw createError({
      statusCode: 400,
      message: "Email is required",
    });
  }

  // Créer un client Supabase avec la clé service role (admin)
  const supabase = createClient(
    config.public.supabaseUrl,
    config.serviceSupabaseKey,
  );

  // Générer un lien de confirmation sécurisé via l'API Admin
  const { data, error } = await supabase.auth.admin.generateLink({
    type: "signup",
    email: email,
  });

  if (error) {
    console.error("Error generating confirmation link:", error);
    throw createError({
      statusCode: 500,
      message: error.message,
    });
  }

  // Retourner l'URL de confirmation sécurisée
  return { confirmationUrl: data.properties?.action_link };
});
