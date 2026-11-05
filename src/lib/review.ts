// Whether she remembered a card. The AI flashcards step will use this to
// decide when the card comes back: missed cards sooner, known cards later.
export type Rating = "missed" | "got";

export const RATINGS: { value: Rating; label: string; color: string }[] = [
  { value: "missed", label: "Missed it", color: "bg-coral" },
  { value: "got", label: "Got it", color: "bg-lime" },
];
