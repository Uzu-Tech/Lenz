'use client'

import { useMemo, useState } from 'react'
import { ProbabilityChart } from './ProbabilityChart'
import type { Market } from '@/data/mock'

type MarketProbabilityCardProps = {
  market: Market
}

export function MarketProbabilityCard({ market }: MarketProbabilityCardProps) {
  const [timeWindow, setTimeWindow] = useState<'1D' | '1W' | '1M' | 'ALL'>('1W')

  const chartData = useMemo(() => {
    const history = market.probabilityHistory
    if (timeWindow === 'ALL') return history
    if (timeWindow === '1M') return history.slice(-8)
    if (timeWindow === '1W') return history.slice(-5)
    return history.slice(-2)
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
                {market.price}¢
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
