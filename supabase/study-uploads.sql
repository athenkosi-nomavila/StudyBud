-- Links notes and flashcards to the upload they were written from, like quiz questions.
-- Run once in the Supabase SQL editor, after quiz-uploads.sql. Deleting an upload deletes them too.

alter table notes
  add column if not exists upload_id text references uploads (id) on delete cascade;
alter table flashcards
  add column if not exists upload_id text references uploads (id) on delete cascade;

create index if not exists notes_upload_id_idx on notes (upload_id);
create index if not exists flashcards_upload_id_idx on flashcards (upload_id);
