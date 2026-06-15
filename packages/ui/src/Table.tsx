/**
 * FILE PURPOSE: Generic data table component with loading skeletons, empty state, and row click.
 * 
 * CONNECTIONS:
 * - Imports from: @platform/utils (cn), react
 * - Used by: micro-frontend apps (dashboard, reports, settings pages)
 * 
 * For a backend developer: Renders tabular data client-side. Accepts column definitions and row data.
 * Shows skeleton placeholders while loading. When data is empty, renders an emptyState slot.
 * Clicking a row fires onRowClick for navigation or detail views.
 */

import { cn } from '@platform/utils';
import type { ReactNode } from 'react';

/**
 * Defines a single column in a Table.
 */
export interface Column<T> {
  /** The data key on each row object. */
  key: string;
  /** Text displayed in the column header. */
  header: string;
  /** Custom render function for the cell content. Defaults to displaying `item[key]`. */
  render?: (item: T) => ReactNode;
  /** Additional CSS classes applied to both header and body cells in this column. */
  className?: string;
  /** Whether the column supports sorting (reserved for future use). */
  sortable?: boolean;
}

/**
 * Props for the Table component.
 */
interface TableProps<T> {
  /** Column definitions for the table. */
  columns: Column<T>[];
  /** Array of row data objects. */
  data: T[];
  /** Function returning a unique string key for each row. */
  keyExtractor: (item: T) => string;
  /** Shows skeleton placeholders while loading. */
  loading?: boolean;
  /** Custom content rendered when `data` is empty. */
  emptyState?: ReactNode;
  /** Callback fired when a row is clicked. Enables hover and pointer styles when set. */
  onRowClick?: (item: T) => void;
}

/**
 * A generic data table with header, body, loading skeleton, empty state, and
 * optional row-click handling. When `loading` is true, skeleton placeholders
 * are rendered. When `data` is empty and `emptyState` is provided, that gets
 * rendered instead of the table.
 */
export function Table<T extends Record<string, unknown>>({
  columns,
  data,
  keyExtractor,
  loading,
  emptyState,
  onRowClick,
}: TableProps<T>) {
  if (loading) {
    return (
      <div className="rounded-xl border border-gray-800 bg-gray-900">
        <div className="p-6 space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-10 bg-gray-800 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (data.length === 0 && emptyState) {
    return <>{emptyState}</>;
  }

  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    'px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                    col.className
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {data.map((item) => (
              <tr
                key={keyExtractor(item)}
                onClick={() => onRowClick?.(item)}
                className={cn(
                  'transition-colors',
                  onRowClick ? 'cursor-pointer hover:bg-gray-800/50' : 'hover:bg-gray-800/30'
                )}
              >
                {columns.map((col) => (
                  <td key={col.key} className={cn('px-4 py-3 text-sm text-gray-300', col.className)}>
                    {col.render ? col.render(item) : (item[col.key] as ReactNode) ?? '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
