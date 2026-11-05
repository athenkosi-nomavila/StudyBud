import type { ModuleColor } from "./types";

// Full class names so Tailwind can find them when it scans the code.
export const moduleBgClass: Record<ModuleColor, string> = {
  lime: "bg-lime",
  sky: "bg-sky",
  butter: "bg-butter",
  coral: "bg-coral",
  mint: "bg-mint",
  aqua: "bg-aqua",
  periwinkle: "bg-periwinkle",
  lilac: "bg-lilac",
  pink: "bg-pink",
  peach: "bg-peach",
  sand: "bg-sand",
  stone: "bg-stone",
};

/** Module colours in picker order. The first MAIN_COLOR_COUNT show straight away; the rest sit behind "+". */
export const MODULE_COLORS: { value: ModuleColor; label: string }[] = [
  { value: "lime", label: "Green" },
  { value: "sky", label: "Blue" },
  { value: "butter", label: "Yellow" },
  { value: "coral", label: "Red" },
  { value: "mint", label: "Mint" },
  { value: "aqua", label: "Aqua" },
  { value: "periwinkle", label: "Periwinkle" },
  { value: "lilac", label: "Lilac" },
  { value: "pink", label: "Pink" },
  { value: "peach", label: "Peach" },
  { value: "sand", label: "Sand" },
  { value: "stone", label: "Stone" },
];

export const MAIN_COLOR_COUNT = 4;

/** Result card colour: green for a good score, amber for okay, red when it needs work. */
export function scoreBgClass(correct: number, total: number): string {
  const ratio = total > 0 ? correct / total : 0;
  if (ratio >= 0.8) return "bg-lime";
  if (ratio >= 0.5) return "bg-butter";
  return "bg-coral";
}
