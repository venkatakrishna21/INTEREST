export interface Customer {
  id: string;         // UUID from Supabase
  name: string;
  email: string;
}

export interface Debt {
  id: string;         // UUID from Supabase
  principal: number;
  interest_rate: number;
  updated_at: string;
  customer_id: string;
  status: string;
}
