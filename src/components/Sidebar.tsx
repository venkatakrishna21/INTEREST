import React from 'react';
import Link from 'next/link';
import { Home, Users, FileText, Settings } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r p-4 flex flex-col gap-4 min-h-screen">
      <div className="text-xl font-bold">DebtTracker</div>
      <nav className="flex-1 space-y-1">
        <Link href="/dashboard/owner" className="flex items-center gap-3 p-2 rounded hover:bg-slate-50">
          <Home size={16}/> Dashboard
        </Link>
        <Link href="/dashboard/owner/customers" className="flex items-center gap-3 p-2 rounded hover:bg-slate-50">
          <Users size={16}/> Customers
        </Link>
        <Link href="/dashboard/owner/debts" className="flex items-center gap-3 p-2 rounded hover:bg-slate-50">
          <FileText size={16}/> Debts
        </Link>
      </nav>
      <div className="text-sm text-slate-500">v1.0.0</div>
    </aside>
  );
}
