/**
 * FILE PURPOSE: Bootstraps the React app by mounting <App /> into the DOM.
 *
 * CONNECTIONS:
 * - Imports from: react-dom/client, ./App
 * - Used by: index.ts (dynamically imported for async chunk splitting)
 *
 * For a backend developer: This is the bridge between the HTML page and React. It takes the root
 * DOM element and renders the entire application tree into it. The dynamic import enables code splitting.
 */
import { createRoot } from 'react-dom/client';
import { App } from './App';

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
