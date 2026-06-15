/**
 * FILE PURPOSE: Barrel file re-exporting all chart components (Area, Bar, Donut).
 * 
 * CONNECTIONS:
 * - Imports from: ./AreaChart, ./BarChart, ./DonutChart
 * - Used by: @platform/ui (re-exported from ../index.ts)
 * 
 * For a backend developer: Chart entry point. Import AreaChart, BarChart, or DonutChart from
 * '@platform/ui/charts' or via '@platform/ui'. All charts use Recharts for rendering.
 */

export { AreaChart } from './AreaChart';
export { BarChart } from './BarChart';
export { DonutChart } from './DonutChart';
