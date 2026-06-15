/**
 * FILE PURPOSE: Root React component for the Dashboard micro-frontend
 * 
 * CONNECTIONS:
 * - Imports from: ./pages/DashboardPage
 * - Used by: ./bootstrap.tsx (renders this component)
 * 
 * For a backend developer: This is the React root component for the dashboard app.
 * It mounts the main DashboardPage that shows stat cards, revenue charts, and activity.
 */
import './index.css';
import { DashboardPage } from './pages/DashboardPage';

export default function DashboardApp() {
  return <DashboardPage />;
}
