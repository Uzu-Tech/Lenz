import { User, Wallet, Bell } from 'lucide-react';

export function ProfilePage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Profile</h1>
        <p className="text-lenz-muted text-sm mt-0.5">Manage your account</p>
      </div>

      <div className="rounded-xl bg-lenz-surface border border-lenz-border overflow-hidden">
        <div className="p-6 border-b border-lenz-border flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-lenz-accent to-indigo-600 flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Demo User</h3>
            <p className="text-sm text-lenz-muted">demo@lenz.app</p>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-lenz-border">
            <div className="flex items-center gap-3">
              <Wallet className="w-5 h-5 text-lenz-muted" />
              <span className="text-white">Balance</span>
            </div>
            <span className="font-mono font-medium text-lenz-accent">$1,000.00</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-lenz-muted" />
              <span className="text-white">Notifications</span>
            </div>
            <span className="text-sm text-lenz-muted">On</span>
          </div>
        </div>
      </div>
    </div>
  );
}
