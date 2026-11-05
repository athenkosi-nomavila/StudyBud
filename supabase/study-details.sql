-- Keeps more detail for the Progress tab. Run once in the Supabase SQL editor.

-- What she answered on each quiz and which card each rating was for, so Progress can
-- show what she got right and wrong. Only quizzes and cards she does after this have details.
alter table study_log add column if not exists details jsonb;

-- When she last rated each card, to tell new cards from missed ones.
alter table flashcards add column if not exists last_rated_at timestamptz;
