import type { Database } from "~/supabase/types";
type ExpressionRowFetched = Database['public']['Tables']['turkish_expressions']['Row'];

export type Expression = {
  id: ExpressionRowFetched['id'];
  text: ExpressionRowFetched['text'];
  textEn: ExpressionRowFetched['translation'];
  expressionSentence: ExpressionRowFetched['expression_sentence'];
  expressionSentenceEn: ExpressionRowFetched['expression_sentence_translation'];
  expressionSentence2: ExpressionRowFetched['expression_sentence_2'];
  expressionSentence2En: ExpressionRowFetched['expression_sentence_2_translation'];
};
