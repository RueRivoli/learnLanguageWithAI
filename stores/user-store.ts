import { defineStore } from "pinia";
import type { DatabaseUserProfile, User } from "~/types/users/profile";
import { getAuthToken } from "~/utils/auth/auth";
import { CREDITS_FOR_ONE_LESSON, CREDITS_FOR_ONE_QUIZ } from "~/utils/credits";

export const useUserStore = defineStore("user", {
  state: (): User => {
    return {
      creditsAvailable: null,
      creditsPurchasedTotal: null,
      email: null,
      fullName: null,
      hasFilledInitialForm: false,
      hasFilledPseudo: false,
      id: null,
      initials: null,
      isLoaded: false,
      languageLearned: null,
      lastCreditPurchaseDate: null,
      pseudo: null,
    };
  },
  getters: {
    // 10 credits for one lesson
    // 2.5 credits for one quiz
    isEnoughTokensForOneLesson(state: User): boolean {
      if (!state.creditsAvailable) return false;
      return state.creditsAvailable >= 10;
    },
    isEnoughTokensForOneQuiz(state: User): boolean {
      if (!state.creditsAvailable) return false;
      return state.creditsAvailable >= 2.5;
    },
    getInitials(state: User): string {
      if (!state.fullName) return '';
      const names = state.fullName.trim().split(" ");
      const initials = names.map(n => n[0]?.toUpperCase() || '').join('');
      return initials;
    }
  },
  actions: {
    async creditsUsageUpdate(credits: typeof CREDITS_FOR_ONE_LESSON | typeof CREDITS_FOR_ONE_QUIZ) {
      try {
        const headers = await getAuthToken();
        const response = await $fetch(`/api/credits`, {
          method: "PUT",
          headers,
          body: {
            creditsAvailable: (this.creditsAvailable ?? 0) - credits,
            userId: this.id,
          },
        });
        console.log('response', response)
        this.creditsAvailable = response.creditsAvailable;
      } catch (error) {
        console.error('Error setting credits available:', error);
      }
    },
    setProfile(profile: DatabaseUserProfile) {
      this.id = profile.id;
      this.isLoaded = true,
      this.fullName = profile.full_name;
      this.languageLearned = profile.language_learned;
      this.pseudo = profile.pseudo;
      this.initials = profile.initials;
      this.email = profile.email;
      this.hasFilledInitialForm = profile.has_filled_initial_form;
      this.creditsAvailable = profile.credits_available;
      this.creditsPurchasedTotal = profile.credits_purchased_total;
      this.lastCreditPurchaseDate = profile.last_credit_purchase_date;
      // this.avatar = profile.avatar;
      //  this.memberSince = profile.memberSince;
    }
  },
});
