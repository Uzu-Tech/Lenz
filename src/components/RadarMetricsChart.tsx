'use client'

import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from 'recharts'

type RadarMetricsChartProps = {
  data: Array<{ metric: string; value: number; fullMark: number }>
  className?: string
}

export function RadarMetricsChart({ data, className = '' }: RadarMetricsChartProps) {
  const chartData = data.map((d) => ({
    metric: d.metric,
    value: d.value,
    fullMark: d.fullMark,
  }))

  return (
    <div className={`aspect-square min-h-[280px] ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={chartData}>
          <PolarGrid stroke="#334155" />
          <PolarAngleAxis
            dataKey="metric"
            tick={{ fill: '#94a3b8', fontSize: 12 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: '#64748b', fontSize: 10 }}
          />
          <Radar
            name="Strength"
            dataKey="value"
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.4}
            strokeWidth={2}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
