
export interface Word {
    question: string;
    answer: string[];
    fullWord: string;
  }
  
  export interface WordStore {
    gameStarted: boolean;
    currentWords: Word[];
    currentWordIndex: number;
    score: number;
    totalQuestions: number;
    inputs: string[];
    feedback: string;
    
    startGame: () => void;
    setInput: (index: number, value: string) => void;
    checkAnswer: () => void;
    resetGame: () => void;
  }