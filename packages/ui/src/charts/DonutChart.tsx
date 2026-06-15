/**
 * FILE PURPOSE: Donut/pie chart component using Recharts with percentage labels.
 * 
 * CONNECTIONS:
 * - Imports from: recharts (PieChart, Pie, Cell, Tooltip, ResponsiveContainer)
 * - Used by: @platform/ui (charts barrel), dashboard micro-frontend
 * 
 * For a backend developer: Renders a donut chart from { name, value, color } data items.
 * Each item gets a Cell with its specified color. Percentage labels are drawn inside each slice.
 * Tooltip shows on hover.
 */

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface DonutChartProps {
  data: { name: string; value: number; color: string }[];
  height?: number;
}

const RADIAN = Math.PI / 180;

function renderLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent }: Record<string, number>) {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={600}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

export function DonutChart({ data, height = 250 }: DonutChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={3}
          dataKey="value"
          label={renderLabel}
          labelLine={false}
        >
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: '#111827',
            border: '1px solid #1f2937',
            borderRadius: '8px',
            fontSize: '13px',
          }}
          labelStyle={{ color: '#9ca3af' }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
