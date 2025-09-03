import type { WordContent } from "~/types/word";

const vowelChangeMap = {
    // Front vowels (e, i, ö, ü)
    'e': ['i', 'ö', 'ü', 'a'],
    'i': ['e', 'ü', 'ö', 'ı'], 
    'ö': ['ü', 'e', 'i', 'o'],
    'ü': ['ö', 'i', 'e', 'u'],
    // Back vowels (a, ı, o, u)
    'a': ['ı', 'o', 'u', 'e'],
    'ı': ['a', 'o', 'u', 'i'],
    'o': ['u', 'a', 'ı', 'e'],
    'u': ['o', 'a', 'ı', 'e']
};
const consonantChangeMap = {
    'b': ['p', 'v', 'f'],
    'c': ['ç', 's', 'ş'],
    'd': ['t', 'v', 'b'],
    'ğ': ['k', 'h', 'g'],
    'h': ['g', 'ğ', 'k'],
    'k': ['c', 'q', 'ş'],
    'p': ['ç', 's', 'r'],
    't': ['ç', 's', 'd'],
    'v': ['p', 'b', 'ş'],
    'f': ['v', 's', 'c'],
    's': ['ç', 'c', 'ş'],
    'ş': ['ç', 's', 'c'],
    'z': ['ç', 's', 'ş'],
    'ç': ['c', 's', 'ş'],
    'x': ['y', 's', 'ş'],
    'q': ['l', 's', 'k'],
    'w': ['ç', 's', 'ş'],
    'y': ['ç', 's', 'ş'],
    'r': ['ç', 's', 'ş'],
    'l': ['p', 'v', 's'],
    'm': ['n', 'b', 'v'],
    'n': ['m', 't', 'd'],
    'j': ['g', 's', 't'],
};

export type QuizQuestion = {
    id: number,
    type: number,
    question: string,
    translation: string,
    correctAnswer: string,
    option1: string,
    option2: string,
    option3: string,
    option4: string
}

export type QuizVocabularyQuestion = {
    id: number,
    type: number,
    question: string,
    translation: string,
    correctAnswer: string,
    option1: string,
    option2: string,
    option3: string,
    option4: string
}

const createNounTypeQuestion = (wordList: Array<WordContent>, word: WordContent) : any => {

}
const createVerbTypeQuestion = (wordList: Array<WordContent>, word: WordContent) : any => {

}
export const createWordListQuiz = (wordList: Array<WordContent>) : Array<QuizQuestion> => {
    const quizQuestions: Array<QuizQuestion> = [];
    const questionIndex = 1;
    for (const word of wordList) {
        let newQuestion
        if (word.role === 'v') {
            newQuestion = createVerbTypeQuestion(wordList, word);
        } else if (word.role === 'n') {
            newQuestion = createNounTypeQuestion(wordList,word);
        } else if (word.role === 'adj') {
            newQuestion = createAdjectiveTypeQuestion(wordList,word);
        } else if (word.role === 'post') {
            newQuestion = createPostPositionTypeQuestion(wordList,word);
        } else if (word.role === 'det'){
        } else if (word.role === 'adv'){
        } else if (word.role === 'conj'){
        } else if (word.role === 'qp'){
        } else if (word.role === 'pron'){
        } else if (word.role === 'sub'){
        }   
        quizQuestions.push({
            id: questionIndex,
            type: 1,
            difficulty: "easy",
            grammarRuleId: 0,
            correctAnswer: word.translation,
            question: word.text,
            translation: word.translation,
            option1: word.translation,
            option2: word.translation,
            option3: word.translation,
            option4: word.translation
        })
        questionIndex++;
    }
}
  
  export const lessonFirstTab = { title: "Lesson", icon: "book" };
  export const lessonSecondTab = { title: "Rule", icon: "language" };