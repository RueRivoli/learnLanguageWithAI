import Stripe from 'stripe';
import { defineEventHandler, readBody, getHeader, createError } from 'h3';
import { createClient } from '@supabase/supabase-js';
import { createSupabaseClientWithUserAuthTokenFromHeader } from '../../utils/auth/supabaseClient';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-09-30.clover',
});

// Token packages with prices in cents (euros)
const tokenPackages = {
  10: { price: 499, tokens: 10, label: '10 Tokens' },
  30: { price: 999, tokens: 30, label: '30 Tokens' },
  70: { price: 1499, tokens: 70, label: '70 Tokens' },
  150: { price: 2199, tokens: 150, label: '150 Tokens' },
};

export default defineEventHandler(async (event) => {
  
  try {
    const { packageType } = await readBody(event);
    
    // Get authenticated user
    const supabase = createSupabaseClientWithUserAuthTokenFromHeader(event);
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      throw createError({ 
        statusCode: 401, 
        statusMessage: 'User not authenticated' 
      });
    }
    
    const userId = user.id;
    
    const packageInfo = tokenPackages[packageType as keyof typeof tokenPackages];
    if (!packageInfo) {
      throw createError({ statusCode: 400, statusMessage: 'Invalid package type' });
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: packageInfo.label,
              description: `Generate ${packageInfo.tokens} stories and ${packageInfo.tokens * 2} grammar quizzes`,
            },
            unit_amount: packageInfo.price,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
        tokens: packageInfo.tokens.toString(),
        packageType: packageType.toString(),
      },
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/account/settings?payment=success`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/account/settings?payment=cancelled`,
    });

    return { sessionId: session.id, url: session.url };
  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Failed to create checkout session'
    });
  }
});

