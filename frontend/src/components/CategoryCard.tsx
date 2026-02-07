'use client'

import Link from 'next/link'
import { MomentumArrow } from './MomentumArrow'
import { RadarMetricsChart } from './RadarMetricsChart'
import { MetricBreakdown } from './MetricBreakdown'
import type { PredictionQuestion } from '../data/mock'

const SEGMENTS = 10

export type MetricDisplayMode = 'bars' | 'radar'

type CategoryCardProps = {
  id: string
  name: string
  direction: 'up' | 'down' | 'flat'
  sparklineData?: number[]
  metrics: { momentum: number; stability: number; urgency: number }
  metricDisplay?: MetricDisplayMode
  predictions?: PredictionQuestion[]
}

const METRIC_LABELS = ['Momentum', 'Stability', 'Urgency'] as const
const METRIC_SLUGS = ['momentum', 'stability', 'urgency'] as const

function strengthToSegments(value: number): number {
  return Math.round((value / 100) * SEGMENTS)
}

function formatMomentum(value: number): string {
  const delta = (value - 50) / 10
  return `${delta >= 0 ? '+' : ''}${delta.toFixed(1)}%`
}

function formatStability(value: number): string {
  const variance = (100 - value) / 100
  return variance.toFixed(2)
}

function formatUrgency(value: number): string {
  const probability = value / 100
  return probability.toFixed(2)
}

export function CategoryCard({
  id,
  name,
  direction,
  metrics,
  metricDisplay = 'bars',
  predictions,
}: CategoryCardProps) {
  const metricValues = [metrics.momentum, metrics.stability, metrics.urgency]
  const radarData = [
    { metric: 'Momentum', value: metrics.momentum, fullMark: 100 },
    { metric: 'Stability', value: metrics.stability, fullMark: 100 },
    { metric: 'Urgency', value: metrics.urgency, fullMark: 100 },
  ]

  return (
    <div className="block p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors h-fit">
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
            const value = metricValues[i]
            const slug = METRIC_SLUGS[i]
            const dummyValue =
              label === 'Momentum'
                ? formatMomentum(value)
                : label === 'Stability'
                  ? formatStability(value)
                  : formatUrgency(value)
            
            // Determine gradient based on value with softer, muted colors
            const getGradientClass = (val: number) => {
              if (val >= 75) return 'from-cyan-400 to-emerald-400 dark:from-cyan-500 dark:to-emerald-500'
              if (val >= 50) return 'from-blue-400 to-cyan-400 dark:from-blue-500 dark:to-cyan-500'
              return 'from-purple-400 to-pink-400 dark:from-purple-500 dark:to-pink-500'
            }
            
            return (
              <div key={label} className="space-y-2">
                <Link
                  href={`/dashboard/category/${id}/metric/${slug}`}
                  className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  {label}
                </Link>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-6 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${getGradientClass(value)} transition-all duration-500 ease-out opacity-90`}
                      style={{ width: `${value}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 min-w-[4.5rem] text-right">
                    {dummyValue}
                  </span>
                </div>
              </div>
            )
          })}
          {predictions && <MetricBreakdown metricLabel="Predictions" predictions={predictions} />}
        </div>
      ) : (
        <>
          <div className="min-h-[160px] w-full [&_.recharts-wrapper]:!w-full [&_.recharts-surface]:overflow-visible -mb-6">
            <RadarMetricsChart data={radarData} compact />
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {METRIC_LABELS.map((label, i) => {
              const slug = METRIC_SLUGS[i]
              const colors = ['text-indigo-600 dark:text-indigo-400', 'text-emerald-600 dark:text-emerald-400', 'text-amber-600 dark:text-amber-400']
              const dummyValue =
                label === 'Momentum'
                  ? formatMomentum(metricValues[i])
                  : label === 'Stability'
                    ? formatStability(metricValues[i])
                    : formatUrgency(metricValues[i])
              return (
                <Link
                  key={label}
                  href={`/dashboard/category/${id}/metric/${slug}`}
                  className={`text-sm font-medium ${colors[i]} hover:opacity-80`}
                >
                  {label} ({dummyValue})
                </Link>
              )
            })}
          </div>
          {predictions && <MetricBreakdown metricLabel="Predictions" predictions={predictions} />}
        </>
      )}
    </div>
  )
}
