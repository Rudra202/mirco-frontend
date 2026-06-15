/**
 * FILE PURPOSE: Central registry mapping micro-frontend names to their Module Federation configs (URL, scope, module).
 *
 * CONNECTIONS:
 * - Imports from: @platform/types (RemoteConfig)
 * - Used by: MainLayout.tsx (imports getEnabledRemotes, REMOTE_REGISTRY)
 *
 * For a backend developer: This file tells the shell where each remote micro-frontend lives at runtime.
 * Each entry points to a remoteEntry.js URL that Webpack Module Federation uses to fetch the remote app.
 */
import type { RemoteConfig } from '@platform/types';

/**
 * Registry of all available remote micro-frontends.
 * Each key corresponds to a remote application name.
 */
export const REMOTE_REGISTRY: Record<string, RemoteConfig> = {
  dashboard: {
    name: 'dashboard',
    url: 'http://localhost:3001/remoteEntry.js',
    scope: 'dashboard',
    module: './DashboardApp',
    enabled: true,
  },
  workflow: {
    name: 'workflow',
    url: 'http://localhost:3002/remoteEntry.js',
    scope: 'workflow',
    module: './WorkflowApp',
    enabled: true,
  },
  reports: {
    name: 'reports',
    url: 'http://localhost:3003/remoteEntry.js',
    scope: 'reports',
    module: './ReportsApp',
    enabled: true,
  },
  settings: {
    name: 'settings',
    url: 'http://localhost:3004/remoteEntry.js',
    scope: 'settings',
    module: './SettingsApp',
    enabled: true,
  },
};

/**
 * Returns only the remote configs whose `enabled` flag is true.
 * Used by the layout to dynamically build the sidebar and route map.
 */
export function getEnabledRemotes(): RemoteConfig[] {
  return Object.values(REMOTE_REGISTRY).filter((r) => r.enabled);
}
