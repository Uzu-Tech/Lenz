'use client'

import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts'

type RadarMetricsChartProps = {
  data: Array<{ metric: string; value: number; fullMark: number }>
  className?: string
  compact?: boolean
}

// Color mapping for each metric
const METRIC_COLORS: Record<string, string> = {
  Momentum: '#6366f1',    // Indigo
  Stability: '#10b981',   // Emerald
  Urgency: '#f59e0b',     // Amber
}

const CustomLabel = (props: any) => {
  const { x, y, payload } = props
  const color = METRIC_COLORS[payload.value] || '#94a3b8'
  
  return (
    <text
      x={x}
      y={y}
      fill={color}
      fontSize={12}
      fontWeight={600}
      textAnchor={x > 150 ? 'start' : x < 150 ? 'end' : 'middle'}
    >
      {payload.value}
    </text>
  )
}

export function RadarMetricsChart({ data, className = '', compact }: RadarMetricsChartProps) {
  const chartData = data.map((d) => ({
    metric: d.metric,
    value: d.value,
    fullMark: d.fullMark,
  }))

  return (
    <div
      className={
        compact
          ? `aspect-square min-h-[160px] ${className}`
          : `aspect-square min-h-[280px] ${className}`
      }
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={chartData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
          <defs>
            <radialGradient id="momentumGradient" cx="0.5" cy="0">
              <stop offset="0%" stopColor="#6366f1" stopOpacity={1} />
              <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
            </radialGradient>
            <radialGradient id="stabilityGradient" cx="1" cy="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
              <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
            </radialGradient>
            <radialGradient id="urgencyGradient" cx="0" cy="1">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity={1} />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
            </radialGradient>
          </defs>
          <PolarGrid stroke="#334155" />
          <PolarAngleAxis
            dataKey="metric"
            tick={CustomLabel}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: '#64748b', fontSize: 10 }}
          />
          <Radar
            dataKey="value"
            stroke="#6366f1"
            fill="url(#momentumGradient)"
            strokeWidth={2}
          />
          <Radar
            dataKey="value"
            stroke="#10b981"
            fill="url(#stabilityGradient)"
            strokeWidth={0}
          />
          <Radar
            dataKey="value"
            stroke="#f59e0b"
            fill="url(#urgencyGradient)"
            strokeWidth={0}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
