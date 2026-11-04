import "server-only";
import type { Flashcard, KeyIdea, QuizQuestion, StudyNotes } from "../types";
import { db } from "./client";

// The study content for a module: notes, quiz questions and flashcards.

export async function getNotes(moduleId: string): Promise<StudyNotes | undefined> {
  const { data, error } = await db
    .from("notes")
    .select("module_id, title, summary, key_ideas, source")
    .eq("module_id", moduleId)
    .order("created_at")
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  if (!data) return undefined;
  return {
    moduleId: data.module_id,
    title: data.title,
    summary: data.summary,
    keyIdeas: data.key_ideas as KeyIdea[],
    source: data.source,
  };
}

export async function getQuiz(moduleId: string): Promise<QuizQuestion[]> {
  const { data, error } = await db
    .from("quiz_questions")
    .select("id, module_id, question, options, answer_index, explanation, source")
    .eq("module_id", moduleId)
    .order("created_at");
  if (error) throw error;
  return data.map((row) => ({
    id: row.id,
    moduleId: row.module_id,
    question: row.question,
    options: row.options,
    answerIndex: row.answer_index,
    explanation: row.explanation,
    source: row.source,
  }));
}

type CardRow = { id: string; module_id: string; front: string; back: string; source: string };

const CARD_COLUMNS = "id, module_id, front, back, source";

function toCard(row: CardRow): Flashcard {
  return {
    id: row.id,
    moduleId: row.module_id,
    front: row.front,
    back: row.back,
    source: row.source,
  };
}

/** Every card in one module, for practising the whole set. */
export async function getModuleCards(moduleId: string): Promise<Flashcard[]> {
  const { data, error } = await db
    .from("flashcards")
    .select(CARD_COLUMNS)
    .eq("module_id", moduleId)
    .order("created_at");
  if (error) throw error;
  return data.map(toCard);
}

/** Cards from all modules that are due for review now. */
export async function getDueCards(): Promise<Flashcard[]> {
  const { data, error } = await db
    .from("flashcards")
    .select(CARD_COLUMNS)
    .lte("due_at", new Date().toISOString())
    .order("due_at");
  if (error) throw error;
  return data.map(toCard);
}
