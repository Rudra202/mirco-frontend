/**
 * FILE PURPOSE: Shared TypeScript type/interface definitions for the entire platform.
 * 
 * CONNECTIONS:
 * - Imports from: (none — zero-dependency types package)
 * - Used by: store/*, api/*, ui/*, and all micro-frontend apps
 * 
 * For a backend developer: This defines frontend data shapes (User, AuthState, Tenant, MenuItem, etc.)
 * that API responses must conform to. No backend logic — purely the TypeScript contract.
 */

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
}

export interface TenantFeatures {
  dashboard: boolean;
  workflow: boolean;
  reports: boolean;
  settings: boolean;
  [key: string]: boolean;
}

export interface TenantTheme {
  primary: string;
  secondary: string;
  accent: string;
}

export interface Tenant {
  id: string;
  name: string;
  features: TenantFeatures;
  theme: TenantTheme;
}

export interface RemoteConfig {
  name: string;
  url: string;
  scope: string;
  module: string;
  enabled: boolean;
}

export interface MenuItem {
  path: string;
  label: string;
  icon: string;
  badge?: string;
  children?: MenuItem[];
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}
