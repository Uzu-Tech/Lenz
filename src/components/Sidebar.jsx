import { 
  LayoutDashboard, 
  TrendingUp, 
  BarChart3, 
  User 
} from 'lucide-react';

const navItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'trends', icon: TrendingUp, label: 'Trends' },
  { id: 'market', icon: BarChart3, label: 'Market Details' },
  { id: 'profile', icon: User, label: 'Profile' },
];

export function Sidebar({ activeView, onNavigate, isOpen = false, onClose = () => {}, className = '' }) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`
          fixed left-0 top-0 z-40 h-screen w-64 
          bg-lenz-surface border-r border-lenz-border
          flex flex-col transform transition-transform duration-200
          lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${className}
        `}
      >
      {/* Logo */}
      <div className="p-6 border-b border-lenz-border">
        <button onClick={() => onNavigate('dashboard')} className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-lenz-accent to-indigo-600 flex items-center justify-center shadow-glow">
            <span className="text-white font-bold text-lg">L</span>
          </div>
          <span className="text-xl font-semibold text-white tracking-tight">Lenz</span>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`
              w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left
              ${activeView === id
                ? 'bg-lenz-accent/20 text-lenz-accent' 
                : 'text-lenz-muted hover:bg-lenz-surfaceHover hover:text-white'}
            `}
          >
            <Icon className="w-5 h-5 shrink-0" strokeWidth={2} />
            {label}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-lenz-border">
        <p className="text-xs text-lenz-muted">
          Prediction market for social trends
        </p>
      </div>
    </aside>
    </>
  );
}
