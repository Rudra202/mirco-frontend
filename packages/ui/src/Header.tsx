/**
 * FILE PURPOSE: Top application bar with logo, user info (avatar/name/role), theme toggle, and logout.
 * 
 * CONNECTIONS:
 * - Imports from: @platform/utils (cn), @platform/types (User)
 * - Used by: shell app (main layout with Sidebar)
 * 
 * For a backend developer: Renders the top header strip. Displays the current user's avatar initial,
 * name, and role. Includes a dark/light theme toggle button and a logout button that triggers onLogout.
 */

import { cn } from '@platform/utils';
import type { User } from '@platform/types';

/**
 * Props for the Header component.
 */
interface HeaderProps {
  /** The currently logged-in user, or null if not authenticated. */
  user: User | null;
  /** Callback fired when the logout button is clicked. */
  onLogout: () => void;
  /** Current theme for the toggle icon display. */
  theme?: 'dark' | 'light';
  /** Callback fired when the theme toggle button is clicked. */
  onThemeToggle?: () => void;
  /** Additional CSS classes for the header element. */
  className?: string;
}

/**
 * Top application bar displaying the logo, user info (avatar + name + role),
 * a theme toggle, and a logout button. Adapts its content based on
 * authentication state and theme preference.
 */
export function Header({ user, onLogout, theme, onThemeToggle, className }: HeaderProps) {
  return (
    <header
      className={cn(
        'h-16 border-b border-gray-800 bg-gray-950 flex items-center justify-between px-6',
        className
      )}
    >
      <div className="flex items-center gap-3">
        <h1 className="text-sm font-medium text-gray-300">SaaS Platform</h1>
      </div>

      <div className="flex items-center gap-3">
        {onThemeToggle && (
          <button
            onClick={onThemeToggle}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-gray-800 transition-colors"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        )}

        {user && (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-200">{user.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user.role}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-semibold text-white">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        )}
        <button
          onClick={onLogout}
          className="px-3 py-1.5 text-sm text-gray-400 hover:text-gray-200 hover:bg-gray-800 rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
