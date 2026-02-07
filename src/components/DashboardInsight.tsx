'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CategoryCard, MomentumArrow, AlertCard, type MetricDisplayMode } from '@/components'
import type { Trend } from '@/data/mock'

// Weighted score from the 3 metrics (momentum, stability, urgency)
const MOMENTUM_WEIGHT = 0.4
const STABILITY_WEIGHT = 0.3
const URGENCY_WEIGHT = 0.3

function weightedScore(t: Trend): number {
  return (
    t.metrics.momentum * MOMENTUM_WEIGHT +
    t.metrics.stability * STABILITY_WEIGHT +
    t.metrics.urgency * URGENCY_WEIGHT
  )
}

function getTopEmerging(trends: Trend[], n = 3): Trend[] {
  return [...trends]
    .sort((a, b) => weightedScore(b) - weightedScore(a))
    .slice(0, n)
}

function getTopDying(trends: Trend[], n = 3): Trend[] {
  return [...trends]
    .sort((a, b) => weightedScore(a) - weightedScore(b))
    .slice(0, n)
}

type RiskAlert = {
  id: string
  trendName: string
  reason: string
  icon: string
  severity: 'low' | 'medium' | 'high'
}

type DashboardInsightProps = {
  trends: Trend[]
  riskAlerts: RiskAlert[]
}

export function DashboardInsight({ trends, riskAlerts }: DashboardInsightProps) {
  const [metricDisplay, setMetricDisplay] = useState<MetricDisplayMode>('bars')
  const topEmerging = getTopEmerging(trends)
  const topDying = getTopDying(trends)

  return (
    <>
      {/* Top Emerging / Top Dying - at the top */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-5">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
            Top Emerging
          </h2>
          <div className="space-y-3">
            {topEmerging.map((t) => (
              <Link
                key={t.id}
                href={`/dashboard/category/${t.id}`}
                className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 -mx-2 px-2 rounded"
              >
                <span className="text-slate-700 dark:text-slate-300">{t.name}</span>
                <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                  {Math.round(weightedScore(t))}
                </span>
              </Link>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-5">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
            Top Dying
          </h2>
          <div className="space-y-3">
            {topDying.map((t) => (
              <Link
                key={t.id}
                href={`/dashboard/category/${t.id}`}
                className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 -mx-2 px-2 rounded"
              >
                <span className="text-slate-700 dark:text-slate-300">{t.name}</span>
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {Math.round(weightedScore(t))}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trend Cards Grid with toggle */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Trends</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500 dark:text-slate-400">Metric view:</span>
            <button
              type="button"
              onClick={() => setMetricDisplay('bars')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                metricDisplay === 'bars'
                  ? 'bg-indigo-500 text-white'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-600'
              }`}
            >
              Bars
            </button>
            <button
              type="button"
              onClick={() => setMetricDisplay('radar')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                metricDisplay === 'radar'
                  ? 'bg-indigo-500 text-white'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-600'
              }`}
            >
              Radar
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trends.map((t) => (
            <CategoryCard
              key={t.id}
              id={t.id}
              name={t.name}
              direction={t.direction}
              metrics={t.metrics}
              metricDisplay={metricDisplay}
            />
          ))}
        </div>
      </section>

      {/* Risk Alert - based on stability only */}
      <section>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
          Risk Alert
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {riskAlerts.length > 0 ? (
            riskAlerts.map((a) => (
              <AlertCard
                key={a.id}
                icon={a.icon}
                category={a.trendName}
                reason={a.reason}
                severity={a.severity}
              />
            ))
          ) : (
            <p className="text-slate-500 dark:text-slate-400 col-span-2">
              No stability-related risk alerts. All trends have stability ≥ 70%.
            </p>
          )}
        </div>
      </section>
    </>
  )
}
