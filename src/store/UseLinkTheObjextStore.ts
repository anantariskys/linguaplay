import { create } from "zustand";

interface GameState {
  isGameStarted: boolean;
  timer: number;
  matchedPairs: string[];
  startGame: () => void;
  endGame: () => void;
  updateTimer: () => void;
  addMatchedPair: (animal: string) => void;
}

export const useLinkTheObjectStore = create<GameState>((set) => ({
  isGameStarted: false,
  timer: 30, // 30 seconds countdown timer
  matchedPairs: [],
  startGame: () => set({ isGameStarted: true, timer: 30, matchedPairs: [] }),
  endGame: () => set({ isGameStarted: false }),
  updateTimer: () => set((state) => ({ timer: state.timer - 1 })),
  addMatchedPair: (animal) => set((state) => ({
    matchedPairs: [...state.matchedPairs, animal],
  })),
}));
