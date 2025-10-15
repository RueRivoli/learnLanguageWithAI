import { getAuthToken } from "~/utils/auth/auth";

export const useCredits = () => {
  const userStore = useUserStore();
  const isLoadingBalance = ref(false);
  const fetchCreditBalance = async () => {
    try {
      isLoadingBalance.value = true;
      const headers = await getAuthToken();
      const balance = await $fetch('/api/credits/balance', { headers });
      
      if (balance) {
        userStore.creditsAvailable = balance.creditsAvailable;
        userStore.creditsPurchasedTotal = balance.creditsPurchasedTotal;
        userStore.lastCreditPurchaseDate = balance.lastCreditPurchaseDate;
      }
      return balance;
    } catch (error) {
      console.error('Error fetching token balance:', error);
      throw error;
    } finally {
      isLoadingBalance.value = false;
    }
  };

  const hasEnoughCredits = (creditsRequired: number) => {
    return (userStore.creditsAvailable || 0) >= creditsRequired;
  };

  return {
    fetchCreditBalance,
    hasEnoughCredits,
    isLoadingBalance,
  };
};

