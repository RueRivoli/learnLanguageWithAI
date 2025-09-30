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
  textEn: ExpressionRowFetched['translation'];
  expressionSentence: ExpressionRowFetched['expression_sentence'];
  expressionSentenceEn: ExpressionRowFetched['expression_sentence_translation'];
  expressionSentence2: ExpressionRowFetched['expression_sentence_2'];
  expressionSentence2En: ExpressionRowFetched['expression_sentence_2_translation'];
};
