import type { Expression } from "~/types/vocabulary/expression";
import type { Word } from "~/types/vocabulary/word";
import type { Database } from "~/supabase/types";

export const vocabularyFirstTab = { 
  title: "Words", 
  icon: "book",
  activeBgColorClass: "bg-gradient-to-r from-blue-500 to-indigo-600",
  activeTxtColorClass: "text-white"
};
export const vocabularySecondTab = { 
  title: "Expressions", 
  icon: "language",
  activeBgColorClass: "bg-gradient-to-br from-purple-500 to-pink-500",
  activeTxtColorClass: "text-white"
};

export const wordsFirstTab = { title: "To Learn", icon: "book" };
export const wordsSecondTab = { title: "Learned", icon: "language" };

export const expressionsFirstTab = { title: "To Learn", icon: "book" };
export const expressionsSecondTab = { title: "Learned", icon: "language" };

export type DatabaseWords = Database['public']['Tables']['turkish_words']['Row']
export type DatabaseExpressions = Database['public']['Tables']['turkish_expressions']['Row']

export const getClassWordRole = (role: string) => {
    switch(role) {
        case 'v':
            return 'badge badge-primary';
        case 'n':
            return 'badge badge-secondary';
        case 'adj':
            return 'badge badge-warning text-white';
        default:
            return 'badge badge-secondary';
    }
}

type WordListFetched = Array<Database['public']['Tables']['turkish_words']['Row'] & {
    turkish_words_knowledge: {
      word_mastered: boolean;
      word_learned: boolean;
    } | null;
  }>;

export const parseWords = (words: WordListFetched): Array<Word> => {
  return words.map((word) => (
    {
        id: word.id,
        text: word.text,
         // 1st meaning
        role: word.role,
        translation: word.translation,
        sentence: word.word_sentence,
        sentenceEn: word.word_sentence_translation,
         // 2nd meaning
        role2: word.role_2,
        translation2: word.translation_2,
        sentence2: word.word_sentence_2,
        sentence2En: word.word_sentence_2_translation,
         // 3rd meaning
        role3: word.role_3,
        translation3: word.translation_3,
        sentence3: word.word_sentence_3,
        sentence3En: word.word_sentence_3_translation,
    }))
}

type ExpressionListFetched = Array<Database['public']['Tables']['turkish_expressions']['Row']>;

export const parseExpressions = (expressions: ExpressionListFetched) : Array<Expression> => {
    return expressions.map((expr) => (
      {
        id: expr.id,
        text: expr.text,
        translation: expr.translation,
        sentence: expr.expression_sentence,
        sentenceEn: expr.expression_sentence_translation,
        sentence2: expr.expression_sentence_2,
        sentence2En: expr.expression_sentence_2_translation,
      }))
  }