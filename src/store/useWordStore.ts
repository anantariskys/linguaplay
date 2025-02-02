import { create } from "zustand";




type GameState = {
  score: number;
  increaseScore: () => void;
  resetGame: () => void;
};

export const useWordStore = create<GameState>((set) => ({
  score: 0,
  increaseScore: () => set((state) => ({ score: state.score + 1 })),
  resetGame: () => set({ score: 0 }),
}));