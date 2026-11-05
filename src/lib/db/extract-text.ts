import "server-only";
import { OfficeParser } from "officeparser";
import { UPLOAD_BUCKET } from "../uploads";
import { db } from "./client";

/** Reads the plain text out of a PDF, Word (.docx) or PowerPoint (.pptx) file. */
async function readText(file: Buffer): Promise<string> {
  const ast = await OfficeParser.parseOffice(file);
  const { value } = await ast.to("text", {
    includeImages: false,
    textConfig: { preserveLayout: false, renderNotes: false },
  });
  return value.trim();
}

/**
 * Downloads an upload's file, pulls out its text and marks it ready.
 * Marks it failed if the file can't be read or has no text (like a scanned PDF).
 */
export async function extractUploadText(uploadId: string, filePath: string): Promise<void> {
  let text = "";
  try {
    const { data, error } = await db.storage.from(UPLOAD_BUCKET).download(filePath);
    if (error) throw error;
    text = await readText(Buffer.from(await data.arrayBuffer()));
  } catch (error) {
    console.error(`Couldn't read upload ${uploadId}`, error);
  }

  const { error } = await db
    .from("uploads")
    .update(text ? { status: "ready", text } : { status: "failed" })
    .eq("id", uploadId);
  if (error) throw error;
}
