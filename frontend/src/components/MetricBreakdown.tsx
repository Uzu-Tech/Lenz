'use client'

import { useEffect, useId, useState } from 'react'
import type { PredictionQuestion } from '../data/mock'

type MetricBreakdownProps = {
  metricLabel: string
  predictions?: PredictionQuestion[]
}

export function MetricBreakdown({ metricLabel, predictions }: MetricBreakdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const instanceId = useId()

  useEffect(() => {
    const handler = (event: Event) => {
      const customEvent = event as CustomEvent<string>
      if (customEvent.detail !== instanceId) {
        setIsOpen(false)
      }
    }

    window.addEventListener('metric-breakdown-open', handler)
    return () => {
      window.removeEventListener('metric-breakdown-open', handler)
    }
  }, [instanceId])

  if (!predictions || predictions.length === 0) {
    return null
  }

  const avgProbability =
    predictions.reduce((sum, p) => sum + p.probability, 0) / predictions.length

  return (
    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700">
      <button
        onClick={() => {
          const nextOpen = !isOpen
          if (nextOpen) {
            window.dispatchEvent(
              new CustomEvent('metric-breakdown-open', { detail: instanceId })
            )
          }
          setIsOpen(nextOpen)
        }}
        className="flex items-center justify-between w-full text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
      >
        <span>{metricLabel} Breakdown</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="mt-3 space-y-2">
          {predictions.map((pred) => (
            <div
              key={pred.id}
              className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-700/30 text-sm"
            >
              <span className="text-slate-600 dark:text-slate-400 flex-1">
                {pred.question}
              </span>
              <span className="font-semibold text-indigo-600 dark:text-indigo-400 ml-2">
                {(pred.probability * 100).toFixed(0)}%
              </span>
            </div>
          ))}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-600 flex items-center justify-between text-sm font-medium">
            <span className="text-slate-700 dark:text-slate-300">Aggregated Average</span>
            <span className="text-indigo-600 dark:text-indigo-400">
              {(avgProbability * 100).toFixed(0)}%
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
