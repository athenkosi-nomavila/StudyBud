-- Study history: every finished quiz and every flashcard rating, for the streak
-- and the Progress tab. Run once in the Supabase SQL editor.

create table if not exists study_log (
  id text primary key default gen_random_uuid()::text,
  module_id text not null references modules (id) on delete cascade,
  kind text not null check (kind in ('quiz', 'card')),
  correct int not null, -- questions right, or 1 for "Got it" and 0 for "Missed it"
  total int not null,
  created_at timestamptz not null default now()
);
create index if not exists study_log_created_at_idx on study_log (created_at);
alter table study_log enable row level security;

-- Each day she studied, by South African date.
create or replace view study_days as
  select distinct (created_at at time zone 'Africa/Johannesburg')::date as day from study_log;

grant select, insert, update, delete on study_log to service_role;
grant select on study_days to service_role;

-- Sample history for the sample modules: a 5-day streak up to yesterday.
-- clear-sample.sql removes it along with the sample modules.
insert into study_log (module_id, kind, correct, total, created_at) values
  ('psychology-101', 'quiz', 2, 4, now() - interval '4 days'),
  ('psychology-101', 'quiz', 3, 4, now() - interval '1 day'),
  ('anatomy', 'quiz', 1, 3, now() - interval '3 days'),
  ('statistics', 'quiz', 3, 3, now() - interval '2 days');
insert into study_log (module_id, kind, correct, total, created_at)
  select 'psychology-101', 'card', (n % 3 > 0)::int, 1, now() - make_interval(days => n % 5 + 1)
  from generate_series(1, 20) as n;
