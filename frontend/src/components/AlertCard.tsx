type AlertCardProps = {
  icon: string
  category: string
  reason: string
  severity?: 'low' | 'medium' | 'high'
}

export function AlertCard({ icon, category, reason, severity = 'low' }: AlertCardProps) {
  const severityColors = {
    low: 'border-slate-200 dark:border-slate-700',
    medium: 'border-amber-300 dark:border-amber-700',
    high: 'border-red-300 dark:border-red-700',
  }

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-xl border bg-white dark:bg-slate-800/50 ${severityColors[severity]}`}
    >
      <span className="text-2xl">{icon}</span>
      <div>
        <p className="font-medium text-slate-800 dark:text-slate-200">{category}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{reason}</p>
      </div>
    </div>
  )
}
