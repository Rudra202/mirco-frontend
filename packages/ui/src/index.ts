/**
 * FILE PURPOSE: Barrel file that re-exports all UI components, charts, animations, and types.
 * 
 * CONNECTIONS:
 * - Imports from: ./Button, ./Input, ./Select, ./Card, ./Modal, ./Loader, ./EmptyState,
 *   ./Badge, ./PageHeader, ./Table, ./Sidebar, ./Header, ./charts, ./PageTransition,
 *   ./animations, ./Skeleton, ./Skeletons
 * - Used by: all micro-frontend apps (import { Button, Table } from '@platform/ui')
 * 
 * For a backend developer: This is the UI kit entry point. Import any shared component from here.
 * Charts (Area, Bar, Donut) use Recharts; animations use Framer Motion variants.
 */
export { Button } from './Button';
export { Input } from './Input';
export { Select } from './Select';
export { Card } from './Card';
export { Modal } from './Modal';
export { Loader } from './Loader';
export { EmptyState } from './EmptyState';
export { Badge } from './Badge';
export { PageHeader } from './PageHeader';
export { Table } from './Table';
export { Sidebar } from './Sidebar';
export { Header } from './Header';
export { AreaChart, BarChart, DonutChart } from './charts';
export { PageTransition } from './PageTransition';
export { fadeIn, slideUp, slideDown, stagger, cardHover } from './animations';
export { Skeleton } from './Skeleton';
export { StatCardSkeleton, ChartCardSkeleton, ActivitySkeleton } from './Skeletons';
export type { Column } from './Table';
