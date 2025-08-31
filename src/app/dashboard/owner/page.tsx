'use client';
import React, { useEffect, useState } from 'react';
import SummaryCard from '@/components/SummaryCard';
import DebtChart from '@/components/DebtChart';
import { supabaseBrowser } from '@/lib/supabaseClient';
import { format } from 'date-fns';

type Debt = { id: string; principal: number; interest_rate: number; status: string; updated_at: string; customer_id: string; };

export default function OwnerDashboard() {
  const [customersCount, setCustomersCount] = useState(0);
  const [totalDebt, setTotalDebt] = useState(0);
  const [avgRate, setAvgRate] = useState(0);
  const [debts, setDebts] = useState<Debt[]>([]);
  const [chartData, setChartData] = useState<{date:string;value:number}[]>([]);

  useEffect(() => {
    (async () => {
      const { data: c } = await supabaseBrowser.from('customer_profiles').select('id');
      setCustomersCount(c?.length || 0);
      const { data: d } = await supabaseBrowser.from('debts').select('principal,interest_rate,updated_at,customer_id,status');
      setDebts(d || []);
      let total = 0; let rateSum = 0;
      (d||[]).forEach((x:any) => { total += Number(x.principal); rateSum += Number(x.interest_rate || 0); });
      setTotalDebt(total);
      setAvgRate(d && d.length ? (rateSum / d.length) : 0);
      // build simple chart from last 6 months (aggregate by month using updated_at)
      const months: Record<string, number> = {};
      const now = new Date();
      for (let i=5;i>=0;i--) {
        const dt = new Date(now.getFullYear(), now.getMonth()-i, 1);
        const key = format(dt, 'MMM yy');
        months[key] = 0;
      }
      (d||[]).forEach((row:any) => {
        const key = format(new Date(row.updated_at || row.created_at || new Date()), 'MMM yy');
        if (months[key] === undefined) months[key] = 0;
        months[key] += Number(row.principal || 0);
      });
      const cd = Object.keys(months).map(k=>({ date: k, value: Math.round(months[k]) }));
      setChartData(cd);
    })();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <SummaryCard title="Customers" value={String(customersCount)} />
        <SummaryCard title="Total Outstanding" value={`₹${totalDebt.toFixed(2)}`} subtitle="Sum of active principals" />
        <SummaryCard title="Avg Monthly Rate" value={`${avgRate.toFixed(2)}%`} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <DebtChart data={chartData} />
        </div>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl shadow-sm border">
            <h3 className="text-sm text-slate-500">Recent Debts</h3>
            <ul className="mt-3 space-y-2">
              {debts.slice(0,5).map(d => (
                <li key={d.id} className="flex justify-between">
                  <div className="text-sm">{d.customer_id?.slice(0,8)} • {d.status}</div>
                  <div className="font-semibold">₹{Number(d.principal).toFixed(2)}</div>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border">
            <h3 className="text-sm text-slate-500">Quick Actions</h3>
            <div className="mt-3 flex flex-col gap-2">
              <a className="px-3 py-2 rounded bg-slate-100 text-sm" href="/dashboard/owner/customers">Manage Customers</a>
              <a className="px-3 py-2 rounded bg-slate-100 text-sm" href="/dashboard/owner/debts">Manage Debts</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
