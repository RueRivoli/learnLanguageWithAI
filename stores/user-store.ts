import { defineStore } from "pinia";
import type { DatabaseUserProfile, User } from "~/types/users/profile";

export const useUserStore = defineStore("user", {
  state: (): User => {
    return {
      isLoaded: false,
      email: null,
      fullName: null,
      hasFilledInitialForm: false,
      id: null,
      initials: null,
      isSubscribed: false,
      languageLearned: null,
      pseudo: null,
      tokensAvailable: null,
      tokensPurchasedTotal: null,
      lastTokenPurchaseDate: null,
      // avatar: null,
      // memberSince: null,
    };
  },
  getters: {
    getInitials (state: User): string {
      if (!state.fullName) return '';
      const names = state.fullName.trim().split(" ");
      const initials = names.map(n => n[0]?.toUpperCase() || '').join('');
      return initials;
    }
  },
  actions: {
    setProfile (profile: DatabaseUserProfile) {
      this.id = profile.id;
      this.isLoaded = true,
      this.fullName = profile.full_name;
      this.languageLearned = profile.language_learned;
      this.pseudo = profile.pseudo;
      this.initials = profile.initials;
      this.email = profile.email;
      this.hasFilledInitialForm = profile.has_filled_initial_form;
      this.tokensAvailable = profile.tokens_available;
      this.tokensPurchasedTotal = profile.tokens_purchased_total;
      this.lastTokenPurchaseDate = profile.last_token_purchase_date;
      // this.avatar = profile.avatar;
      //  this.memberSince = profile.memberSince;
    },
    setTokensAvailable (tokens: number) {
      this.tokensAvailable = tokens;
    },
  },
});
