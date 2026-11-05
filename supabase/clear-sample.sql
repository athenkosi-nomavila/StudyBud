-- Removes the sample content from seed.sql. Run before real use.
-- Deleting the sample modules also deletes their uploads, notes, quizzes, cards and study history.
delete from modules where id in ('psychology-101', 'anatomy', 'statistics');
