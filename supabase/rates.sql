-- Editable prices for /services. Run once in Supabase > SQL Editor (also appended to schema.sql).
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
