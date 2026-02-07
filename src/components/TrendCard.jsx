import { ChevronUp, ChevronDown, TrendingUp } from 'lucide-react';

function formatVolume(num) {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

export function TrendCard({ trend, isSelected, onClick, mode, onBet }) {
  const probabilityPercent = Math.round(trend.probability * 100);
  const momentumUp = trend.momentum >= 0;

  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left p-4 rounded-xl border-2 transition-all duration-200
        ${isSelected
          ? 'bg-lenz-accent/10 border-lenz-accent shadow-glow'
          : 'bg-lenz-surface border-lenz-border hover:border-lenz-border/80 hover:bg-lenz-surfaceHover'}
      `}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-white truncate">{trend.name}</h3>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-lenz-muted">{trend.category}</span>
            <span className="text-lenz-border">•</span>
            <span className="text-xs text-lenz-muted">{trend.platform}</span>
          </div>
        </div>
        <div className={`
          flex items-center gap-1 shrink-0 text-sm font-medium
          ${momentumUp ? 'text-lenz-success' : 'text-lenz-danger'}
        `}>
          {momentumUp ? (
            <ChevronUp className="w-4 h-4" strokeWidth={2.5} />
          ) : (
            <ChevronDown className="w-4 h-4" strokeWidth={2.5} />
          )}
          {Math.abs(trend.momentum * 100).toFixed(1)}%
        </div>
      </div>

      {/* Probability Bar */}
      <div className="space-y-1.5 mb-3">
        <div className="flex justify-between text-xs">
          <span className="text-lenz-muted">Probability</span>
          <span className="font-mono font-medium text-white">{probabilityPercent}%</span>
        </div>
        <div className="h-2 rounded-full bg-lenz-border overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-lenz-accent to-indigo-500 transition-all duration-500"
            style={{ width: `${probabilityPercent}%` }}
          />
        </div>
      </div>

      {/* Volume */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-lenz-muted">
          <TrendingUp className="w-3.5 h-3.5" />
          Vol: {formatVolume(trend.volume)}
        </div>
        {mode === 'trader' && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBet?.(trend);
            }}
            className="
              px-2.5 py-1 rounded-md text-xs font-medium
              bg-lenz-accent/20 text-lenz-accent hover:bg-lenz-accent hover:text-white
              transition-colors
            "
          >
            Bet
          </button>
        )}
      </div>
    </button>
  );
}
