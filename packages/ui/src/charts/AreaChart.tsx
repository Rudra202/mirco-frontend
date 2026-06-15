/**
 * FILE PURPOSE: Area chart component using Recharts with gradient fills.
 * 
 * CONNECTIONS:
 * - Imports from: recharts (AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer)
 * - Used by: @platform/ui (charts barrel), dashboard micro-frontend
 * 
 * For a backend developer: Renders an area chart with smoothed lines and gradient fill beneath each
 * series. Each series gets its own SVG linearGradient (fading from color to transparent).
 * Dark-themed grid, axes, and tooltip styling.
 */

import {
  AreaChart as RechartsArea,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface SeriesConfig {
  key: string;
  name: string;
  color: string;
}

interface AreaChartProps {
  data: Record<string, string | number>[];
  xKey: string;
  series: SeriesConfig[];
  height?: number;
}

export function AreaChart({ data, xKey, series, height = 300 }: AreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsArea data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <defs>
          {series.map((s) => (
            <linearGradient key={s.key} id={`gradient-${s.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={s.color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={s.color} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
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
        {series.map((s) => (
          <Area
            key={s.key}
            type="monotone"
            dataKey={s.key}
            name={s.name}
            stroke={s.color}
            fill={`url(#gradient-${s.key})`}
            strokeWidth={2}
          />
        ))}
      </RechartsArea>
    </ResponsiveContainer>
  );
}
