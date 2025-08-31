export type Customer = {
  id: string;      // UUID from Supabase
  name: string;
  email: string;
};

export type Debt = {
  id: string;              // ✅ Required by Supabase and your page.tsx
  principal: number;
  interest_rate: number;
  updated_at: string;
  customer_id: string;
  status: string;
};
