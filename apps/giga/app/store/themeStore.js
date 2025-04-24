import { create } from 'zustand';

export const useThemeStore = create((set) => ({
  themeId: null,
  fontColor: '',
  bgColor: '',
  selectedThemeName: null,
  setTheme: (fontColor, bgColor, selectedThemeName = null, themeId = null) =>
    set({ fontColor, bgColor, selectedThemeName, themeId }),
  resetTheme: () => ({
    fontColor: '',
    bgColor: '',
    selectedThemeName: null,
    themeId: null,
  }),
}));
