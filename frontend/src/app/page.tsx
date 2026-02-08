import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      {/* Navigation Bar */}
      <nav className="border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white p-1.5">
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <span className="font-semibold text-slate-800 dark:text-slate-200">Lenz</span>
            </Link>
            <div className="flex items-center gap-6">
              <Link
                href="/dashboard"
                className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                Dashboard
              </Link>
              <Link
                href="/markets"
                className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                Markets
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            Track Cultural Trends
            <span className="block text-indigo-600 dark:text-indigo-400 mt-2">
              Before They Peak
            </span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            Lenz is a prediction market platform that quantifies emerging cultural trends and aesthetics.
            Trade on the future of fashion, media, and consumer behavior with data-driven insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors text-lg"
            >
              Explore Dashboard
            </Link>
            <Link
              href="/markets"
              className="px-8 py-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 font-semibold rounded-lg border-2 border-slate-200 dark:border-slate-700 transition-colors text-lg"
            >
              Browse Markets
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 text-center mb-12">
          Why Lenz?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
              Data-Driven Metrics
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Track Trend Index, Momentum, Stability, and Proximity across cultural categories with quantified signals.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="text-3xl mb-4">💹</div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
              Prediction Markets
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Trade on the future of trends. Buy and sell positions based on your conviction about what's next.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
              Emerging Insights
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Identify rising trends early with urgency-ranked categories showing what's gaining momentum now.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="text-3xl mb-4">📈</div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
              Market Intelligence
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Access real-time price history, trading volume, and market sentiment across hundreds of cultural indicators.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 text-center mb-12">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">1</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
              Explore Categories
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Browse cultural trend categories from Y2K Revival to Indie Sleaze, each with calculated metrics and driver markets.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">2</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
              Analyze Signals
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Review trend indicators, momentum shifts, and market probability charts to understand where trends are heading.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">3</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
              Trade & Track
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Buy or sell positions on specific markets, watch your portfolio, and see how your predictions perform over time.
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 text-center mb-12">
          Who Uses Lenz?
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-8 rounded-xl border border-purple-200 dark:border-purple-800">
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
              Content Creators & Marketers
            </h3>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Stay ahead of cultural shifts to create relevant content and campaigns. Identify emerging aesthetics before they hit mainstream.
            </p>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
              <li>• Spot trending aesthetics early</li>
              <li>• Plan content calendars around momentum signals</li>
              <li>• Validate creative direction with market data</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-8 rounded-xl border border-blue-200 dark:border-blue-800">
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
              Brands & Analysts
            </h3>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Make strategic decisions backed by quantified cultural intelligence. Understand consumer sentiment and trend trajectories.
            </p>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
              <li>• Track brand-relevant trends</li>
              <li>• Forecast cultural movements</li>
              <li>• Benchmark against market consensus</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Track the Future?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join Lenz and start exploring data-driven insights into cultural trends and emerging aesthetics.
          </p>
          <Link
            href="/dashboard"
            className="inline-block px-8 py-4 bg-white text-indigo-600 hover:bg-indigo-50 font-semibold rounded-lg transition-colors text-lg"
          >
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-slate-600 dark:text-slate-400 mb-4 md:mb-0">
              © 2026 Lenz. Tracking cultural trends with data.
            </div>
            <div className="flex gap-6">
              <Link href="/dashboard" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                Dashboard
              </Link>
              <Link href="/markets" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                Markets
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
