import type { Database } from "~/supabase/types";
type WordRowFetched = Database['public']['Tables']['turkish_words']['Row'];
export type Word = {
  id: WordRowFetched['id'];
  text: WordRowFetched['text'];
  translation: WordRowFetched['translation'];
  role: WordRowFetched['role'];
  wordSentence: WordRowFetched['word_sentence'];
  wordSentenceEn: WordRowFetched['word_sentence_translation'];
  wordSentence2: WordRowFetched['word_sentence_2'];
  wordSentence2En: WordRowFetched['word_sentence_2_translation'];
};
