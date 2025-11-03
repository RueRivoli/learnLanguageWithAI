// Mapping des niveaux de difficulté des lessons/stories
export const STORY_LEVELS = {
  1: "very easy",
  2: "easy",
  3: "intermediate",
  4: "advanced",
} as const;

export const parseLesson = (lesson: any): Array<Lesson> => {
  return words.map((word) => ({
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
  }));
};

export const lessonMapping = {
  id: "id",
  title: "title",
  title_en: "titleEn",
  sentence_1: "sentence1",
  sentence_1_en: "sentence1En",
  tip_1: "tip1",
  sentence_2: "sentence2",
  sentence_2_en: "sentence2En",
  tip_2: "tip2",
  sentence_3: "sentence3",
  sentence_3_en: "sentence3En",
  tip_3: "tip3",
  sentence_4: "sentence4",
  sentence_4_en: "sentence4En",
  tip_4: "tip4",
  sentence_5: "sentence5",
  sentence_5_en: "sentence5En",
  tip_5: "tip5",
  sentence_6: "sentence6",
  sentence_6_en: "sentence6En",
  tip_6: "tip6",
  sentence_7: "sentence7",
  sentence_7_en: "sentence7En",
  tip_7: "tip7",
  sentence_8: "sentence8",
  sentence_8_en: "sentence8En",
  tip_8: "tip8",
  sentence_9: "sentence9",
  sentence_9_en: "sentence9En",
  tip_9: "tip9",
  sentence_10: "sentence10",
  sentence_10_en: "sentence10En",
  tip_10: "tip10",
  sentence_11: "sentence11",
  sentence_11_en: "sentence11En",
  sentence_12: "sentence12",
  sentence_12_en: "sentence12En",
  sentence_13: "sentence13",
  sentence_13_en: "sentence13En",
  sentence_14: "sentence14",
  sentence_14_en: "sentence14En",
  sentence_15: "sentence15",
  sentence_15_en: "sentence15En",
  sentence_16: "sentence16",
  sentence_16_en: "sentence16En",
  sentence_17: "sentence17",
  sentence_17_en: "sentence17En",
  sentence_18: "sentence18",
  sentence_18_en: "sentence18En",
  sentence_19: "sentence19",
  sentence_19_en: "sentence19En",
  sentence_20: "sentence20",
  sentence_20_en: "sentence20En",
};

export const lessonFirstTab = { title: "Lesson", icon: "book" };
export const lessonSecondTab = { title: "Rule", icon: "language" };
