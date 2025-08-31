'use client';
import React, { useState } from 'react';
import { supabaseBrowser } from '@/lib/supabaseClient';

export default function CustomerLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const onLogin = async () => {
    setMsg('');
    try {
      const { data, error } = await supabaseBrowser.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMsg(error.message);
        return;
      }

      // Redirect after successful login
      window.location.href = '/dashboard/customer';
    } catch (err: any) {
      setMsg(err.message || 'Something went wrong');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-3">Customer Login</h2>
        <input
          className="w-full border rounded p-2 mb-2"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="w-full border rounded p-2 mb-2"
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-emerald-600 text-white p-2 rounded"
          onClick={onLogin}
        >
          Sign in
        </button>
        {msg && <div className="text-sm text-red-600 mt-2">{msg}</div>}
      </div>
    </div>
  );
}
