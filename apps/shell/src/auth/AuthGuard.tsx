/**
 * FILE PURPOSE: Feature-authorization guard that conditionally renders children based on tenant feature flags.
 *
 * CONNECTIONS:
 * - Imports from: @platform/store (useTenantStore), @platform/types (TenantFeatures)
 * - Used by: MainLayout.tsx (wraps each remote route)
 *
 * For a backend developer: Think of this as an inline feature-toggle component. It checks whether
 * the current tenant has a given feature enabled and hides content if not.
 */
import type { ReactNode } from 'react';
import { useTenantStore } from '@platform/store';
import type { TenantFeatures } from '@platform/types';

interface AuthGuardProps {
  /** The feature key to check against the current tenant's enabled features. */
  feature: keyof TenantFeatures;
  /** Optional content rendered when the feature is disabled. */
  fallback?: ReactNode;
  /** Content rendered when the feature is enabled. */
  children: ReactNode;
}

export function AuthGuard({ feature, fallback, children }: AuthGuardProps) {
  const isEnabled = useTenantStore((s) => s.isFeatureEnabled(feature));

  if (!isEnabled) {
    return fallback ?? (
      <div className="flex items-center justify-center h-64 text-gray-500">
        Feature not available for your tenant
      </div>
    );
  }

  return <>{children}</>;
}
