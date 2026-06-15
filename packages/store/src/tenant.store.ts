/**
 * FILE PURPOSE: Zustand store for the current tenant organization configuration.
 * 
 * CONNECTIONS:
 * - Imports from: zustand, @platform/types (Tenant, TenantFeatures)
 * - Used by: @platform/store (barrel via index.ts), tenant-aware components in micro-frontend apps
 * 
 * For a backend developer: Holds tenant metadata (name, logo, feature flags, brand colors).
 * The setTenant() action should be called after fetching tenant config from the backend.
 * isFeatureEnabled() gates UI features per tenant.
 */

import { create } from 'zustand';
import type { Tenant, TenantFeatures } from '@platform/types';

/** Default feature flags enabled for a new tenant. */
const DEFAULT_FEATURES: TenantFeatures = {
  dashboard: true,
  workflow: true,
  reports: true,
  settings: true,
};

/**
 * Zustand store for managing the current tenant's configuration.
 * Provides access to tenant metadata, branding theme, and feature flag checks.
 */
interface TenantStore {
  /** The currently active tenant, or null. */
  tenant: Tenant | null;
  /** Replaces the current tenant configuration. */
  setTenant: (tenant: Tenant) => void;
  /** Checks whether a specific feature is enabled for the current tenant. */
  isFeatureEnabled: (feature: keyof TenantFeatures) => boolean;
}

export const useTenantStore = create<TenantStore>((set, get) => ({
  tenant: {
    id: 'default',
    name: 'My Company',
    features: DEFAULT_FEATURES,
    theme: {
      primary: '#6366f1',
      secondary: '#8b5cf6',
      accent: '#06b6d4',
    },
  },

  setTenant: (tenant: Tenant) => set({ tenant }),

  isFeatureEnabled: (feature: keyof TenantFeatures) => {
    return get().tenant?.features?.[feature] ?? false;
  },
}));
