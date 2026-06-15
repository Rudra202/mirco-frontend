/**
 * FILE PURPOSE: Styled text input with label, error message, and helper text.
 * 
 * CONNECTIONS:
 * - Imports from: @platform/utils (cn), react
 * - Used by: micro-frontend apps (forms, search, settings)
 * 
 * For a backend developer: A UI form control wrapping <input>. Shows red border + error text when
 * the error prop is set. Auto-generates an id from the label for accessibility. No server calls.
 */

import { cn } from '@platform/utils';
import type { InputHTMLAttributes } from 'react';

/**
 * Props for the Input component.
 */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Label text rendered above the input. Auto-generates an `id` if not provided. */
  label?: string;
  /** Error message displayed below the input in red. Takes precedence over `helperText`. */
  error?: string;
  /** Helper text shown below the input when there is no error. */
  helperText?: string;
}

/**
 * A styled text input with an optional label, error state, and helper text.
 * Derives its `id` from the label when no explicit `id` is given.
 */
export function Input({ label, error, helperText, className, id, ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'block w-full rounded-lg border bg-gray-900 px-3 py-2 text-sm text-white placeholder-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500',
          'autofill:bg-gray-900 autofill:text-white autofill:shadow-[inset_0_0_0_1000px_#111827]',
          error ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 hover:border-gray-600',
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-400">{error}</p>}
      {helperText && !error && <p className="text-sm text-gray-500">{helperText}</p>}
    </div>
  );
}
