import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  RadarMetricsChart,
  MomentumArrow,
} from '@/components'
import {
  TRENDS,
  MARKETS,
} from '@/data/mock'

type Props = {
  params: { id: string }
}

export default function CategoryDetailPage({ params }: Props) {
  const { id } = params
  const trend = TRENDS.find((t) => t.id === id)
  if (!trend) notFound()

  const driverMarkets = MARKETS.filter((m) => m.trendId === id)

  const radarData = [
    { metric: 'Momentum', value: trend.metrics.momentum, fullMark: 100 },
    { metric: 'Stability', value: trend.metrics.stability, fullMark: 100 },
    { metric: 'Agreement', value: trend.metrics.agreement, fullMark: 100 },
    { metric: 'Urgency', value: trend.metrics.urgency, fullMark: 100 },
  ]

  const metricDetails = [
    {
      label: 'Momentum',
      value: trend.metrics.momentum,
      desc: 'Rate of change in trend indicators. High momentum suggests the trend is accelerating.',
    },
    {
      label: 'Stability',
      value: trend.metrics.stability,
      desc: 'Consistency across data sources. Higher stability means more reliable signals.',
    },
    {
      label: 'Agreement',
      value: trend.metrics.agreement,
      desc: 'Consensus among indicators. Strong agreement indicates confidence in the trend.',
    },
    {
      label: 'Urgency',
      value: trend.metrics.urgency,
      desc: 'How quickly the trend may shift. Higher urgency suggests act sooner.',
    },
  ]

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/dashboard"
        className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline mb-6 inline-block"
      >
        ← Back to Dashboard
      </Link>

      <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
        {trend.name}
      </h1>
      <p className="text-slate-500 dark:text-slate-400 mb-8">
        Trend metrics and driver markets
      </p>

      {/* Radar chart */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
          Metrics Overview
        </h2>
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-6 max-w-md">
          <RadarMetricsChart data={radarData} />
        </div>
      </section>

      {/* 4 metrics in detail */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
          Metric Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {metricDetails.map((m) => (
            <div
              key={m.label}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-4"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-slate-800 dark:text-slate-200">{m.label}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 rounded-full bg-slate-200 dark:bg-slate-700">
                    <div
                      className="h-full rounded-full bg-indigo-500"
                      style={{ width: `${m.value}%` }}
                    />
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Driver markets list */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
          Driver Markets
        </h2>
        <div className="space-y-3">
          {driverMarkets.length > 0 ? (
            driverMarkets.map((m) => (
              <Link
                key={m.id}
                href={`/markets/${m.id}`}
                className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
              >
                <div>
                  <p className="font-medium text-slate-800 dark:text-slate-200">{m.question}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    {m.category}
                  </p>
                </div>
                <MomentumArrow direction={m.momentum} />
              </Link>
            ))
          ) : (
            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 text-center text-slate-500">
              No driver markets for this trend
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
