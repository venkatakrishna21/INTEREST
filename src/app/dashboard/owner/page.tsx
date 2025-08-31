"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "../../../lib/supabaseClient";

type Debt = {
  id: string;
  principal: number;
  interest_rate: number;
  updated_at: string;
  customer_id: string;
  status: string;
};

export default function DashboardOwnerPage() {
  const [debts, setDebts] = useState<Debt[]>([]);
  const [totalDebt, setTotalDebt] = useState(0);
  const [avgRate, setAvgRate] = useState(0);

  useEffect(() => {
    const fetchDebts = async () => {
      const { data: d, error } = await supabaseBrowser
        .from("debts")
        .select("id, principal, interest_rate, updated_at, customer_id, status");

      if (!error && d) {
        setDebts(d);
        let total = 0;
        let rateSum = 0;
        d.forEach((x) => {
          total += Number(x.principal);
          rateSum += Number(x.interest_rate || 0);
        });
        setTotalDebt(total);
        setAvgRate(d.length ? rateSum / d.length : 0);
      }
    };
    fetchDebts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Owner Debt Dashboard</h1>
      <p>Total Debts: {debts.length}</p>
      <p>Total Debt Amount: {totalDebt}</p>
      <p>Average Interest Rate: {avgRate.toFixed(2)}%</p>
    </div>
  );
}
