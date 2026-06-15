/**
 * FILE PURPOSE: Main authenticated layout — sidebar, header, route definitions, logout confirmation modal.
 *
 * CONNECTIONS:
 * - Imports from: @platform/ui (Sidebar, Header, EmptyState), @platform/store (useAuthStore, useTenantStore, useThemeStore),
 *                 ../auth/AuthGuard, ../federation/remote, ../federation/RemoteLoader
 * - Used by: App.tsx (rendered inside <AppProviders> when authenticated)
 *
 * For a backend developer: This is the authenticated app shell. It renders a sidebar with nav items
 * built from the remote registry, a top header bar, and a content area that routes to each micro-frontend
 * via React Router. Each remote route is feature-gated and lazy-loaded.
 */

import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar, Header, EmptyState } from '@platform/ui';
import { useAuthStore, useTenantStore, useThemeStore } from '@platform/store';
import { AuthGuard } from '../auth/AuthGuard';
import { getEnabledRemotes, REMOTE_REGISTRY } from '../federation/remote';
import { RemoteLoader } from '../federation/RemoteLoader';

function menuItems(enabledRemotes: ReturnType<typeof getEnabledRemotes>) {
  const items = [];
  if (enabledRemotes.find((r) => r.name === 'dashboard')) {
    items.push({ label: 'Dashboard', path: '/dashboard', icon: 'dashboard' });
  }
  if (enabledRemotes.find((r) => r.name === 'workflow')) {
    items.push({ label: 'Workflow', path: '/workflow', icon: 'workflow' });
  }
  if (enabledRemotes.find((r) => r.name === 'reports')) {
    items.push({ label: 'Reports', path: '/reports', icon: 'reports' });
  }
  if (enabledRemotes.find((r) => r.name === 'settings')) {
    items.push({ label: 'Settings', path: '/settings', icon: 'settings' });
  }
  return items;
}

function LayoutShell() {
  const [collapsed, setCollapsed] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);
  const enabledRemotes = getEnabledRemotes();
  const tenant = useTenantStore((s) => s.tenant);
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setCollapsed(mq.matches);
    const handler = (e: MediaQueryListEvent) => setCollapsed(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <div className="h-screen flex bg-gray-950 overflow-hidden">
      <Sidebar
        items={menuItems(enabledRemotes)}
        currentPath={location.pathname}
        onNavigate={navigate}
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header user={user} onLogout={() => setShowLogoutConfirm(true)} theme={theme} onThemeToggle={toggleTheme} />

        <main className="flex-1 overflow-auto p-4 sm:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.28, ease: 'easeOut' } }}
              exit={{ opacity: 0, y: -12, transition: { duration: 0.18, ease: 'easeIn' } }}
            >
              <Routes location={location}>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />

                <Route
                  path="/dashboard/*"
                  element={
                    <AuthGuard feature="dashboard">
                      <RemoteLoader
                        remoteName={REMOTE_REGISTRY.dashboard.scope}
                        exposedModule={REMOTE_REGISTRY.dashboard.module}
                      />
                    </AuthGuard>
                  }
                />

                <Route
                  path="/workflow/*"
                  element={
                    <AuthGuard feature="workflow">
                      <RemoteLoader
                        remoteName={REMOTE_REGISTRY.workflow.scope}
                        exposedModule={REMOTE_REGISTRY.workflow.module}
                      />
                    </AuthGuard>
                  }
                />

                <Route
                  path="/reports/*"
                  element={
                    <AuthGuard feature="reports">
                      <RemoteLoader
                        remoteName={REMOTE_REGISTRY.reports.scope}
                        exposedModule={REMOTE_REGISTRY.reports.module}
                      />
                    </AuthGuard>
                  }
                />

                <Route
                  path="/settings/*"
                  element={
                    <AuthGuard feature="settings">
                      <RemoteLoader
                        remoteName={REMOTE_REGISTRY.settings.scope}
                        exposedModule={REMOTE_REGISTRY.settings.module}
                      />
                    </AuthGuard>
                  }
                />

                <Route
                  path="*"
                  element={
                    <EmptyState
                      type="error"
                      title="Page not found"
                      description="The page you're looking for doesn't exist."
                    />
                  }
                />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>

        {tenant && (
          <footer className="px-4 sm:px-6 py-3 border-t border-gray-800 text-xs text-gray-600">
            {tenant.name} &middot; v1.0.0
          </footer>
        )}
      </div>

      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowLogoutConfirm(false)} />
          <div className="relative w-full max-w-sm rounded-xl border border-gray-800 bg-gray-900 shadow-2xl">
            <div className="px-6 py-4 border-b border-gray-800">
              <h2 className="text-lg font-semibold text-gray-100">Sign Out</h2>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-400">Are you sure you want to sign out?</p>
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-800">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-gray-200 hover:bg-gray-800 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => { logout(); setShowLogoutConfirm(false); }}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-red-600 hover:bg-red-500 text-white transition-all"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function MainLayout() {
  return (
    <BrowserRouter>
      <LayoutShell />
    </BrowserRouter>
  );
}
