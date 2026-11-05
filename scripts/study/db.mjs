// Shared Supabase client for the study scripts. Reads the same two
// environment variables as the app; never commit them.
import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SECRET_KEY;
if (!url || !key) {
  console.error("Set SUPABASE_URL and SUPABASE_SECRET_KEY first.");
  process.exit(1);
}

export const db = createClient(url, key, { auth: { persistSession: false } });
