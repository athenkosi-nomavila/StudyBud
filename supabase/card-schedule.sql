-- Spaced repetition: how many days the gap was when a card was last scheduled.
-- 0 means the card is new. Run once in the Supabase SQL editor.

alter table flashcards add column if not exists interval_days int not null default 0;
