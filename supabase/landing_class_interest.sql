-- Run once in the Supabase SQL Editor (same project as Peluditos / event-community).
-- Leads from the landing form; not related to auth.users or public.events.

create table if not exists public.landing_class_interest (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text not null,
  locale text not null check (locale in ('es', 'en')),
  created_at timestamptz not null default now()
);

create index if not exists landing_class_interest_created_at_idx
  on public.landing_class_interest (created_at desc);

create index if not exists landing_class_interest_email_idx
  on public.landing_class_interest (email);

alter table public.landing_class_interest enable row level security;

-- Intentionally no policies for anon/authenticated: only the server (service role) inserts
-- via the Next.js API route. Service role bypasses RLS.
