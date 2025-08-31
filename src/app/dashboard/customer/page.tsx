'use client';
import React, { useEffect, useState } from 'react';
import { supabaseBrowser } from '@/lib/supabaseClient';

export default function CustomerDashboard() {
  const [debts, setDebts] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(()=> {
    (async ()=> {
      const { data } = await supabaseBrowser.from('debts').select('id,principal,interest_rate,status,updated_at').order('updated_at',{ascending:false});
      setDebts(data || []);
      let t=0; (data||[]).forEach((d:any)=> t+= Number(d.principal || 0));
      setTotal(t);
    })();
  }, []);

  return (
    <div className="max-w-4xl">
      <div className="bg-white p-4 rounded-2xl shadow mb-4">
        <div className="text-sm text-slate-500">Total Outstanding</div>
        <div className="text-2xl font-semibold">₹{total.toFixed(2)}</div>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow">
        <h3 className="text-sm text-slate-500">Your Debts</h3>
        <ul className="mt-3 space-y-2">
          {debts.map(d => (
            <li key={d.id} className="flex justify-between border rounded p-2">
              <div>
                <div className="text-sm">Debt • {d.status}</div>
                <div className="text-xs text-slate-400">{new Date(d.updated_at).toLocaleString()}</div>
              </div>
              <div className="font-semibold">₹{Number(d.principal).toFixed(2)}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
