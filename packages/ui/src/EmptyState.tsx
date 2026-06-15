/**
 * FILE PURPOSE: Empty state placeholder with illustration, title, description, and optional action.
 * 
 * CONNECTIONS:
 * - Imports from: @platform/utils (cn), react
 * - Used by: @platform/ui (Table), micro-frontend apps (empty data views, search no-results)
 * 
 * For a backend developer: Shown when a page/list has no data to display. Built-in illustration
 * types: empty, search (no results), error, success. Optionally renders an action button/CTA.
 */

import { cn } from '@platform/utils';
import type { ReactNode } from 'react';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
  /** Built-in illustration type. Overrides `icon` when set. */
  type?: 'empty' | 'search' | 'error' | 'success';
}

const illustrations: Record<string, ReactNode> = {
  empty: (
    <svg className="w-16 h-16 text-gray-700" viewBox="0 0 64 64" fill="none">
      <rect x="12" y="16" width="40" height="32" rx="4" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" />
      <path d="M12 26h40" stroke="currentColor" strokeWidth="2" />
      <circle cx="28" cy="34" r="2" fill="currentColor" opacity="0.4" />
      <circle cx="36" cy="34" r="2" fill="currentColor" opacity="0.4" />
      <circle cx="44" cy="34" r="2" fill="currentColor" opacity="0.4" />
    </svg>
  ),
  search: (
    <svg className="w-16 h-16 text-gray-700" viewBox="0 0 64 64" fill="none">
      <circle cx="28" cy="28" r="12" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" />
      <path d="M36 36l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  error: (
    <svg className="w-16 h-16 text-gray-700" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="16" stroke="currentColor" strokeWidth="2" />
      <path d="M24 24l16 16M40 24l-16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  success: (
    <svg className="w-16 h-16 text-gray-700" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="16" stroke="currentColor" strokeWidth="2" />
      <path d="M24 32l6 6 10-12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export function EmptyState({ icon, title, description, action, className, type }: EmptyStateProps) {
  const graphic = type ? illustrations[type] : icon;

  return (
    <div className={cn('flex flex-col items-center justify-center py-16 px-4', className)}>
      {graphic && <div className="mb-5">{graphic}</div>}
      <h3 className="text-base font-semibold text-gray-300">{title}</h3>
      {description && <p className="mt-1.5 text-sm text-gray-500 text-center max-w-sm leading-relaxed">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
