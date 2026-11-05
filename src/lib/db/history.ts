import "server-only";
import { sastDay, sastMidnight, streakFrom } from "../dates";
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
  /** Her cards grouped by how long she has remembered them. */
  memory: { lockedIn: number; gettingThere: number; stillLearning: number };
  /** Card ratings in the last 7 days, and how many were "Got it". */
  cardsThisWeek: { practised: number; remembered: number };
  quizzes: QuizScore[];
};

/** A card is "locked in" once its gap between reviews is a week or more. */
const LOCKED_IN_DAYS = 7;

export async function getProgress(): Promise<Progress> {
  const [studyDays, cards, cardRatings, quizzes] = await Promise.all([
    getStudyDays(),
    db.from("flashcards").select("interval_days"),
    db
      .from("study_log")
      .select("correct")
      .eq("kind", "card")
      .gte("created_at", sastMidnight(-6).toISOString()),
    db
      .from("study_log")
      .select("module_id, correct, total, modules(name, color)")
      .eq("kind", "quiz")
      .order("created_at", { ascending: false })
      .limit(500),
  ]);
  for (const result of [cards, cardRatings, quizzes]) if (result.error) throw result.error;

  const memory = { lockedIn: 0, gettingThere: 0, stillLearning: 0 };
  for (const card of cards.data ?? []) {
    if (card.interval_days >= LOCKED_IN_DAYS) memory.lockedIn++;
    else if (card.interval_days > 0) memory.gettingThere++;
    else memory.stillLearning++;
  }
  const ratings = cardRatings.data ?? [];
  const cardsThisWeek = {
    practised: ratings.length,
    remembered: ratings.filter((rating) => rating.correct > 0).length,
  };

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
    memory,
    cardsThisWeek,
    quizzes: [...byModule.values()],
  };
}
