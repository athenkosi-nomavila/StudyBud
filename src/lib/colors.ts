import type { ModuleColor } from "./types";

// Full class names so Tailwind can find them when it scans the code.
export const moduleBgClass: Record<ModuleColor, string> = {
  lime: "bg-lime",
  sky: "bg-sky",
  butter: "bg-butter",
  coral: "bg-coral",
};
