import "server-only";
import { sastDay, streakFrom } from "../dates";
import type { ModuleColor } from "../types";
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

async function getStudyDays(): Promise<Set<string>> {
  const { data, error } = await db
    .from("study_days")
    .select("day")
    .order("day", { ascending: false })
    .limit(366);
  if (error) throw error;
  return new Set(data.map((row) => row.day as string));
}

/** Days in a row she has studied, up to today. */
export async function getStreak(): Promise<number> {
  return streakFrom(await getStudyDays());
}

export type QuizScore = {
  moduleId: string;
  moduleName: string;
  color: ModuleColor;
  correct: number;
  total: number;
  /** Her score the time before, as a fraction, or null for a first quiz. */
  previousRatio: number | null;
};

export type Progress = {
  streak: number;
  /** The last 7 days, oldest first, and whether she studied on each. */
  week: { day: string; studied: boolean }[];
  /** Cards she has got right enough times to be on a week-long gap or more. */
  cardsLearned: number;
  cardsTotal: number;
  quizzes: QuizScore[];
};

/** Cards count as learned once their gap between reviews is a week or more. */
const LEARNED_AFTER_DAYS = 7;

export async function getProgress(): Promise<Progress> {
  const [studyDays, cards, learned, quizzes] = await Promise.all([
    getStudyDays(),
    db.from("flashcards").select("id", { count: "exact", head: true }),
    db
      .from("flashcards")
      .select("id", { count: "exact", head: true })
      .gte("interval_days", LEARNED_AFTER_DAYS),
    db
      .from("study_log")
      .select("module_id, correct, total, modules(name, color)")
      .eq("kind", "quiz")
      .order("created_at", { ascending: false })
      .limit(500),
  ]);
  for (const result of [cards, learned, quizzes]) if (result.error) throw result.error;

  // Newest first, so the first quiz seen per module is the latest one.
  const byModule = new Map<string, QuizScore>();
  for (const row of quizzes.data ?? []) {
    const studyModule = row.modules as unknown as { name: string; color: ModuleColor };
    const latest = byModule.get(row.module_id);
    if (!latest) {
      byModule.set(row.module_id, {
        moduleId: row.module_id,
        moduleName: studyModule.name,
        color: studyModule.color,
        correct: row.correct,
        total: row.total,
        previousRatio: null,
      });
    } else if (latest.previousRatio === null) {
      latest.previousRatio = row.correct / row.total;
    }
  }

  const week = [-6, -5, -4, -3, -2, -1, 0].map((offset) => {
    const day = sastDay(offset);
    return { day, studied: studyDays.has(day) };
  });

  return {
    streak: streakFrom(studyDays),
    week,
    cardsLearned: learned.count ?? 0,
    cardsTotal: cards.count ?? 0,
    quizzes: [...byModule.values()],
  };
}
