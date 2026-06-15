/**
 * FILE PURPOSE: Dashboard micro-frontend entry point
 * 
 * CONNECTIONS:
 * - Imports from: @platform (index.css)
 * - Used by: Shell's RemoteLoader via Module Federation (dashboard/DashboardApp)
 * 
 * For a backend developer: This is the startup file for the dashboard micro-frontend.
 * It dynamically imports bootstrap.tsx so the shell can control when mounting happens.
 */
import './index.css';
import('./bootstrap');
