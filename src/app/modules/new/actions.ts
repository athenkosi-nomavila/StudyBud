"use server";

import { redirect } from "next/navigation";
import { createModule } from "@/lib/db/modules";
import type { ModuleColor } from "@/lib/types";

const COLORS: ModuleColor[] = ["lime", "sky", "butter", "coral"];
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const MAX_NAME_LENGTH = 60;

export type NewModuleState = { message: string };

/** Creates a module from the New module form, then opens it. */
export async function addModule(_state: NewModuleState, form: FormData): Promise<NewModuleState> {
  const name = String(form.get("name") ?? "").trim();
  const color = String(form.get("color") ?? "") as ModuleColor;
  const examDate = String(form.get("examDate") ?? "");

  if (!name) return { message: "Give the module a name." };
  if (name.length > MAX_NAME_LENGTH) return { message: "That name is too long." };
  if (!COLORS.includes(color)) return { message: "Pick a colour." };
  if (examDate && !ISO_DATE.test(examDate)) return { message: "That exam date isn't valid." };

  let id: string;
  try {
    id = await createModule({ name, color, examDate: examDate || null });
  } catch {
    return { message: "Couldn't save the module. Check your connection and try again." };
  }
  redirect(`/modules/${id}`);
}
