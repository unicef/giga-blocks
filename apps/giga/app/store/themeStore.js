import { create } from 'zustand';

export const useThemeStore = create((set) => ({
  fontColor: '#000',
  bgColor: '#fff',
  selectedThemeName: null,
  setTheme: (fontColor, bgColor, selectedThemeName = null) =>
    set({ fontColor, bgColor, selectedThemeName }),
  resetTheme: () => ({ fontColor: '', bgColor: '', selectedThemeName: null }),
}));
