/**
 * FILE PURPOSE: Pre-built skeleton placeholder compositions for stats cards, charts, and activity feeds.
 * 
 * CONNECTIONS:
 * - Imports from: ./Skeleton
 * - Used by: @platform/ui (barrel), micro-frontend apps (dashboard, reports pages)
 * 
 * For a backend developer: Visual loading states that match the layout of real data components.
 * StatCardSkeleton, ChartCardSkeleton, and ActivitySkeleton animate while backend data loads.
 */

import { Skeleton } from './Skeleton';

export function StatCardSkeleton() {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900 p-5 space-y-3">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-3 w-24" />
    </div>
  );
}

export function ChartCardSkeleton() {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 space-y-4">
      <div className="space-y-1">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-3 w-56" />
      </div>
      <Skeleton className="h-64 w-full" />
    </div>
  );
}

export function ActivitySkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 py-2">
          <Skeleton className="w-2 h-2 rounded-full" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
}
