"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  TradePanel,
  MomentumArrow,
} from '../../../components'
import { MarketProbabilityCard } from '../../../components/MarketProbabilityCard'
import { fetchMarket, fetchCategory } from '../../../lib/api'

export default function MarketDetailPage() {
  const params = useParams<{ id: string }>()
  const id = params?.id
  const [market, setMarket] = useState<any>(null)
  const [category, setCategory] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadMarket() {
      if (!id) return
      try {
        const data = await fetchMarket(id)
        if (data.error) {
          setError(data.error)
        } else {
          // Transform backend data to match component expectations
          const transformedMarket = {
            id: data.id,
            question: data.question,
            category: data.category || 'Uncategorized',
            category_id: data.category_id,
            price: data.price,
            probability: data.price / 100, // Convert price to probability
            volume: `£${(data.volume / 100).toFixed(2)}`,
            participant_no: data.participant_no,
            timeRemaining: `${data.days_remaining}d`,
            days_remaining: data.days_remaining,
            momentum: 'flat' as const, // Default momentum, can be calculated from history
            probabilityHistory: data.price_history.map((h: any) => ({
              date: new Date(h.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
              value: h.probability * 100,
              timestamp: h.timestamp
            }))
          }
          setMarket(transformedMarket)

          // Fetch category data if we have category_id
          if (data.category_id) {
            try {
              const categoryData = await fetchCategory(data.category_id)
              setCategory(categoryData)
            } catch (err) {
              console.error('Failed to load category:', err)
            }
          }
        }
      } catch (err) {
        console.error('Failed to load market:', err)
        setError('Failed to load market data')
      } finally {
        setLoading(false)
      }
    }
    loadMarket()
  }, [id])

  if (loading) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">Loading...</div>
      </main>
    )
  }

  if (error || !market) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
            {error || 'Market not found'}
          </h1>
          <Link href="/markets" className="text-indigo-600 dark:text-indigo-400 hover:underline">
            Back to Markets
          </Link>
        </div>
      </main>
    )
  }

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
          <div className="space-y-6">
            <TradePanel 
              marketId={market.id}
              onTradeComplete={() => {
                // Reload market data after trade
                if (id) {
                  window.location.reload()
                }
              }}
            />

            {/* Category Summary Section */}
            {category && (
              <Link
                href={`/dashboard/category/${market.category_id}`}
                className="block rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-4 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
              >
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                  Category
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
                  {category.name}
                </p>
                <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Trend Index</span>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                      {category.trend_idx.toFixed(0)}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Momentum</span>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                      {category.momentum.toFixed(1)}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Stability</span>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                      {category.stability.toFixed(0)}%
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Proximity</span>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                      {category.proximity.toFixed(0)}%
                    </p>
                  </div>
                </div>
                <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                  View Category →
                </span>
              </Link>
            )}
          </div>
        </aside>
      </div>
    </main>
  )
}
