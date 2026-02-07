import {
  CategoryCard,
  MomentumArrow,
  AlertCard,
} from '@/components'
import { TRENDS, TOP_RISING, TOP_FALLING, ALERTS } from '@/data/mock'

export default function DashboardPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
        Insight Dashboard
      </h1>
      <p className="text-slate-500 dark:text-slate-400 mb-8">
        Track trends and signal quality
      </p>

      {/* Trend Cards Grid */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">Trends</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TRENDS.map((t) => (
            <CategoryCard
              key={t.id}
              id={t.id}
              name={t.name}
              direction={t.direction}
              sparklineData={t.sparklineData}
              metrics={t.metrics}
            />
          ))}
        </div>
      </section>

      {/* Top Rising / Top Falling - no percentages */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-4">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
            Top Rising
          </h2>
          <div className="space-y-3">
            {TOP_RISING.map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700 last:border-0"
              >
                <span className="text-slate-700 dark:text-slate-300">{r.name}</span>
                <MomentumArrow direction={r.momentum} />
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-4">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
            Top Falling
          </h2>
          <div className="space-y-3">
            {TOP_FALLING.map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700 last:border-0"
              >
                <span className="text-slate-700 dark:text-slate-300">{r.name}</span>
                <MomentumArrow direction={r.momentum} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signal Quality & Risk Alerts */}
      <section>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
          Signal Quality & Risk Alerts
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ALERTS.map((a) => (
            <AlertCard
              key={a.id}
              icon={a.icon}
              category={a.trendName}
              reason={a.reason}
              severity={a.severity}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
