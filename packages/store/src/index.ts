/**
 * FILE PURPOSE: Barrel file that re-exports all Zustand stores for convenient imports.
 * 
 * CONNECTIONS:
 * - Imports from: ./auth.store, ./tenant.store, ./theme.store
 * - Used by: all micro-frontend apps (import { useAuthStore, useTenantStore, useThemeStore })
 * 
 * For a backend developer: This is the frontend state hub. useAuthStore manages user sessions,
 * useTenantStore manages org config, useThemeStore manages appearance.
 */

export { useAuthStore } from './auth.store';
export { useTenantStore } from './tenant.store';
export { useThemeStore } from './theme.store';
