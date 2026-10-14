-- Run once in the Supabase SQL editor (or as a migration).
create table if not exists public.launch_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  name text,
  consent_given boolean not null default true,
  consent_text_version text not null,
  consented_at timestamptz not null default now(),
  source text not null default 'website',
  created_at timestamptz not null default now(),
  constraint launch_subscribers_email_key unique (email),
  constraint launch_subscribers_email_lower check (email = lower(email))
);

-- Only the server (service role) may touch this table. No public policies are created on purpose.
alter table public.launch_subscribers enable row level security;
revoke all on public.launch_subscribers from anon, authenticated;
