// Lists uploads that have no notes, quiz or cards yet.
//
//   node scripts/study/pending.mjs            print them as JSON
//   node scripts/study/pending.mjs <folder>   also download each file there
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { db } from "./db.mjs";

const folder = process.argv[2];

const { data, error } = await db
  .from("uploads")
  .select(
    "id, name, kind, status, text, file_path, created_at, modules(name), quiz_questions(count)",
  )
  .not("file_path", "is", null)
  .order("created_at");
if (error) throw error;

const pending = data.filter((row) => (row.quiz_questions[0]?.count ?? 0) === 0);

if (folder) await mkdir(folder, { recursive: true });

const result = [];
for (const row of pending) {
  let file = null;
  if (folder) {
    const { data: blob, error: downloadError } = await db.storage
      .from("uploads")
      .download(row.file_path);
    if (downloadError) throw downloadError;
    file = path.join(folder, `${row.id}${path.extname(row.file_path)}`);
    await writeFile(file, Buffer.from(await blob.arrayBuffer()));
  }
  result.push({
    id: row.id,
    module: row.modules?.name,
    name: row.name,
    kind: row.kind,
    status: row.status,
    textLength: row.text?.length ?? 0,
    file,
  });
}

console.log(JSON.stringify(result, null, 2));
