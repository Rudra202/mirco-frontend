/**
 * FILE PURPOSE: Mock chart data used by the DashboardPage
 * 
 * CONNECTIONS:
 * - Imports from: (none - standalone data constants)
 * - Used by: ./DashboardPage.tsx
 * 
 * For a backend developer: This file provides sample monthly revenue, user growth,
 * and plan distribution datasets for populating dashboard charts. In production this
 * data would come from API responses rather than local constants.
 */
export const monthlyRevenue = [
  { month: 'Jan', revenue: 82400, expenses: 32000 },
  { month: 'Feb', revenue: 91200, expenses: 33500 },
  { month: 'Mar', revenue: 87500, expenses: 31000 },
  { month: 'Apr', revenue: 103600, expenses: 34800 },
  { month: 'May', revenue: 117200, expenses: 36200 },
  { month: 'Jun', revenue: 128450, expenses: 38000 },
];

export const monthlyUsers = [
  { month: 'Jan', users: 120 },
  { month: 'Feb', users: 185 },
  { month: 'Mar', users: 152 },
  { month: 'Apr', users: 234 },
  { month: 'May', users: 278 },
  { month: 'Jun', users: 312 },
];

export const userByPlan = [
  { name: 'Free', value: 45, color: '#6b7280' },
  { name: 'Pro', value: 30, color: '#818cf8' },
  { name: 'Enterprise', value: 15, color: '#34d399' },
  { name: 'Custom', value: 10, color: '#fbbf24' },
];
