'use client'

import Link from 'next/link'
import { MomentumArrow } from './MomentumArrow'
import { RadarMetricsChart } from './RadarMetricsChart'

const SEGMENTS = 10

export type MetricDisplayMode = 'bars' | 'radar'

type CategoryCardProps = {
  id: string
  name: string
  direction: 'up' | 'down' | 'flat'
  sparklineData?: number[]
  metrics: { momentum: number; stability: number; urgency: number }
  metricDisplay?: MetricDisplayMode
}

const METRIC_LABELS = ['Momentum', 'Stability', 'Urgency'] as const
const METRIC_SLUGS = ['momentum', 'stability', 'urgency'] as const

function strengthToSegments(value: number): number {
  return Math.round((value / 100) * SEGMENTS)
}

export function CategoryCard({
  id,
  name,
  direction,
  metrics,
  metricDisplay = 'bars',
}: CategoryCardProps) {
  const metricValues = [metrics.momentum, metrics.stability, metrics.urgency]
  const radarData = [
    { metric: 'Momentum', value: metrics.momentum, fullMark: 100 },
    { metric: 'Stability', value: metrics.stability, fullMark: 100 },
    { metric: 'Urgency', value: metrics.urgency, fullMark: 100 },
  ]

  return (
    <div className="block p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <Link
          href={`/dashboard/category/${id}`}
          className="font-semibold text-slate-800 dark:text-slate-200 text-lg hover:text-indigo-600 dark:hover:text-indigo-400"
        >
          {name}
        </Link>
        <MomentumArrow direction={direction} className="text-xl" />
      </div>

      {metricDisplay === 'bars' ? (
        <div className="space-y-5">
          {METRIC_LABELS.map((label, i) => {
            const filled = strengthToSegments(metricValues[i])
            const slug = METRIC_SLUGS[i]
            return (
              <div key={label} className="space-y-2">
                <Link
                  href={`/dashboard/category/${id}/metric/${slug}`}
                  className="text-base font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  {label}
                </Link>
                <div className="flex gap-1.5">
                  {Array.from({ length: SEGMENTS }, (_, j) => (
                    <div
                      key={j}
                      className={`h-4 flex-1 rounded-md transition-colors ${
                        j < filled
                          ? 'bg-indigo-500 dark:bg-indigo-500'
                          : 'bg-slate-200 dark:bg-slate-700'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <>
          <div className="min-h-[160px] w-full [&_.recharts-wrapper]:!w-full [&_.recharts-surface]:overflow-visible">
            <RadarMetricsChart data={radarData} compact />
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
            {METRIC_LABELS.map((label, i) => {
              const slug = METRIC_SLUGS[i]
              return (
                <Link
                  key={label}
                  href={`/dashboard/category/${id}/metric/${slug}`}
                  className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  {label} ({metricValues[i]}%)
                </Link>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
