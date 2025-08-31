"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "../../supabase/auth-helpers-nextjs";
import { Debt, Customer } from "../../types/database";

export default function OwnerDashboard() {
  const supabaseBrowser = createClientComponentClient();

  const [debts, setDebts] = useState<Debt[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customersCount, setCustomersCount] = useState(0);
  const [totalDebt, setTotalDebt] = useState(0);
  const [avgInterest, setAvgInterest] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch customers
      const { data: c } = await supabaseBrowser
        .from("customers")
        .select("id, name, email");
      setCustomers(c || []);
      setCustomersCount(c?.length || 0);

      // ✅ Fetch debts with "id"
      const { data: d } = await supabaseBrowser
        .from("debts")
        .select(
          "id, principal, interest_rate, updated_at, customer_id, status"
        );
      setDebts(d || []);

      // Calculate totals
      let total = 0;
      let rateSum = 0;
      (d || []).forEach((x: any) => {
        total += Number(x.principal);
        rateSum += Number(x.interest_rate || 0);
      });
      setTotalDebt(total);
      setAvgInterest((rateSum / (d?.length || 1)).toFixed(2) as any);
    };

    fetchData();
  }, [supabaseBrowser]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📊 Owner Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-xl shadow bg-white">
          <h2 className="text-gray-600">Total Customers</h2>
          <p className="text-xl font-bold">{customersCount}</p>
        </div>
        <div className="p-4 rounded-xl shadow bg-white">
          <h2 className="text-gray-600">Total Debt</h2>
          <p className="text-xl font-bold">₹{totalDebt}</p>
        </div>
        <div className="p-4 rounded-xl shadow bg-white">
          <h2 className="text-gray-600">Avg. Interest Rate</h2>
          <p className="text-xl font-bold">{avgInterest}%</p>
        </div>
      </div>

      {/* Customers List */}
      <h2 className="text-xl font-semibold mb-2">👥 Customers</h2>
      <ul className="space-y-2 mb-6">
        {customers.map((cust) => (
          <li
            key={cust.id}
            className="p-3 bg-white rounded-xl shadow flex justify-between"
          >
            <span>{cust.name}</span>
            <span className="text-gray-500">{cust.email}</span>
          </li>
        ))}
      </ul>

      {/* Debts List */}
      <h2 className="text-xl font-semibold mb-2">💰 Debts</h2>
      <ul className="space-y-2">
        {debts.map((debt) => (
          <li
            key={debt.id}
            className="p-3 bg-white rounded-xl shadow flex justify-between"
          >
            <span>
              Customer ID: {debt.customer_id} | ₹{debt.principal}
            </span>
            <span className="text-gray-500">
              {debt.interest_rate}% | {debt.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
