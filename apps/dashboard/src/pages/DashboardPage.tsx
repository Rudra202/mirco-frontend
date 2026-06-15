/**
 * FILE PURPOSE: Main dashboard page with stat cards, charts, and activity feed
 * 
 * CONNECTIONS:
 * - Imports from: @platform/ui (Card, Button, PageHeader, AreaChart, BarChart, DonutChart, skeletons, animations),
 *                 @platform/utils (formatCurrency, formatRelativeTime, pluralize), @platform/store (useTenantStore),
 *                 ./mockData (monthlyRevenue, monthlyUsers, userByPlan)
 * - Used by: ./app.tsx
 * 
 * For a backend developer: This component renders the dashboard overview with stat cards,
 * area/bar/donut charts for revenue/user data, recent activity list, and quick actions.
 * Data is currently mocked; in production it would come from API endpoints.
 */
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Card, Button, PageHeader, AreaChart, BarChart, DonutChart,
  stagger, slideUp, StatCardSkeleton, ChartCardSkeleton, ActivitySkeleton,
} from '@platform/ui';
import { formatCurrency, formatRelativeTime, pluralize } from '@platform/utils';
import { useTenantStore } from '@platform/store';
import { monthlyRevenue, monthlyUsers, userByPlan } from './mockData';

const mockStats = {
  totalUsers: 2453,
  activeUsers: 1820,
  revenue: 128450,
  growth: 12.5,
  recentActivity: [
    { id: '1', action: 'New user registered', timestamp: new Date(Date.now() - 300000).toISOString() },
    { id: '2', action: 'Invoice #INV-024 paid', timestamp: new Date(Date.now() - 3600000).toISOString() },
    { id: '3', action: 'Workflow "Approval Flow" completed', timestamp: new Date(Date.now() - 7200000).toISOString() },
    { id: '4', action: 'Report Q4 generated', timestamp: new Date(Date.now() - 86400000).toISOString() },
    { id: '5', action: 'User permissions updated', timestamp: new Date(Date.now() - 172800000).toISOString() },
  ],
};

export function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const tenant = useTenantStore((s) => s.tenant);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 750);
    return () => clearTimeout(timer);
  }, []);

  const statCards = [
    { label: 'Total Users', value: mockStats.totalUsers.toLocaleString(), change: '+12%', color: 'text-indigo-400' },
    { label: 'Active Users', value: mockStats.activeUsers.toLocaleString(), change: '+8%', color: 'text-emerald-400' },
    { label: 'Revenue', value: formatCurrency(mockStats.revenue), change: '+15.3%', color: 'text-amber-400' },
    { label: 'Growth', value: `${mockStats.growth}%`, change: '+2.1%', color: 'text-cyan-400' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description={`Welcome back, ${tenant?.name ?? 'User'}`}
        actions={<Button variant="secondary">Download Report</Button>}
      />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {statCards.map((stat) => (
            <motion.div key={stat.label} variants={slideUp}>
              <Card padding={false}>
                <div className="p-5">
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
                  <p className="text-xs text-gray-600 mt-1">{stat.change} vs last month</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {loading ? (
          <>
            <Card title="Recent Activity">
              <ActivitySkeleton />
            </Card>
            <Card title="Quick Actions">
              <div className="grid grid-cols-2 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="p-4 rounded-lg border border-gray-800 bg-gray-900/50">
                    <div className="animate-pulse h-4 w-16 rounded bg-gray-800" />
                  </div>
                ))}
              </div>
            </Card>
          </>
        ) : (
          <>
            <Card title="Recent Activity" subtitle={`${mockStats.recentActivity.length} ${pluralize(mockStats.recentActivity.length, 'event')}`}>
              <div className="space-y-3">
                {mockStats.recentActivity.map((activity, i) => (
                  <div key={activity.id} className="flex items-center gap-3 py-2 border-b border-gray-800 last:border-0">
                    <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-emerald-500' : 'bg-gray-600'}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-300 truncate">{activity.action}</p>
                      <p className="text-xs text-gray-600">{formatRelativeTime(activity.timestamp)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Quick Actions">
              <div className="grid grid-cols-2 gap-3">
                {['New Workflow', 'Generate Report', 'Invite Users', 'Settings'].map((action) => (
                  <button
                    key={action}
                    className="p-4 rounded-lg border border-gray-800 hover:border-gray-700 bg-gray-900/50 hover:bg-gray-800 transition-all text-sm text-gray-300 hover:text-gray-100 text-left"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </Card>
          </>
        )}
      </div>

      {loading ? (
        <ChartCardSkeleton />
      ) : (
        <Card title="Revenue Trend" subtitle="Monthly revenue vs expenses">
          <AreaChart
            data={monthlyRevenue}
            xKey="month"
            series={[
              { key: 'revenue', name: 'Revenue', color: '#818cf8' },
              { key: 'expenses', name: 'Expenses', color: '#f43f5e' },
            ]}
            height={320}
          />
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {loading ? (
          <>
            <ChartCardSkeleton />
            <ChartCardSkeleton />
          </>
        ) : (
          <>
            <Card title="User Growth" subtitle="New user signups per month">
              <BarChart
                data={monthlyUsers}
                xKey="month"
                categories={[
                  { key: 'users', name: 'New Users', color: '#34d399' },
                ]}
                height={280}
              />
            </Card>

            <Card title="Users by Plan" subtitle="Current distribution across tiers">
              <DonutChart data={userByPlan} height={280} />
              <div className="flex items-center justify-center gap-5 mt-2">
                {userByPlan.map((p) => (
                  <div key={p.name} className="flex items-center gap-1.5 text-xs text-gray-400">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: p.color }} />
                    {p.name}
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
