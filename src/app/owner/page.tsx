"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "../../../lib/supabaseClient"; // relative path
import type { Debt, Customer } from "../../../types/database"; // relative path

export default function OwnerDashboard() {
  const [debts, setDebts] = useState<Debt[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customersCount, setCustomersCount] = useState(0);
  const [totalDebt, setTotalDebt] = useState(0);
  const [averageRate, setAverageRate] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      // fetch customers
      const { data: c } = await supabaseBrowser.from("customers").select("*");
      setCustomers(c || []);
      setCustomersCount(c?.length || 0);

      // fetch debts
      const { data: d } = await supabaseBrowser
        .from("debts")
        .select("id, principal, interest_rate, updated_at, customer_id, status"); // include id

      setDebts(d || []);

      // calculate totals
      let total = 0;
      let rateSum = 0;
      (d || []).forEach((x: any) => {
        total += Number(x.principal);
        rateSum += Number(x.interest_rate || 0);
      });

      setTotalDebt(total);
      setAverageRate(d && d.length > 0 ? rateSum / d.length : 0);
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">📊 Owner Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl shadow bg-white">
          <h2 className="text-lg font-semibold">Customers</h2>
          <p className="text-xl">{customersCount}</p>
        </div>

        <div className="p-4 rounded-2xl shadow bg-white">
          <h2 className="text-lg font-semibold">Total Debt</h2>
          <p className="text-xl">₹{totalDebt.toLocaleString()}</p>
        </div>

        <div className="p-4 rounded-2xl shadow bg-white">
          <h2 className="text-lg font-semibold">Avg. Rate</h2>
          <p className="text-xl">{averageRate.toFixed(2)}%</p>
        </div>

        <div className="p-4 rounded-2xl shadow bg-white">
          <h2 className="text-lg font-semibold">Active Debts</h2>
          <p className="text-xl">
            {debts.filter((d) => d.status === "active").length}
          </p>
        </div>
      </div>
    </div>
  );
}
