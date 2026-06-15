/**
 * FILE PURPOSE: Barrel file that re-exports all API service modules.
 * 
 * CONNECTIONS:
 * - Imports from: ./axios, ./auth.api, ./dashboard.api
 * - Used by: @platform/store (auth.store) and micro-frontend apps
 * 
 * For a backend developer: This is the frontend's API entry point. Import { api, authApi, dashboardApi }
 * from this module to make HTTP calls. authApi handles login/logout/me; dashboardApi fetches stats.
 */

export { default as api } from './axios';
export { authApi } from './auth.api';
export { dashboardApi } from './dashboard.api';
