'use client'

type TradePanelProps = {
  className?: string
}

export function TradePanel({ className = '' }: TradePanelProps) {
  return (
    <div className={`rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-4 ${className}`}>
      <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">Trade</h3>
      <div className="space-y-3">
        <div className="flex gap-2">
          <button className="flex-1 py-2.5 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition-colors">
            Buy YES
          </button>
          <button className="flex-1 py-2.5 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-colors">
            Buy NO
          </button>
        </div>
        <div>
          <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Amount</label>
          <input
            type="text"
            placeholder="0.00"
            className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400"
          />
        </div>
      </div>
    </div>
  )
}
