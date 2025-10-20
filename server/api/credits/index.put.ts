import { defineEventHandler, createError, readBody } from 'h3';
import { createServiceRoleClient, createSupabaseClientWithUserAuthTokenFromHeader } from '../../utils/auth/supabaseClient';

const supabase = createServiceRoleClient()

export default defineEventHandler(async (event) => {
  const supabaseAuth = createSupabaseClientWithUserAuthTokenFromHeader(event)
  const body = await readBody(event);
  const { creditsAvailable } = body;
  const { data, error } = await supabaseAuth
    .from('profiles')
    .update({ credits_available: creditsAvailable }).eq('id', body.userId)
    .select('credits_available, credits_purchased_total, last_credit_purchase_date')
    .single();
  console.log('data', data)
  if (error) throw error;
  
  return {
    creditsAvailable: data?.credits_available || 0,
    creditsPurchasedTotal: data?.credits_purchased_total || 0,
    lastCreditPurchaseDate: data?.last_credit_purchase_date,
  };
});

