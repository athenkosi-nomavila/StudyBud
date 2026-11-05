"use server";

import { db } from "@/lib/db/client";
import { extractUploadText } from "@/lib/db/extract-text";
import { getModule } from "@/lib/db/modules";
import {
  fileExtension,
  MAX_UPLOAD_BYTES,
  MAX_UPLOAD_MB,
  UPLOAD_BUCKET,
  uploadDisplayName,
  uploadKind,
} from "@/lib/uploads";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

type FileInfo = { moduleId: string; fileName: string; mimeType: string; size: number };

export type UploadTarget =
  { ok: true; uploadId: string; path: string; signedUrl: string } | { ok: false; message: string };

/**
 * Step 1: checks the file and returns a one-time link the browser uploads it to.
 * The file goes straight to storage, so it never passes through our server.
 */
export async function createUploadTarget(file: FileInfo): Promise<UploadTarget> {
  if (!(await getModule(file.moduleId))) return { ok: false, message: "Module not found." };
  if (!uploadKind(file.fileName, file.mimeType)) {
    return { ok: false, message: `${file.fileName} isn't a PDF, Word, PowerPoint or photo.` };
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return { ok: false, message: `${file.fileName} is bigger than ${MAX_UPLOAD_MB} MB.` };
  }

  const uploadId = crypto.randomUUID();
  const extension = fileExtension(file.fileName) || "bin";
  const path = `${file.moduleId}/${uploadId}.${extension}`;

  const { data, error } = await db.storage.from(UPLOAD_BUCKET).createSignedUploadUrl(path);
  if (error) return { ok: false, message: "Couldn't start the upload. Try again." };
  return { ok: true, uploadId, path, signedUrl: data.signedUrl };
}

/**
 * Step 2: after the browser has uploaded the file, saves it as a new upload
 * and pulls its text out. Photos wait for the AI step to be read.
 */
export async function saveUpload(
  file: FileInfo & { uploadId: string; path: string },
): Promise<{ ok: boolean }> {
  const kind = uploadKind(file.fileName, file.mimeType);
  // Only accept the exact path that step 1 hands out for this file.
  const expectedPath = `${file.moduleId}/${file.uploadId}.${fileExtension(file.fileName) || "bin"}`;
  if (!kind || !UUID.test(file.uploadId) || file.path !== expectedPath) return { ok: false };

  const { error } = await db.from("uploads").insert({
    id: file.uploadId,
    module_id: file.moduleId,
    name: uploadDisplayName(file.fileName),
    kind,
    status: "processing",
    file_path: file.path,
  });
  if (error) return { ok: false };

  if (kind !== "photo") await extractUploadText(file.uploadId, file.path);
  return { ok: true };
}
