/**
 * FILE PURPOSE: Styled native <select> dropdown with label, placeholder, options, and error state.
 * 
 * CONNECTIONS:
 * - Imports from: @platform/utils (cn), react
 * - Used by: micro-frontend apps (forms, filters, settings pages)
 * 
 * For a backend developer: A UI form control. Renders a standard HTML select with dark-themed styling.
 * Accepts options array, optional label, and error message. No backend interaction by itself.
 */

import { cn } from '@platform/utils';
import type { SelectHTMLAttributes } from 'react';

/**
 * A single select option item used by the Select component.
 */
interface SelectOption {
  /** The option's internal value. */
  value: string;
  /** The option's display label. */
  label: string;
}

/**
 * Props for the Select component.
 */
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  /** Label text rendered above the select. */
  label?: string;
  /** Array of options to render as `<option>` elements. */
  options: SelectOption[];
  /** Error message displayed below the select in red. */
  error?: string;
  /** Placeholder option text rendered first (with an empty value). */
  placeholder?: string;
}

/**
 * A styled native `<select>` dropdown with label, placeholder, error, and
 * option list support.
 */
export function Select({ label, options, error, placeholder, className, id, ...props }: SelectProps) {
  const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={cn(
          'block w-full rounded-lg border bg-gray-900 px-3 py-2 text-sm text-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500',
          error ? 'border-red-500' : 'border-gray-700 hover:border-gray-600',
          className
        )}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}
