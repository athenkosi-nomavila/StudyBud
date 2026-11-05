export type ModuleColor =
  | "lime"
  | "sky"
  | "butter"
  | "coral"
  | "mint"
  | "aqua"
  | "periwinkle"
  | "lilac"
  | "pink"
  | "peach"
  | "sand"
  | "stone";

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
  status: "processing" | "ready" | "failed";
  /** Notes, quiz and flashcards have been written from it. */
  hasStudy: boolean;
};

export type KeyIdea = {
  heading: string;
  body: string;
};

export type StudyNotes = {
  id: string;
  moduleId: string;
  title: string;
  summary: string;
  keyIdeas: KeyIdea[];
  source: string; // e.g. "Week 3 – Memory, p. 2–6"
};

export type QuizQuestion = {
  id: string;
  moduleId: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
  source: string;
};

export type Flashcard = {
  id: string;
  moduleId: string;
  front: string;
  back: string;
  source: string;
};
