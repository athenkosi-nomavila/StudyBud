// How well she remembered a card. The real scheduling (step 10) will use these.
export type Rating = "again" | "hard" | "good" | "easy";

export const RATINGS: { value: Rating; label: string; hint: string; color: string }[] = [
  { value: "again", label: "Again", hint: "today", color: "bg-coral" },
  { value: "hard", label: "Hard", hint: "1 day", color: "bg-butter" },
  { value: "good", label: "Good", hint: "3 days", color: "bg-sky" },
  { value: "easy", label: "Easy", hint: "7 days", color: "bg-lime" },
];
