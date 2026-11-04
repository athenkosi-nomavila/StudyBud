-- Optional sample content, the same as src/lib/sample-data.ts.
-- Run after schema.sql to test the screens. Remove it with clear-sample.sql.

insert into modules (id, name, color, exam_date) values
  ('psychology-101', 'Psychology 101', 'lime', '2026-11-15'),
  ('anatomy', 'Anatomy', 'sky', '2026-11-22'),
  ('statistics', 'Statistics', 'butter', null);

insert into uploads (id, module_id, name, kind, status) values
  ('u1', 'psychology-101', 'Week 3 – Memory', 'pdf', 'ready'),
  ('u2', 'psychology-101', 'Lecture 4 slides', 'slides', 'ready'),
  ('u3', 'psychology-101', 'Handwritten notes', 'photo', 'processing'),
  ('u4', 'anatomy', 'Skeletal system', 'pdf', 'ready');

insert into notes (id, module_id, title, summary, key_ideas, source) values
  (
    'n1',
    'psychology-101',
    'Memory',
    'Memory has three stages: get it in, keep it, get it back out.',
    '[
      { "heading": "Encoding", "body": "Turning what you see or hear into something the brain can store. Linking it to what you know makes it stick." },
      { "heading": "Storage", "body": "Short-term memory holds a few items for seconds. Rehearsal moves them to long-term." },
      { "heading": "Retrieval", "body": "Pulling it back out. Quizzing yourself makes this easier every time." }
    ]',
    'Week 3 – Memory, p. 2–6'
  );

insert into quiz_questions (id, module_id, question, options, answer_index, explanation, source) values
  (
    'q1',
    'psychology-101',
    'What moves info from short-term into long-term memory?',
    array['Retrieval', 'Encoding', 'Rehearsal', 'Forgetting'],
    2,
    'Encoding gets it in. Rehearsal, repeating or using it, is what moves it to long-term memory.',
    'Week 3 – Memory, p. 4'
  ),
  (
    'q2',
    'psychology-101',
    'Which stage is about pulling a memory back out?',
    array['Storage', 'Retrieval', 'Encoding', 'Attention'],
    1,
    'Retrieval is getting a memory back out. Practising it, like quizzing yourself, makes it easier.',
    'Week 3 – Memory, p. 6'
  ),
  (
    'q3',
    'psychology-101',
    'What helps new information stick when you encode it?',
    array['Reading it faster', 'Linking it to what you already know', 'Highlighting everything', 'Studying with music'],
    1,
    'Meaning helps: connecting new ideas to things you already know makes them easier to store.',
    'Week 3 – Memory, p. 3'
  );

insert into flashcards (id, module_id, front, back, source) values
  ('c1', 'psychology-101', 'What are the three stages of memory?', 'Encoding, storage, retrieval', 'Week 3 – Memory, p. 2'),
  ('c2', 'psychology-101', 'What moves information into long-term memory?', 'Rehearsal: repeating or using it', 'Week 3 – Memory, p. 4'),
  ('c3', 'anatomy', 'How many bones are in the adult human body?', '206', 'Skeletal system, p. 1'),
  ('c4', 'anatomy', 'What is the longest bone in the body?', 'The femur (thigh bone)', 'Skeletal system, p. 3');
