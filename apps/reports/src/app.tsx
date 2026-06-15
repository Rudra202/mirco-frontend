/**
 * FILE PURPOSE: Root React component for the Reports micro-frontend
 * 
 * CONNECTIONS:
 * - Imports from: ./pages/ReportsPage
 * - Used by: ./bootstrap.tsx (renders this component)
 * 
 * For a backend developer: This is the React root component for the reports app.
 * It mounts the ReportsPage showing a table of reports, type distribution chart,
 * and generate/delete report modals.
 */
import './index.css';
import { ReportsPage } from './pages/ReportsPage';

export default function ReportsApp() {
  return <ReportsPage />;
}
