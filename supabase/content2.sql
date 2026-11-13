-- Extra editable content. Run once in Supabase > SQL Editor (also appended to schema.sql).
-- Allow the new content kinds.
alter table public.content_items drop constraint if exists content_items_kind_check;
alter table public.content_items add constraint content_items_kind_check
  check (kind in ('location','tour','service','faq','condition','trust','step','stat','vehicle_type'));

-- Editable legal / text pages (Terms, Privacy, Refund).
create table if not exists public.site_pages (
  slug text primary key,
  title text not null,
  updated text,
  intro text,
  body text not null default '',
  updated_at timestamptz not null default now()
);
alter table public.site_pages enable row level security;
drop policy if exists "public reads pages" on public.site_pages;
create policy "public reads pages" on public.site_pages for select using (true);
drop policy if exists "admin writes pages" on public.site_pages;
create policy "admin writes pages" on public.site_pages for all using (public.is_admin()) with check (public.is_admin());
