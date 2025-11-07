import type { H3Event } from "h3";
import { defineEventHandler, createError, readBody } from "h3";

export default defineEventHandler(async (event: H3Event) => {
  const config = useRuntimeConfig(event);
  const body = await readBody(event);
  const { email, confirmationUrl } = body;

  const brevoApiKey = config.brevoApiKey;
  const templateId = config.brevoConfirmationTemplateId; // ID du template dans Brevo

  // Vérification de la configuration
  if (!brevoApiKey || !templateId) {
    throw createError({
      statusCode: 500,
      message: "Brevo configuration is missing. Please check BREVO_API_KEY and BREVO_CONFIRMATION_TEMPLATE_ID environment variables.",
    });
  }

  if (!email || !confirmationUrl) {
    throw createError({
      statusCode: 400,
      message: "Email and confirmation URL are required",
    });
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": brevoApiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        to: [{ email }],
        templateId: parseInt(templateId),
        params: {
          CONFIRMATION_URL: confirmationUrl,
          // Ajoutez d'autres variables de votre template Brevo
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to send email");
    }

    return { success: true, messageId: data.messageId };
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to send confirmation email",
    });
  }
});
