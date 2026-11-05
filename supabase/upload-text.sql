-- Text pulled out of each upload. Run once in the Supabase SQL editor, after storage.sql.

alter table uploads add column if not exists text text;

-- Uploads can now also be 'failed' when the file can't be read.
alter table uploads drop constraint if exists uploads_status_check;
alter table uploads add constraint uploads_status_check
  check (status in ('processing', 'ready', 'failed'));
