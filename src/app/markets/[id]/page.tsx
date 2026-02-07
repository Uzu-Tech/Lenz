"use client"

import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  TradePanel,
  MomentumArrow,
} from '@/components'
import { MarketProbabilityCard } from '@/components/MarketProbabilityCard'
import { MARKETS, TRENDS } from '@/data/mock'

export default function MarketDetailPage() {
  const params = useParams<{ id: string }>()
  const id = params?.id
  const market = MARKETS.find((m) => String(m.id) === String(id))
  if (!market) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
            Market not found
          </h1>
          <Link href="/markets" className="text-indigo-600 dark:text-indigo-400 hover:underline">
            Back to Markets
          </Link>
        </div>
      </main>
    )
  }

  const trend = market.trendId ? TRENDS.find((t) => t.id === market.trendId) : null

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/markets"
        className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline mb-6 inline-block"
      >
        ← Back to Markets
      </Link>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-3">
            {market.question}
          </h1>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium">
              {market.category}
            </span>
            <MomentumArrow direction={market.momentum} />
            <span className="text-slate-600 dark:text-slate-400">
              {market.timeRemaining} remaining
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <MarketProbabilityCard market={market} />
        </div>
        <aside className="lg:col-span-1">
          <TradePanel />
          {trend && (
            <div className="mt-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-6">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
                Related Trend
              </h2>
              <Link
                href={`/dashboard/category/${trend.id}`}
                className="flex items-start justify-between p-4 rounded-lg border border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                    {trend.name}
                  </h3>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-slate-600 dark:text-slate-400">Momentum</p>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">
                        {trend.metrics.momentum}%
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-600 dark:text-slate-400">Stability</p>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">
                        {trend.metrics.stability}%
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-600 dark:text-slate-400">Urgency</p>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">
                        {trend.metrics.urgency}%
                      </p>
                    </div>
                  </div>
                </div>
                <MomentumArrow direction={trend.direction} className="text-2xl ml-4" />
              </Link>
            </div>
          )}
        </aside>
      </div>
    </main>
  )
}
