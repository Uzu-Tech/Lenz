'use client'

import Link from 'next/link'
import { useTheme } from '@/context/ThemeContext'

export function Header() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <header className="border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
              L
            </div>
            <span className="font-semibold text-slate-800 dark:text-slate-200">Lenz</span>
          </Link>
          <nav className="flex items-center gap-6">
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
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l-2.121-2.121a1 1 0 00-1.414 1.414l2.121 2.121a1 1 0 001.414-1.414zM2.05 6.464A1 1 0 103.464 5.05l-1.414 1.414zm12-2.828a1 1 0 00-1.414-1.414l-1.414 1.414a1 1 0 001.414 1.414l1.414-1.414zm2.828 6.464a1 1 0 10-1.414-1.414l-1.414 1.414a1 1 0 001.414 1.414l1.414-1.414zM13.464 2.05a1 1 0 00-1.414 1.414l1.414 1.414a1 1 0 001.414-1.414l-1.414-1.414zM6.464 13.536a1 1 0 001.414-1.414l-1.414-1.414a1 1 0 00-1.414 1.414l1.414 1.414zM2.05 13.536a1 1 0 001.414 1.414l1.414-1.414a1 1 0 00-1.414-1.414l-1.414 1.414zM17.95 3.464a1 1 0 001.414-1.414l-1.414-1.414a1 1 0 00-1.414 1.414l1.414 1.414zM17.95 16.536a1 1 0 00-1.414 1.414l1.414 1.414a1 1 0 001.414-1.414l-1.414-1.414zM3.464 17.95a1 1 0 001.414 1.414l1.414-1.414a1 1 0 00-1.414-1.414l-1.414 1.414zM16.536 17.95a1 1 0 00-1.414-1.414l-1.414 1.414a1 1 0 001.414 1.414l1.414-1.414zM10 18a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}
