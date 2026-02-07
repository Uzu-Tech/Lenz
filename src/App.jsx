import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Sidebar } from './components';
import { DashboardPage, TrendsPage, MarketPage, ProfilePage } from './pages';

const PAGES = {
  dashboard: DashboardPage,
  trends: TrendsPage,
  market: MarketPage,
  profile: ProfilePage,
};

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const Page = PAGES[activeView] || DashboardPage;

  const handleNavigate = (view) => {
    setActiveView(view);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-lenz-bg text-white">
      <Sidebar
        activeView={activeView}
        onNavigate={handleNavigate}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 right-0 left-0 z-20 h-14 px-4 flex items-center justify-between bg-lenz-bg/95 backdrop-blur border-b border-lenz-border">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 -ml-2 rounded-lg text-lenz-muted hover:text-white hover:bg-lenz-surfaceHover"
        >
          <Menu className="w-6 h-6" />
        </button>
        <span className="font-semibold">Lenz</span>
        <div className="w-10" />
      </header>

      {/* Main content - offset for sidebar on desktop, for header on mobile */}
      <main className="lg:pl-64 pt-14 lg:pt-0 min-h-screen">
        <div className="p-6 lg:p-8">
          <Page />
        </div>
      </main>
    </div>
  );
}
