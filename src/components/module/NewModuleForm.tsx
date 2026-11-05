"use client";

import { useActionState } from "react";
import { addModule } from "@/app/modules/new/actions";
import { moduleBgClass } from "@/lib/colors";
import type { ModuleColor } from "@/lib/types";

const COLORS: { value: ModuleColor; label: string }[] = [
  { value: "lime", label: "Green" },
  { value: "sky", label: "Blue" },
  { value: "butter", label: "Yellow" },
  { value: "coral", label: "Red" },
];

const FIELD = "border-ink h-13 rounded-2xl border-2 bg-white px-3.5 text-[17px] font-extrabold";

export function NewModuleForm() {
  const [state, formAction, isPending] = useActionState(addModule, { message: "" });

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-[15px] font-extrabold">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          maxLength={60}
          placeholder="e.g. Psychology 101"
          autoComplete="off"
          className={`${FIELD} placeholder:text-ink-soft placeholder:font-semibold`}
        />
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="pb-2 text-[15px] font-extrabold">Colour</legend>
        <div className="flex gap-3">
          {COLORS.map(({ value, label }, index) => (
            <label key={value} className="cursor-pointer">
              <input
                type="radio"
                name="color"
                value={value}
                defaultChecked={index === 0}
                aria-label={label}
                className="peer sr-only"
              />
              <span
                className={`border-ink peer-checked:ring-ink peer-focus-visible:ring-ink/40 block size-13 rounded-full border-2 peer-checked:ring-4 peer-checked:ring-offset-2 peer-focus-visible:ring-4 ${moduleBgClass[value]}`}
              />
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-2">
        <label htmlFor="examDate" className="text-[15px] font-extrabold">
          Exam date <span className="text-ink-soft font-semibold">(optional)</span>
        </label>
        <input id="examDate" name="examDate" type="date" className={FIELD} />
      </div>

      {state.message && (
        <p
          role="alert"
          className="border-ink bg-coral rounded-2xl border-2 px-4 py-3 text-[15px] font-extrabold"
        >
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="border-ink bg-ink h-14.5 rounded-[18px] border-2 text-[17px] font-extrabold text-white disabled:opacity-60"
      >
        {isPending ? "Creating…" : "Create"}
      </button>
    </form>
  );
}
