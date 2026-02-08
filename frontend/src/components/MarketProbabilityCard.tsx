'use client'

import { useMemo, useState } from 'react'
import { ProbabilityChart } from './ProbabilityChart'
import type { Market } from '../data/mock'

type MarketProbabilityCardProps = {
  market: Market
}

export function MarketProbabilityCard({ market }: MarketProbabilityCardProps) {
  const [timeWindow, setTimeWindow] = useState<'1D' | '1W' | '1M' | 'ALL'>('ALL')

  const chartData = useMemo(() => {
    const history = market.probabilityHistory
    if (history.length === 0) return history
    
    // Filter by time window first
    let filtered = history
    if (timeWindow !== 'ALL') {
      const now = new Date()
      const cutoffTime = new Date()
      
      if (timeWindow === '1D') {
        cutoffTime.setDate(cutoffTime.getDate() - 1)
      } else if (timeWindow === '1W') {
        cutoffTime.setDate(cutoffTime.getDate() - 7)
      } else if (timeWindow === '1M') {
        cutoffTime.setMonth(cutoffTime.getMonth() - 1)
      }
      
      filtered = history.filter((item: any) => {
        if (!item.timestamp) return true
        const itemDate = new Date(item.timestamp)
        return itemDate >= cutoffTime
      })
    }
    
    // Downsample to ~100 points for all time windows
    const targetPoints = 100
    if (filtered.length <= targetPoints) return filtered
    
    // Calculate step size - take every Nth point
    const step = Math.ceil(filtered.length / targetPoints)
    const downsampled = []
    
    for (let i = 0; i < filtered.length; i += step) {
      downsampled.push(filtered[i])
    }
    
    // Always include the last point to show current state
    if (downsampled[downsampled.length - 1] !== filtered[filtered.length - 1]) {
      downsampled.push(filtered[filtered.length - 1])
    }
    
    return downsampled
  }, [market.probabilityHistory, timeWindow])

  const change = useMemo(() => {
    if (chartData.length < 2) return 0
    return chartData[chartData.length - 1].value - chartData[0].value
  }, [chartData])

  return (
    <section className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/60 p-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Price
              </p>
              <p className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
                {market.price}p
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Probability
              </p>
              <p className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
                {(market.probability * 100).toFixed(0)}%
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Change
              </p>
              <p
                className={`text-2xl font-semibold ${
                  change >= 0 ? 'text-emerald-500' : 'text-rose-500'
                }`}
              >
                {change >= 0 ? '+' : ''}
                {change.toFixed(0)}%
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {(['1D', '1W', '1M', 'ALL'] as const).map((window) => (
              <button
                key={window}
                type="button"
                onClick={() => setTimeWindow(window)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-colors ${
                  timeWindow === window
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {window}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
          <span>Volume: {market.volume}</span>
          <span>Time Remaining: {market.timeRemaining}</span>
          <span>{chartData.length} data points</span>
        </div>
      </div>
      <div className="mt-6">
        <ProbabilityChart
          data={chartData}
          unit="percent"
          showHeader={false}
          height={320}
          className="border-0 bg-transparent p-0"
        />
      </div>
    </section>
  )
}
