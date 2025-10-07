import type { Database } from "~/supabase/types";
type ExpressionRowFetched = Database['public']['Tables']['turkish_expressions']['Row'];

export type ExpressionMetadata = {
  id: ExpressionRowFetched['id'];
  text: ExpressionRowFetched['text'];
}


export type ExpressionContent = {
  id: ExpressionRowFetched['id'];
  text: ExpressionRowFetched['text'];
  textEn: ExpressionRowFetched['translation'];
  isMastered: boolean;
};

export type Expression = {
  id: ExpressionRowFetched['id'];
  text: ExpressionRowFetched['text'];
  translation: ExpressionRowFetched['translation'];
  sentence: ExpressionRowFetched['expression_sentence'];
  sentenceEn: ExpressionRowFetched['expression_sentence_translation'];
  sentence2: ExpressionRowFetched['expression_sentence_2'];
  sentence2En: ExpressionRowFetched['expression_sentence_2_translation'];
};
