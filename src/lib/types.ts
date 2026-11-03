export type ModuleColor = "lime" | "sky" | "butter" | "coral";

export type StudyModule = {
  id: string;
  name: string;
  color: ModuleColor;
  cardsDue: number;
  examDate?: string; // ISO date, e.g. "2026-11-15"
};

export type UploadKind = "pdf" | "word" | "slides" | "photo";

export type Upload = {
  id: string;
  moduleId: string;
  name: string;
  kind: UploadKind;
  status: "processing" | "ready";
  cardCount: number;
};

export type KeyIdea = {
  heading: string;
  body: string;
};

export type StudyNotes = {
  moduleId: string;
  title: string;
  summary: string;
  keyIdeas: KeyIdea[];
  source: string; // e.g. "Week 3 – Memory, p. 2–6"
};
