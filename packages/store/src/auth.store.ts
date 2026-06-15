/**
 * FILE PURPOSE: Zustand store for authentication state — user session, JWT token, login/logout.
 * 
 * CONNECTIONS:
 * - Imports from: zustand, @platform/types (User)
 * - Used by: @platform/store (barrel via index.ts), shell app, auth-gated components
 * 
 * For a backend developer: Manages the frontend auth session. login() currently uses mock data;
 * in production it should call authApi.login(). Stores token & user in localStorage for page reload
 * persistence. logout() clears both localStorage and state.
 */

import { create } from 'zustand';
import type { User } from '@platform/types';

/**
 * Zustand store for authentication state and actions.
 * Manages user session, JWT token, and initialization state.
 * Persists auth data to localStorage for session continuity across page reloads.
 */
interface AuthStore {
  /** The currently authenticated user, or null. */
  user: User | null;
  /** JWT token for API authorization, or null. */
  token: string | null;
  /** Whether a user session is active. */
  isAuthenticated: boolean;
  /** Whether the initial auth check has completed. */
  isInitialized: boolean;
  /** Authenticates the user with email and password. Stores token and user in localStorage on success. */
  login: (email: string, password: string) => Promise<void>;
  /** Clears the session and removes auth data from localStorage. */
  logout: () => void;
  /** Updates the current user object in both state and localStorage. */
  setUser: (user: User) => void;
  /** Reads saved auth data from localStorage on app startup to restore the session. */
  initialize: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isInitialized: false,

  initialize: () => {
    const token = localStorage.getItem('auth_token');
    const userStr = localStorage.getItem('auth_user');
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr) as User;
        set({ user, token, isAuthenticated: true, isInitialized: true });
      } catch {
        // Corrupted data - clear storage and mark as initialized without session
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        set({ isInitialized: true });
      }
    } else {
      set({ isInitialized: true });
    }
  },

  // Simulates a login request; currently uses mock data instead of calling the API
  login: async (email: string, _password: string) => {
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      role: 'admin',
    };
    const mockToken = 'mock_jwt_token_' + Date.now();

    localStorage.setItem('auth_token', mockToken);
    localStorage.setItem('auth_user', JSON.stringify(mockUser));

    set({ user: mockUser, token: mockToken, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    set({ user: null, token: null, isAuthenticated: false });
  },

  setUser: (user: User) => {
    localStorage.setItem('auth_user', JSON.stringify(user));
    set({ user });
  },
}));
