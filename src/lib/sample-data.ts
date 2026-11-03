// Placeholder content until real data is saved (step 6).
import type { Flashcard, QuizQuestion, StudyModule, StudyNotes, Upload } from "./types";

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

export const sampleNotes: StudyNotes[] = [
  {
    moduleId: "psychology-101",
    title: "Memory",
    summary: "Memory has three stages: get it in, keep it, get it back out.",
    keyIdeas: [
      {
        heading: "Encoding",
        body: "Turning what you see or hear into something the brain can store. Linking it to what you know makes it stick.",
      },
      {
        heading: "Storage",
        body: "Short-term memory holds a few items for seconds. Rehearsal moves them to long-term.",
      },
      {
        heading: "Retrieval",
        body: "Pulling it back out. Quizzing yourself makes this easier every time.",
      },
    ],
    source: "Week 3 – Memory, p. 2–6",
  },
];

export const sampleQuiz: QuizQuestion[] = [
  {
    id: "q1",
    moduleId: "psychology-101",
    question: "What moves info from short-term into long-term memory?",
    options: ["Retrieval", "Encoding", "Rehearsal", "Forgetting"],
    answerIndex: 2,
    explanation:
      "Encoding gets it in. Rehearsal, repeating or using it, is what moves it to long-term memory.",
    source: "Week 3 – Memory, p. 4",
  },
  {
    id: "q2",
    moduleId: "psychology-101",
    question: "Which stage is about pulling a memory back out?",
    options: ["Storage", "Retrieval", "Encoding", "Attention"],
    answerIndex: 1,
    explanation:
      "Retrieval is getting a memory back out. Practising it, like quizzing yourself, makes it easier.",
    source: "Week 3 – Memory, p. 6",
  },
  {
    id: "q3",
    moduleId: "psychology-101",
    question: "What helps new information stick when you encode it?",
    options: [
      "Reading it faster",
      "Linking it to what you already know",
      "Highlighting everything",
      "Studying with music",
    ],
    answerIndex: 1,
    explanation:
      "Meaning helps: connecting new ideas to things you already know makes them easier to store.",
    source: "Week 3 – Memory, p. 3",
  },
];

export const sampleCards: Flashcard[] = [
  {
    id: "c1",
    moduleId: "psychology-101",
    front: "What are the three stages of memory?",
    back: "Encoding, storage, retrieval",
    source: "Week 3 – Memory, p. 2",
  },
  {
    id: "c2",
    moduleId: "psychology-101",
    front: "What moves information into long-term memory?",
    back: "Rehearsal: repeating or using it",
    source: "Week 3 – Memory, p. 4",
  },
  {
    id: "c3",
    moduleId: "anatomy",
    front: "How many bones are in the adult human body?",
    back: "206",
    source: "Skeletal system, p. 1",
  },
  {
    id: "c4",
    moduleId: "anatomy",
    front: "What is the longest bone in the body?",
    back: "The femur (thigh bone)",
    source: "Skeletal system, p. 3",
  },
];

export const sampleStreakDays = 5;

export function getSampleModule(id: string) {
  return sampleModules.find((m) => m.id === id);
}

export function getSampleUploads(moduleId: string) {
  return sampleUploads.filter((u) => u.moduleId === moduleId);
}

export function getSampleNotes(moduleId: string) {
  return sampleNotes.find((n) => n.moduleId === moduleId);
}

export function getSampleQuiz(moduleId: string) {
  return sampleQuiz.filter((q) => q.moduleId === moduleId);
}

export function getSampleCards(moduleId?: string) {
  return moduleId ? sampleCards.filter((c) => c.moduleId === moduleId) : sampleCards;
}
