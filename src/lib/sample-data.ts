// Placeholder content until real data is saved (step 6).
import type { StudyModule, Upload } from "./types";

export const sampleModules: StudyModule[] = [
  {
    id: "psychology-101",
    name: "Psychology 101",
    color: "lime",
    cardsDue: 9,
    examDate: "2026-11-15",
  },
  { id: "anatomy", name: "Anatomy", color: "sky", cardsDue: 7, examDate: "2026-11-22" },
  { id: "statistics", name: "Statistics", color: "butter", cardsDue: 2 },
];

export const sampleUploads: Upload[] = [
  {
    id: "u1",
    moduleId: "psychology-101",
    name: "Week 3 – Memory",
    kind: "pdf",
    status: "ready",
    cardCount: 24,
  },
  {
    id: "u2",
    moduleId: "psychology-101",
    name: "Lecture 4 slides",
    kind: "slides",
    status: "ready",
    cardCount: 18,
  },
  {
    id: "u3",
    moduleId: "psychology-101",
    name: "Handwritten notes",
    kind: "photo",
    status: "processing",
    cardCount: 0,
  },
  {
    id: "u4",
    moduleId: "anatomy",
    name: "Skeletal system",
    kind: "pdf",
    status: "ready",
    cardCount: 31,
  },
];

export const sampleStreakDays = 5;

export function getSampleModule(id: string) {
  return sampleModules.find((m) => m.id === id);
}

export function getSampleUploads(moduleId: string) {
  return sampleUploads.filter((u) => u.moduleId === moduleId);
}
