import { Eye, TrendingUp } from 'lucide-react';

export function ModeSwitcher({ mode, onModeChange }) {
  return (
    <div className="inline-flex p-1 rounded-lg bg-lenz-surface border border-lenz-border">
      <button
        onClick={() => onModeChange('insights')}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all
          ${mode === 'insights'
            ? 'bg-lenz-accent text-white shadow-sm'
            : 'text-lenz-muted hover:text-white hover:bg-lenz-surfaceHover'}
        `}
      >
        <Eye className="w-4 h-4" />
        Insights
      </button>
      <button
        onClick={() => onModeChange('trader')}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all
          ${mode === 'trader'
            ? 'bg-lenz-accent text-white shadow-sm'
            : 'text-lenz-muted hover:text-white hover:bg-lenz-surfaceHover'}
        `}
      >
        <TrendingUp className="w-4 h-4" />
        Trader
      </button>
    </div>
  );
}
