/**
 * FILE PURPOSE: Reusable button component with variants (primary/secondary/ghost/danger), sizes, loading spinner, and icon slot.
 * 
 * CONNECTIONS:
 * - Imports from: @platform/utils (cn), react
 * - Used by: @platform/ui (Modal), micro-frontend apps (forms, actions, navigation)
 * 
 * For a backend developer: The primary action button across the app. variant controls color/style,
 * size controls padding/font. loading replaces icon with spinner and disables the button.
 */

import { cn } from '@platform/utils';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

/**
 * Props for the Button component.
 */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant of the button. */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  /** Size preset for padding and font size. */
  size?: 'sm' | 'md' | 'lg';
  /** Shows a spinner and disables the button when true. */
  loading?: boolean;
  /** Optional icon element rendered before the children. Hidden while loading. */
  icon?: ReactNode;
}

const variants = {
  primary: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/25',
  secondary: 'bg-gray-800 hover:bg-gray-700 text-gray-100 border border-gray-700',
  ghost: 'text-gray-400 hover:text-gray-100 hover:bg-gray-800',
  danger: 'bg-red-600 hover:bg-red-500 text-white',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

/**
 * A reusable button with variant, size, loading, and icon support.
 * Extends native button HTML attributes. When `loading` is true, a spinner
 * replaces the icon and the button is disabled.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  loading,
  icon,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : icon ? (
        icon
      ) : null}
      {children}
    </button>
  );
}
