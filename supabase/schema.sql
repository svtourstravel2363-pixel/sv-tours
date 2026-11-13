-- Run this whole file once in Supabase Dashboard > SQL Editor.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  phone text,
  role text not null default 'user' check (role in ('user','admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  name text not null,
  phone text not null,
  service text not null,
  vehicle text,
  pickup text not null,
  drop_location text,
  pickup_date date,
  pickup_time text,
  drop_date date,
  passengers int,
  notes text,
  status text not null default 'pending' check (status in ('pending','confirmed','completed','cancelled')),
  created_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  name text not null,
  rating int not null check (rating between 1 and 5),
  comment text not null,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin() returns boolean
language sql security definer set search_path = public stable as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

-- The business owner's email becomes admin automatically, but only once the email is
-- confirmed (or immediately if Supabase auto-confirms emails, e.g. local testing).
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name, phone, role)
  values (
    new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'phone',
    case when lower(new.email) = 'svtourstravel2363@gmail.com' and new.email_confirmed_at is not null then 'admin' else 'user' end
  );
  return new;
end $$;

create or replace function public.promote_owner_on_confirm() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if lower(new.email) = 'svtourstravel2363@gmail.com' and new.email_confirmed_at is not null then
    update public.profiles set role = 'admin' where id = new.id;
  end if;
  return new;
end $$;

drop trigger if exists on_auth_user_confirmed on auth.users;
create trigger on_auth_user_confirmed after update of email_confirmed_at on auth.users
  for each row execute function public.promote_owner_on_confirm();

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.bookings enable row level security;
alter table public.reviews enable row level security;

-- profiles
create policy "own profile read" on public.profiles for select using (id = auth.uid() or public.is_admin());
create policy "own profile update" on public.profiles for update using (id = auth.uid())
  with check (id = auth.uid() and role = (select role from public.profiles where id = auth.uid()));

-- bookings
create policy "anyone can create booking" on public.bookings for insert
  with check (user_id is null or user_id = auth.uid());
create policy "read own or admin" on public.bookings for select using (user_id = auth.uid() or public.is_admin());
create policy "admin update bookings" on public.bookings for update using (public.is_admin());
create policy "admin delete bookings" on public.bookings for delete using (public.is_admin());

-- reviews
create policy "public reads approved" on public.reviews for select using (approved or user_id = auth.uid() or public.is_admin());
create policy "logged in users add review" on public.reviews for insert
  with check (auth.uid() = user_id and approved = false);
create policy "admin update reviews" on public.reviews for update using (public.is_admin());
create policy "admin delete reviews" on public.reviews for delete using (public.is_admin());

-- If the owner account already existed before running this file, promote it now:
update public.profiles set role = 'admin' where lower(email) = 'svtourstravel2363@gmail.com';

-- ===== Vehicles (admin-managed fleet) =====
create table if not exists public.vehicles (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null default 'sedan' check (category in ('sedan','suv','premium','van')),
  seats text,
  reg_number text,
  note text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
alter table public.vehicles enable row level security;
create policy "public reads active vehicles" on public.vehicles for select using (active or public.is_admin());
create policy "admin adds vehicles" on public.vehicles for insert with check (public.is_admin());
create policy "admin updates vehicles" on public.vehicles for update using (public.is_admin());
create policy "admin deletes vehicles" on public.vehicles for delete using (public.is_admin());

-- Optional photo for each vehicle (paste an image URL, or a /vehicles/xyz.jpg path)
alter table public.vehicles add column if not exists image_url text;

-- ===== Editable rates =====
create table if not exists public.rates (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('local','outstation')),
  category text not null,
  cars text,
  price numeric check (price is null or price >= 0),
  extra_km numeric check (extra_km is null or extra_km >= 0),
  extra_hour numeric check (extra_hour is null or extra_hour >= 0),
  contact_only boolean not null default false,
  sort int not null default 0,
  updated_at timestamptz not null default now(),
  unique (kind, category)
);
alter table public.rates enable row level security;
drop policy if exists "public reads rates" on public.rates;
create policy "public reads rates" on public.rates for select using (true);
drop policy if exists "admin inserts rates" on public.rates;
create policy "admin inserts rates" on public.rates for insert with check (public.is_admin());
drop policy if exists "admin updates rates" on public.rates;
create policy "admin updates rates" on public.rates for update using (public.is_admin());
drop policy if exists "admin deletes rates" on public.rates;
create policy "admin deletes rates" on public.rates for delete using (public.is_admin());

insert into public.rates (kind, category, cars, price, extra_km, extra_hour, contact_only, sort) values
 ('local','Sedan','Hyundai Aura, Xcent, Glanza, Dzire',2200,13,100,false,1),
 ('local','SUV / MUV','Toyota Rumion, Ertiga, Creta',3000,16,200,false,2),
 ('local','Premium SUV','Toyota Innova Crysta',4500,20,300,false,3),
 ('local','Tempo Traveller / Urbania','Available in different seating capacities.',null,null,null,true,4),
 ('outstation','Sedan','Hyundai Aura, Xcent, Glanza, Dzire',13,null,null,false,1),
 ('outstation','SUV / MUV','Rumion, Ertiga, Creta',16,null,null,false,2),
 ('outstation','Premium SUV','Innova Crysta',20,null,null,false,3),
 ('outstation','Tempo Traveller / Urbania','Pricing depends on seating capacity.',null,null,null,true,4)
on conflict (kind, category) do nothing;

-- ===== Editable site content =====
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

-- ===== More editable content =====
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

-- ===== Image uploads =====
insert into storage.buckets (id, name, public) values ('site-images', 'site-images', true)
on conflict (id) do update set public = true;

drop policy if exists "public reads site images" on storage.objects;
create policy "public reads site images" on storage.objects for select using (bucket_id = 'site-images');
drop policy if exists "admin uploads site images" on storage.objects;
create policy "admin uploads site images" on storage.objects for insert with check (bucket_id = 'site-images' and public.is_admin());
drop policy if exists "admin updates site images" on storage.objects;
create policy "admin updates site images" on storage.objects for update using (bucket_id = 'site-images' and public.is_admin());
drop policy if exists "admin deletes site images" on storage.objects;
create policy "admin deletes site images" on storage.objects for delete using (bucket_id = 'site-images' and public.is_admin());
