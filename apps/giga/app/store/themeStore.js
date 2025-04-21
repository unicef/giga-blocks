import { create } from 'zustand';

export const useThemeStore = create((set) => ({
  fontColor: '#000',
  bgColor: '#fff',
  setTheme: (fontColor, bgColor) => set({ fontColor, bgColor }),
  resetTheme: () => ({ fontColor: '', bgColor: '' }),
}));
