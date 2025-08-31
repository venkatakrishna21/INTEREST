"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabaseClient";
import { Debt, Customer } from "@/types/database";
import DebtChart from "@/components/DebtChart";

export default function OwnerDashboard() {
  const [debts, setDebts] = useState<Debt[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [totalDebt, setTotalDebt] = useState(0);
  const [avgInterest, setAvgInterest] = useState(0);
  const [customersCount, setCustomersCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch customers
      const { data: c } = await supabaseBrowser
        .from("customers")
        .select("id, name, email");
      setCustomers(c as Customer[] || []);
      setCustomersCount(c?.length || 0);

      // Fetch debts (⚡ includes id now)
      const { data: d } = await supabaseBrowser
        .from("debts")
        .select("id, principal, interest_rate, updated_at, customer_id, status");

      setDebts(d as Debt[] || []);

      // Calculate totals
      let total = 0;
      let rateSum = 0;
      (d || []).forEach((x: any) => {
        total += Number(x.principal);
        rateSum += Number(x.interest_rate || 0);
      });

      setTotalDebt(total);
      setAvgInterest(d && d.length > 0 ? rateSum / d.length : 0);
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">📊 Owner Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-white rounded-2xl shadow">
          <h2 className="text-lg font-semibold">Total Customers</h2>
          <p className="text-2xl">{customersCount}</p>
        </div>
        <div className="p-4 bg-white rounded-2xl shadow">
          <h2 className="text-lg font-semibold">Total Debt</h2>
          <p className="text-2xl">₹{totalDebt.toLocaleString()}</p>
        </div>
        <div className="p-4 bg-white rounded-2xl shadow">
          <h2 className="text-lg font-semibold">Avg. Interest Rate</h2>
          <p className="text-2xl">{avgInterest.toFixed(2)}%</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="p-4 bg-white rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-4">Debt Overview</h2>
        <DebtChart debts={debts} />
      </div>
    </div>
  );
}
