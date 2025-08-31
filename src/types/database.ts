export type Debt = {
  id: string;
  principal: number;
  interest_rate: number;
  updated_at: string;
  customer_id: string;
  status: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  owner_id: string;
  created_at: string;
};

// This is a minimal Database type for supabaseClient
export type Database = {
  public: {
    Tables: {
      debts: {
        Row: Debt;
        Insert: Omit<Debt, "id" | "updated_at">; // Supabase fills id & updated_at
        Update: Partial<Omit<Debt, "id">>;
      };
      customers: {
        Row: Customer;
        Insert: Omit<Customer, "id" | "created_at">;
        Update: Partial<Omit<Customer, "id">>;
      };
    };
  };
};
