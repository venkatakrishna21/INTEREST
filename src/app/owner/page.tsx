"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "../../lib/supabaseClient";

export default function OwnerPage() {
  const [userCount, setUserCount] = useState(0);

  
  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabaseBrowser.from("customers").select("*");
      if (!error && data) {
        setUserCount(data.length);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Owner Dashboard</h1>
      <p>Total Customers: {userCount}</p>
    </div>
  );
}
