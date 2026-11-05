"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createModule,
  deleteModule,
  deleteUpload,
  updateModule,
  type NewModule,
} from "@/lib/db/modules";
import { MODULE_COLORS } from "@/lib/colors";
import type { ModuleColor } from "@/lib/types";

const COLORS = MODULE_COLORS.map((color) => color.value);
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const MAX_NAME_LENGTH = 60;

export type ModuleFormState = { message: string };

/** Reads the module form, or returns what's wrong with it. */
function readForm(form: FormData): NewModule | string {
  const name = String(form.get("name") ?? "").trim();
  const color = String(form.get("color") ?? "") as ModuleColor;
  const examDate = String(form.get("examDate") ?? "");

  if (!name) return "Give the module a name.";
  if (name.length > MAX_NAME_LENGTH) return "That name is too long.";
  if (!COLORS.includes(color)) return "Pick a colour.";
  if (examDate && !ISO_DATE.test(examDate)) return "That exam date isn't valid.";
  return { name, color, examDate: examDate || null };
}

/** Creates a module from the New module form, then opens it. */
export async function addModule(_state: ModuleFormState, form: FormData): Promise<ModuleFormState> {
  const fields = readForm(form);
  if (typeof fields === "string") return { message: fields };

  let id: string;
  try {
    id = await createModule(fields);
  } catch {
    return { message: "Couldn't save the module. Check your connection and try again." };
  }
  redirect(`/modules/${id}`);
}

/** Saves changes from the Edit module form, then goes back to the module. */
export async function saveModule(
  id: string,
  _state: ModuleFormState,
  form: FormData,
): Promise<ModuleFormState> {
  const fields = readForm(form);
  if (typeof fields === "string") return { message: fields };

  try {
    await updateModule(id, fields);
  } catch {
    return { message: "Couldn't save the changes. Check your connection and try again." };
  }
  redirect(`/modules/${id}`);
}

/** Deletes a module and everything in it, then goes home. */
export async function removeModule(id: string): Promise<{ ok: boolean }> {
  try {
    await deleteModule(id);
  } catch {
    return { ok: false };
  }
  redirect("/");
}

/** Deletes one upload and the notes, quiz and cards made from it. */
export async function removeUpload(uploadId: string, moduleId: string): Promise<{ ok: boolean }> {
  try {
    await deleteUpload(uploadId);
  } catch {
    return { ok: false };
  }
  revalidatePath(`/modules/${moduleId}`);
  return { ok: true };
}
