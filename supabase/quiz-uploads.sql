-- Links each quiz question to the upload it was written from. Run once in the Supabase SQL editor.
-- Deleting an upload deletes its questions too.

alter table quiz_questions
  add column if not exists upload_id text references uploads (id) on delete cascade;

create index if not exists quiz_questions_upload_id_idx on quiz_questions (upload_id);
