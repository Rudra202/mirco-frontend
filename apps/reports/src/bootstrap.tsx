/**
 * FILE PURPOSE: Bootstraps the Reports micro-frontend into the DOM
 * 
 * CONNECTIONS:
 * - Imports from: react-dom/client, ./app
 * - Used by: ./index.ts (dynamic import)
 * 
 * For a backend developer: This creates a React root on #root and renders ReportsApp.
 * It is dynamically imported by index.ts so the shell controls when mounting occurs.
 */
import { createRoot } from 'react-dom/client';
import ReportsApp from './app';

const root = createRoot(document.getElementById('root')!);
root.render(<ReportsApp />);
