import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ProbabilityChart,
  TradePanel,
} from '@/components'
import { MARKETS } from '@/data/mock'

type Props = {
  params: { id: string }
}

export default function MarketDetailPage({ params }: Props) {
  const { id } = params
  const market = MARKETS.find((m) => m.id === id)
  if (!market) notFound()

  const metrics = [
    { label: 'Momentum', value: '72%' },
    { label: 'Stability', value: '85%' },
    { label: 'Agreement', value: '91%' },
    { label: 'Urgency', value: 'High' },
  ]

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/markets"
        className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline mb-6 inline-block"
      >
        ← Back to Markets
      </Link>

      <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
        {market.question}
      </h1>
      <p className="text-slate-500 dark:text-slate-400 mb-8">
        {market.category} • {(market.probability * 100).toFixed(0)}¢
      </p>

      {/* Probability over time chart - Kalshi style */}
      <section className="mb-8">
        <ProbabilityChart data={market.probabilityHistory} />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Trade panel */}
        <div className="lg:col-span-1">
          <TradePanel />
        </div>

        {/* Metrics panel - takes full width on smaller, 2 cols on larger */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-6">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
              Metrics
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {metrics.map((m) => (
                <div
                  key={m.label}
                  className="flex flex-col gap-1 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50"
                >
                  <p className="text-xs text-slate-500 dark:text-slate-400">{m.label}</p>
                  <p className="font-mono font-medium text-slate-800 dark:text-slate-200">{m.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
