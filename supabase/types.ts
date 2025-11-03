export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4";
  };
  public: {
    Tables: {
      profiles: {
        Row: {
          credits_available: number | null;
          credits_purchased_total: number | null;
          email: string | null;
          first_name: string | null;
          full_name: string | null;
          has_filled_initial_form: boolean | null;
          id: string;
          initials: string | null;
          language_learned: string | null;
          last_credit_purchase_date: string | null;
          last_name: string | null;
          pseudo: string | null;
          second_language_learned: string | null;
        };
        Insert: {
          credits_available?: number | null;
          credits_purchased_total?: number | null;
          email?: string | null;
          first_name?: string | null;
          full_name?: string | null;
          has_filled_initial_form?: boolean | null;
          id: string;
          initials?: string | null;
          language_learned?: string | null;
          last_credit_purchase_date?: string | null;
          last_name?: string | null;
          pseudo?: string | null;
          second_language_learned?: string | null;
        };
        Update: {
          credits_available?: number | null;
          credits_purchased_total?: number | null;
          email?: string | null;
          first_name?: string | null;
          full_name?: string | null;
          has_filled_initial_form?: boolean | null;
          id?: string;
          initials?: string | null;
          language_learned?: string | null;
          last_credit_purchase_date?: string | null;
          last_name?: string | null;
          pseudo?: string | null;
          second_language_learned?: string | null;
        };
        Relationships: [];
      };
      turkish_expressions: {
        Row: {
          created_at: string;
          explanation: string | null;
          expression_sentence: string | null;
          expression_sentence_2: string | null;
          expression_sentence_2_translation: string | null;
          expression_sentence_translation: string | null;
          family: string | null;
          id: number;
          litteral_translation: string | null;
          text: string | null;
          translation: string | null;
          usage: string | null;
        };
        Insert: {
          created_at?: string;
          explanation?: string | null;
          expression_sentence?: string | null;
          expression_sentence_2?: string | null;
          expression_sentence_2_translation?: string | null;
          expression_sentence_translation?: string | null;
          family?: string | null;
          id?: number;
          litteral_translation?: string | null;
          text?: string | null;
          translation?: string | null;
          usage?: string | null;
        };
        Update: {
          created_at?: string;
          explanation?: string | null;
          expression_sentence?: string | null;
          expression_sentence_2?: string | null;
          expression_sentence_2_translation?: string | null;
          expression_sentence_translation?: string | null;
          family?: string | null;
          id?: number;
          litteral_translation?: string | null;
          text?: string | null;
          translation?: string | null;
          usage?: string | null;
        };
        Relationships: [];
      };
      turkish_expressions_knowledge: {
        Row: {
          created_at: string;
          expression_id: number | null;
          expression_learned: boolean | null;
          expression_mastered: boolean | null;
          id: number;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          expression_id?: number | null;
          expression_learned?: boolean | null;
          expression_mastered?: boolean | null;
          id?: number;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          expression_id?: number | null;
          expression_learned?: boolean | null;
          expression_mastered?: boolean | null;
          id?: number;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "turkish_expressions_knowledge_expression_id_fkey";
            columns: ["expression_id"];
            isOneToOne: true;
            referencedRelation: "turkish_expressions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "turkish_expressions_knowledge_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      turkish_grammar_quizzes: {
        Row: {
          correct_answer: string | null;
          created_at: string;
          difficulty_status: number | null;
          grammar_rule_id: number | null;
          id: number;
          note: string | null;
          option_1: string;
          option_2: string;
          option_3: string;
          option_4: string;
          question_type: number | null;
          text: string | null;
        };
        Insert: {
          correct_answer?: string | null;
          created_at?: string;
          difficulty_status?: number | null;
          grammar_rule_id?: number | null;
          id?: number;
          note?: string | null;
          option_1: string;
          option_2: string;
          option_3: string;
          option_4: string;
          question_type?: number | null;
          text?: string | null;
        };
        Update: {
          correct_answer?: string | null;
          created_at?: string;
          difficulty_status?: number | null;
          grammar_rule_id?: number | null;
          id?: number;
          note?: string | null;
          option_1?: string;
          option_2?: string;
          option_3?: string;
          option_4?: string;
          question_type?: number | null;
          text?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "turkish_grammar_quiz_grammar_rule_id_fkey";
            columns: ["grammar_rule_id"];
            isOneToOne: false;
            referencedRelation: "turkish_grammar_rules";
            referencedColumns: ["id"];
          },
        ];
      };
      turkish_grammar_rules: {
        Row: {
          bookmarked: boolean | null;
          checkedBy: string | null;
          created_at: string;
          description: string | null;
          difficulty_class: number | null;
          extended_description: string | null;
          filledWithAI: boolean | null;
          highlights: string | null;
          id: number;
          intro: string | null;
          position: number | null;
          rule_name: string;
          rule_name_translation: string | null;
          symbol: string | null;
          type: string | null;
        };
        Insert: {
          bookmarked?: boolean | null;
          checkedBy?: string | null;
          created_at?: string;
          description?: string | null;
          difficulty_class?: number | null;
          extended_description?: string | null;
          filledWithAI?: boolean | null;
          highlights?: string | null;
          id?: number;
          intro?: string | null;
          position?: number | null;
          rule_name: string;
          rule_name_translation?: string | null;
          symbol?: string | null;
          type?: string | null;
        };
        Update: {
          bookmarked?: boolean | null;
          checkedBy?: string | null;
          created_at?: string;
          description?: string | null;
          difficulty_class?: number | null;
          extended_description?: string | null;
          filledWithAI?: boolean | null;
          highlights?: string | null;
          id?: number;
          intro?: string | null;
          position?: number | null;
          rule_name?: string;
          rule_name_translation?: string | null;
          symbol?: string | null;
          type?: string | null;
        };
        Relationships: [];
      };
      turkish_grammar_scores: {
        Row: {
          created_at: string;
          id: number;
          rule_id: number | null;
          score: number | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          rule_id?: number | null;
          score?: number | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          rule_id?: number | null;
          score?: number | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "turkish_grammar_scores_rule_id_fkey";
            columns: ["rule_id"];
            isOneToOne: false;
            referencedRelation: "turkish_grammar_rules";
            referencedColumns: ["id"];
          },
        ];
      };
      turkish_lesson_expressions: {
        Row: {
          created_at: string;
          expression_id: number | null;
          id: number;
          lesson_id: number | null;
        };
        Insert: {
          created_at?: string;
          expression_id?: number | null;
          id?: number;
          lesson_id?: number | null;
        };
        Update: {
          created_at?: string;
          expression_id?: number | null;
          id?: number;
          lesson_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "turkish_lesson_expressions_expression_id_fkey";
            columns: ["expression_id"];
            isOneToOne: false;
            referencedRelation: "turkish_expressions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "turkish_lesson_expressions_lesson_id_fkey";
            columns: ["lesson_id"];
            isOneToOne: false;
            referencedRelation: "turkish_lessons";
            referencedColumns: ["id"];
          },
        ];
      };
      turkish_lesson_words: {
        Row: {
          created_at: string;
          id: number;
          lesson_id: number | null;
          word_id: number | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          lesson_id?: number | null;
          word_id?: number | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          lesson_id?: number | null;
          word_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "turkish_lesson_words_lesson_id_fkey";
            columns: ["lesson_id"];
            isOneToOne: false;
            referencedRelation: "turkish_lessons";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "turkish_lesson_words_word_id_fkey";
            columns: ["word_id"];
            isOneToOne: false;
            referencedRelation: "turkish_words";
            referencedColumns: ["id"];
          },
        ];
      };
      turkish_lessons: {
        Row: {
          conclusion: string | null;
          created_at: string;
          grammar_rule_id: number | null;
          id: number;
          img_url: string | null;
          introduction: string | null;
          promptForImageGeneration: string | null;
          quiz_id: number | null;
          sentence_1: string | null;
          sentence_1_en: string | null;
          sentence_10: string | null;
          sentence_10_en: string | null;
          sentence_11: string | null;
          sentence_11_en: string | null;
          sentence_12: string | null;
          sentence_12_en: string | null;
          sentence_13: string | null;
          sentence_13_en: string | null;
          sentence_14: string | null;
          sentence_14_en: string | null;
          sentence_15: string | null;
          sentence_15_en: string | null;
          sentence_16: string | null;
          sentence_16_en: string | null;
          sentence_17: string | null;
          sentence_17_en: string | null;
          sentence_18: string | null;
          sentence_18_en: string | null;
          sentence_19: string | null;
          sentence_19_en: string | null;
          sentence_2: string | null;
          sentence_2_en: string | null;
          sentence_20: string | null;
          sentence_20_en: string | null;
          sentence_3: string | null;
          sentence_3_en: string | null;
          sentence_4: string | null;
          sentence_4_en: string | null;
          sentence_5: string | null;
          sentence_5_en: string | null;
          sentence_6: string | null;
          sentence_6_en: string | null;
          sentence_7: string | null;
          sentence_7_en: string | null;
          sentence_8: string | null;
          sentence_8_en: string | null;
          sentence_9: string | null;
          sentence_9_en: string | null;
          title: string | null;
          title_en: string | null;
          user_id: string | null;
        };
        Insert: {
          conclusion?: string | null;
          created_at?: string;
          grammar_rule_id?: number | null;
          id?: number;
          img_url?: string | null;
          introduction?: string | null;
          promptForImageGeneration?: string | null;
          quiz_id?: number | null;
          sentence_1?: string | null;
          sentence_1_en?: string | null;
          sentence_10?: string | null;
          sentence_10_en?: string | null;
          sentence_11?: string | null;
          sentence_11_en?: string | null;
          sentence_12?: string | null;
          sentence_12_en?: string | null;
          sentence_13?: string | null;
          sentence_13_en?: string | null;
          sentence_14?: string | null;
          sentence_14_en?: string | null;
          sentence_15?: string | null;
          sentence_15_en?: string | null;
          sentence_16?: string | null;
          sentence_16_en?: string | null;
          sentence_17?: string | null;
          sentence_17_en?: string | null;
          sentence_18?: string | null;
          sentence_18_en?: string | null;
          sentence_19?: string | null;
          sentence_19_en?: string | null;
          sentence_2?: string | null;
          sentence_2_en?: string | null;
          sentence_20?: string | null;
          sentence_20_en?: string | null;
          sentence_3?: string | null;
          sentence_3_en?: string | null;
          sentence_4?: string | null;
          sentence_4_en?: string | null;
          sentence_5?: string | null;
          sentence_5_en?: string | null;
          sentence_6?: string | null;
          sentence_6_en?: string | null;
          sentence_7?: string | null;
          sentence_7_en?: string | null;
          sentence_8?: string | null;
          sentence_8_en?: string | null;
          sentence_9?: string | null;
          sentence_9_en?: string | null;
          title?: string | null;
          title_en?: string | null;
          user_id?: string | null;
        };
        Update: {
          conclusion?: string | null;
          created_at?: string;
          grammar_rule_id?: number | null;
          id?: number;
          img_url?: string | null;
          introduction?: string | null;
          promptForImageGeneration?: string | null;
          quiz_id?: number | null;
          sentence_1?: string | null;
          sentence_1_en?: string | null;
          sentence_10?: string | null;
          sentence_10_en?: string | null;
          sentence_11?: string | null;
          sentence_11_en?: string | null;
          sentence_12?: string | null;
          sentence_12_en?: string | null;
          sentence_13?: string | null;
          sentence_13_en?: string | null;
          sentence_14?: string | null;
          sentence_14_en?: string | null;
          sentence_15?: string | null;
          sentence_15_en?: string | null;
          sentence_16?: string | null;
          sentence_16_en?: string | null;
          sentence_17?: string | null;
          sentence_17_en?: string | null;
          sentence_18?: string | null;
          sentence_18_en?: string | null;
          sentence_19?: string | null;
          sentence_19_en?: string | null;
          sentence_2?: string | null;
          sentence_2_en?: string | null;
          sentence_20?: string | null;
          sentence_20_en?: string | null;
          sentence_3?: string | null;
          sentence_3_en?: string | null;
          sentence_4?: string | null;
          sentence_4_en?: string | null;
          sentence_5?: string | null;
          sentence_5_en?: string | null;
          sentence_6?: string | null;
          sentence_6_en?: string | null;
          sentence_7?: string | null;
          sentence_7_en?: string | null;
          sentence_8?: string | null;
          sentence_8_en?: string | null;
          sentence_9?: string | null;
          sentence_9_en?: string | null;
          title?: string | null;
          title_en?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "turkish_lessons_grammar_rule_id_fkey";
            columns: ["grammar_rule_id"];
            isOneToOne: false;
            referencedRelation: "turkish_grammar_rules";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "turkish_lessons_quiz_id_fkey";
            columns: ["quiz_id"];
            isOneToOne: true;
            referencedRelation: "turkish_quizzes_result";
            referencedColumns: ["id"];
          },
        ];
      };
      turkish_quizzes_result: {
        Row: {
          created_at: string;
          id: number;
          rule_id: number | null;
          score_global: number | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          rule_id?: number | null;
          score_global?: number | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          rule_id?: number | null;
          score_global?: number | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "turkish_quizzes_result_rule_id_fkey";
            columns: ["rule_id"];
            isOneToOne: false;
            referencedRelation: "turkish_grammar_rules";
            referencedColumns: ["id"];
          },
        ];
      };
      turkish_quizzes_series: {
        Row: {
          created_at: string;
          id: number;
          question_id: number | null;
          quiz_id: number | null;
          selected_answer: number | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          question_id?: number | null;
          quiz_id?: number | null;
          selected_answer?: number | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          question_id?: number | null;
          quiz_id?: number | null;
          selected_answer?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "turkish_quizzes_series_question_id_fkey";
            columns: ["question_id"];
            isOneToOne: false;
            referencedRelation: "turkish_grammar_quizzes";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "turkish_quizzes_series_quiz_id_fkey";
            columns: ["quiz_id"];
            isOneToOne: false;
            referencedRelation: "turkish_quizzes_result";
            referencedColumns: ["id"];
          },
        ];
      };
      turkish_vocabulary_scores: {
        Row: {
          created_at: string;
          expressions_learned_count: number | null;
          expressions_mastered_count: number | null;
          id: number;
          language: string | null;
          user_id: string | null;
          words_learned_count: number | null;
          words_mastered_count: number | null;
        };
        Insert: {
          created_at?: string;
          expressions_learned_count?: number | null;
          expressions_mastered_count?: number | null;
          id?: number;
          language?: string | null;
          user_id?: string | null;
          words_learned_count?: number | null;
          words_mastered_count?: number | null;
        };
        Update: {
          created_at?: string;
          expressions_learned_count?: number | null;
          expressions_mastered_count?: number | null;
          id?: number;
          language?: string | null;
          user_id?: string | null;
          words_learned_count?: number | null;
          words_mastered_count?: number | null;
        };
        Relationships: [];
      };
      turkish_words: {
        Row: {
          created_at: string;
          frecuency_class: number | null;
          id: number;
          role: string | null;
          role_2: string | null;
          role_3: string | null;
          text: string | null;
          translation: string | null;
          translation_2: string | null;
          translation_3: string | null;
          word_sentence: string | null;
          word_sentence_2: string | null;
          word_sentence_2_translation: string | null;
          word_sentence_3: string | null;
          word_sentence_3_translation: string | null;
          word_sentence_translation: string | null;
        };
        Insert: {
          created_at?: string;
          frecuency_class?: number | null;
          id?: number;
          role?: string | null;
          role_2?: string | null;
          role_3?: string | null;
          text?: string | null;
          translation?: string | null;
          translation_2?: string | null;
          translation_3?: string | null;
          word_sentence?: string | null;
          word_sentence_2?: string | null;
          word_sentence_2_translation?: string | null;
          word_sentence_3?: string | null;
          word_sentence_3_translation?: string | null;
          word_sentence_translation?: string | null;
        };
        Update: {
          created_at?: string;
          frecuency_class?: number | null;
          id?: number;
          role?: string | null;
          role_2?: string | null;
          role_3?: string | null;
          text?: string | null;
          translation?: string | null;
          translation_2?: string | null;
          translation_3?: string | null;
          word_sentence?: string | null;
          word_sentence_2?: string | null;
          word_sentence_2_translation?: string | null;
          word_sentence_3?: string | null;
          word_sentence_3_translation?: string | null;
          word_sentence_translation?: string | null;
        };
        Relationships: [];
      };
      turkish_words_knowledge: {
        Row: {
          created_at: string;
          id: number;
          user_id: string;
          word_id: number | null;
          word_learned: boolean | null;
          word_mastered: boolean | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          user_id?: string;
          word_id?: number | null;
          word_learned?: boolean | null;
          word_mastered?: boolean | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          user_id?: string;
          word_id?: number | null;
          word_learned?: boolean | null;
          word_mastered?: boolean | null;
        };
        Relationships: [
          {
            foreignKeyName: "turkish_words_knowledge_word_id_fkey";
            columns: ["word_id"];
            isOneToOne: false;
            referencedRelation: "turkish_words";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      has_enough_credits: {
        Args: { required_tokens: number; user_id: string };
        Returns: boolean;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
