/**
 * FILE PURPOSE: Root React component for the Workflow micro-frontend
 * 
 * CONNECTIONS:
 * - Imports from: ./pages/WorkflowPage
 * - Used by: ./bootstrap.tsx (renders this component)
 * 
 * For a backend developer: This is the React root component for the workflow app.
 * It mounts the WorkflowPage listing all automated workflows with status toggles.
 */
import './index.css';
import { WorkflowPage } from './pages/WorkflowPage';

export default function WorkflowApp() {
  return <WorkflowPage />;
}
