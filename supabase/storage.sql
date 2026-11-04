-- File storage for uploads. Run once in the Supabase SQL editor, after schema.sql.

-- A private bucket: files can only be read or written with the secret key
-- or a short-lived signed link from the server. 20 MB limit per file.
insert into storage.buckets (id, name, public, file_size_limit)
values ('uploads', 'uploads', false, 20971520)
on conflict (id) do nothing;

-- Where each upload's file lives in the bucket.
alter table uploads add column if not exists file_path text;
