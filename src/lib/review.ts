// Whether she remembered a card, and when it comes back: missed cards
// tomorrow, known cards after a gap that grows each time.
export type Rating = "missed" | "got";

export const RATINGS: { value: Rating; label: string; color: string }[] = [
  { value: "missed", label: "Missed it", color: "bg-coral" },
  { value: "got", label: "Got it", color: "bg-lime" },
];

/** The gaps between reviews, in days. Each "Got it" moves a card one step along. */
export const INTERVALS = [1, 3, 7, 14, 30, 60];

/** The next gap in days, given the current one (0 for a new card). */
export function nextInterval(currentDays: number, rating: Rating): number {
  if (rating === "missed") return INTERVALS[0];
  return INTERVALS.find((days) => days > currentDays) ?? INTERVALS[INTERVALS.length - 1];
}

// South Africa is UTC+2 all year, so midnight there is 22:00 UTC the day before.
const SAST_OFFSET_MS = 2 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

/** Midnight in South Africa, `days` days after the day of `now`. */
export function dueDate(days: number, now = new Date()): Date {
  const local = now.getTime() + SAST_OFFSET_MS;
  const localMidnight = local - (local % DAY_MS);
  return new Date(localMidnight + days * DAY_MS - SAST_OFFSET_MS);
}
