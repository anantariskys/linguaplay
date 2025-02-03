import { StaticImageData } from "next/image";

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

  export interface WordCharacterProps {
    character: {
      letter: string;
      isMissing: boolean;
      index: number;
    };
    onDrop: (
      index: number,
      letterId: string,
      letterValue: string,
      originalIndex: number
    ) => void;
    droppedLetter?: string;
    isDropped?:boolean
    onRevert: () => void;
  }
  

  export type Question = {
    word: string;
    // blankWord: string;
    missingLetters: string[];
    missingIndexes: number[];
    characters: { letter: string; isMissing: boolean; index: number }[];
  };
  
  export interface LetterItem {
    id: string;
    letter: string;
    isUsed: boolean;
    originalIndex: number;
  }
  
  export interface DraggableLetterProps {
    id: string;
    letter: string;
    isUsed: boolean;
    originalIndex: number;
    onRevert: () => void;
  }

  export type Animal = {
    name: string;
    image: StaticImageData;
  };