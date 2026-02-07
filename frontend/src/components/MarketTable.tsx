'use client'

import Link from 'next/link'
import { MomentumArrow } from './MomentumArrow'

type Market = {
  id: string
  question: string
  category: string
  probability: number
  price: number
  momentum: 'up' | 'down' | 'flat'
  volume: string
  timeRemaining: string
}

type MarketTableProps = {
  markets: Market[]
}

export function MarketTable({ markets }: MarketTableProps) {

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
            <th className="text-left p-4 text-sm font-medium text-slate-600 dark:text-slate-400">Question</th>
            <th className="text-left p-4 text-sm font-medium text-slate-600 dark:text-slate-400">Category</th>
            <th className="text-left p-4 text-sm font-medium text-slate-600 dark:text-slate-400">Probability</th>
            <th className="text-left p-4 text-sm font-medium text-slate-600 dark:text-slate-400">Price</th>
            <th className="text-left p-4 text-sm font-medium text-slate-600 dark:text-slate-400">Momentum</th>
            <th className="text-left p-4 text-sm font-medium text-slate-600 dark:text-slate-400">Volume</th>
            <th className="text-left p-4 text-sm font-medium text-slate-600 dark:text-slate-400">Time Remaining</th>
          </tr>
        </thead>
        <tbody>
          {markets.map((m) => (
            <tr
              key={m.id}
              className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/30"
            >
              <td className="p-4">
                <Link
                  href={`/markets/${m.id}`}
                  className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  {m.question}
                </Link>
              </td>
              <td className="p-4 text-slate-600 dark:text-slate-400">{m.category}</td>
              <td className="p-4">
                <span className="font-semibold text-green-600 dark:text-green-400">
                  {(m.probability * 100).toFixed(0)}%
                </span>
              </td>
              <td className="p-4">
                <span className="font-mono font-semibold text-blue-600 dark:text-blue-400">
                  {m.price}¢
                </span>
              </td>
              <td className="p-4">
                <MomentumArrow direction={m.momentum} />
              </td>
              <td className="p-4 text-slate-600 dark:text-slate-400">{m.volume}</td>
              <td className="p-4 text-slate-600 dark:text-slate-400">{m.timeRemaining}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
