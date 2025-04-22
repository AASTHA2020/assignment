import { create } from 'zustand';

export const useGameStore = create((set) => ({
  points: 0,
  winCount: 0,
  addWin: () =>
    set((state) => ({
      points: state.points + 10,
      winCount: state.winCount + 1
    })),
  reset: () => set({ points: 0, winCount: 0 })
}));
