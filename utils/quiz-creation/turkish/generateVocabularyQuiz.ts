import type { WordContent } from "~/types/word";


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
const slightVowelChangeNoun = (noun: string) => {
    const match = noun.match(/[aeıioöuü]/i);
    const firstVowel = match ? match[0] : null;
    const secondVowel = match ? match[1] : null;
    if (secondVowel) {
        const falseVowel = vowelChangeMap[firstVowel as keyof typeof vowelChangeMap][Math.floor(Math.random() * vowelChangeMap[firstVowel as keyof typeof vowelChangeMap].length)];
        return noun.replace(secondVowel, falseVowel);
    }
    if (firstVowel) {
        const falseVowel = vowelChangeMap[firstVowel as keyof typeof vowelChangeMap][Math.floor(Math.random() * vowelChangeMap[firstVowel as keyof typeof vowelChangeMap].length)];
        return noun.replace(firstVowel, falseVowel);
    }
    return noun;
}
const slightConsonantChangeNoun = (noun: string) => {
    const match = noun.match(/[aeıioöuü]/i);
    const firstVowel = match ? match[0] : null;

}
const createIncorrectNoun = (noun: string) => {
    const random = Math.floor(Math.random() * 2) + 1;
    if (random === 1) {
        return slightVowelChangeNoun(noun);
    } else {
        return slightConsonantChangeNoun(noun);
    }
}

const createNounTypeSingleQuestion = (nounList: Array<WordContent>, word: WordContent, index: number) => {
    const incorrectAnswer1 = createIncorrectNoun(word.text);
}
const createNounTypeQuestion = (nounList: Array<WordContent>, word: WordContent, index: number) : any => {
    const falseOptions = nounList.filter((noun) => noun.id !== word.id)
    if (nounList.length > 3) {
        const correctAnswerIndex = Math.floor(Math.random() * 4) + 1;
        return {
            id: index,
            type: 1,
            correctAnswer: correctAnswerIndex,
            question: "Which of the following words is the correct translation of " + word.translation + " ?",
            translation: word.translation,
            option1: correctAnswerIndex === 1 ? word.text : falseOptions[0].text,
            option2: correctAnswerIndex === 2 ? word.text : falseOptions[0].text,
            option3: correctAnswerIndex === 3 ? word.text : falseOptions[1].text,
            option4: correctAnswerIndex === 4 ? word.text : falseOptions[2].text
        }
    } else if (nounList.length > 1) {
        const correctAnswerIndex = Math.floor(Math.random() * 4) + 1;
        const incorrectAnswer1 = createIncorrectNoun(word.text);
        const incorrectAnswer2 = createIncorrectNoun(falseOptions[0].text);
        let incorrectAnswer3 = createIncorrectNoun(falseOptions[0].text);
        if (incorrectAnswer3 === incorrectAnswer2 || incorrectAnswer3 === incorrectAnswer1 || incorrectAnswer3 === word.text || incorrectAnswer2 === word.text || incorrectAnswer1 === word.text || incorrectAnswer1 === incorrectAnswer2) {
            return createNounTypeSafeQuestion(nounList, word, index);
        }
        return {
            id: index,
            type: 1,
            correctAnswer: correctAnswerIndex,
            question: "Which of the following words is the correct translation of " + word.translation + " ?",
            translation: word.translation,
            option1: correctAnswerIndex === 1 ? word.text : falseOptions[0],
            option2: correctAnswerIndex === 2 ? word.text : falseOptions[0],
            option3: correctAnswerIndex === 3 ? word.text : falseOptions[1],
            option4: correctAnswerIndex === 4 ? word.text : falseOptions[2]
        }
    }
}
const createVerbTypeQuestion = (VerbList: Array<WordContent>, word: WordContent) : any => {

}
const createAdjectiveTypeQuestion = (adjectiveList: Array<WordContent>, word: WordContent) : any => {

}
const createPostPositionTypeQuestion = (postPositionList: Array<WordContent>, word: WordContent) : any => {

}
const createDeterminerTypeQuestion = (determinerList: Array<WordContent>, word: WordContent) : any => {

}
const createAdverbTypeQuestion = (adverbList: Array<WordContent>, word: WordContent) : any => {

}
const createConjunctionTypeQuestion = (conjunctionList: Array<WordContent>, word: WordContent) : any => {

}
const createQuestionParticuleTypeQuestion = (questionParticuleList: Array<WordContent>, word: WordContent) : any => {

}
const createPersonalPronounTypeQuestion = (personalPronounList: Array<WordContent>, word: WordContent) : any => {

}
const createSubsidiaryVerbTypeQuestion = (subsidiaryVerbList: Array<WordContent>, word: WordContent) : any => {

}
export const createWordListQuiz = (wordList: Array<WordContent>) : Array<QuizQuestion> => {
    const quizQuestions: Array<QuizQuestion> = [];
    let questionIndex = 1;
    for (const word of wordList) {
        let newQuestion
        if (word.role === 'v') {
            newQuestion = createVerbTypeQuestion(wordList.filter((word) => word.role === 'v'), word);
        } else if (word.role === 'n') {
            newQuestion = createNounTypeQuestion(wordList.filter((word) => word.role === 'n'), word, questionIndex);
        } else if (word.role === 'adj') {
            newQuestion = createAdjectiveTypeQuestion(wordList,word);
        } else if (word.role === 'post') {
            newQuestion = createPostPositionTypeQuestion(wordList,word);
        } else if (word.role === 'det'){
            newQuestion = createDeterminerTypeQuestion(wordList,word);
        } else if (word.role === 'adv'){
            newQuestion = createAdverbTypeQuestion(wordList,word);
        } else if (word.role === 'conj'){
            newQuestion = createConjunctionTypeQuestion(wordList,word);
        } else if (word.role === 'qp'){
            newQuestion = createQuestionParticuleTypeQuestion(wordList,word);
        } else if (word.role === 'pron'){
            newQuestion = createPersonalPronounTypeQuestion(wordList,word);
        } else if (word.role === 'sub'){
            newQuestion = createSubsidiaryVerbTypeQuestion(wordList,word);
        }   
        quizQuestions.push(newQuestion)
        questionIndex++;
    }
}
  
  export const lessonFirstTab = { title: "Lesson", icon: "book" };
  export const lessonSecondTab = { title: "Rule", icon: "language" };