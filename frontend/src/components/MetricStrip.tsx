type MetricStripProps = {
  metrics: Array<{ label: string; value: string; icon?: string }>
}

export function MetricStrip({ metrics }: MetricStripProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {metrics.map((m) => (
        <div
          key={m.label}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700"
        >
          {m.icon && <span className="text-lg">{m.icon}</span>}
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">{m.label}</p>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{m.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
