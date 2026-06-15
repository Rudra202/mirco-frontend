/**
 * FILE PURPOSE: Collapsible vertical navigation sidebar with icons, badges, and active-state indicators.
 * 
 * CONNECTIONS:
 * - Imports from: @platform/utils (cn), @platform/types (MenuItem)
 * - Used by: shell app (main layout with Header)
 * 
 * For a backend developer: Renders the left-hand navigation from MenuItem config. Items highlight
 * based on currentPath. Supports collapsed mode (icons only) with hover tooltips. No backend calls.
 */

import { cn } from '@platform/utils';
import type { MenuItem } from '@platform/types';

/**
 * Props for the Sidebar component.
 */
interface SidebarProps {
  /** Navigation menu items to display. */
  items: MenuItem[];
  /** Current URL path used to determine the active item. */
  currentPath: string;
  /** Callback fired when a nav item is clicked, receiving the item's path. */
  onNavigate: (path: string) => void;
  /** Whether the sidebar is in collapsed (icon-only) mode. */
  collapsed?: boolean;
  /** Callback fired when the collapse toggle button is clicked. */
  onToggle?: () => void;
}

/**
 * Maps an icon key string to its corresponding SVG element.
 * Falls back to null if the key is not recognised.
 */
function SidebarIcon({ icon }: { icon: string }) {
  const icons: Record<string, JSX.Element> = {
    dashboard: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
    workflow: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 14l2 2 4-4" />
      </svg>
    ),
    reports: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20h16" />
        <path d="M4 20V4" />
        <path d="M8 16V8" />
        <path d="M12 16v-4" />
        <path d="M16 16v-6" />
      </svg>
    ),
    settings: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
  };
  return icons[icon] ?? null;
}

/**
 * A collapsible vertical navigation sidebar. Displays menu items with icons,
 * labels, badges, and an active-indicator bar. When collapsed, only icons are
 * visible and hover tooltips appear. Includes a collapse/expand toggle at the
 * bottom.
 */
export function Sidebar({ items, currentPath, onNavigate, collapsed, onToggle }: SidebarProps) {
  return (
    <aside
      className={cn(
        'h-screen bg-gray-950 border-r border-gray-800 flex flex-col transition-[width] duration-200 ease-in-out flex-shrink-0',
        collapsed ? 'w-16' : 'w-60'
      )}
    >
      <div className="flex items-center h-16 px-4 border-b border-gray-800 flex-shrink-0 gap-3">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
        {!collapsed && (
          <span className="text-base font-bold text-gray-100 tracking-tight truncate">Platform</span>
        )}
      </div>

      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto overflow-x-hidden">
        {items.map((item) => {
          const active = currentPath.startsWith(item.path);
          return (
            <div key={item.path} className="relative">
              {active && (
                <div className={cn(
                  'absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-indigo-500 rounded-full transition-all duration-200',
                  collapsed ? 'opacity-100' : 'opacity-100'
                )} />
              )}
              <button
                onClick={() => onNavigate(item.path)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group',
                  active
                    ? 'bg-indigo-600/10 text-indigo-400'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                )}
                title={collapsed ? item.label : undefined}
              >
                <span className="flex-shrink-0">{SidebarIcon({ icon: item.icon })}</span>
                {!collapsed && (
                  <span className="flex-1 text-left truncate">{item.label}</span>
                )}
                {!collapsed && item.badge && (
                  <span className="px-2 py-0.5 text-xs rounded-full bg-indigo-600/20 text-indigo-400 flex-shrink-0">
                    {item.badge}
                  </span>
                )}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2.5 py-1.5 bg-gray-800 text-gray-200 text-xs rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 whitespace-nowrap z-50 pointer-events-none">
                    {item.label}
                  </div>
                )}
              </button>
            </div>
          );
        })}
      </nav>

      <div className="p-3 border-t border-gray-800 flex-shrink-0">
        <button
          onClick={onToggle}
          className={cn(
            'p-2 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-gray-800 transition-colors w-full flex items-center justify-center gap-2'
          )}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg className={cn('w-5 h-5 transition-transform duration-200', collapsed && 'rotate-180')} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          {!collapsed && <span className="text-xs">Collapse</span>}
        </button>
        {!collapsed && (
          <p className="text-center text-xs text-gray-600 mt-2">v1.0.0</p>
        )}
      </div>
    </aside>
  );
}