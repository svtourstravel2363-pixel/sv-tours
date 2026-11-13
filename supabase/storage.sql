-- Image uploads from the admin panel. Run once in Supabase > SQL Editor (also appended to schema.sql).
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
