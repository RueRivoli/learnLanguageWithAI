import type { Lesson } from "~/types/lessons/lesson";
import { lessonMapping } from "~/utils/learning/lesson";
import type { GrammarRule } from "~/types/modules/grammar-rule";
import { parseRuleData } from "~/utils/learning/grammar";
import { lessonUpdateBus } from "./useLessonUpdates";

export interface LessonWithRelatedData {
  lesson: Lesson | null;
  grammarRule: GrammarRule | null;
  relatedQuiz: any | null;
  isLoading: boolean;
  error: string | null;
}

export const useLesson = (lessonId: string | Ref<string>) => {
  // Convert to reactive reference if needed
  const reactiveLessonId = typeof lessonId === 'string' ? ref(lessonId) : lessonId;
  
  // Reactive state
  const isLoading = ref(true);
  const error = ref<string | null>(null);
  const lesson = ref<Lesson | null>(null);
  const grammarRule = ref<GrammarRule | null>(null);
  const grammarRuleLoading = ref(false);
  const relatedQuiz = ref<any | null>(null);

  // Transform function to map API response to Lesson type
  const transformLessonData = (rawData: any): Lesson => {
    return {
      ...Object.fromEntries(
        Object.entries(lessonMapping).map(([sourceKey, targetKey]) => [
          targetKey,
          rawData[sourceKey],
        ]),
      ),
      grammarRuleName: rawData.turkish_grammar_rules.rule_name,
      grammarRuleNameEn: rawData.turkish_grammar_rules.rule_name_translation,
      grammarRuleIntro: rawData.turkish_grammar_rules.intro,
      grammarRuleDescription: rawData.turkish_grammar_rules.description,
      grammarRuleExtendedDescription: rawData.turkish_grammar_rules.extended_description,
      introduction: rawData.introduction,
      grammarRuleId: rawData.grammar_rule_id,
      level: rawData.turkish_grammar_rules.difficulty_class,
      imgUrl: rawData.img_url,
      quizId: rawData.quiz_id,
      newWords: rawData.turkish_lesson_words
        ?.map((w: any) => w.turkish_words)
        ?.map(
          ({
            text,
            translation,
            word_sentence,
            word_sentence_translation,
            word_sentence_2,
            word_sentence_2_translation,
          }: any) => ({
            text,
            textEn: translation,
            sentence: word_sentence,
            sentenceEn: word_sentence_translation,
            sentence2: word_sentence_2,
            sentence2En: word_sentence_2_translation,
          }),
        ) || [],
      newExpressions: rawData.turkish_lesson_expressions
        ?.map((w: any) => w.turkish_expressions)
        ?.map(
          ({
            text,
            translation,
            expression_sentence,
            expression_sentence_translation,
            expression_sentence_2,
            expression_sentence_2_translation,
          }: any) => ({
            text,
            textEn: translation,
            sentence: expression_sentence,
            sentenceEn: expression_sentence_translation,
            sentence2: expression_sentence_2,
            sentence2En: expression_sentence_2_translation,
          })
        ) || []
    };
  };

  // Fetch grammar rule
  const fetchGrammarRule = async (grammarRuleId: number) => {
    if (!grammarRuleId) return;
    
    try {
      grammarRuleLoading.value = true;
      const { data, error: grammarError } = await useFetch(`/api/grammar/${grammarRuleId}`);
      
      if (grammarError.value) throw grammarError.value;
      
      if (data.value) {
        grammarRule.value = parseRuleData(data.value as any);
      }
    } catch (err) {
      console.error("Error fetching grammar rule:", err);
    } finally {
      grammarRuleLoading.value = false;
    }
  };

  // Main lesson fetching function using useAsyncData for best practices
  const { data: lessonData, error: fetchError, refresh: refreshLesson, pending } = useAsyncData(
    `lesson-${reactiveLessonId.value}`,
    async () => {
        console.log("fetching lesson nb", reactiveLessonId.value);
      const lessonData = await $fetch(`/api/lessons/${reactiveLessonId.value}`);
      if (!lessonData) throw new Error('Lesson not found');
      return lessonData;
    },
    {
      // Key changes when lessonId changes - automatically refetches
      key: computed(() => `lesson-${reactiveLessonId.value}`),
      
      // Transform the data
      transform: (rawData: any) => {
        const transformedLesson = transformLessonData(rawData);
        
        // Set related quiz data
        if (rawData.turkish_quizzes_result) {
          relatedQuiz.value = { 
            score: rawData.turkish_quizzes_result.score_global, 
            createdAt: rawData.turkish_quizzes_result.created_at, 
            id: rawData.turkish_quizzes_result.id 
          };
        }
        
        return transformedLesson;
      },
      
      // Default value
      default: () => null,
      
      // Server-side rendering
      server: true,
      
      // Client-side hydration
      client: true,
    }
  );

  // Watch for lesson data changes and fetch grammar rule
  watch(lessonData, async (newLesson) => {
    console.log("watch lessonData", newLesson);
    if (newLesson && newLesson.grammarRuleId) {
      await fetchGrammarRule(newLesson.grammarRuleId);
    }
    lesson.value = newLesson;
    isLoading.value = false;
  }, { immediate: true });

  // Watch for fetch errors
  watch(fetchError, (newError) => {
    if (newError) {
      error.value = newError.message || 'Failed to fetch lesson';
      isLoading.value = false;
    } else {
      error.value = null;
    }
  });

  // Watch for pending state
  watch(pending, (isPending) => {
    isLoading.value = isPending;
  });

  // Manual refresh function
  const refresh = async () => {
    error.value = null;
    await refreshLesson();
  };

  // Listen for lesson updates and auto-refresh when needed
  const { subscribeToLessonUpdates } = lessonUpdateBus;
  
  // Subscribe to updates for this specific lesson
  console.log('🔗 Subscribing to lesson updates for lessonId:', reactiveLessonId.value);
  const unsubscribe = subscribeToLessonUpdates(reactiveLessonId.value, (event) => {
    console.log('📡 Lesson update event received:', {
      lessonId: reactiveLessonId.value,
      eventType: event.type,
      eventData: event.data,
      timestamp: event.timestamp
    });
    
    // Auto-refresh on certain events
    if (['quiz_completed', 'lesson_modified', 'score_updated', 'image_modified'].includes(event.type)) {
      console.log('🔄 Auto-refreshing lesson due to update:', event.type);
      refresh();
    }
  });

  // Cleanup subscription on unmount
  onUnmounted(() => {
    unsubscribe();
  });

  // Computed properties
  const hasError = computed(() => !!error.value);
  const isReady = computed(() => !isLoading.value && !error.value && !!lesson.value);

  // Computed sentences for template usage
  const sentences = computed(() => {
    if (!lesson.value) return [];
    
    const phrases = [];
    let i = 0;
    
    while ((lesson.value as any)[`sentence${i + 1}`]) {
      phrases.push({
        original: (lesson.value as any)[`sentence${i + 1}`],
        translation: (lesson.value as any)[`sentence${i + 1}En`],
      });
      i++;
    }
    
    return phrases;
  });

  // Image URL with fallback
  const imageUrl = computed(() => {
    return lesson.value?.imgUrl;
  });

  return {
    // Reactive data
    lesson: readonly(lesson),
    grammarRule: readonly(grammarRule),
    relatedQuiz: readonly(relatedQuiz),
    isLoading: readonly(isLoading),
    grammarRuleLoading: readonly(grammarRuleLoading),
    error: readonly(error),
    
    // Computed properties
    hasError: readonly(hasError),
    isReady: readonly(isReady),
    sentences: readonly(sentences),
    imageUrl: readonly(imageUrl),
    
    // Methods
    refresh,
    refreshLesson,
  };
};
