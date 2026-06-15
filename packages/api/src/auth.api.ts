/**
 * FILE PURPOSE: API service for authentication (login, logout, user profile).
 * 
 * CONNECTIONS:
 * - Imports from: ./axios, @platform/types (User)
 * - Used by: @platform/api (re-exported via index.ts), @platform/store (auth.store)
 * 
 * For a backend developer: Frontend sends POST /auth/login with { email, password },
 * POST /auth/logout to invalidate session, and GET /auth/me to fetch current user.
 * The backend must return { user: User, token: string } from login.
 */

import api from './axios';
import type { User } from '@platform/types';
export const authApi = {
  /**
   * Authenticates a user with email and password.
   * @param email - User's email address.
   * @param password - User's password.
   * @returns An object containing the authenticated user and a JWT token.
   */
  login: async (email: string, password: string) => {
    const { data } = await api.post<{ user: User; token: string }>('/auth/login', { email, password });
    return data;
  },

  /**
   * Logs the current user out by invalidating the server-side session.
   */
  logout: async () => {
    await api.post('/auth/logout');
  },

  /**
   * Fetches the currently authenticated user's profile.
   * @returns The authenticated user object.
   */
  me: async () => {
    const { data } = await api.get<User>('/auth/me');
    return data;
  },
};
