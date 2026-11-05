import { sastMidnight } from "./dates";

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

/** When a card with this gap comes back: midnight South African time, that many days on. */
export function dueDate(days: number, now = new Date()): Date {
  return sastMidnight(days, now);
}
