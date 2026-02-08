import { Suspense } from 'react'
import { DashboardInsight } from '../../components'
import { fetchCategories } from '../../lib/api'

type Category = {
  id: string
  name: string
  trend_idx: number
  momentum: number
  stability: number
  proximity: number
  urgency: number
}

type RiskAlert = {
  id: string
  categoryName: string
  reason: string
  icon: string
  severity: 'low' | 'medium' | 'high'
}

// Derive risk alerts from stability: low stability = higher risk
function getRiskAlerts(categories: Category[]): RiskAlert[] {
  return categories
    .filter((c) => c.stability < 70)
    .map((c) => {
      const s = c.stability
      const severity: 'low' | 'medium' | 'high' =
        s < 55 ? 'high' : s < 65 ? 'medium' : 'low'
      return {
        id: c.id,
        categoryName: c.name,
        reason: `Stability ${s.toFixed(1)}% – ${
          severity === 'high'
            ? 'High volatility'
            : severity === 'medium'
              ? 'Moderate instability'
              : 'Lower confidence'
        }`,
        icon: severity === 'high' ? '⚡' : '⚠️',
        severity,
      }
    })
    .sort((a, b) =>
      a.severity === 'high' ? -1 : b.severity === 'high' ? 1 : 0
    )
}

async function DashboardPageContent() {
  let categories: Category[] = []
  let error: string | null = null

  try {
    categories = await fetchCategories()
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load categories'
  }

  const riskAlerts = getRiskAlerts(categories)

  if (error) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-red-600 dark:text-red-400">
          Error: {error}
        </div>
      </main>
    )
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-3">
        Insight Dashboard
      </h1>
      <div className="mb-8 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
        <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
          <strong>Welcome to the Insight Dashboard.</strong> This dashboard provides real-time analytics on market trends across multiple categories, tracking key metrics like Trend Index, Momentum, Stability, and Proximity.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Use the <strong>Sort by</strong> dropdown to organize categories by any metric, and toggle between <strong>Bars</strong> or <strong>Radar</strong> view for different visualizations.
        </p>
      </div>

      <DashboardInsight categories={categories} riskAlerts={riskAlerts} />
    </main>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
      <DashboardPageContent />
    </Suspense>
  )
}
