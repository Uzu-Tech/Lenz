import { useState } from 'react';
import { TrendingUp, BarChart3, Activity } from 'lucide-react';
import { MOCK_TRENDS } from '../data/mockTrends';
import { ProbabilityChart } from '../components';

export function MarketPage() {
  const [selectedTrend, setSelectedTrend] = useState(MOCK_TRENDS[0]);

  const totalVolume = MOCK_TRENDS.reduce((acc, t) => acc + t.volume, 0);
  const avgProbability = MOCK_TRENDS.reduce((acc, t) => acc + t.probability, 0) / MOCK_TRENDS.length;
  const trendingUp = MOCK_TRENDS.filter((t) => t.momentum > 0).length;

  const stats = [
    {
      label: 'Total Volume',
      value: `${(totalVolume / 1_000_000).toFixed(1)}M`,
      icon: BarChart3,
      color: 'text-lenz-accent',
    },
    {
      label: 'Avg Probability',
      value: `${(avgProbability * 100).toFixed(1)}%`,
      icon: Activity,
      color: 'text-lenz-success',
    },
    {
      label: 'Trending Up',
      value: `${trendingUp}/${MOCK_TRENDS.length}`,
      icon: TrendingUp,
      color: 'text-indigo-400',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Market Details</h1>
        <p className="text-lenz-muted text-sm mt-0.5">Overview of the prediction market</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="p-4 rounded-xl bg-lenz-surface border border-lenz-border flex items-center gap-4"
          >
            <div className={`p-2 rounded-lg bg-lenz-surfaceHover ${color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-lenz-muted">{label}</p>
              <p className="text-xl font-semibold text-white">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Trend Selector + Chart */}
      <div className="rounded-xl bg-lenz-surface border border-lenz-border p-4">
        <h3 className="font-semibold text-white mb-4">Probability History</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {MOCK_TRENDS.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTrend(t)}
              className={`
                px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
                ${selectedTrend?.id === t.id
                  ? 'bg-lenz-accent text-white'
                  : 'bg-lenz-surfaceHover text-lenz-muted hover:text-white'}
              `}
            >
              {t.name}
            </button>
          ))}
        </div>
        <ProbabilityChart trend={selectedTrend} />
      </div>
    </div>
  );
}
