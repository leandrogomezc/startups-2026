-- Run once in the Supabase SQL Editor.
-- Creates the events module tables for the Founders Club landing.

-- ────────────────── events ──────────────────

create type public.location_type as enum ('online', 'venue');

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null default '',
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  timezone text not null default 'America/Managua',
  location_type public.location_type not null default 'online',
  venue_address text,
  meet_url text,
  cover_image_url text,
  host_display_name text not null default 'Founders Club',
  host_bio text,
  host_image_url text,
  capacity int,
  waitlist_enabled boolean not null default false,
  is_published boolean not null default false,
  price_cents int not null default 0,
  stripe_price_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint events_ends_after_starts check (ends_at > starts_at),
  constraint events_price_non_negative check (price_cents >= 0)
);

create index if not exists events_starts_at_idx on public.events (starts_at desc);
create index if not exists events_slug_idx on public.events (slug);
create index if not exists events_is_published_idx on public.events (is_published) where is_published = true;

alter table public.events enable row level security;

-- Public read for published events
create policy "published_events_read" on public.events
  for select using (is_published = true);

-- ────────────────── event_registrations ──────────────────

create type public.registration_status as enum ('confirmed', 'waitlist', 'cancelled', 'pending_payment');
create type public.payment_status as enum ('unpaid', 'paid', 'na');

create table if not exists public.event_registrations (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  email text not null,
  name text not null,
  status public.registration_status not null default 'confirmed',
  stripe_checkout_session_id text,
  payment_status public.payment_status not null default 'na',
  waitlist_position int,
  reminder_sent_at timestamptz,
  created_at timestamptz not null default now(),
  constraint one_active_registration_per_email unique (event_id, email)
);

create index if not exists registrations_event_id_idx on public.event_registrations (event_id);
create index if not exists registrations_status_idx on public.event_registrations (event_id, status);
create index if not exists registrations_reminder_idx
  on public.event_registrations (reminder_sent_at)
  where reminder_sent_at is null and status = 'confirmed';

alter table public.event_registrations enable row level security;

-- No public policies — all writes go through service role via API routes.
