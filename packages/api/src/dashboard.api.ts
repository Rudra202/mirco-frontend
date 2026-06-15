/**
 * FILE PURPOSE: API service for fetching dashboard statistics and activity data.
 * 
 * CONNECTIONS:
 * - Imports from: ./axios (configured Axios instance)
 * - Used by: @platform/api (re-exported via index.ts), dashboard micro-frontend app
 * 
 * For a backend developer: Frontend calls dashboardApi.getStats() -> GET /dashboard/stats.
 * Expects the backend to return a DashboardStats object with totalUsers, activeUsers, revenue, etc.
 */

import api from './axios';

/** Aggregate statistics returned by the dashboard endpoint. */
export interface DashboardStats {
  /** Total number of registered users. */
  totalUsers: number;
  /** Number of users active in the current period. */
  activeUsers: number;
  /** Total revenue amount. */
  revenue: number;
  /** Growth percentage compared to the previous period. */
  growth: number;
  /** List of recent user actions for the activity feed. */
  recentActivity: { id: string; action: string; timestamp: string }[];
}

/**
 * API service for dashboard data.
 * Provides methods to fetch aggregated statistics and activity data.
 */
export const dashboardApi = {
  /**
   * Fetches the dashboard statistics.
   * @returns The full DashboardStats object with user counts, revenue, growth, and recent activity.
   */
  getStats: async () => {
    const { data } = await api.get<DashboardStats>('/dashboard/stats');
    return data;
  },
};
