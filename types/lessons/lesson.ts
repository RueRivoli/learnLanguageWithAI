export type Lesson = {
  id: number;
  title: string;
  titleEn: string;
  introduction?: string;
  imgUrl?: string;
  symbol?: string;
  quizId?: number;
  level: number;
  grammarRuleId?: number;
  newWords: Array<{
    text: string;
    // 1st meaning
    role: string;
    translation: string;
    sentence: string;
    sentenceEn: string;
    // 2nd meaning
    role2: string;
    translation2: string;
    sentence2: string;
    sentence2En: string;
    // 3rd meaning
    role3: string;
    translation3: string;
    sentence3: string;
    sentence3En: string;
  }>;
  newExpressions: Array<{
    text: string;
    // only one meaning
    translation: string;
    // 1st example
    sentence: string;
    sentenceEn: string;
    // 2nd example
    sentence2: string;
    sentence2En: string;
  }>;
  grammarRuleName: string;
  grammarRuleNameEn: string;
  grammarRuleIntro: string;
  grammarRuleDescription: string;
  grammarRuleExtendedDescription: string;
  notes: string;
  sentence1: string | null;
  sentence1En: string | null;
  sentence2: string | null;
  sentence2En: string | null;
  sentence3: string | null;
  sentence3En: string | null;
  sentence4: string | null;
  sentence4En: string | null;
  sentence5: string | null;
  sentence5En: string | null;
  sentence6: string | null;
  sentence6En: string | null;
  sentence7: string | null;
  sentence7En: string | null;
  sentence8: string | null;
  sentence8En: string | null;
  sentence9: string | null;
  sentence9En: string | null;
  sentence10: string | null;
  sentence10En: string | null;
  sentence11: string | null;
  sentence11En: string | null;
  sentence12: string | null;
  sentence12En: string | null;
  sentence13: string | null;
  sentence13En: string | null;
  sentence14: string | null;
  sentence14En: string | null;
  sentence15: string | null;
  sentence15En: string | null;
  sentence16: string | null;
  sentence16En: string | null;
  sentence17: string | null;
  sentence17En: string | null;
  sentence18: string | null;
  sentence18En: string | null;
  sentence19: string | null;
  sentence19En: string | null;
  sentence20: string | null;
  sentence20En: string | null;
};
