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
  trend_idx: number // -100 to 100
  momentum: number // -100 to 100
  stability: number // 0 to 100
  proximity: number // 0 to 100
  metricDisplay?: MetricDisplayMode
  predictions?: PredictionQuestion[]
}

type MetricInfo = {
  label: string
  value: number
  min: number
  max: number
  format: (val: number) => string
}

function formatTrendIdx(value: number): string {
  return value.toFixed(1)
}

function formatMomentum(value: number): string {
  return value.toFixed(1)
}

function formatStability(value: number): string {
  return value.toFixed(1)
}

function formatProximity(value: number): string {
  return value.toFixed(1)
}

function normalizeToPercentage(value: number, min: number, max: number): number {
  return ((value - min) / (max - min)) * 100
}

export function CategoryCard({
  id,
  name,
  trend_idx,
  momentum,
  stability,
  proximity,
  metricDisplay = 'bars',
  predictions,
}: CategoryCardProps) {
  const metrics: MetricInfo[] = [
    {
      label: 'Trend Index',
      value: trend_idx,
      min: -100,
      max: 100,
      format: formatTrendIdx,
    },
    {
      label: 'Momentum',
      value: momentum,
      min: -20,
      max: 20,
      format: formatMomentum,
    },
    {
      label: 'Stability',
      value: stability,
      min: 0,
      max: 100,
      format: formatStability,
    },
    {
      label: 'Proximity',
      value: proximity,
      min: 0,
      max: 100,
      format: formatProximity,
    },
  ]

  const radarData = metrics.map((m) => ({
    metric: m.label,
    value: normalizeToPercentage(m.value, m.min, m.max),
    fullMark: 100,
  }))

  return (
    <div className="block p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors h-fit">
      <div className="flex items-start justify-between mb-4">
        <Link
          href={`/dashboard/category/${id}`}
          className="font-semibold text-slate-800 dark:text-slate-200 text-lg hover:text-indigo-600 dark:hover:text-indigo-400"
        >
          {name}
        </Link>
      </div>

      {metricDisplay === 'bars' ? (
        <div className="space-y-4">
          {metrics.map((metric, idx) => {
            const normalized = normalizeToPercentage(metric.value, metric.min, metric.max)
            const displayValue = metric.format(metric.value)
            
            // Bar titles in white
            const getLabelColor = () => {
              return 'text-slate-700 dark:text-slate-200'
            }
            
            // Determine solid color based on normalized percentage: red-blue blend (low) → blue (mid) → teal (high)
            const getBarColor = (norm: number) => {
              if (norm >= 75) return 'bg-teal-400 dark:bg-teal-500'
              if (norm >= 50) return 'bg-blue-500 dark:bg-blue-600'
              return 'bg-pink-400 dark:bg-pink-500'
            }
            
            return (
              <div key={metric.label} className="border-b border-slate-100 dark:border-slate-700 last:border-0 pb-3 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                  <label className={`text-xs font-semibold uppercase tracking-wider ${getLabelColor()}`}>
                    {metric.label}
                  </label>
                  <span className="text-lg font-bold text-slate-800 dark:text-slate-100 tabular-nums">
                    {displayValue}
                  </span>
                </div>
                <div className="relative">
                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getBarColor(normalized)} transition-all duration-500 ease-out shadow-sm`}
                      style={{ width: `${Math.max(2, normalized)}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-1 px-0.5 text-xs text-slate-500 dark:text-slate-500 font-medium">
                    <span>{metric.min}</span>
                    <span>{metric.min < 0 ? 0 : Math.round((metric.min + metric.max) / 2)}</span>
                    <span>{metric.max}</span>
                  </div>
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
            {metrics.map((metric) => {
              const displayValue = metric.format(metric.value)
              return (
                <div
                  key={metric.label}
                  className="text-sm font-medium text-slate-700 dark:text-slate-200"
                >
                  {metric.label} ({displayValue})
                </div>
              )
            })}
          </div>
          {predictions && <MetricBreakdown metricLabel="Predictions" predictions={predictions} />}
        </>
      )}
    </div>
  )
}
