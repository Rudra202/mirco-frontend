/**
 * FILE PURPOSE: Root React component for the Settings micro-frontend
 * 
 * CONNECTIONS:
 * - Imports from: ./pages/SettingsPage
 * - Used by: ./bootstrap.tsx (renders this component)
 * 
 * For a backend developer: This is the React root component for the settings app.
 * It mounts the SettingsPage with profile editing, password change, theme toggle,
 * notification preferences, and account deletion.
 */
import './index.css';
import { SettingsPage } from './pages/SettingsPage';

export default function SettingsApp() {
  return <SettingsPage />;
}
