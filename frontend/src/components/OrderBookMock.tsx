'use client'

type OrderBookEntry = {
  price: number
  size: number
}

type OrderBookMockProps = {
  bids: OrderBookEntry[]
  asks: OrderBookEntry[]
  className?: string
}

export function OrderBookMock({ bids, asks, className = '' }: OrderBookMockProps) {
  return (
    <div className={`rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 overflow-hidden ${className}`}>
      <h3 className="font-semibold text-slate-800 dark:text-slate-200 p-4 border-b border-slate-200 dark:border-slate-700">
        Order Book
      </h3>
      <div className="grid grid-cols-2">
        <div className="border-r border-slate-200 dark:border-slate-700">
          <div className="p-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-medium">
            Bids
          </div>
          {bids.map((b, i) => (
            <div
              key={i}
              className="flex justify-between px-4 py-2 text-sm border-b border-slate-100 dark:border-slate-800"
            >
              <span className="font-mono text-green-600 dark:text-green-400">{b.price.toFixed(2)}¢</span>
              <span className="text-slate-600 dark:text-slate-400">{b.size.toLocaleString()}</span>
            </div>
          ))}
        </div>
        <div>
          <div className="p-2 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-xs font-medium">
            Asks
          </div>
          {asks.map((a, i) => (
            <div
              key={i}
              className="flex justify-between px-4 py-2 text-sm border-b border-slate-100 dark:border-slate-800"
            >
              <span className="font-mono text-red-600 dark:text-red-400">{a.price.toFixed(2)}¢</span>
              <span className="text-slate-600 dark:text-slate-400">{a.size.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
