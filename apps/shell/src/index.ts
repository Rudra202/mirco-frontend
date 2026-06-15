/**
 * FILE PURPOSE: Application entry point — imports global CSS and dynamically loads the bootstrap module.
 *
 * CONNECTIONS:
 * - Imports from: ./index.css, ./bootstrap (dynamic import)
 * - Used by: Webpack entry configuration
 *
 * For a backend developer: This is the first JS file the browser loads. It kicks off the async
 * bootstrap to enable Module Federation chunk splitting so remotes don't block the initial page render.
 */
import './index.css';
import('./bootstrap');
