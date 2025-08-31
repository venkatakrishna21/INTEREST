import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl p-8 shadow">
        <h1 className="text-2xl font-semibold mb-2">Debt Tracker — Finance UI</h1>
        <p className="text-slate-600 mb-4">Choose your portal</p>
        <div className="flex gap-3">
          <Link className="px-4 py-2 rounded-lg bg-slate-800 text-white" href="/owner/login">Owner</Link>
          <Link className="px-4 py-2 rounded-lg border" href="/customer/login">Customer</Link>
        </div>
      </div>
    </div>
  );
}
