import type { UploadKind } from "./types";

export const UPLOAD_BUCKET = "uploads";
export const MAX_UPLOAD_MB = 20;
export const MAX_UPLOAD_BYTES = MAX_UPLOAD_MB * 1024 * 1024;

const KIND_BY_EXTENSION: Record<string, UploadKind> = {
  pdf: "pdf",
  doc: "word",
  docx: "word",
  ppt: "slides",
  pptx: "slides",
};

export function fileExtension(fileName: string): string {
  const dot = fileName.lastIndexOf(".");
  return dot === -1 ? "" : fileName.slice(dot + 1).toLowerCase();
}

/** Works out what kind of notes a file is, or null if it isn't supported. */
export function uploadKind(fileName: string, mimeType: string): UploadKind | null {
  if (mimeType.startsWith("image/")) return "photo";
  return KIND_BY_EXTENSION[fileExtension(fileName)] ?? null;
}

/** The name shown in the app: the file name without its extension. */
export function uploadDisplayName(fileName: string): string {
  const dot = fileName.lastIndexOf(".");
  return (dot > 0 ? fileName.slice(0, dot) : fileName).trim() || "Untitled";
}
