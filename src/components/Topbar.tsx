import React from 'react';
import { Bell, User } from 'lucide-react';

export default function Topbar() {
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white border-b">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold">Dashboard</h2>
        <div className="text-sm text-slate-500">Owner view</div>
      </div>
      <div className="flex items-center gap-4">
        <button title="Notifications" className="p-2 rounded hover:bg-slate-50"><Bell size={18} /></button>
        <div className="flex items-center gap-2 p-2 rounded hover:bg-slate-50">
          <User size={18} />
          <div className="text-sm">Owner</div>
        </div>
      </div>
    </header>
  );
}
