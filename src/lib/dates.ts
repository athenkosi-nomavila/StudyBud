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
