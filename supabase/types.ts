export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          has_filled_initial_form: boolean | null
          id: string
          initials: string | null
          language_learned: string | null
          subscribed: boolean | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          has_filled_initial_form?: boolean | null
          id?: string
          initials?: string | null
          language_learned?: string | null
          subscribed?: boolean | null
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          has_filled_initial_form?: boolean | null
          id?: string
          initials?: string | null
          language_learned?: string | null
          subscribed?: boolean | null
        }
        Relationships: []
      }
      turkish_expressions: {
        Row: {
          created_at: string
          expression_sentence: string | null
          expression_sentence_2: string | null
          expression_sentence_2_translation: string | null
          expression_sentence_translation: string | null
          id: number
          text: string | null
          translation: string | null
        }
        Insert: {
          created_at?: string
          expression_sentence?: string | null
          expression_sentence_2?: string | null
          expression_sentence_2_translation?: string | null
          expression_sentence_translation?: string | null
          id?: number
          text?: string | null
          translation?: string | null
        }
        Update: {
          created_at?: string
          expression_sentence?: string | null
          expression_sentence_2?: string | null
          expression_sentence_2_translation?: string | null
          expression_sentence_translation?: string | null
          id?: number
          text?: string | null
          translation?: string | null
        }
        Relationships: []
      }
      turkish_grammar_knowledge: {
        Row: {
          created_at: string
          grammar_rule_id: number | null
          id: number
          status: number | null
          user_id: number | null
        }
        Insert: {
          created_at?: string
          grammar_rule_id?: number | null
          id?: number
          status?: number | null
          user_id?: number | null
        }
        Update: {
          created_at?: string
          grammar_rule_id?: number | null
          id?: number
          status?: number | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "turkish_grammar_knowledge_grammar_rule_id_fkey"
            columns: ["grammar_rule_id"]
            isOneToOne: false
            referencedRelation: "turkish_grammar_rules"
            referencedColumns: ["id"]
          },
        ]
      }
      turkish_grammar_quizzes: {
        Row: {
          correct_answer: string | null
          created_at: string
          difficulty_status: number | null
          grammar_rule_id: number | null
          id: number
          option_1: string | null
          option_2: string | null
          option_3: string | null
          option_4: string | null
          question_type: number | null
          text: string | null
          translation: string | null
        }
        Insert: {
          correct_answer?: string | null
          created_at?: string
          difficulty_status?: number | null
          grammar_rule_id?: number | null
          id?: number
          option_1?: string | null
          option_2?: string | null
          option_3?: string | null
          option_4?: string | null
          question_type?: number | null
          text?: string | null
          translation?: string | null
        }
        Update: {
          correct_answer?: string | null
          created_at?: string
          difficulty_status?: number | null
          grammar_rule_id?: number | null
          id?: number
          option_1?: string | null
          option_2?: string | null
          option_3?: string | null
          option_4?: string | null
          question_type?: number | null
          text?: string | null
          translation?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "turkish_grammar_quiz_grammar_rule_id_fkey"
            columns: ["grammar_rule_id"]
            isOneToOne: false
            referencedRelation: "turkish_grammar_rules"
            referencedColumns: ["id"]
          },
        ]
      }
      turkish_grammar_rules: {
        Row: {
          created_at: string
          description: string | null
          difficulty_class: number | null
          id: number
          rule_name: string | null
          rule_name_translation: string | null
          sentence_example: string | null
          sentence_example_2: string | null
          sentence_example_2_translation: string | null
          sentence_example_translation: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          difficulty_class?: number | null
          id?: number
          rule_name?: string | null
          rule_name_translation?: string | null
          sentence_example?: string | null
          sentence_example_2?: string | null
          sentence_example_2_translation?: string | null
          sentence_example_translation?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          difficulty_class?: number | null
          id?: number
          rule_name?: string | null
          rule_name_translation?: string | null
          sentence_example?: string | null
          sentence_example_2?: string | null
          sentence_example_2_translation?: string | null
          sentence_example_translation?: string | null
        }
        Relationships: []
      }
      turkish_grammar_scores: {
        Row: {
          created_at: string
          id: number
          rule_id: number | null
          score: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          rule_id?: number | null
          score?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          rule_id?: number | null
          score?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "turkish_grammar_scores_rule_id_fkey"
            columns: ["rule_id"]
            isOneToOne: false
            referencedRelation: "turkish_grammar_rules"
            referencedColumns: ["id"]
          },
        ]
      }
      turkish_lesson_words: {
        Row: {
          created_at: string
          id: number
          lesson_id: number | null
          word_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          lesson_id?: number | null
          word_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          lesson_id?: number | null
          word_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "turkish_lesson_words_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "turkish_lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "turkish_lesson_words_word_id_fkey"
            columns: ["word_id"]
            isOneToOne: false
            referencedRelation: "turkish_words"
            referencedColumns: ["id"]
          },
        ]
      }
      turkish_lessons: {
        Row: {
          content: string | null
          content_en: string | null
          created_at: string
          grammar_rule_id: number | null
          id: number
          quiz_id: number | null
          title: string | null
          title_en: string | null
          user_id: number | null
        }
        Insert: {
          content?: string | null
          content_en?: string | null
          created_at?: string
          grammar_rule_id?: number | null
          id?: number
          quiz_id?: number | null
          title?: string | null
          title_en?: string | null
          user_id?: number | null
        }
        Update: {
          content?: string | null
          content_en?: string | null
          created_at?: string
          grammar_rule_id?: number | null
          id?: number
          quiz_id?: number | null
          title?: string | null
          title_en?: string | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "turkish_lessons_grammar_rule_id_fkey"
            columns: ["grammar_rule_id"]
            isOneToOne: false
            referencedRelation: "turkish_grammar_rules"
            referencedColumns: ["id"]
          },
        ]
      }
      turkish_quizzes_result: {
        Row: {
          created_at: string
          id: number
          score_global: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          score_global?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          score_global?: number | null
        }
        Relationships: []
      }
      turkish_quizzes_series: {
        Row: {
          created_at: string
          id: number
          question_id: number | null
          quiz_id: number | null
          selected_answer: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          question_id?: number | null
          quiz_id?: number | null
          selected_answer?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          question_id?: number | null
          quiz_id?: number | null
          selected_answer?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "turkish_quizzes_series_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "turkish_grammar_quizzes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "turkish_quizzes_series_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "turkish_quizzes_result"
            referencedColumns: ["id"]
          },
        ]
      }
      turkish_words: {
        Row: {
          created_at: string
          frecuency_class: number | null
          id: number
          role: string | null
          text: string | null
          translation: string | null
          word_sentence: string | null
          word_sentence_2: string | null
          word_sentence_2_translation: string | null
          word_sentence_translation: string | null
        }
        Insert: {
          created_at?: string
          frecuency_class?: number | null
          id?: number
          role?: string | null
          text?: string | null
          translation?: string | null
          word_sentence?: string | null
          word_sentence_2?: string | null
          word_sentence_2_translation?: string | null
          word_sentence_translation?: string | null
        }
        Update: {
          created_at?: string
          frecuency_class?: number | null
          id?: number
          role?: string | null
          text?: string | null
          translation?: string | null
          word_sentence?: string | null
          word_sentence_2?: string | null
          word_sentence_2_translation?: string | null
          word_sentence_translation?: string | null
        }
        Relationships: []
      }
      turkish_words_knowledge: {
        Row: {
          created_at: string
          id: number
          know_word: boolean | null
          master_word: boolean | null
          user_id: string | null
          word_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          know_word?: boolean | null
          master_word?: boolean | null
          user_id?: string | null
          word_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          know_word?: boolean | null
          master_word?: boolean | null
          user_id?: string | null
          word_id?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
