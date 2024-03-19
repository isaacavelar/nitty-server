export interface Words {
    word: string;
    currentDifficulty: '' | 'very easy' | 'easy' | 'medium' | 'hard' | 'very hard';
    qtdConsecutiveCorrectGuesses: number;
    qtdConsecutiveVeryEasy: number;
    status: number;
    translation: string;
}
