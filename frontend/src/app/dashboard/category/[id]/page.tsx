import Link from 'next/link'
import { fetchCategory } from '../../../../lib/api'

type Props = {
  params: Promise<{ id: string }>
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function CategoryDetailPage({ params }: Props) {
  const { id } = await params
  
  let category
  try {
    category = await fetchCategory(id)
  } catch (error) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
            Category not found
          </h1>
          <Link href="/dashboard" className="text-indigo-600 dark:text-indigo-400 hover:underline">
            Back to Dashboard
          </Link>
        </div>
      </main>
    )
  }

  // Generate summary based on metrics (hardcoded logic as requested)
  const generateSummary = () => {
    const trendIdx = category.trend_idx
    const momentum = category.momentum
    const stability = category.stability
    const proximity = category.proximity

    let summary = `${category.name} is `

    if (trendIdx > 50) {
      summary += 'showing strong positive trend signals'
    } else if (trendIdx > 0) {
      summary += 'showing moderate positive trend signals'
    } else if (trendIdx > -50) {
      summary += 'showing moderate negative trend signals'
    } else {
      summary += 'showing strong negative trend signals'
    }

    summary += '. '

    if (momentum > 10) {
      summary += 'The trend is accelerating rapidly. '
    } else if (momentum > 0) {
      summary += 'The trend has positive momentum. '
    } else if (momentum > -10) {
      summary += 'The trend has negative momentum. '
    } else {
      summary += 'The trend is decelerating rapidly. '
    }

    if (stability >= 75) {
      summary += 'Signals are consistent and reliable across data sources. '
    } else if (stability >= 50) {
      summary += 'Signals show moderate consistency with some variation. '
    } else {
      summary += 'Signals are variable and less reliable. '
    }

    if (proximity >= 75) {
      summary += 'Market resolution is approaching quickly, requiring immediate attention.'
    } else if (proximity >= 50) {
      summary += 'Market resolution is on the horizon, monitor closely.'
    } else {
      summary += 'Market resolution is still distant, allowing time for strategic planning.'
    }

    return summary
  }

  const getBarColor = (value: number, min: number, max: number) => {
    const normalized = (value - min) / (max - min)
    if (normalized < 0.33) return 'bg-pink-400 dark:bg-pink-500'
    if (normalized < 0.67) return 'bg-blue-500 dark:bg-blue-600'
    return 'bg-teal-400 dark:bg-teal-500'
  }

  const normalizeToPercentage = (value: number, min: number, max: number) => {
    return ((value - min) / (max - min)) * 100
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/dashboard"
        className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline mb-6 inline-block"
      >
        ← Back to Dashboard
      </Link>

      <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
        {category.name}
      </h1>
      <p className="text-slate-500 dark:text-slate-400 mb-8">
        Category metrics and driver markets
      </p>

      {/* Description Section */}
      <section className="mb-8">
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-6">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">
            About {category.name}
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base">
            {category.description}
          </p>
        </div>
      </section>

      {/* Summary */}
      <section className="mb-8">
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-6">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">
            Summary
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            {generateSummary()}
          </p>
        </div>
      </section>

      {/* Metrics Breakdown */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
          Metrics Breakdown
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              label: 'Trend Index',
              value: category.trend_idx,
              min: -100,
              max: 100,
              desc: 'Overall direction and strength of the category trend.',
              calc: 'Calculated as the difference between the most recent trend index value and the value from the previous time period. Ranges from -100 (strong downward trend) to +100 (strong upward trend).',
              color: 'text-purple-600 dark:text-purple-400',
            },
            {
              label: 'Momentum',
              value: category.momentum,
              min: -20,
              max: 20,
              desc: 'Rate of change in trend indicators.',
              calc: 'Measures the acceleration or deceleration of the trend by calculating the rate of change in the trend index over time. Positive values indicate accelerating growth, negative values indicate acceleration in decline. Scaled to range from -20 to +20.',
              color: 'text-indigo-600 dark:text-indigo-400',
            },
            {
              label: 'Stability',
              value: category.stability,
              min: 0,
              max: 100,
              desc: 'Consistency and reliability of trend signals.',
              calc: 'Measures the inverse of volatility across all driver markets, weighted by market volume. Higher values (0-100) indicate more consistent and reliable signals with less fluctuation in the underlying data.',
              color: 'text-emerald-600 dark:text-emerald-400',
            },
            {
              label: 'Proximity',
              value: category.proximity,
              min: 0,
              max: 100,
              desc: 'Time urgency based on market resolution dates.',
              calc: 'Calculated based on the weighted average of days until market resolution across all driver markets. Higher values (0-100) indicate closer resolution dates, suggesting more immediate decision-making requirements.',
              color: 'text-amber-600 dark:text-amber-400',
            },
          ].map((m) => (
            <div
              key={m.label}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-5"
            >
              <div>
                <h3 className={`text-base font-semibold mb-2 ${m.color}`}>{m.label}</h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">{m.desc}</p>
                <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg mb-3">
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    <span className="font-semibold">How it's calculated:</span> {m.calc}
                  </p>
                </div>
                <p className="text-lg font-bold text-slate-800 dark:text-slate-200">
                  {m.value.toFixed(1)}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs text-white font-medium">{m.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 dark:text-slate-400 min-w-[30px]">{m.min}</span>
                  <div className="flex-1 h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden relative">
                    {m.min < 0 && m.max > 0 && (
                      <div 
                        className="absolute top-0 bottom-0 w-px bg-slate-400 dark:bg-slate-500"
                        style={{ left: `${normalizeToPercentage(0, m.min, m.max)}%` }}
                      />
                    )}
                    <div
                      className={`h-full ${getBarColor(m.value, m.min, m.max)} transition-all duration-500 ease-out`}
                      style={{ width: `${normalizeToPercentage(m.value, m.min, m.max)}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 min-w-[30px] text-right">{m.max}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Driver markets list */}
      <section>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
          Related Driver Markets
        </h2>
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          {category.markets && category.markets.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Question
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Price
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Volume
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Participants
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Sentiment
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {category.markets.map((m: any) => (
                    <tr
                      key={m.id}
                      className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <td className="px-4 py-3 text-sm font-medium">
                        <Link
                          href={`/markets/${m.id}`}
                          className="text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                          {m.question}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
                        {m.price}¢
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
                        ${(m.volume / 1000000).toFixed(1)}M
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
                        {m.participant_no}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                          m.sentiment === 'positive' 
                            ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                            : 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400'
                        }`}>
                          {m.sentiment}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-6 text-center text-slate-500 bg-white dark:bg-slate-800/50">
              No driver markets for this category
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
