'use client'

import { useEffect, useState } from 'react'
import { MarketTable } from '../../components'
import { fetchCategories, fetchMarkets } from '../../lib/api'

export default function MarketsPage() {
  const [categories, setCategories] = useState<string[]>(['All'])
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [momentumFilter, setMomentumFilter] = useState<'all' | 'up' | 'down' | 'flat'>('all')
  const [timeFilter, setTimeFilter] = useState<'all' | '7d' | '14d' | '30d'>('all')
  const [markets, setMarkets] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        // Fetch categories and markets from backend
        const [categoriesData, marketsData] = await Promise.all([
          fetchCategories(),
          fetchMarkets()
        ])
        
        const categoryNames = categoriesData.map((c: any) => c.name)
        setCategories(['All', ...categoryNames])
        setMarkets(marketsData)
      } catch (error) {
        console.error('Failed to load data:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const filteredMarkets = markets.filter((m) => {
    const matchCategory = categoryFilter === 'All' || m.category === categoryFilter
    const matchSearch = search === '' || m.question.toLowerCase().includes(search.toLowerCase())
    // TODO: Add momentum and time filtering once we have those fields in backend
    return matchCategory && matchSearch
  })

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">Loading...</div>
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
        Trading Markets
      </h1>
      <p className="text-slate-500 dark:text-slate-400 mb-8">
        Trade on trend probabilities – price shown in pence
      </p>

      {/* Filters */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-[200px] px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 min-w-[140px]"
          >
            <option value="All">All Categories</option>
            {categories.filter((c) => c !== 'All').map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select
            value={momentumFilter}
            onChange={(e) => setMomentumFilter(e.target.value as typeof momentumFilter)}
            className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 min-w-[140px]"
          >
            <option value="all">All Momentum</option>
            <option value="up">Rising</option>
            <option value="down">Falling</option>
            <option value="flat">Flat</option>
          </select>
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value as typeof timeFilter)}
            className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 min-w-[140px]"
          >
            <option value="all">Any Time</option>
            <option value="7d">≤ 7 days</option>
            <option value="14d">≤ 14 days</option>
            <option value="30d">≤ 30 days</option>
          </select>
        </div>
      </div>

      <MarketTable markets={filteredMarkets} />
    </main>
  )
}
