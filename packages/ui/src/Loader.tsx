/**
 * FILE PURPOSE: Centered animated spinner for loading states (sm/md/lg).
 * 
 * CONNECTIONS:
 * - Imports from: @platform/utils (cn)
 * - Used by: @platform/ui (indirectly), micro-frontend apps
 * 
 * For a backend developer: A pure CSS spinner indicator. Use <Loader size="md" /> while waiting
 * for backend data. Three sizes available. No server calls.
 */

import { cn } from '@platform/utils';

/**
 * Props for the Loader component.
 */
interface LoaderProps {
  /** Size preset for the spinner dimensions. */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes for the wrapper. */
  className?: string;
}

const sizes = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
};

/**
 * A centered animated spinner for indicating loading states.
 * Available in three sizes: sm (16px), md (32px), lg (48px).
 */
export function Loader({ size = 'md', className }: LoaderProps) {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <svg
        className={cn('animate-spin text-indigo-500', sizes[size])}
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
    </div>
  );
}
