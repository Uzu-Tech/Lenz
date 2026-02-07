import { useState, useMemo } from 'react';
import { TrendCard, FilterBar, ProbabilityChart, ModeSwitcher, BetModal } from '../components';
import { MOCK_TRENDS } from '../data/mockTrends';
import { CATEGORIES, PLATFORMS } from '../types';

export function DashboardPage() {
  const [selectedTrend, setSelectedTrend] = useState(MOCK_TRENDS[0]);
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

  const handlePlaceBet = ({ trend, amount, direction }) => {
    console.log('Bet placed:', { trend: trend.name, amount, direction });
    setBetModalTrend(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-lenz-muted text-sm mt-0.5">
            Track and analyze social media trends across platforms
          </p>
        </div>
        <ModeSwitcher mode={mode} onModeChange={setMode} />
      </div>

      {/* Filters */}
      <div className="rounded-xl bg-lenz-surface border border-lenz-border p-4">
        <FilterBar
          category={filters.category}
          platform={filters.platform}
          timeHorizon={filters.timeHorizon}
          onFilterChange={handleFilterChange}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Cards */}
        <div className="lg:col-span-1 space-y-3 max-h-[calc(100vh-340px)] overflow-y-auto pr-2">
          {filteredTrends.map((trend) => (
            <TrendCard
              key={trend.id}
              trend={trend}
              isSelected={selectedTrend?.id === trend.id}
              onClick={() => setSelectedTrend(trend)}
              mode={mode}
              onBet={mode === 'trader' ? () => setBetModalTrend(trend) : undefined}
            />
          ))}
        </div>

        {/* Chart Panel */}
        <div className="lg:col-span-2">
          <ProbabilityChart trend={selectedTrend} />
          {selectedTrend && (
            <div className="mt-4 p-4 rounded-xl bg-lenz-surface border border-lenz-border">
              <h4 className="text-sm font-medium text-lenz-muted mb-2">About this trend</h4>
              <p className="text-sm text-white/90">{selectedTrend.description}</p>
            </div>
          )}
        </div>
      </div>

      {betModalTrend && (
        <BetModal
          trend={betModalTrend}
          onClose={() => setBetModalTrend(null)}
          onPlaceBet={handlePlaceBet}
        />
      )}
    </div>
  );
}
