import { defineEventHandler, createError, readBody } from 'h3';
import { createServiceRoleClient, createSupabaseClientWithUserAuthTokenFromHeader } from '../../utils/auth/supabaseClient';

const supabase = createServiceRoleClient()

export default defineEventHandler(async (event) => {
  const supabaseAuth = createSupabaseClientWithUserAuthTokenFromHeader(event)
  const { data: { user }, error: userError } = await supabaseAuth.auth.getUser();
  console.log('user', user)
  console.log('error', userError)
  // if (userError || !user?.id) {
  //   throw createError({ statusCode: 401, statusMessage: 'Invalid user' });
  // }

  const { data, error } = await supabase
    .from('profiles')
    .select('tokens_available, tokens_purchased_total, last_token_purchase_date')
    .eq('id', user?.id)
    .single();

  if (error) throw error;
  
  return {
    lastTokenPurchaseDate: data?.last_token_purchase_date,
    tokensAvailable: data?.tokens_available || 0,
    tokensPurchasedTotal: data?.tokens_purchased_total || 0,
  };
});

