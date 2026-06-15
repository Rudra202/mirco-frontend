/**
 * FILE PURPOSE: Top-level React providers wrapper that enforces the dark theme on mount.
 *
 * CONNECTIONS:
 * - Imports from: @platform/store (useThemeStore)
 * - Used by: App.tsx (wraps <MainLayout />)
 *
 * For a backend developer: This is a frontend component tree wrapper — it ensures the global
 * dark theme is applied as soon as the authenticated app shell renders.
 */
import { useEffect, type ReactNode } from 'react';
import { useThemeStore } from '@platform/store';

interface AppProvidersProps {
  /** Child components to be rendered inside the providers tree. */
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  const setTheme = useThemeStore((s) => s.setTheme);

  useEffect(() => {
    setTheme('dark');
  }, [setTheme]);

  return <>{children}</>;
}
