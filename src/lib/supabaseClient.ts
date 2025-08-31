
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "../types/database"; // relative path

export const supabaseBrowser = createClientComponentClient<Database>();
