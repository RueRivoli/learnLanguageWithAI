import type { Database } from "~/supabase/types";
type WordRowFetched = Database['public']['Tables']['turkish_words']['Row'];
export type Word = {
  id: WordRowFetched['id'];
  text: WordRowFetched['text'];
  // 1st meaning
  role: WordRowFetched['role'];
  translation: WordRowFetched['translation'];
  wordSentence: WordRowFetched['word_sentence'];
  wordSentenceEn: WordRowFetched['word_sentence_translation'];
  // 2nd meaning
  role2: WordRowFetched['role'];
  translation2: WordRowFetched['translation'];
  wordSentence2: WordRowFetched['word_sentence_2'];
  wordSentence2En: WordRowFetched['word_sentence_2_translation'];
  // 3rd meaning
  role3: WordRowFetched['role'];
  translation3: WordRowFetched['translation'];
  wordSentence3: WordRowFetched['word_sentence_2'];
  wordSentence3En: WordRowFetched['word_sentence_2_translation'];
};
