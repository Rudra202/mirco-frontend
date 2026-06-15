/**
 * FILE PURPOSE: Root app component — orchestrates auth initialization, login vs. main layout rendering.
 *
 * CONNECTIONS:
 * - Imports from: ./providers/AppProviders, @platform/store (useAuthStore), ./auth/Login, ./layouts/MainLayout
 * - Used by: bootstrap.tsx (mounts <App /> into the DOM)
 *
 * For a backend developer: This is the top-level React component. On load it initializes the auth
 * session, shows a spinner until ready, then either shows the login page or the main app shell.
 */
import { useEffect } from 'react';
import { AppProviders } from './providers/AppProviders';
import { useAuthStore } from '@platform/store';
import { Login } from './auth/Login';
import { MainLayout } from './layouts/MainLayout';

export function App() {
  const initialize = useAuthStore((s) => s.initialize);
  const isInitialized = useAuthStore((s) => s.isInitialized);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950">
        <div className="animate-spin h-8 w-8 border-2 border-indigo-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <AppProviders>
      <MainLayout />
    </AppProviders>
  );
}
