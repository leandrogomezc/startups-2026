import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client with the service role key (bypasses RLS).
 * Returns null if env vars are missing (API falls back to email-only).
 */
export function createServiceRoleClient(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) return null;

  return createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
