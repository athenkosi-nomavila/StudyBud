import type { ModuleColor } from "./types";

// Full class names so Tailwind can find them when it scans the code.
export const moduleBgClass: Record<ModuleColor, string> = {
  lime: "bg-lime",
  sky: "bg-sky",
  butter: "bg-butter",
  coral: "bg-coral",
};

/** Result card colour: green for a good score, amber for okay, red when it needs work. */
export function scoreBgClass(correct: number, total: number): string {
  const ratio = total > 0 ? correct / total : 0;
  if (ratio >= 0.8) return "bg-lime";
  if (ratio >= 0.5) return "bg-butter";
  return "bg-coral";
}
