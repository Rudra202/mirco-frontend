/**
 * FILE PURPOSE: Workflow listing page with search, status filter, and toggle confirmation
 * 
 * CONNECTIONS:
 * - Imports from: @platform/ui (Card, Button, Input, Skeleton, Badge, PageHeader), @platform/utils (formatRelativeTime)
 * - Used by: ./app.tsx
 * 
 * For a backend developer: This component displays all automated workflows as a list with
 * search/filter, summary stats (total, active, runs), and a toggle to pause/activate each.
 * A confirmation dialog prevents accidental toggles. Data is currently mocked inline.
 */
import { useState, useEffect, useMemo } from 'react';
import { Card, Button, Input, Skeleton, Badge, PageHeader } from '@platform/ui';
import { formatRelativeTime } from '@platform/utils';

interface Workflow {
  id: string;
  name: string;
  status: 'Active' | 'Paused';
  steps: number;
  runs: number;
  lastRun: string;
}

const allWorkflows: Workflow[] = [
  { id: '1', name: 'User Onboarding', status: 'Active', steps: 5, runs: 1243, lastRun: new Date(Date.now() - 1800000).toISOString() },
  { id: '2', name: 'Invoice Approval', status: 'Active', steps: 3, runs: 892, lastRun: new Date(Date.now() - 7200000).toISOString() },
  { id: '3', name: 'Data Export', status: 'Paused', steps: 4, runs: 456, lastRun: new Date(Date.now() - 86400000).toISOString() },
  { id: '4', name: 'Report Generation', status: 'Active', steps: 6, runs: 2107, lastRun: new Date(Date.now() - 3600000).toISOString() },
  { id: '5', name: 'Customer Feedback Sync', status: 'Paused', steps: 3, runs: 189, lastRun: new Date(Date.now() - 172800000).toISOString() },
  { id: '6', name: 'Data Backup', status: 'Active', steps: 2, runs: 3456, lastRun: new Date(Date.now() - 300000).toISOString() },
];

export function WorkflowPage() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statuses, setStatuses] = useState<Record<string, string>>({});
  const [confirmToggle, setConfirmToggle] = useState<Workflow | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setStatuses(Object.fromEntries(allWorkflows.map((w) => [w.id, w.status])));
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  const doToggleStatus = (id: string) => {
    setStatuses((prev) => ({
      ...prev,
      [id]: prev[id] === 'Active' ? 'Paused' : 'Active',
    }));
  };

  const filtered = useMemo(() => {
    if (!search) return allWorkflows;
    return allWorkflows.filter((w) => w.name.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  const activeCount = Object.values(statuses).filter((s) => s === 'Active').length;
  const totalRuns = allWorkflows.reduce((sum, w) => sum + w.runs, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Workflows"
        description="Automate your business processes"
        breadcrumbs={[{ label: 'Home', href: '/dashboard' }, { label: 'Workflows' }]}
        actions={<Button>Create Workflow</Button>}
      />

      {loading ? (
        <div className="space-y-4">
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 space-y-3">
            <div className="flex gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-3 w-14" />
                </div>
              ))}
            </div>
          </div>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-gray-800 bg-gray-900 p-5 space-y-3">
              <div className="flex items-center gap-4">
                <Skeleton className="w-10 h-10 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-56" />
                </div>
                <Skeleton className="h-6 w-14 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card padding={false}>
              <div className="p-5">
                <p className="text-2xl font-bold text-gray-100">{allWorkflows.length}</p>
                <p className="text-xs text-gray-500">Total Workflows</p>
              </div>
            </Card>
            <Card padding={false}>
              <div className="p-5">
                <p className="text-2xl font-bold text-emerald-400">{activeCount}</p>
                <p className="text-xs text-gray-500">Active</p>
              </div>
            </Card>
            <Card padding={false}>
              <div className="p-5">
                <p className="text-2xl font-bold text-indigo-400">{totalRuns.toLocaleString()}</p>
                <p className="text-xs text-gray-500">Total Runs</p>
              </div>
            </Card>
          </div>

          <div className="flex items-center gap-2">
            <Input
              placeholder="Search workflows..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-64"
            />
          </div>

          {filtered.length === 0 ? (
            <div className="text-sm text-gray-500 text-center py-8">
              No workflows match your search.
            </div>
          ) : (
            <div className="grid gap-4">
              {filtered.map((wf) => {
                const currentStatus = statuses[wf.id] || wf.status;
                return (
                  <Card key={wf.id} className="hover:border-gray-700 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          currentStatus === 'Active'
                            ? 'bg-emerald-600/20 text-emerald-400'
                            : 'bg-amber-600/20 text-amber-400'
                        }`}>
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                            <rect x="9" y="3" width="6" height="4" rx="1" />
                            <path d="M9 14l2 2 4-4" />
                          </svg>
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-sm font-medium text-gray-200">{wf.name}</h3>
                          <div className="flex gap-4 mt-1 text-xs text-gray-500 flex-wrap">
                            <span>{wf.steps} steps</span>
                            <span>{wf.runs.toLocaleString()} runs</span>
                            <span>Last run {formatRelativeTime(wf.lastRun)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <Badge variant={currentStatus === 'Active' ? 'success' : 'warning'}>
                          {currentStatus}
                        </Badge>
                        <button
                          onClick={() => setConfirmToggle(wf)}
                          className={`relative w-10 h-5 rounded-full transition-colors ${
                            currentStatus === 'Active' ? 'bg-emerald-600' : 'bg-gray-700'
                          }`}
                        >
                          <span
                            className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                              currentStatus === 'Active' ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </>
      )}

      {confirmToggle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setConfirmToggle(null)} />
          <div className="relative w-full max-w-sm rounded-xl border border-gray-800 bg-gray-900 shadow-2xl">
            <div className="px-6 py-4 border-b border-gray-800">
              <h2 className="text-lg font-semibold text-gray-100">Toggle Workflow</h2>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-400">
                Are you sure you want to <span className="font-medium text-gray-200">
                  {statuses[confirmToggle.id] === 'Active' ? 'pause' : 'activate'}
                </span> <span className="font-medium text-gray-200">{confirmToggle.name}</span>?
              </p>
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-800">
              <button
                onClick={() => setConfirmToggle(null)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-gray-200 hover:bg-gray-800 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  doToggleStatus(confirmToggle.id);
                  setConfirmToggle(null);
                }}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition-all"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
