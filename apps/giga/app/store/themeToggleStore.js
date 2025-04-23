import { create } from 'zustand';

export const useThemeToggleStore = create((set) => ({
  isVisibleForMinted: false,
  toggleVisibilityForMinted: () =>
    set((state) => ({
      isVisibleForMinted: !state.isVisibleForMinted,
    })),
}));
