"use server";

import { scheduleCard } from "@/lib/db/study";
import type { Rating } from "@/lib/review";

/** Saves how she did on a card and schedules when it comes back. */
export async function rateCard(cardId: string, rating: Rating): Promise<{ ok: boolean }> {
  if (rating !== "got" && rating !== "missed") return { ok: false };
  try {
    await scheduleCard(cardId, rating);
    return { ok: true };
  } catch {
    return { ok: false };
  }
}
