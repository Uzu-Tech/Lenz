import Link from 'next/link'
import {
  MomentumArrow,
} from '../../../../components'
import {
  TRENDS,
  MARKETS,
} from '../../../../data/mock'

type Props = {
  params: Promise<{ id: string }>
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export function generateStaticParams() {
  return TRENDS.map((trend) => ({
    id: trend.id,
  }))
}

export default async function CategoryDetailPage({ params }: Props) {
  const { id } = await params
  const trend = TRENDS.find((t) => t.id === id)
  if (!trend) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
            Trend not found
          </h1>
          <Link href="/dashboard" className="text-indigo-600 dark:text-indigo-400 hover:underline">
            Back to Dashboard
          </Link>
        </div>
      </main>
    )
  }

  const driverMarkets = MARKETS.filter((m) => m.trendId === id)

  const getStrengthLabel = (value: number): string => {
    if (value >= 85) return 'Very High'
    if (value >= 70) return 'High'
    if (value >= 50) return 'Moderate'
    if (value >= 30) return 'Low'
    return 'Very Low'
  }

  const getGradientClass = (val: number) => {
    if (val >= 75) return 'from-cyan-400 to-emerald-400 dark:from-cyan-500 dark:to-emerald-500'
    if (val >= 50) return 'from-blue-400 to-cyan-400 dark:from-blue-500 dark:to-cyan-500'
    return 'from-purple-400 to-pink-400 dark:from-purple-500 dark:to-pink-500'
  }

  // Overview content for trends
  const getTrendOverview = (trendName: string) => {
    const overviews: Record<string, { description: string; examples: string; icon: string }> = {
      'Y2K Revival': {
        description: 'The resurgence of early 2000s aesthetic, fashion, and cultural elements in contemporary media and consumer products.',
        examples: 'This trend is manifesting across multiple platforms and mediums, from TikTok content creators showcasing low-rise jeans and baby tees to curated Spotify playlists featuring iconic 2000s pop hits. Fashion brands are launching dedicated Y2K collection reboots, while digital content creators embrace retro flip phone aesthetics in their videos. The gaming industry has also joined in, with new releases incorporating early 2000s UI design elements that evoke nostalgia for the millennial generation.',
        icon: '📱'
      },
      'Indie Sleaze': {
        description: 'A nostalgic revival of independent culture, DIY aesthetics, and scrappy creative approaches from the 2000s indie scene.',
        examples: 'The movement is visible through independent musicians gaining viral moments on streaming platforms, vintage film photography becoming mainstream in content creation, and DIY podcast networks alongside self-published web series. Thrifted fashion and vintage styling tutorials dominate social feeds, while small-batch indie gaming continues to gain mainstream recognition and critical acclaim.',
        icon: '📷'
      },
      'Cottagecore': {
        description: 'An aesthetic celebrating rural, pastoral, and traditional lifestyles with romantic interpretations of countryside living.',
        examples: 'This aesthetic flourishes through Pinterest boards showcasing garden design and mood boards, BookTok communities promoting classic literature and cozy reads, and kitchen content featuring homemade baking and preserve making. Influencers share slow-living lifestyle content that resonates with audiences seeking respite from fast-paced modern life, while fashion trends embrace floral prints and vintage-inspired clothing that evoke simpler times.',
        icon: '🌸'
      }
    }
    return overviews[trendName] || {
      description: `${trendName} is a trending cultural phenomenon gaining attention in content creation and media.`,
      examples: 'This trend is featured in social media content, discussed in online communities, referenced in entertainment media, inspiring creative projects, and generating growing consumer interest across various platforms and demographics.',
      icon: '✨'
    }
  }

  const trendOverview = getTrendOverview(trend.name)

  // Generate summary based on metrics
  const generateSummary = () => {
    const momentum = trend.metrics.momentum
    const stability = trend.metrics.stability
    const urgency = trend.metrics.urgency

    let summary = `${trend.name} is `

    if (momentum >= 75) {
      summary += 'showing strong acceleration with high momentum'
    } else if (momentum >= 50) {
      summary += 'gaining momentum at a moderate pace'
    } else {
      summary += 'showing declining momentum'
    }

    summary += '. '

    if (stability >= 75) {
      summary += 'Signals are consistent and reliable across data sources. '
    } else if (stability >= 50) {
      summary += 'Signals show moderate consistency with some variation. '
    } else {
      summary += 'Signals are variable and less reliable. '
    }

    if (urgency >= 75) {
      summary += 'Quick action may be required as this trend could shift rapidly.'
    } else if (urgency >= 50) {
      summary += 'Monitor this trend closely for potential changes.'
    } else {
      summary += 'This trend is relatively stable with time to respond.'
    }

    return summary
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
        {trend.name}
      </h1>
      <p className="text-slate-500 dark:text-slate-400 mb-8">
        Trend metrics and driver markets
      </p>

      {/* Overview Section */}
      <section className="mb-8">
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-6">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">
            What is {trend.name}?
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4 text-base">
            {trendOverview.description}
          </p>
          <div>
            <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">
              Examples in Content & Media:
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[15px]">
              {trendOverview.examples}
            </p>
          </div>
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

      {/* Metric Details */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
          Detailed Metrics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              label: 'Momentum',
              value: trend.metrics.momentum,
              desc: 'Rate of change in trend indicators. High momentum suggests the trend is accelerating.',
              calc: "Rolling window difference between today's contract price and the window start, weighted by market volume.",
              valueText: `${(((trend.metrics.momentum - 50) / 10)).toFixed(1)}%`,
              color: 'text-indigo-600 dark:text-indigo-400',
            },
            {
              label: 'Stability',
              value: trend.metrics.stability,
              desc: 'Consistency across data sources. Higher stability means more reliable signals.',
              calc: 'Measured as 1/volatility of the contract over the window, weighted by market volume.',
              valueText: `${(100 / (100 - trend.metrics.stability || 1)).toFixed(2)}`,
              color: 'text-emerald-600 dark:text-emerald-400',
            },
            {
              label: 'Urgency',
              value: trend.metrics.urgency,
              desc: 'How quickly the trend may shift. Higher urgency suggests act sooner.',
              calc: 'Probability of the contract over the time horizon, weighted by market volume.',
              valueText: `${(trend.metrics.urgency / 100).toFixed(2)}`,
              color: 'text-amber-600 dark:text-amber-400',
            },
          ].map((m) => (
            <div
              key={m.label}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-5"
            >
              <div>
                <h3 className={`text-base font-semibold mb-1 ${m.color}`}>{m.label}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{m.desc}</p>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">{m.calc}</p>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mt-2">
                  Current value: {m.valueText}
                </p>
              </div>

              <div className="flex items-baseline gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex-1 h-5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${getGradientClass(m.value)} transition-all duration-500 ease-out opacity-90`}
                    style={{ width: `${m.value}%` }}
                  />
                </div>
                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm min-w-fit">
                  {getStrengthLabel(m.value)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Driver markets list */}
      <section>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
          Driver Markets
        </h2>
        <div className="space-y-2">
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
