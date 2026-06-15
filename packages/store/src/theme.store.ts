/**
 * FILE PURPOSE: Zustand store for managing the app color theme (dark/light mode).
 * 
 * CONNECTIONS:
 * - Imports from: zustand
 * - Used by: @platform/store (barrel via index.ts), @platform/ui (Header theme toggle), shell app
 * 
 * For a backend developer: Pure client-side state — toggles 'dark'/'light' CSS class on <html>.
 * No API calls. Persists via document class; no server-side storage.
 */

import { create } from 'zustand';

/** Supported color schemes. */
type Theme = 'dark' | 'light';

/**
 * Zustand store for managing the application color theme.
 * Toggles between 'dark' and 'light' modes and applies the theme class to the document root.
 */
interface ThemeStore {
  /** The current active theme. */
  theme: Theme;
  /** Toggles between 'dark' and 'light' themes and updates the document class. */
  toggleTheme: () => void;
  /** Sets the theme to a specific value and updates the document class. */
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: 'dark',

  toggleTheme: () => {
    const next = get().theme === 'dark' ? 'light' : 'dark';
    set({ theme: next });
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(next);
  },

  setTheme: (theme: Theme) => {
    set({ theme });
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme);
  },
}));
