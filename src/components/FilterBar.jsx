import { CATEGORIES, PLATFORMS, TIME_HORIZONS } from '../types';

export function FilterBar({ category, platform, timeHorizon, onFilterChange, className = '' }) {
  return (
    <div className={`flex flex-wrap gap-4 items-center ${className}`}>
      {/* Category Filter */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-lenz-muted uppercase tracking-wider">
          Category
        </label>
        <select
          value={category}
          onChange={(e) => onFilterChange({ category: e.target.value })}
          className="
            px-3 py-2 rounded-lg bg-lenz-surface border border-lenz-border
            text-sm text-white focus:outline-none focus:ring-2 focus:ring-lenz-accent/50
            min-w-[140px]
          "
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Platform Filter */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-lenz-muted uppercase tracking-wider">
          Platform
        </label>
        <select
          value={platform}
          onChange={(e) => onFilterChange({ platform: e.target.value })}
          className="
            px-3 py-2 rounded-lg bg-lenz-surface border border-lenz-border
            text-sm text-white focus:outline-none focus:ring-2 focus:ring-lenz-accent/50
            min-w-[140px]
          "
        >
          {PLATFORMS.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      {/* Time Horizon Filter */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-lenz-muted uppercase tracking-wider">
          Time Horizon
        </label>
        <div className="flex gap-1 p-1 rounded-lg bg-lenz-surface border border-lenz-border">
          {TIME_HORIZONS.map((t) => (
            <button
              key={t}
              onClick={() => onFilterChange({ timeHorizon: t })}
              className={`
                px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${timeHorizon === t
                  ? 'bg-lenz-accent text-white'
                  : 'text-lenz-muted hover:text-white hover:bg-lenz-surfaceHover'}
              `}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
