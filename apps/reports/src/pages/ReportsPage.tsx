/**
 * FILE PURPOSE: Reports page with type distribution chart, searchable/filterable table, and modals
 * 
 * CONNECTIONS:
 * - Imports from: @platform/ui (Card, Button, Modal, Input, Select, Table, DonutChart, Skeleton, Badge, PageHeader),
 *                 @platform/utils (formatDate), @platform/ui (Column type)
 * - Used by: ./app.tsx
 * 
 * For a backend developer: This component renders the reports screen with a donut chart of report
 * types, summary stats (total/ready/generating), a table filtered by search & type, and modals
 * for generating or deleting reports. Data is currently mocked inline.
 */
import { useState, useEffect, useMemo } from 'react';
import { Card, Button, Modal, Input, Select, Table, DonutChart, Skeleton, Badge, PageHeader } from '@platform/ui';
import { formatDate } from '@platform/utils';
import type { Column } from '@platform/ui';

interface Report {
  id: string;
  name: string;
  type: string;
  lastGenerated: string;
  status: string;
}

const allReports: Report[] = [
  { id: '1', name: 'Monthly Revenue Report', type: 'Financial', lastGenerated: '2026-06-01T00:00:00Z', status: 'Ready' },
  { id: '2', name: 'User Activity Summary', type: 'Analytics', lastGenerated: '2026-06-05T00:00:00Z', status: 'Ready' },
  { id: '3', name: 'Workflow Performance', type: 'Operations', lastGenerated: '2026-06-03T00:00:00Z', status: 'Generating' },
  { id: '4', name: 'Customer Satisfaction', type: 'Survey', lastGenerated: '2026-05-28T00:00:00Z', status: 'Ready' },
  { id: '5', name: 'Quarterly Business Review', type: 'Executive', lastGenerated: '2026-04-15T00:00:00Z', status: 'Archived' },
  { id: '6', name: 'Churn Rate Analysis', type: 'Analytics', lastGenerated: '2026-06-02T00:00:00Z', status: 'Ready' },
  { id: '7', name: 'Expense Breakdown', type: 'Financial', lastGenerated: '2026-05-20T00:00:00Z', status: 'Archived' },
  { id: '8', name: 'Employee Satisfaction', type: 'Survey', lastGenerated: '2026-06-04T00:00:00Z', status: 'Generating' },
];

const statusBadge: Record<string, 'success' | 'warning' | 'gray'> = {
  Ready: 'success',
  Generating: 'warning',
  Archived: 'gray',
};

const typeColors: Record<string, string> = {
  Financial: '#818cf8',
  Analytics: '#34d399',
  Operations: '#fbbf24',
  Survey: '#f472b6',
  Executive: '#a78bfa',
};

const typeDistribution = Object.entries(
  allReports.reduce<Record<string, number>>((acc, r) => {
    acc[r.type] = (acc[r.type] || 0) + 1;
    return acc;
  }, {})
).map(([name, value]) => ({ name, value, color: typeColors[name] || '#6b7280' }));

const columns: Column<Report>[] = [
  { key: 'name', header: 'Report Name', className: 'font-medium text-gray-200' },
  { key: 'type', header: 'Type' },
  {
    key: 'lastGenerated',
    header: 'Last Generated',
    render: (r) => formatDate(r.lastGenerated),
  },
  {
    key: 'status',
    header: 'Status',
    render: (r) => <Badge variant={statusBadge[r.status] || 'gray'}>{r.status}</Badge>,
  },
];

export function ReportsPage() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<Report | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => {
    let list = allReports;
    if (search) list = list.filter((r) => r.name.toLowerCase().includes(search.toLowerCase()));
    if (typeFilter) list = list.filter((r) => r.type === typeFilter);
    return list;
  }, [search, typeFilter]);

  const types = [...new Set(allReports.map((r) => r.type))];
  const ready = allReports.filter((r) => r.status === 'Ready').length;
  const generating = allReports.filter((r) => r.status === 'Generating').length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        description="View and generate reports"
        breadcrumbs={[{ label: 'Home', href: '/dashboard' }, { label: 'Reports' }]}
        actions={<Button onClick={() => setShowModal(true)}>Generate Report</Button>}
      />

      {loading ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 space-y-3">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-48 w-full" />
            </div>
            <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 space-y-3">
              <Skeleton className="h-5 w-32" />
              <div className="flex gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-3 w-12" />
                  </div>
                ))}
              </div>
              <Skeleton className="h-48 w-full" />
            </div>
          </div>
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 space-y-3">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-48 w-full" />
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Reports by Type" subtitle="Distribution across categories">
              <DonutChart data={typeDistribution} height={200} />
              <div className="flex items-center justify-center gap-4 mt-2 flex-wrap">
                {typeDistribution.map((t) => (
                  <div key={t.name} className="flex items-center gap-1.5 text-xs text-gray-400">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: t.color }} />
                    {t.name}
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Overview">
              <div className="flex gap-6 sm:gap-8 mb-4 flex-wrap">
                <div>
                  <p className="text-2xl font-bold text-gray-100">{allReports.length}</p>
                  <p className="text-xs text-gray-500">Total Reports</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-emerald-400">{ready}</p>
                  <p className="text-xs text-gray-500">Ready</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-amber-400">{generating}</p>
                  <p className="text-xs text-gray-500">Generating</p>
                </div>
              </div>
              <DonutChart data={typeDistribution} height={180} />
            </Card>
          </div>

          <Card
            title="All Reports"
            subtitle={`${filtered.length} of ${allReports.length} reports`}
            actions={
              <div className="flex gap-2 flex-wrap">
                <Input
                  placeholder="Search reports..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-48 max-w-full"
                />
                <Select
                  options={[{ value: '', label: 'All Types' }, ...types.map((t) => ({ value: t, label: t }))]}
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-36"
                />
              </div>
            }
          >
            {filtered.length === 0 ? (
              <div className="py-12 text-center text-sm text-gray-500">
                No reports match your search criteria.
              </div>
            ) : (
              <Table columns={columns} data={filtered} keyExtractor={(r) => r.id} />
            )}
          </Card>
        </>
      )}

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Generate Report"
        onConfirm={() => { setShowModal(false); }}
        confirmLabel="Generate"
      >
        <div className="space-y-4">
          <Input label="Report Name" placeholder="e.g. Monthly Revenue Report" />
          <Select
            label="Type"
            options={types.map((t) => ({ value: t, label: t }))}
            value={types[0]}
          />
        </div>
      </Modal>

      <Modal
        open={deleteConfirm !== null}
        onClose={() => setDeleteConfirm(null)}
        title="Delete Report"
        size="sm"
        onConfirm={() => {
          setDeleting(true);
          setTimeout(() => {
            setDeleting(false);
            setDeleteConfirm(null);
          }, 1000);
        }}
        confirmLabel="Delete"
        confirmVariant="danger"
        confirmLoading={deleting}
      >
        <p className="text-sm text-gray-400">
          Are you sure you want to delete <span className="font-medium text-gray-200">{deleteConfirm?.name}</span>? This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
}
