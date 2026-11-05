import "server-only";
import type { ModuleColor, StudyModule, Upload } from "../types";
import { db } from "./client";

type ModuleRow = {
  id: string;
  name: string;
  color: ModuleColor;
  exam_date: string | null;
  flashcards: { count: number }[];
};

// flashcards(count) is filtered to due cards with .lte("flashcards.due_at", now).
const MODULE_COLUMNS = "id, name, color, exam_date, flashcards(count)";

function toModule(row: ModuleRow): StudyModule {
  return {
    id: row.id,
    name: row.name,
    color: row.color,
    cardsDue: row.flashcards[0]?.count ?? 0,
    examDate: row.exam_date ?? undefined,
  };
}

function nowIso() {
  return new Date().toISOString();
}

export async function getModules(): Promise<StudyModule[]> {
  const { data, error } = await db
    .from("modules")
    .select(MODULE_COLUMNS)
    .lte("flashcards.due_at", nowIso())
    .order("created_at");
  if (error) throw error;
  return (data as ModuleRow[]).map(toModule);
}

export async function getModule(id: string): Promise<StudyModule | undefined> {
  const { data, error } = await db
    .from("modules")
    .select(MODULE_COLUMNS)
    .lte("flashcards.due_at", nowIso())
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data ? toModule(data as ModuleRow) : undefined;
}

// Reading a file takes seconds. One still processing after this was cut off, so show it as failed.
const STUCK_AFTER_MS = 5 * 60 * 1000;

type UploadRow = Pick<Upload, "name" | "kind" | "status"> & {
  id: string;
  module_id: string;
  created_at: string;
  quiz_questions: { count: number }[];
};

function uploadStatus(row: UploadRow): Upload["status"] {
  // Photos stay processing until the AI step reads them.
  const isStuck =
    row.status === "processing" &&
    row.kind !== "photo" &&
    Date.now() - new Date(row.created_at).getTime() > STUCK_AFTER_MS;
  return isStuck ? "failed" : row.status;
}

export async function getUploads(moduleId: string): Promise<Upload[]> {
  const { data, error } = await db
    .from("uploads")
    .select("id, module_id, name, kind, status, created_at, quiz_questions(count)")
    .eq("module_id", moduleId)
    .order("created_at");
  if (error) throw error;
  return (data as UploadRow[]).map((row) => ({
    id: row.id,
    moduleId: row.module_id,
    name: row.name,
    kind: row.kind,
    status: uploadStatus(row),
    hasStudy: (row.quiz_questions[0]?.count ?? 0) > 0,
  }));
}
