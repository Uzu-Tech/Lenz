import { DashboardInsight } from '../../components'
import { TRENDS } from '../../data/mock'

// Derive risk alerts from stability: low stability = higher risk
function getRiskAlerts() {
  return TRENDS.filter((t) => t.metrics.stability < 70)
    .map((t) => {
      const s = t.metrics.stability
      const severity: 'low' | 'medium' | 'high' =
        s < 55 ? 'high' : s < 65 ? 'medium' : 'low'
      return {
        id: t.id,
        trendName: t.name,
        reason: `Stability ${s}% – ${severity === 'high' ? 'High volatility' : severity === 'medium' ? 'Moderate instability' : 'Lower confidence'}`,
        icon: severity === 'high' ? '⚡' : '⚠️',
        severity,
      }
    })
    .sort((a, b) => (a.severity === 'high' ? -1 : b.severity === 'high' ? 1 : 0))
}

export default function DashboardPage() {
  const riskAlerts = getRiskAlerts()

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
        Insight Dashboard
      </h1>
      <p className="text-slate-500 dark:text-slate-400 mb-8">
        Track trends and risk
      </p>

      <DashboardInsight trends={TRENDS} riskAlerts={riskAlerts} />
    </main>
  )
}
