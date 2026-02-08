'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

type ProbabilityChartProps = {
  data: Array<{ date?: string; day?: string; value: number; timestamp?: string }>
  className?: string
  height?: number
  unit?: 'percent' | 'cents'
  showHeader?: boolean
  title?: string
}

export function ProbabilityChart({
  data,
  className = '',
  height = 260,
  unit = 'percent',
  showHeader = true,
  title = 'Probability Over Time',
}: ProbabilityChartProps) {
  // Format x-axis labels based on data range
  const formatXAxis = (timestamp: string) => {
    if (!timestamp) return ''
    const date = new Date(timestamp)
    const now = new Date()
    const diffHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    
    if (diffHours < 24) {
      // Show time for last 24 hours
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    } else if (diffHours < 168) {
      // Show day and time for last week
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit' })
    } else {
      // Show date for older data
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }
  }

  const chartData = data.map((d) => ({
    ...d,
    displayLabel: d.timestamp ? formatXAxis(d.timestamp) : (d.date || d.day),
    displayValue: Math.round(d.value),
  }))

  const formatValue = (value: number) => (unit === 'cents' ? `${value.toFixed(1)}p` : `${value.toFixed(1)}%`)

  return (
    <div className={`rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-4 ${className}`}>
      {showHeader && (
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-4">
          {title}
        </p>
      )}
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="probGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis
              dataKey="displayLabel"
              stroke="#64748b"
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              minTickGap={50}
            />
            <YAxis
              stroke="#64748b"
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              domain={[0, 100]}
              tickFormatter={(v) => formatValue(v)}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#f1f5f9' }}
              formatter={(value: number) => [formatValue(value), 'Probability']}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#6366f1"
              strokeWidth={2}
              fill="url(#probGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
