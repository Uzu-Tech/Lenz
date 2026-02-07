'use client'

import Link from 'next/link'
import { MomentumArrow } from './MomentumArrow'
import { SparklineChart } from './SparklineChart'

type CategoryCardProps = {
  id: string
  name: string
  direction: 'up' | 'down' | 'flat'
  sparklineData: number[]
  metrics: { momentum: number; stability: number; agreement: number; urgency: number }
}

const METRIC_LABELS = ['Momentum', 'Stability', 'Agreement', 'Urgency'] as const

export function CategoryCard({ id, name, direction, sparklineData, metrics }: CategoryCardProps) {
  const metricValues = [
    metrics.momentum,
    metrics.stability,
    metrics.agreement,
    metrics.urgency,
  ]

  return (
    <Link
      href={`/dashboard/category/${id}`}
      className="block p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-slate-800 dark:text-slate-200">{name}</h3>
        <MomentumArrow direction={direction} className="text-lg" />
      </div>

      {/* 4 metrics with strength bars */}
      <div className="space-y-2 mb-3">
        {METRIC_LABELS.map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 w-16 shrink-0">{label}</span>
            <div className="flex-1 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <div
                className="h-full rounded-full bg-indigo-500 dark:bg-indigo-500 transition-all"
                style={{ width: `${metricValues[i]}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Sparkline */}
      <div className="h-8">
        <SparklineChart data={sparklineData} />
      </div>
    </Link>
  )
}
