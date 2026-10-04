import { createClient } from "@supabase/supabase-js";

// Both values are public by design: the database's access rules (supabase/schema.sql)
// are what protect the data, not this key. Never put the secret/service_role key here.
const SUPABASE_URL = "https://swulxuvvhociubtwstkx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_Di8KK5pCUZEZP-GhTbii-w_2K9IsplB";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: { flowType: "pkce", detectSessionInUrl: true, persistSession: true },
});
