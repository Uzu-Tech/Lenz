import Link from 'next/link'
import { TRENDS, MARKETS } from '@/data/mock'

const METRIC_SLUGS = ['momentum', 'stability', 'urgency'] as const
type MetricSlug = (typeof METRIC_SLUGS)[number]

function isMetricSlug(s: string): s is MetricSlug {
  return METRIC_SLUGS.includes(s as MetricSlug)
}

function metricLabel(slug: MetricSlug): string {
  return slug.charAt(0).toUpperCase() + slug.slice(1)
}

type Props = {
  params: { id: string; metric: string }
}

export const dynamic = 'force-dynamic'

export function generateStaticParams() {
  const params: Array<{ id: string; metric: string }> = []
  
  TRENDS.forEach((trend) => {
    METRIC_SLUGS.forEach((metric) => {
      params.push({
        id: trend.id,
        metric,
      })
    })
  })
  
  return params
}

export default function MetricBreakdownPage({ params }: Props) {
  const { id, metric } = params
  const trend = TRENDS.find((t) => String(t.id) === String(id))
  if (!trend || !isMetricSlug(metric)) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
            Metric not found
          </h1>
          <Link href="/dashboard" className="text-indigo-600 dark:text-indigo-400 hover:underline">
            Back to Dashboard
          </Link>
        </div>
      </main>
    )
  }

  const driverMarkets = MARKETS.filter((m) => m.trendId === id)
  const value = trend.metrics[metric as keyof typeof trend.metrics] as number

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href={`/dashboard/category/${id}`}
        className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline mb-6 inline-block"
      >
        ← Back to {trend.name}
      </Link>

      <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
        {metricLabel(metric as MetricSlug)} breakdown
      </h1>
      <p className="text-slate-500 dark:text-slate-400 mb-2">
        Aggregated value for this trend: <strong>{value}%</strong>
      </p>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
        The metric above is derived from the following prediction markets and their probabilities.
      </p>

      <section>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
          Prediction questions contributing to {metricLabel(metric as MetricSlug)}
        </h2>
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                <th className="px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Question
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Probability
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Market
                </th>
              </tr>
            </thead>
            <tbody>
              {driverMarkets.length > 0 ? (
                driverMarkets.map((m) => (
                  <tr
                    key={m.id}
                    className="border-b border-slate-100 dark:border-slate-700 last:border-0"
                  >
                    <td className="px-4 py-3 text-slate-800 dark:text-slate-200">
                      {m.question}
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-medium text-indigo-600 dark:text-indigo-400">
                        {(m.probability * 100).toFixed(0)}%
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/markets/${m.id}`}
                        className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        View market →
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-4 py-6 text-center text-slate-500">
                    No driver markets for this trend
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}
