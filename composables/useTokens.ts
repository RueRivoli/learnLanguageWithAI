import { getAuthToken } from "~/utils/auth/auth";

export const useTokens = () => {
  const userStore = useUserStore();
  const isLoadingBalance = ref(false);
  const user = useSupabaseUser();
  const fetchTokenBalance = async () => {
    try {
      isLoadingBalance.value = true;
      const headers = await getAuthToken();
      const balance = await $fetch('/api/tokens/balance', { headers });
      
      if (balance) {
        userStore.tokensAvailable = balance.tokensAvailable;
        userStore.tokensPurchasedTotal = balance.tokensPurchasedTotal;
        userStore.lastTokenPurchaseDate = balance.lastTokenPurchaseDate;
      }
      
      return balance;
    } catch (error) {
      console.error('Error fetching token balance:', error);
      throw error;
    } finally {
      isLoadingBalance.value = false;
    }
  };

  const hasEnoughTokens = (tokensRequired: number) => {
    return (userStore.tokensAvailable || 0) >= tokensRequired;
  };

  return {
    fetchTokenBalance,
    hasEnoughTokens,
    isLoadingBalance,
  };
};

