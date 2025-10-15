import { defineEventHandler, createError, readBody } from 'h3';
import { createServiceRoleClient, createSupabaseClientWithUserAuthTokenFromHeader } from '../../utils/auth/supabaseClient';

const supabase = createServiceRoleClient()

export default defineEventHandler(async (event) => {
  const supabaseAuth = createSupabaseClientWithUserAuthTokenFromHeader(event)
  const { data: { user }, error: userError } = await supabaseAuth.auth.getUser();
  // if (userError || !user?.id) {
  //   throw createError({ statusCode: 401, statusMessage: 'Invalid user' });
  // }

  const { data, error } = await supabase
    .from('profiles')
    .select('credits_available, credits_purchased_total, last_credit_purchase_date')
    .eq('id', user?.id)
    .single();

  if (error) throw error;
  
  return {
    creditsAvailable: data?.credits_available || 0,
    creditsPurchasedTotal: data?.credits_purchased_total || 0,
    lastCreditPurchaseDate: data?.last_credit_purchase_date,
  };
});

