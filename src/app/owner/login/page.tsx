"use client";

import { useState } from "react";
import { supabaseBrowser } from "../../../lib/supabaseClient";

export default function CustomerLoginPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabaseBrowser.auth.signInWithOtp({ email });
    if (error) {
      setMessage("Login failed: " + error.message);
    } else {
      setMessage("Check your email for login link!");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Customer Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border px-3 py-2 rounded w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
