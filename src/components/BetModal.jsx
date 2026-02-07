import { useState } from 'react';
import { X } from 'lucide-react';

export function BetModal({ trend, onClose, onPlaceBet }) {
  const [amount, setAmount] = useState('');
  const [direction, setDirection] = useState('yes'); // yes = bullish, no = bearish

  if (!trend) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onPlaceBet?.({ trend, amount: parseFloat(amount), direction });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl bg-lenz-surface border border-lenz-border shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-lenz-border">
          <h3 className="font-semibold text-white">Place Bet</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-lenz-muted hover:text-white hover:bg-lenz-surfaceHover transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <p className="text-sm text-lenz-muted mb-1">Trend</p>
            <p className="font-medium text-white">{trend.name}</p>
            <p className="text-xs text-lenz-muted">Current: {(trend.probability * 100).toFixed(0)}% probability</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-lenz-muted mb-2">Direction</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setDirection('yes')}
                className={`
                  flex-1 py-2 rounded-lg text-sm font-medium transition-colors
                  ${direction === 'yes'
                    ? 'bg-lenz-success/20 text-lenz-success border border-lenz-success'
                    : 'bg-lenz-surface border border-lenz-border text-lenz-muted hover:text-white'}
                `}
              >
                Yes ↑
              </button>
              <button
                type="button"
                onClick={() => setDirection('no')}
                className={`
                  flex-1 py-2 rounded-lg text-sm font-medium transition-colors
                  ${direction === 'no'
                    ? 'bg-lenz-danger/20 text-lenz-danger border border-lenz-danger'
                    : 'bg-lenz-surface border border-lenz-border text-lenz-muted hover:text-white'}
                `}
              >
                No ↓
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-lenz-muted mb-2">Amount ($)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              min="0"
              step="0.01"
              required
              className="
                w-full px-4 py-3 rounded-lg bg-lenz-bg border border-lenz-border
                text-white placeholder-lenz-muted
                focus:outline-none focus:ring-2 focus:ring-lenz-accent/50
              "
            />
          </div>
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg border border-lenz-border text-lenz-muted hover:text-white hover:bg-lenz-surfaceHover transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-lg bg-lenz-accent text-white font-medium hover:bg-lenz-accentHover transition-colors"
            >
              Place Bet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
