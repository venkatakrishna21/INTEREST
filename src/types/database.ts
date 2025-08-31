
export type Owner = {
  id: string;
  email: string;
  password_hash: string;
  created_at: string;
};

export type Customer = {
  id: string;
  owner_id: string;
  name: string;
  email: string;
  password_hash: string;
  created_at: string;
};

export type Debt = {
  id: string;
  customer_id: string;
  principal: number;
  interest_rate: number;
  status: "active" | "paid";
  updated_at: string;
};
