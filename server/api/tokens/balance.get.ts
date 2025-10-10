import { defineEventHandler, getHeader, createError } from 'h3';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SERVICE_SUPABASE_KEY!,
);

export default defineEventHandler(async (event) => {
  const authHeader = getHeader(event, 'authorization');
  if (!authHeader) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }

  const supabaseAuth = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      global: {
        headers: { Authorization: authHeader }
      }
    }
  );

  const { data: { user }, error: userError } = await supabaseAuth.auth.getUser();
  if (userError || !user?.id) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid user' });
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('tokens_available, tokens_purchased_total, last_token_purchase_date')
    .eq('id', user.id)
    .single();

  if (error) throw error;
  
  return {
    tokensAvailable: data?.tokens_available || 0,
    tokensPurchasedTotal: data?.tokens_purchased_total || 0,
    lastTokenPurchaseDate: data?.last_token_purchase_date,
  };
});

