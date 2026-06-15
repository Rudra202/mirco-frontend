/**
 * FILE PURPOSE: Inline badge/tag component with color variants (success, warning, danger, info, gray) and sizes.
 * 
 * CONNECTIONS:
 * - Imports from: @platform/utils (cn), react
 * - Used by: micro-frontend apps (status indicators, labels, tags)
 * 
 * For a backend developer: Renders a small colored pill for status display. Each variant has
 * a matching dot indicator (md size). Use <Badge variant="success">Active</Badge> to show status.
 */

import { cn } from '@platform/utils';
import type { ReactNode } from 'react';

interface BadgeProps {
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'gray';
  size?: 'sm' | 'md';
  children: ReactNode;
  className?: string;
}

const variants = {
  success: 'bg-emerald-600/15 text-emerald-400 ring-emerald-500/20',
  warning: 'bg-amber-600/15 text-amber-400 ring-amber-500/20',
  danger: 'bg-red-600/15 text-red-400 ring-red-500/20',
  info: 'bg-indigo-600/15 text-indigo-400 ring-indigo-500/20',
  gray: 'bg-gray-700/50 text-gray-400 ring-gray-600/20',
};

const sizes = {
  sm: 'px-1.5 py-0.5 text-[10px]',
  md: 'px-2.5 py-0.5 text-xs',
};

export function Badge({ variant = 'gray', size = 'md', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full ring-1 ring-inset',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {size === 'md' && (
        <span
          className={cn(
            'w-1.5 h-1.5 rounded-full mr-1.5',
            variant === 'success' && 'bg-emerald-400',
            variant === 'warning' && 'bg-amber-400',
            variant === 'danger' && 'bg-red-400',
            variant === 'info' && 'bg-indigo-400',
            variant === 'gray' && 'bg-gray-400',
          )}
        />
      )}
      {children}
    </span>
  );
}
