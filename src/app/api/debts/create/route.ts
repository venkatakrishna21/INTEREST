import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { customer_id, principal, interest_rate } = body as any;
  if (!customer_id || !principal) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const { error } = await admin.from('debts').insert([{
    customer_id, owner_id: null, principal, interest_rate, status: 'active'
  }]);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
