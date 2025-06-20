import type { Database } from "~/supabase/types";

export type DatabaseUserProfile = Database["public"]["Tables"]["profiles"]["Row"]

export interface User {
    id: Database["public"]["Tables"]["profiles"]["Row"]["id"] | null
    isLoaded: boolean
    email: Database["public"]["Tables"]["profiles"]["Row"]["email"] | null
    pseudo: Database["public"]["Tables"]["profiles"]["Row"]["pseudo"] | null
    fullName: Database["public"]["Tables"]["profiles"]["Row"]["full_name"] | null
    hasFilledInitialForm: Database["public"]["Tables"]["profiles"]["Row"]["has_filled_initial_form"] | null
    languageLearned: Database["public"]["Tables"]["profiles"]["Row"]["language_learned"] | null
    isSubscribed: Database["public"]["Tables"]["profiles"]["Row"]["subscribed"] | null
 } 