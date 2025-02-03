import { animals } from "@/data/animal";
import { Animal } from "@/types/type";
import { create } from "zustand";

// Fungsi untuk mengacak array dengan Fisher-Yates Shuffl
const shuffleArray = (array: Animal[]): Animal[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

type GameState = {
  question: Animal | null;
  options: Animal[];
  generateQuestion: () => void;
  checkAnswer: (selected: Animal) => boolean;
};

export const useWhichOneStore = create<GameState>((set, get) => ({
  question: null,
  options: [],
  generateQuestion: () => {
    const shuffled = shuffleArray(animals);
    const question = shuffled[0];
    const options = shuffleArray(shuffled.slice(0, 4));
    set({ question, options });
  },
  checkAnswer: (selected) => {
    return get().question?.name === selected.name;
  },
}));
