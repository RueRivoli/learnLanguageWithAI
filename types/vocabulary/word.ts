import type { Database } from "~/supabase/types";
type WordRowFetched = Database['public']['Tables']['turkish_words']['Row'];

export type WordMetadata = {
  id: WordRowFetched['id'];
  text: WordRowFetched['text'];
}

export type WordContent = {
  id: WordRowFetched['id'];
  role: WordRowFetched['role'];
  text: WordRowFetched['text'];
  translation: WordRowFetched['translation'];
  isMastered: boolean;
}

export type Word = {
  id: WordRowFetched['id'];
  text: WordRowFetched['text'];
  // 1st meaning
  role: WordRowFetched['role'];
  translation: WordRowFetched['translation'];
  sentence: WordRowFetched['word_sentence'];
  sentenceEn: WordRowFetched['word_sentence_translation'];
  // 2nd meaning
  role2: WordRowFetched['role'];
  translation2: WordRowFetched['translation'];
  sentence2: WordRowFetched['word_sentence_2'];
  sentence2En: WordRowFetched['word_sentence_2_translation'];
  // 3rd meaning
  role3: WordRowFetched['role'];
  translation3: WordRowFetched['translation'];
  sentence3: WordRowFetched['word_sentence_2'];
  sentence3En: WordRowFetched['word_sentence_2_translation'];
};
