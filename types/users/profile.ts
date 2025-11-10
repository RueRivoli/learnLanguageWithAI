import type { Database } from "~/supabase/types";
export type DatabaseUserProfile =
  Database["public"]["Tables"]["profiles"]["Row"];

export interface User {
  id: Database["public"]["Tables"]["profiles"]["Row"]["id"] | null;
  isLoaded: boolean;
  email: Database["public"]["Tables"]["profiles"]["Row"]["email"] | null;
  initials: Database["public"]["Tables"]["profiles"]["Row"]["initials"] | null;
  hasFilledProfileSettings:
    | Database["public"]["Tables"]["profiles"]["Row"]["has_filled_pseudo"]
    | null;
  pseudo: Database["public"]["Tables"]["profiles"]["Row"]["pseudo"] | null;
  fullName: Database["public"]["Tables"]["profiles"]["Row"]["full_name"] | null;
  hasFilledInitialForm:
    | Database["public"]["Tables"]["profiles"]["Row"]["has_filled_initial_form"]
    | null;
  languageLearned:
    | Database["public"]["Tables"]["profiles"]["Row"]["language_learned"]
    | null;
  creditsAvailable:
    | Database["public"]["Tables"]["profiles"]["Row"]["credits_available"]
    | null;
  creditsPurchasedTotal:
    | Database["public"]["Tables"]["profiles"]["Row"]["credits_purchased_total"]
    | null;
  lastCreditPurchaseDate:
    | Database["public"]["Tables"]["profiles"]["Row"]["last_credit_purchase_date"]
    | null;
}
