import type { FormQuizState, GrammarQuizQuestion, QuizProgress } from "~/types/quizzes/quiz";
import type { DetailedResults } from "~/types/quizzes/quiz-result";
import type { VocabularyQuizQuestion } from "~/types/quizzes/vocabulary-quiz";
import type { ExpressionContent } from "~/types/vocabulary/expression";
import type { WordContent } from "~/types/vocabulary/word";
import { initializeFormQuiz } from "~/utils/learning/quiz";

const TOTAL_GRAMMAR_QUESTIONS_FULL_QUIZ = 5;
const TOTAL_GRAMMAR_QUESTIONS_GRAMMAR_QUIZ = 10;


export const useQuiz = (grammarQuizQuestions: Ref<GrammarQuizQuestion[] | null>, wordsQuizQuestions: Ref<VocabularyQuizQuestion[] | null>, expressionsQuizQuestions: Ref<VocabularyQuizQuestion[] | null>, wordsForQuiz: Ref<WordContent[] | null>, expressionsForQuiz: Ref<ExpressionContent[] | null>, type: 'full' | 'vocabulary' | 'grammar',  emit: (event: 'submitQuiz', payload: any) => void) => {
    // Maps memorizing quizzes values for grammar, words, expressions
    const formGrammarQuiz = ref<FormQuizState>({});
    const formWordsQuiz = ref<FormQuizState>({});
    const formExpressionsQuiz = ref<FormQuizState>({});

    const currentQuestionIndex = ref<number>(0);
    const selectedAnswer = ref<string | null>(null);
    const isQuizCompleted = ref<boolean>(false);

    watch(() => grammarQuizQuestions.value, (newGrammarQuizQuestions: GrammarQuizQuestion[] | null) => {
        if (newGrammarQuizQuestions) initializeFormQuiz(formGrammarQuiz, newGrammarQuizQuestions);
    }, { immediate: true });
    
    watch(() => wordsQuizQuestions.value, (newWordsForQuizQuestions: VocabularyQuizQuestion[] | null) => {
        console.log("newWordsForQuizQuestions", newWordsForQuizQuestions);
        if (newWordsForQuizQuestions) initializeFormQuiz(formWordsQuiz, newWordsForQuizQuestions);
        console.log("formWordsQuiz", formWordsQuiz.value);
    }, { immediate: true });
    
    watch(() => expressionsQuizQuestions.value, (newExpressionsForQuizQuestions: VocabularyQuizQuestion[] | null) => {
        if (newExpressionsForQuizQuestions) initializeFormQuiz(formExpressionsQuiz, newExpressionsForQuizQuestions);
    }, { immediate: true });


    const grammarSectionQuizLength = computed(() => {
        return type === 'grammar' ? TOTAL_GRAMMAR_QUESTIONS_GRAMMAR_QUIZ : TOTAL_GRAMMAR_QUESTIONS_FULL_QUIZ
    });

    const isGrammarQuiz = computed(() => {
        return currentQuestionIndex.value < (grammarQuizQuestions.value?.length || 0);
    });
    
    const isWordsQuiz = computed(() => {
        return currentQuestionIndex.value >= (grammarQuizQuestions.value?.length || 0) && currentQuestionIndex.value < (grammarQuizQuestions.value?.length || 0) + (wordsForQuiz.value?.length || 0);
    });
    
  const isExpressionsQuiz = computed(() => {
    return currentQuestionIndex.value >= (grammarQuizQuestions.value?.length || 0) + (wordsForQuiz.value?.length || 0) && currentQuestionIndex.value < (grammarQuizQuestions.value?.length || 0) + (wordsForQuiz.value?.length || 0) + (expressionsForQuiz.value?.length || 0);
  });
  
  const isVocabularyQuiz = computed(() => {
    return isWordsQuiz.value || isExpressionsQuiz.value;
  });

  const currentQuestion = computed(() : GrammarQuizQuestion | VocabularyQuizQuestion | null => {
    // Determine which section we're in based on current question index  
    const grammarLength = grammarQuizQuestions.value?.length || 0;
    const wordsLength = wordsForQuiz.value?.length || 0;
    if (currentQuestionIndex.value < grammarLength) {
       // Grammar sectionn    
    return grammarQuizQuestions.value?.[currentQuestionIndex.value] || null;
  } else if (currentQuestionIndex.value < grammarLength + wordsLength) {
      // Words section
      const wordIndex = currentQuestionIndex.value - grammarLength;
      return wordsQuizQuestions.value?.[wordIndex] || null;
    } else {
      // Expressions section
      const expressionIndex = currentQuestionIndex.value - grammarLength - wordsLength;
      return expressionsQuizQuestions.value?.[expressionIndex] || null;
    }
  });

  // Determine current section and progress
const currentSection = computed(() => {
    console.log('currentSection: isGrammar, isVocabulary', isGrammarQuiz.value, isWordsQuiz.value, isExpressionsQuiz.value);
    if (isGrammarQuiz.value) {
      return {
        name: 'Grammar',
        current: currentQuestionIndex.value + 1,
        total: grammarSectionQuizLength.value
      };
    } else if (isVocabularyQuiz.value) {
      // For vocabulary quizzes, determine if we're in words or expressions
      const wordsCount = wordsForQuiz.value?.length || 0;
      const expressionsCount = expressionsForQuiz.value?.length || 0;
      const grammarCount = grammarQuizQuestions.value?.length || 0;
      
      if (currentQuestionIndex.value < (grammarQuizQuestions.value?.length || 0) + wordsCount) {
        return {
          name: 'Words',
          current: currentQuestionIndex.value - grammarCount + 1,
          total: wordsCount
        };
      } else {
        return {
          name: 'Expressions',
          current: currentQuestionIndex.value - wordsCount - grammarCount + 1,
          total: expressionsCount
        };
      }
    }
    return { name: '', current: 0, total: 0 };
  });


const currentQuestionOptions = computed((): Array<GrammarQuizQuestion['option1'] | VocabularyQuizQuestion['option1']> => {
    const question = currentQuestion.value;
    if (!question) return [];
    return [question.option1, question.option2, question.option3, question.option4];
  });
  
  
  const totalQuestions = computed(() => {
    return (grammarQuizQuestions.value?.length || 0) + 
           (wordsForQuiz.value?.length || 0) + 
           (expressionsForQuiz.value?.length || 0);
  });
  
  
  const selectAnswer = (option: string) => {
    selectedAnswer.value = option;
  };
  
  // Get user's selected answer for a question
  const getUserAnswer = (questionIndex: number) => {
    const grammarLength = grammarQuizQuestions.value?.length || 0;
    const wordsLength = wordsForQuiz.value?.length || 0;
    
    if (questionIndex < grammarLength) {
      const formIndex = questionIndex + 1;
      const answer = formGrammarQuiz.value[formIndex];
      return answer?.selectedOption || null;
    } else if (questionIndex < grammarLength + wordsLength) {
      const formIndex = questionIndex - grammarLength + 1;
      const answer = formWordsQuiz.value[formIndex];
      return answer?.selectedOption || null;
    } else {
      const formIndex = questionIndex - grammarLength - wordsLength + 1;
      const answer = formExpressionsQuiz.value[formIndex];
      return answer?.selectedOption || null;
    }
  };


  const goToPreviousQuestionInReview = () => {
    if (isQuizCompleted.value && currentQuestionIndex.value > 0) {
      currentQuestionIndex.value--;
      
      // Set the selected answer to show which option the user chose
      const userAnswer = getUserAnswer(currentQuestionIndex.value);
      if (userAnswer !== null) {
        const question = currentQuestion.value;
        if (question) {
          const options = [question.option1, question.option2, question.option3, question.option4];
          selectedAnswer.value = options[userAnswer - 1] || null;
        }
      } else {
        selectedAnswer.value = null;
      }
    }
  };
  
  // Calculate scores for each section
  const grammarScore = computed(() => {
    if (!grammarQuizQuestions.value || !formGrammarQuiz.value) return 0;
    let correct = 0;
    let total = 0;
    
    Object.values(formGrammarQuiz.value).forEach((answer, index) => {
      if (answer.selectedOption !== null) {
        total++;
        if (Number(answer.selectedOption) === Number(answer.correctAnswer)) {
          correct++;
        }
      }
    });
    
    return total > 0 ? Math.round((correct / total) * 100) : 0;
  });
  
  const wordsScore = computed(() => {
    if (!wordsQuizQuestions.value || !formWordsQuiz.value) return 0;
    let correct = 0;
    let total = 0;
    
    Object.values(formWordsQuiz.value).forEach((answer) => {
      if (answer.selectedOption !== null) {
        total++;
        if (String(answer.selectedOption) === String(answer.correctAnswer)) {
          correct++;
        }
      }
    });
    
    return total > 0 ? Math.round((correct / total) * 100) : 0;
  });
  
  const expressionsScore = computed(() => {
    if (!expressionsQuizQuestions.value || !formExpressionsQuiz.value) return 0;
    let correct = 0;
    let total = 0;
    
    Object.values(formExpressionsQuiz.value).forEach((answer) => {
      if (answer.selectedOption !== null) {
        total++;
        if (Number(answer.selectedOption) === Number(answer.correctAnswer)) {
          correct++;
        }
      }
    });
    
    return total > 0 ? Math.round((correct / total) * 100) : 0;
  });

  const globalScore = computed(() => {
    const grammarTotal = Object.values(formGrammarQuiz.value).filter(a => a.selectedOption !== null).length;
    const wordsTotal = Object.values(formWordsQuiz.value).filter(a => a.selectedOption !== null).length;
    const expressionsTotal = Object.values(formExpressionsQuiz.value).filter(a => a.selectedOption !== null).length;
    
    const totalQuestions = grammarTotal + wordsTotal + expressionsTotal;
    if (totalQuestions === 0) return 0;
    
    const totalCorrect = 
      Object.values(formGrammarQuiz.value).filter(a => a.selectedOption !== null && Number(a.selectedOption) === Number(a.correctAnswer)).length +
      Object.values(formWordsQuiz.value).filter(a => a.selectedOption !== null && Number(a.selectedOption) === Number(a.correctAnswer)).length +
      Object.values(formExpressionsQuiz.value).filter(a => a.selectedOption !== null && Number(a.selectedOption) === Number(a.correctAnswer)).length;
    
    return Math.round((totalCorrect / totalQuestions) * 100);
  });
  
  const grammarProgress = computed((): QuizProgress[] => {
    const progress: QuizProgress[] = [];
    const totalGrammarQuestions = 5; // Display 5 squares for grammar
    
    for (let i = 0; i < totalGrammarQuestions; i++) {
        const hasAnswer = formGrammarQuiz.value[i + 1] && formGrammarQuiz.value[i + 1].selectedOption !== null;
        progress.push({
          completed: !isQuizCompleted.value && i < currentQuestionIndex.value,
          current: !isQuizCompleted.value && i === currentQuestionIndex.value,
          correct: isQuizCompleted.value && hasAnswer ? isQuestionCorrect(i) : null,
          questionIndex: i
        });
    }
    return progress;
  });
  
  
  const wordsProgress = computed(() : QuizProgress[]=> {
      const progress: QuizProgress[] = [];
    if (!wordsForQuiz.value?.length) return progress;
    for (let i = 0; i < wordsForQuiz.value?.length; i++) {
      const questionIndex = i + (grammarQuizQuestions.value?.length || 0);
      if (isVocabularyQuiz.value) {
        const hasAnswer = formWordsQuiz.value[i + 1] && formWordsQuiz.value[i + 1].selectedOption !== null;
        progress.push({
          completed: !isQuizCompleted.value && questionIndex < currentQuestionIndex.value,
          current: !isQuizCompleted.value && questionIndex === currentQuestionIndex.value,
          correct: isQuizCompleted.value && hasAnswer ? isQuestionCorrect(questionIndex) : null,
          questionIndex: questionIndex
        });
      } else if (isQuizCompleted) {
        progress.push({
          completed: null,
          current: null,
          correct: isQuestionCorrect(questionIndex),
          questionIndex: questionIndex
        });
      } else {
        // If this is grammar quiz, words section remains untouched (all gray)
        progress.push({
          completed: false,
          current: false,
          correct: null,
          questionIndex: questionIndex
        });
      }
    }
    return progress;
  });
  
  const expressionsProgress = computed((): QuizProgress[] => {
    const progress: QuizProgress[] = [];
    if (!expressionsForQuiz.value?.length) return progress;
    for (let i = 0; i < expressionsForQuiz.value?.length; i++) {
      const questionIndex = i + (grammarQuizQuestions.value?.length || 0) + (wordsForQuiz.value?.length || 0);
      if (isExpressionsQuiz.value) {
        const hasAnswer = formExpressionsQuiz.value[i + 1] && formExpressionsQuiz.value[i + 1].selectedOption !== null;
        progress.push({
          completed: !isQuizCompleted.value && questionIndex < currentQuestionIndex.value,
          current: !isQuizCompleted.value && questionIndex === currentQuestionIndex.value,
          correct: isQuizCompleted.value && hasAnswer ? isQuestionCorrect(questionIndex) : null,
          questionIndex: questionIndex
        });
      } else if (isQuizCompleted) {
        progress.push({
          completed: null,
          current: null,
          correct: isQuestionCorrect(questionIndex),
          questionIndex: questionIndex
        });
      } else {
        // If this is grammar quiz or word quiz, expressions section remains untouched (all gray)
        progress.push({
          completed: false,
          current: false,
          correct: null,
          questionIndex: questionIndex
        });
      }
    }
    return progress;
  });
  
  // Check if a specific question was answered correctly
  const isQuestionCorrect = (questionIndex: number) => {
    const grammarLength = grammarQuizQuestions.value?.length || 0;
    const wordsLength = wordsForQuiz.value?.length || 0;
    
    if (questionIndex < grammarLength) {
      const formIndex = questionIndex + 1;
      const answer = formGrammarQuiz.value[formIndex];
      return answer && answer.selectedOption !== null && Number(answer.selectedOption) === Number(answer.correctAnswer);
    } else if (questionIndex < grammarLength + wordsLength) {
      const formIndex = questionIndex - grammarLength + 1;
      const answer = formWordsQuiz.value[formIndex];
      return answer && answer.selectedOption !== null && Number(answer.selectedOption) === Number(answer.correctAnswer);
    } else {
      const formIndex = questionIndex - grammarLength - wordsLength + 1;
      const answer = formExpressionsQuiz.value[formIndex];
      return answer && answer.selectedOption !== null && Number(answer.selectedOption) === Number(answer.correctAnswer);
    }
  };
  
  // Navigation function for review mode
  const goToNextQuestionInReview = () => {
    if (isQuizCompleted.value && currentQuestionIndex.value < totalQuestions.value - 1) {
      currentQuestionIndex.value++;
      
      // Set the selected answer to show which option the user chose
      const userAnswer = getUserAnswer(currentQuestionIndex.value);
      if (userAnswer !== null) {
        const question = currentQuestion.value;
        if (question) {
          const options = [question.option1, question.option2, question.option3, question.option4];
          selectedAnswer.value = options[userAnswer - 1] || null;
        }
      } else {
        selectedAnswer.value = null;
      }
    }
  };
  
  // Summary data for completed quiz
  const validatedWords = computed(() => {
    if (!wordsQuizQuestions.value || !formWordsQuiz.value) return { correct: 0, total: 0 };
    let correct = 0;
    let total = 0;
    
    Object.values(formWordsQuiz.value).forEach((answer) => {
      if (answer.selectedOption !== null) {
        total++;
        if (Number(answer.selectedOption) === Number(answer.correctAnswer)) {
          correct++;
        }
      }
    });
    return { correct, total };
  });
  
  const validatedExpressions = computed(() => {
    if (!expressionsQuizQuestions.value || !formExpressionsQuiz.value) return { correct: 0, total: 0 };
    let correct = 0;
    let total = 0;
    
    Object.values(formExpressionsQuiz.value).forEach((answer) => {
      if (answer.selectedOption !== null) {
        total++;
        if (Number(answer.selectedOption) === Number(answer.correctAnswer)) {
          correct++;
        }
      }
    });
    
    return { correct, total };
  });
  
  const handleQuizResults = async() => {
    emit('submitQuiz', {  
      score: grammarScore.value,
      formGrammarQuiz: formGrammarQuiz.value,
      detailedResults: detailedResults.value,
    });
  }

const goToNextQuestion = () => {
  if (selectedAnswer.value) {
    // Store the answer in the correct form based on current section
    const optionIndex = currentQuestionOptions.value.findIndex(option => option === selectedAnswer.value);
    const selectedOptionNumber = optionIndex + 1;

    // Store answer in the appropriate form based on current section
    if (isGrammarQuiz.value && formGrammarQuiz.value[currentQuestionIndex.value + 1]) {
      formGrammarQuiz.value[currentQuestionIndex.value + 1].selectedOption = selectedOptionNumber;
    } else if (isWordsQuiz.value && formWordsQuiz.value[currentQuestionIndex.value - (grammarQuizQuestions.value?.length || 0) + 1]) {
      formWordsQuiz.value[currentQuestionIndex.value - (grammarQuizQuestions.value?.length || 0) + 1].selectedOption = selectedOptionNumber;
    } else if (isExpressionsQuiz.value && formExpressionsQuiz.value[currentQuestionIndex.value - (grammarQuizQuestions.value?.length || 0) - (wordsForQuiz.value?.length || 0) + 1]) {
      formExpressionsQuiz.value[currentQuestionIndex.value - (grammarQuizQuestions.value?.length || 0) - (wordsForQuiz.value?.length || 0) + 1].selectedOption = selectedOptionNumber;
    }

    if (currentQuestionIndex.value < totalQuestions.value - 1) {
      currentQuestionIndex.value++;
      selectedAnswer.value = null;
    } else {
      // Quiz finished - handle completion
      isQuizCompleted.value = true;
      // Open results modal after a short delay
      handleQuizResults()
    }
  }
};



// Navigation function to go to specific question
const goToQuestion = (questionIndex: number) => {
  if (isQuizCompleted.value) {
    currentQuestionIndex.value = questionIndex;
    
    // Set the selected answer to show which option the user chose
    const userAnswer = getUserAnswer(questionIndex);
    if (userAnswer !== null) {
      const question = currentQuestion.value;
      if (question) {
        const options = [question.option1, question.option2, question.option3, question.option4];
        selectedAnswer.value = options[userAnswer - 1] || null;
      }
    } else {
      selectedAnswer.value = null;
    }
  }
};
// Determine if we're at the last question of the entire quiz
const isLastQuestion = computed(() => {
  return currentQuestionIndex.value >= totalQuestions.value - 1;
});




  const detailedResults = computed((): DetailedResults => {
    const grammarCorrect = Object.values(formGrammarQuiz.value).filter(a => a.selectedOption !== null && Number(a.selectedOption) === Number(a.correctAnswer)).length;
    const grammarTotal = Object.values(formGrammarQuiz.value).filter(a => a.selectedOption !== null).length;
    
    const wordsCorrect = validatedWords.value.correct;
    const wordsTotal = validatedWords.value.total;
    const wordsIncorrect = wordsTotal - wordsCorrect;
    
    const expressionsCorrect = validatedExpressions.value.correct;
    const expressionsTotal = validatedExpressions.value.total;
    const expressionsIncorrect = expressionsTotal - expressionsCorrect;
    
    // Get actual words that were validated/invalidated
    const validatedWordsList: Array<{text: string, isMastered: boolean, id: number}> = [];
    const invalidatedWordsList: Array<{text: string, isMastered: boolean, id: number}> = [];
    if (wordsQuizQuestions.value && formWordsQuiz.value) {
      Object.values(formWordsQuiz.value).forEach((answer, index) => {
        if (answer.selectedOption !== null && wordsQuizQuestions.value?.[index]) {
          const question = wordsQuizQuestions.value?.[index];
          const correctAnswer: VocabularyQuizQuestion['option1'] = question[`option${answer.correctAnswer}`];
          const userAnswer = question[`option${answer.selectedOption}`];
          const wordContext = wordsForQuiz.value?.find(word => word.text === correctAnswer);
          if (Number(answer.selectedOption) === Number(answer.correctAnswer)) {
            validatedWordsList.push({text: correctAnswer, isMastered: wordContext?.isMastered ?? false, id: wordContext?.id ?? 0});
          } else {
            invalidatedWordsList.push({text: correctAnswer, isMastered: wordContext?.isMastered ?? false, id: wordContext?.id ?? 0});
          }
        }
      });
    }
    
    // Get actual expressions that were validated/invalidated
    const validatedExpressionsList: Array<{text: string, isMastered: boolean, id: number}> = [];
    const invalidatedExpressionsList: Array<{text: string, isMastered: boolean, id: number}> = [];
    if (expressionsQuizQuestions.value && formExpressionsQuiz.value) {
      Object.values(formExpressionsQuiz.value).forEach((answer, index) => {
        if (answer.selectedOption !== null && expressionsQuizQuestions.value?.[index]) {
          const question = expressionsQuizQuestions.value?.[index];
          const correctAnswer = question[`option${answer.correctAnswer}`];
          const userAnswer = question[`option${answer.selectedOption}`];
          const expressionContext = expressionsForQuiz.value?.find(expr => expr.text === correctAnswer);
          if (Number(answer.selectedOption) === Number(answer.correctAnswer)) {
            validatedExpressionsList.push({text: correctAnswer, isMastered: expressionContext?.isMastered ?? false, id: expressionContext?.id ?? 0});
          } else {
            invalidatedExpressionsList.push({text: correctAnswer, isMastered: expressionContext?.isMastered ?? false, id: expressionContext?.id ?? 0});
          }
        }
      });
    }
    
    return {
      grammar: { correct: grammarCorrect, total: grammarTotal, percentage: grammarTotal > 0 ? Math.round((grammarCorrect / grammarTotal) * 100) : 0 },
      words: { 
        correct: wordsCorrect, 
        total: wordsTotal, 
        incorrect: wordsIncorrect, 
        percentage: wordsTotal > 0 ? Math.round((wordsCorrect / wordsTotal) * 100) : 0,
        validatedList: validatedWordsList,
        invalidatedList: invalidatedWordsList
      },
      expressions: { 
        correct: expressionsCorrect, 
        total: expressionsTotal, 
        incorrect: expressionsIncorrect, 
        percentage: expressionsTotal > 0 ? Math.round((expressionsCorrect / expressionsTotal) * 100) : 0,
        validatedList: validatedExpressionsList,
        invalidatedList: invalidatedExpressionsList
      },
      overall: { percentage: globalScore.value }
    };
  });
  
  return {
    currentQuestion,
    currentQuestionIndex,
    currentQuestionOptions,
    currentSection,
    expressionsProgress,
    expressionsScore,
    getUserAnswer,
    goToNextQuestion,
    goToNextQuestionInReview,
    goToPreviousQuestionInReview,
    goToQuestion,
    grammarProgress,
    grammarScore,
    isLastQuestion,
    isQuestionCorrect,
    isQuizCompleted,
    selectAnswer,
    selectedAnswer,
    totalQuestions,
    wordsProgress,
    wordsScore,
  };
};