import type { Expression } from "~/types/expression.ts";
import type { Word } from "~/types/word.ts";
import type { Database } from "~/supabase/types";

export const vocabularyFirstTab = { title: "Words", icon: "book" };
export const vocabularySecondTab = { title: "Expressions", icon: "language" };

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
        wordSentence: word.word_sentence,
        wordSentenceEn: word.word_sentence_translation,
         // 2nd meaning
         role2: word.role_2,
         translation2: word.translation_2,
         wordSentence2: word.word_sentence_2,
         wordSentence2En: word.word_sentence_2_translation,
         // 3rd meaning
         role3: word.role_3,
         translation3: word.translation_3,
        wordSentence3: word.word_sentence_3,
        wordSentence3En: word.word_sentence_3_translation,
    }))
}

type ExpressionListFetched = Array<Database['public']['Tables']['turkish_expressions']['Row']>;

export const parseExpressions = (expressions: ExpressionListFetched) : Array<Expression> => {
    return expressions.map((expr) => (
      {
        id: expr.id,
        text: expr.text,
        textEn: expr.translation,
        expressionSentence: expr.expression_sentence,
        expressionSentenceEn: expr.expression_sentence_translation,
        expressionSentence2: expr.expression_sentence_2,
        expressionSentence2En: expr.expression_sentence_2_translation,
      }))
  }