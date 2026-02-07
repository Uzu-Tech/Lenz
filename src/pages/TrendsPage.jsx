import { useState, useMemo } from 'react';
import { TrendCard, FilterBar, ModeSwitcher, BetModal } from '../components';
import { MOCK_TRENDS } from '../data/mockTrends';

export function TrendsPage() {
  const [mode, setMode] = useState('insights');
  const [betModalTrend, setBetModalTrend] = useState(null);
  const [filters, setFilters] = useState({
    category: 'All',
    platform: 'All',
    timeHorizon: '7d',
  });

  const filteredTrends = useMemo(() => {
    return MOCK_TRENDS.filter((t) => {
      if (filters.category !== 'All' && t.category !== filters.category) return false;
      if (filters.platform !== 'All' && t.platform !== filters.platform) return false;
      return true;
    });
  }, [filters]);

  const handleFilterChange = (updates) => {
    setFilters((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Trends</h1>
          <p className="text-lenz-muted text-sm mt-0.5">Browse all prediction market trends</p>
        </div>
        <ModeSwitcher mode={mode} onModeChange={setMode} />
      </div>

      <div className="rounded-xl bg-lenz-surface border border-lenz-border p-4">
        <FilterBar
          category={filters.category}
          platform={filters.platform}
          timeHorizon={filters.timeHorizon}
          onFilterChange={handleFilterChange}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredTrends.map((trend) => (
          <TrendCard
            key={trend.id}
            trend={trend}
            mode={mode}
            onBet={mode === 'trader' ? () => setBetModalTrend(trend) : undefined}
          />
        ))}
      </div>

      {betModalTrend && (
        <BetModal
          trend={betModalTrend}
          onClose={() => setBetModalTrend(null)}
          onPlaceBet={() => setBetModalTrend(null)}
        />
      )}
    </div>
  );
}
