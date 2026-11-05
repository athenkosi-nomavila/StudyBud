const MS_PER_DAY = 24 * 60 * 60 * 1000;

/** Whole days from today until an ISO date (negative if it has passed). */
export function daysUntil(isoDate: string, today = new Date()): number {
  const start = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  const [year, month, day] = isoDate.split("-").map(Number);
  const end = Date.UTC(year, month - 1, day);
  return Math.round((end - start) / MS_PER_DAY);
}

export function examCountdownLabel(isoDate: string): string {
  const days = daysUntil(isoDate);
  if (days < 0) return "Exam done";
  if (days === 0) return "Exam today";
  if (days === 1) return "Exam tomorrow";
  return `Exam in ${days} days`;
}

// South African time is UTC+2 all year, with no daylight saving.
const SAST_OFFSET_MS = 2 * 60 * 60 * 1000;

/** Midnight in South Africa, `days` days after the day of `now`. */
export function sastMidnight(days: number, now = new Date()): Date {
  const local = now.getTime() + SAST_OFFSET_MS;
  const localMidnight = local - (local % MS_PER_DAY);
  return new Date(localMidnight + days * MS_PER_DAY - SAST_OFFSET_MS);
}

/** The South African date as "YYYY-MM-DD", `days` days after the day of `now`. */
export function sastDay(days = 0, now = new Date()): string {
  return new Date(sastMidnight(days, now).getTime() + SAST_OFFSET_MS).toISOString().slice(0, 10);
}

/** Days in a row with study, counting back from today (or yesterday, if not yet today). */
export function streakFrom(studyDays: Set<string>, now = new Date()): number {
  let offset = studyDays.has(sastDay(0, now)) ? 0 : -1;
  let streak = 0;
  while (studyDays.has(sastDay(offset, now))) {
    streak++;
    offset--;
  }
  return streak;
}
