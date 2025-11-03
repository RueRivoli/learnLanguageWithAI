import Stripe from "stripe";
import { defineEventHandler, readRawBody, createError } from "h3";
import { createServiceRoleClient } from "../../utils/auth/supabaseClient";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-09-30.clover",
});

export default defineEventHandler(async (event) => {
  if (process.env.NODE_ENV === "development")
    console.log("Stripe webhook received");
  const sig = event.node.req.headers["stripe-signature"];
  const body = await readRawBody(event);

  if (!sig || !body) {
    console.error("Missing stripe signature or body");
    throw createError({
      statusCode: 400,
      statusMessage: "Missing signature or body",
    });
  }

  try {
    // Verify webhook signature
    const stripeEvent = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );

    if (process.env.NODE_ENV === "development")
      console.log("Webhook event type:", stripeEvent.type);

    const supabase = createServiceRoleClient();

    if (stripeEvent.type === "checkout.session.completed") {
      const session = stripeEvent.data.object as Stripe.Checkout.Session;

      // Verify payment was successful
      if (session.payment_status !== "paid") {
        if (process.env.NODE_ENV === "development")
          console.log(
            "Payment not completed yet, status:",
            session.payment_status,
          );
        return { received: true, processed: false };
      }

      const userId = session.metadata?.userId;
      const tokens = parseInt(session.metadata?.tokens || "0");

      if (process.env.NODE_ENV === "development")
        console.log(
          "Processing successful payment for user:",
          userId,
          "tokens:",
          tokens,
        );

      if (!userId || tokens <= 0) {
        if (process.env.NODE_ENV === "development")
          console.error("Invalid metadata in session:", { userId, tokens });
        return { received: true, processed: false };
      }

      // 1. Get current token balance
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("credits_available, credits_purchased_total")
        .eq("id", userId)
        .single();

      if (profileError) {
        console.error("Error fetching user profile:", profileError);
        throw createError({
          statusCode: 500,
          statusMessage: "Failed to fetch user profile",
        });
      }

      // 2. Update user's token balance
      const newCreditsAvailable = (profile?.credits_available || 0) + tokens;
      const newCreditsPurchasedTotal =
        (profile?.credits_purchased_total || 0) + tokens;

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          credits_available: newCreditsAvailable,
          credits_purchased_total: newCreditsPurchasedTotal,
          last_credit_purchase_date: new Date().toISOString(),
        })
        .eq("id", userId);

      if (updateError) {
        console.error("Error updating user tokens:", updateError);
        throw createError({
          statusCode: 500,
          statusMessage: "Failed to update user credits",
        });
      }

      if (process.env.NODE_ENV === "development")
        "✅ Successfully added", tokens, "tokens to user", userId;
      if (process.env.NODE_ENV === "development")
        console.log("New balance:", newCreditsAvailable);

      return { received: true, processed: true, tokensAdded: tokens };
    }

    // Handle other event types
    return { received: true, processed: false };
  } catch (error: any) {
    console.error("Webhook processing error:", error);

    // If it's a Stripe signature verification error, return 400
    if (error.type === "StripeSignatureVerificationError") {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid signature",
      });
    }

    // For other errors, return 500
    throw createError({
      statusCode: 500,
      statusMessage: error.message || "Webhook processing failed",
    });
  }
});
