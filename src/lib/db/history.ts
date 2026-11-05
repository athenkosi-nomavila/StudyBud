import "server-only";
import { streakFrom } from "../dates";
import { db } from "./client";

// Her study history: finished quizzes and flashcard ratings.

export async function logStudy(
  moduleId: string,
  kind: "quiz" | "card",
  correct: number,
  total: number,
): Promise<void> {
  const { error } = await db
    .from("study_log")
    .insert({ module_id: moduleId, kind, correct, total });
  if (error) throw error;
}

/** Days in a row she has studied, up to today. */
export async function getStreak(): Promise<number> {
  const { data, error } = await db
    .from("study_days")
    .select("day")
    .order("day", { ascending: false })
    .limit(366);
  if (error) throw error;
  return streakFrom(new Set(data.map((row) => row.day as string)));
}
