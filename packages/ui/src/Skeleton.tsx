/**
 * FILE PURPOSE: Base animated skeleton/placeholder component for loading states.
 * 
 * CONNECTIONS:
 * - Imports from: @platform/utils (cn)
 * - Used by: ./Skeletons.tsx, micro-frontend apps
 * 
 * For a backend developer: A generic pulsing placeholder rectangle. Wrap it in custom dimensions
 * via className to match the shape of content that's still loading from the backend.
 */

import { cn } from '@platform/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-gray-800',
        className
      )}
    />
  );
}
