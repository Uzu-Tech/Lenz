'use client'

import { useState } from 'react'
import { executeTrade } from '../lib/api'

type TradePanelProps = {
  marketId: string | number
  className?: string
  onTradeComplete?: () => void
}

export function TradePanel({ marketId, className = '', onTradeComplete }: TradePanelProps) {
  const [mode, setMode] = useState<'buy' | 'sell'>('buy')
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleTrade = async (outcome: 'yes' | 'no') => {
    if (!amount || parseFloat(amount) <= 0) {
      setMessage({ type: 'error', text: 'Please enter a valid amount' })
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      const result = await executeTrade(marketId, mode, outcome, parseFloat(amount))
      
      if (result.success) {
        setMessage({
          type: 'success',
          text: `${mode === 'buy' ? 'Bought' : 'Sold'} ${outcome.toUpperCase()} for £${amount}`
        })
        setAmount('')
        // Refresh parent component data
        onTradeComplete?.()
      } else {
        setMessage({ type: 'error', text: result.error || 'Trade failed' })
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to execute trade' })
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-4 ${className}`}>
      <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">Trade</h3>
      
      {/* Buy/Sell toggle */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setMode('buy')}
          disabled={loading}
          className={`flex-1 py-2 px-3 rounded-lg font-medium transition-colors ${
            mode === 'buy'
              ? 'bg-indigo-500 text-white'
              : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 disabled:opacity-50'
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => setMode('sell')}
          disabled={loading}
          className={`flex-1 py-2 px-3 rounded-lg font-medium transition-colors ${
            mode === 'sell'
              ? 'bg-indigo-500 text-white'
              : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 disabled:opacity-50'
          }`}
        >
          Sell
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex gap-2">
          <button
            onClick={() => handleTrade('yes')}
            disabled={loading}
            className={`flex-1 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50 ${
              mode === 'buy'
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-green-400 text-white hover:bg-green-500'
            }`}
          >
            {loading ? 'Processing...' : mode === 'buy' ? 'Buy YES' : 'Sell YES'}
          </button>
          <button
            onClick={() => handleTrade('no')}
            disabled={loading}
            className={`flex-1 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50 ${
              mode === 'buy'
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-red-400 text-white hover:bg-red-500'
            }`}
          >
            {loading ? 'Processing...' : mode === 'buy' ? 'Buy NO' : 'Sell NO'}
          </button>
        </div>
        <div>
          <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Amount (£)</label>
          <input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={loading}
            className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 disabled:opacity-50"
            min="0"
            step="0.01"
          />
        </div>
        {message && (
          <div className={`p-3 rounded-lg text-sm font-medium ${
            message.type === 'success'
              ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
              : 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400'
          }`}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  )
}
