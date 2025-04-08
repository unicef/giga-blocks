import { create } from 'zustand';

export const useThemeStore = create((set) => ({
  fontColor: '',
  bgColor: '',
  setTheme: (fontColor, bgColor) => set({ fontColor, bgColor }),
  resetTheme: () => ({ fontColor: '', bgColor: '' }),
}));
