"use client";

import { useActionState, useState } from "react";
import type { ModuleFormState } from "@/app/modules/actions";
import { MAIN_COLOR_COUNT, MODULE_COLORS, moduleBgClass } from "@/lib/colors";
import type { ModuleColor } from "@/lib/types";

const FIELD = "border-ink h-13 rounded-2xl border-2 bg-white px-3.5 text-[17px] font-extrabold";

type Props = {
  /** A server action that saves the form. */
  action: (state: ModuleFormState, form: FormData) => Promise<ModuleFormState>;
  /** The module being edited, if any. */
  initial?: { name: string; color: ModuleColor; examDate?: string };
  submitLabel: string;
};

export function ModuleForm({ action, initial, submitLabel }: Props) {
  const [state, formAction, isPending] = useActionState(action, { message: "" });
  // Show every colour straight away if the module already uses one of the extras.
  const usesExtraColor =
    MODULE_COLORS.findIndex((c) => c.value === initial?.color) >= MAIN_COLOR_COUNT;
  const [showAllColors, setShowAllColors] = useState(usesExtraColor);
  const colors = showAllColors ? MODULE_COLORS : MODULE_COLORS.slice(0, MAIN_COLOR_COUNT);

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
          defaultValue={initial?.name}
          placeholder="e.g. Psychology 101"
          autoComplete="off"
          className={`${FIELD} placeholder:text-ink-soft placeholder:font-semibold`}
        />
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="pb-2 text-[15px] font-extrabold">Colour</legend>
        <div className="flex flex-wrap gap-3">
          {colors.map(({ value, label }, index) => (
            <label key={value} className="cursor-pointer">
              <input
                type="radio"
                name="color"
                value={value}
                defaultChecked={initial ? initial.color === value : index === 0}
                aria-label={label}
                className="peer sr-only"
              />
              <span
                className={`border-ink peer-checked:ring-ink peer-focus-visible:ring-ink/40 block size-13 rounded-full border-2 peer-checked:ring-4 peer-checked:ring-offset-2 peer-focus-visible:ring-4 ${moduleBgClass[value]}`}
              />
            </label>
          ))}
          {!showAllColors && (
            <button
              type="button"
              onClick={() => setShowAllColors(true)}
              aria-label="More colours"
              className="border-ink flex size-13 items-center justify-center rounded-full border-2 border-dashed bg-white text-2xl font-extrabold"
            >
              +
            </button>
          )}
        </div>
      </fieldset>

      <div className="flex flex-col gap-2">
        <label htmlFor="examDate" className="text-[15px] font-extrabold">
          Exam date <span className="text-ink-soft font-semibold">(optional)</span>
        </label>
        <input
          id="examDate"
          name="examDate"
          type="date"
          defaultValue={initial?.examDate}
          className={FIELD}
        />
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
        {isPending ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}
