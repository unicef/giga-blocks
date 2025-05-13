import { create } from 'zustand';

export const useThemeStore = create((set) => ({
  themeId: null,
  fontColor: '',
  bgColor: '',
  cardColor: '',
  selectedThemeName: null,
  setTheme: (
    fontColor,
    cardColor,
    bgColor,
    selectedThemeName = null,
    themeId = null
  ) => set({ fontColor, bgColor, cardColor, selectedThemeName, themeId }),
  resetTheme: () => ({
    fontColor: '',
    bgColor: '',
    cardColor: '',
    selectedThemeName: null,
    themeId: null,
  }),
}));
