-- Editable website content. Run once in Supabase > SQL Editor (also appended to schema.sql).
create table if not exists public.site_settings (
  key text primary key,
  value text not null default '',
  updated_at timestamptz not null default now()
);
alter table public.site_settings enable row level security;
drop policy if exists "public reads settings" on public.site_settings;
create policy "public reads settings" on public.site_settings for select using (true);
drop policy if exists "admin writes settings" on public.site_settings;
create policy "admin writes settings" on public.site_settings for all using (public.is_admin()) with check (public.is_admin());

create table if not exists public.content_items (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('location','tour','service','faq','condition')),
  sort int not null default 0,
  active boolean not null default true,
  title text not null,
  subtitle text,
  extra text,
  extra2 text,
  extra3 text,
  created_at timestamptz not null default now()
);
alter table public.content_items enable row level security;
drop policy if exists "public reads active content" on public.content_items;
create policy "public reads active content" on public.content_items for select using (active or public.is_admin());
drop policy if exists "admin writes content" on public.content_items;
create policy "admin writes content" on public.content_items for all using (public.is_admin()) with check (public.is_admin());
