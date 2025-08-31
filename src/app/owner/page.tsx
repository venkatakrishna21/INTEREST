"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabaseClient";
import { Debt, Customer } from "@/types/database";

export default function OwnerDashboard() {
  const [debts, setDebts] = useState<Debt[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customersCount, setCustomersCount] = useState(0);
  const [totalDebt, setTotalDebt] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      // Load customers
      const { data: c } = await supabaseBrowser.from("customers").select("*");
      setCustomers((c as Customer[]) || []);
      setCustomersCount(c?.length || 0);

      // Load debts
      const { data: d } = await supabaseBrowser
        .from("debts")
        .select("id, principal, interest_rate, updated_at, customer_id, status");

      setDebts((d as Debt[]) || []);

      // Calculate totals
      let total = 0;
      (d || []).forEach((x: any) => {
        total += Number(x.principal);
      });
      setTotalDebt(total);
    };

    loadData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📊 Owner Dashboard</h1>
      <div className="grid grid-cols-2 gap-6">
        <div className="rounded-lg shadow p-4 bg-white">
          <h2 className="font-semibold text-lg">Customers</h2>
          <p className="text-2xl">{customersCount}</p>
        </div>
        <div className="rounded-lg shadow p-4 bg-white">
          <h2 className="font-semibold text-lg">Total Debt</h2>
          <p className="text-2xl">₹{totalDebt.toLocaleString()}</p>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="font-semibold text-lg mb-2">Debts</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Customer ID</th>
              <th className="p-2 border">Principal</th>
              <th className="p-2 border">Interest Rate</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {debts.map((debt) => (
              <tr key={debt.id}>
                <td className="p-2 border">{debt.customer_id}</td>
                <td className="p-2 border">₹{debt.principal}</td>
                <td className="p-2 border">{debt.interest_rate}%</td>
                <td className="p-2 border">{debt.status}</td>
                <td className="p-2 border">
                  {new Date(debt.updated_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {debts.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No debts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
