"use server";

import { logStudy } from "@/lib/db/history";

/** Saves her score when she finishes a quiz. */
export async function saveQuizResult(
  moduleId: string,
  correct: number,
  total: number,
): Promise<{ ok: boolean }> {
  const isValid =
    Number.isInteger(correct) && Number.isInteger(total) && 0 <= correct && correct <= total;
  if (!isValid || total === 0) return { ok: false };
  try {
    await logStudy(moduleId, "quiz", correct, total);
    return { ok: true };
  } catch {
    return { ok: false };
  }
}
