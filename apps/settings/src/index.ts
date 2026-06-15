/**
 * FILE PURPOSE: Settings micro-frontend entry point
 * 
 * CONNECTIONS:
 * - Imports from: @platform (index.css)
 * - Used by: Shell's RemoteLoader via Module Federation (settings/SettingsApp)
 * 
 * For a backend developer: This is the startup file for the settings micro-frontend.
 * It dynamically imports bootstrap.tsx so the shell can control when mounting happens.
 */
import './index.css';
import('./bootstrap');
