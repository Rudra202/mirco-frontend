/**
 * FILE PURPOSE: Lazy-loads and renders a remote micro-frontend component with Suspense + error boundary.
 *
 * CONNECTIONS:
 * - Imports from: @platform/ui (Loader)
 * - Used by: MainLayout.tsx (renders each remote route's component)
 *
 * For a backend developer: Each micro-frontend is lazy-loaded via React.lazy + Webpack Module Federation.
 * This component wraps the remote in a loading spinner and an error boundary so a failing remote
 * doesn't crash the whole shell — it shows a fallback message instead.
 */
import { lazy, Suspense, Component, type ComponentType, type ReactNode } from 'react';
import { Loader } from '@platform/ui';

interface RemoteLoaderProps {
  /** The logical name of the remote (key in REMOTE_COMPONENTS). */
  remoteName: string;
  /** The Module Federation exposed module path (unused in lookup but kept for clarity). */
  exposedModule: string;
  /** Fallback content shown while the lazy chunk is loading. */
  fallback?: ReactNode;
  /** Content shown if the remote chunk fails to load. */
  errorComponent?: ReactNode;
  /** Any extra props forwarded to the remote component. */
  [key: string]: unknown;
}

/**
 * Error boundary specifically for remote micro-frontend modules.
 * Catches rendering errors (e.g. chunk load failures) and displays
 * a configurable fallback UI instead of crashing the entire shell.
 */
class RemoteErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="flex items-center justify-center h-64 text-gray-500">
          Failed to load remote module
        </div>
      );
    }
    return this.props.children;
  }
}

/** Pre-registered lazy references to each remote micro-frontend. */
const REMOTE_COMPONENTS: Record<string, ComponentType<Record<string, unknown>>> = {
  dashboard: lazy(() => import('dashboard/DashboardApp')),
  workflow: lazy(() => import('workflow/WorkflowApp')),
  reports: lazy(() => import('reports/ReportsApp')),
  settings: lazy(() => import('settings/SettingsApp')),
};

/**
 * Renders the requested remote micro-frontend component.
 *
 * @param props.remoteName - Logical remote name (e.g. "dashboard").
 * @param props.exposedModule - The exposed module path (informational).
 * @param props.fallback - Loading fallback element.
 * @param props.errorComponent - Error fallback element.
 * @param props - Additional props forwarded to the remote component.
 */
export function RemoteLoader({ remoteName, exposedModule, fallback, errorComponent, ...props }: RemoteLoaderProps) {
  const RemoteComponent = REMOTE_COMPONENTS[remoteName];

  if (!RemoteComponent) {
    return <div className="text-gray-500 p-4">Unknown remote: "{remoteName}"</div>;
  }

  return (
    <RemoteErrorBoundary fallback={errorComponent}>
      <Suspense fallback={fallback ?? <Loader className="h-64" />}>
        <RemoteComponent {...props} />
      </Suspense>
    </RemoteErrorBoundary>
  );
}
