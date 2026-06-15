/**
 * FILE PURPOSE: Grouped/stacked bar chart component using Recharts.
 * 
 * CONNECTIONS:
 * - Imports from: recharts (BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer)
 * - Used by: @platform/ui (charts barrel), dashboard micro-frontend
 * 
 * For a backend developer: Renders a bar chart with one or more category series. Accepts an array
 * of data objects, an x-axis key, and category configs (key, name, color). Each category becomes
 * a Bar with rounded top corners. Grid lines are dashed and dark-themed.
 */

import {
  BarChart as RechartsBar,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface CategoryConfig {
  key: string;
  name: string;
  color: string;
}

interface BarChartProps {
  data: Record<string, string | number>[];
  xKey: string;
  categories: CategoryConfig[];
  height?: number;
}

export function BarChart({ data, xKey, categories, height = 300 }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBar data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }} barSize={24} barGap={4}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
        <XAxis dataKey={xKey} stroke="#6b7280" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{
            background: '#111827',
            border: '1px solid #1f2937',
            borderRadius: '8px',
            fontSize: '13px',
          }}
          labelStyle={{ color: '#9ca3af' }}
        />
        {categories.map((c) => (
          <Bar key={c.key} dataKey={c.key} name={c.name} fill={c.color} radius={[4, 4, 0, 0]} />
        ))}
      </RechartsBar>
    </ResponsiveContainer>
  );
}
