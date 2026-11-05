// Saves the notes, quiz questions and flashcards written for one upload.
//
//   node scripts/study/save.mjs <file.json>
//
// The JSON looks like:
// {
//   "uploadId": "...",
//   "transcript": "optional: the text read from a photo or scanned PDF",
//   "notes": { "title": "...", "summary": "...", "keyIdeas": [{ "heading": "...", "body": "..." }] },
//   "questions": [{ "question": "...", "options": ["a", "b", "c", "d"], "answerIndex": 0, "explanation": "..." }],
//   "cards": [{ "front": "...", "back": "..." }]
// }
import { readFile } from "node:fs/promises";
import { db } from "./db.mjs";

const input = JSON.parse(await readFile(process.argv[2], "utf8"));
const { uploadId, transcript, notes, questions, cards } = input;

const { data: upload, error } = await db
  .from("uploads")
  .select("id, module_id, name")
  .eq("id", uploadId)
  .single();
if (error) throw error;

const link = { module_id: upload.module_id, upload_id: upload.id, source: upload.name };

async function insert(table, rows) {
  const { error: insertError } = await db.from(table).insert(rows);
  if (insertError) throw insertError;
}

// Clear anything saved earlier for this upload, so running it twice doesn't duplicate.
for (const table of ["notes", "flashcards", "quiz_questions"]) {
  const { error: deleteError } = await db.from(table).delete().eq("upload_id", upload.id);
  if (deleteError) throw deleteError;
}

await insert("notes", [
  { ...link, title: notes.title, summary: notes.summary, key_ideas: notes.keyIdeas },
]);
await insert(
  "flashcards",
  cards.map((card) => ({ ...link, front: card.front, back: card.back })),
);
// Questions go last: the app shows an upload as "Ready" once it has questions.
await insert(
  "quiz_questions",
  questions.map((q) => ({
    ...link,
    question: q.question,
    options: q.options,
    answer_index: q.answerIndex,
    explanation: q.explanation,
  })),
);

const update = { status: "ready", ...(transcript ? { text: transcript } : {}) };
const { error: updateError } = await db.from("uploads").update(update).eq("id", upload.id);
if (updateError) throw updateError;

console.log(
  `Saved notes, ${questions.length} questions and ${cards.length} cards for "${upload.name}".`,
);
