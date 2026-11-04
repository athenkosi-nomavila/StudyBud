-- StudyBud tables. Run once in the Supabase SQL editor.
-- Each table matches a type in src/lib/types.ts.
-- Deleting a module also deletes everything in it.

create table modules (
  id text primary key default gen_random_uuid()::text,
  name text not null,
  color text not null check (color in ('lime', 'sky', 'butter', 'coral')),
  exam_date date,
  created_at timestamptz not null default now()
);

create table uploads (
  id text primary key default gen_random_uuid()::text,
  module_id text not null references modules (id) on delete cascade,
  name text not null,
  kind text not null check (kind in ('pdf', 'word', 'slides', 'photo')),
  status text not null default 'processing' check (status in ('processing', 'ready')),
  created_at timestamptz not null default now()
);

create table notes (
  id text primary key default gen_random_uuid()::text,
  module_id text not null references modules (id) on delete cascade,
  title text not null,
  summary text not null,
  key_ideas jsonb not null default '[]', -- [{ "heading": "...", "body": "..." }]
  source text not null,
  created_at timestamptz not null default now()
);

create table quiz_questions (
  id text primary key default gen_random_uuid()::text,
  module_id text not null references modules (id) on delete cascade,
  question text not null,
  options text[] not null,
  answer_index int not null check (answer_index >= 0),
  explanation text not null,
  source text not null,
  created_at timestamptz not null default now()
);

create table flashcards (
  id text primary key default gen_random_uuid()::text,
  module_id text not null references modules (id) on delete cascade,
  front text not null,
  back text not null,
  source text not null,
  due_at timestamptz not null default now(), -- when the card is next due for review
  created_at timestamptz not null default now()
);

create index on uploads (module_id);
create index on notes (module_id);
create index on quiz_questions (module_id);
create index on flashcards (module_id, due_at);

-- Lock every table. The app only talks to the database from the server
-- with the secret key, which skips these rules, so public keys get nothing.
alter table modules enable row level security;
alter table uploads enable row level security;
alter table notes enable row level security;
alter table quiz_questions enable row level security;
alter table flashcards enable row level security;
