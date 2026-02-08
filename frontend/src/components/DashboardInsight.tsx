'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CategoryCard, AlertCard, type MetricDisplayMode } from '.'

type Category = {
  id: string
  name: string
  trend_idx: number
  momentum: number
  stability: number
  proximity: number
  urgency: number
}

// Weighted score from the 4 main metrics
const TREND_IDX_WEIGHT = 0.3
const MOMENTUM_WEIGHT = 0.3
const STABILITY_WEIGHT = 0.2
const PROXIMITY_WEIGHT = 0.2

function weightedScore(c: Category): number {
  // Normalize trend_idx from -100 to 100 scale
  const normalizedTrendIdx = (c.trend_idx + 100) / 2 // Convert to 0-100
  const normalizedMomentum = (c.momentum + 20) / 0.4 // Convert -20 to +20 to 0-100
  
  return (
    normalizedTrendIdx * TREND_IDX_WEIGHT +
    normalizedMomentum * MOMENTUM_WEIGHT +
    c.stability * STABILITY_WEIGHT +
    c.proximity * PROXIMITY_WEIGHT
  )
}

function getTopEmerging(categories: Category[], n = 3): Category[] {
  return [...categories]
    .filter((c) => c.urgency > 0) // Only show positive urgency
    .sort((a, b) => b.urgency - a.urgency)
    .slice(0, n)
}

type RiskAlert = {
  id: string
  categoryName: string
  reason: string
  icon: string
  severity: 'low' | 'medium' | 'high'
}

type DashboardInsightProps = {
  categories: Category[]
  riskAlerts: RiskAlert[]
}

export function DashboardInsight({ categories, riskAlerts }: DashboardInsightProps) {
  const [metricDisplay, setMetricDisplay] = useState<MetricDisplayMode>('bars')
  const [sortBy, setSortBy] = useState<'trend_idx' | 'momentum' | 'stability' | 'proximity'>('trend_idx')
  const topEmerging = getTopEmerging(categories, 3) // Top 3

  // Sort categories by selected metric
  const sortedCategories = [...categories].sort((a, b) => b[sortBy] - a[sortBy])

  return (
    <>
      {/* Top Emerging - full width, horizontal layout */}
      <section className="mb-10">
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-5">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
            Top Emerging Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topEmerging.map((c) => (
              <Link
                key={c.id}
                href={`/dashboard/category/${c.id}`}
                className="flex flex-col items-center justify-center p-6 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
              >
                <span className="text-base font-semibold text-slate-700 dark:text-slate-300 text-center mb-3">
                  {c.name}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    {c.urgency.toFixed(1)}
                  </span>
                  <span className="text-xl text-emerald-600 dark:text-emerald-400">
                    ↑
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trend Cards Grid with toggle */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Trends</h2>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500 dark:text-slate-400">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 border-none outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="trend_idx">Trend Index</option>
                <option value="momentum">Momentum</option>
                <option value="stability">Stability</option>
                <option value="proximity">Proximity</option>
              </select>
            </div>
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
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start auto-rows-min">
          {sortedCategories.map((c) => (
            <CategoryCard
              key={c.id}
              id={c.id}
              name={c.name}
              trend_idx={c.trend_idx}
              momentum={c.momentum}
              stability={c.stability}
              proximity={c.proximity}
              metricDisplay={metricDisplay}
            />
          ))}
        </div>
      </section>

      {/* Low Stability Warning */}
      <section>
        <div className="rounded-xl border border-yellow-200/80 dark:border-yellow-800/40 bg-yellow-50/80 dark:bg-yellow-950/30 p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/40 flex items-center justify-center">
              <span className="text-2xl">⚡</span>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-1">
                Low Stability Trends
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                These trends have low stability scores. Changes can happen very quickly—monitor closely.
              </p>
            </div>
          </div>
          
          {riskAlerts.length > 0 ? (
            <div className="space-y-2">
              {riskAlerts.map((a) => (
                <Link
                  key={a.id}
                  href={`/dashboard/category/${a.id}`}
                  className="flex items-center justify-between p-4 rounded-lg bg-white dark:bg-slate-800 border-2 border-yellow-200/70 dark:border-yellow-800/40 hover:border-yellow-300 dark:hover:border-yellow-700 transition-colors group"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-yellow-700 dark:group-hover:text-yellow-400 transition-colors">
                        {a.categoryName}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {a.reason}
                      </p>
                    </div>
                  </div>
                  <span className="text-slate-400 dark:text-slate-600 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                    →
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-slate-600 dark:text-slate-400">
              ✓ All trends have stable signals (stability ≥ 70%)
            </div>
          )}
        </div>
      </section>
    </>
  )
}
