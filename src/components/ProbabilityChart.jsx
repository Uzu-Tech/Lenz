import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export function ProbabilityChart({ trend, className = '' }) {
  if (!trend) {
    return (
      <div className={`
        flex flex-col items-center justify-center h-80 rounded-xl
        bg-lenz-surface border border-lenz-border
        text-lenz-muted
        ${className}
      `}>
        <p className="text-sm">Select a trend to view probability history</p>
      </div>
    );
  }

  const data = trend.probabilityHistory.map((prob, i) => ({
    day: `D${i + 1}`,
    probability: Math.round(prob * 100),
    raw: prob,
  }));

  return (
    <div className={`rounded-xl bg-lenz-surface border border-lenz-border p-4 ${className}`}>
      <div className="mb-4">
        <h3 className="font-semibold text-white">{trend.name}</h3>
        <p className="text-sm text-lenz-muted mt-0.5">
          Probability history • {trend.category} • {trend.platform}
        </p>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="probabilityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#252532" vertical={false} />
            <XAxis
              dataKey="day"
              stroke="#71717a"
              tick={{ fill: '#71717a', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              stroke="#71717a"
              tick={{ fill: '#71717a', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              domain={[0, 100]}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#12121a',
                border: '1px solid #252532',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#fff' }}
              formatter={(value) => [`${value}%`, 'Probability']}
              labelFormatter={(label) => `Day ${label.replace('D', '')}`}
            />
            <Area
              type="monotone"
              dataKey="probability"
              stroke="#6366f1"
              strokeWidth={2}
              fill="url(#probabilityGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
