"use client";

import { useState, useTransition } from "react";

type Props = {
  /** What the first button says, e.g. "Delete module". */
  label: string;
  /** The question asked before deleting. */
  question: string;
  /** Deletes the thing. Returns ok: false if it failed. */
  onDelete: () => Promise<{ ok: boolean }>;
  /** Show a small × instead of a full-width button. */
  compact?: boolean;
};

/** A delete button that asks "are you sure?" in place, before deleting. */
export function ConfirmDelete({ label, question, onDelete, compact = false }: Props) {
  const [isAsking, setIsAsking] = useState(false);
  const [failed, setFailed] = useState(false);
  const [isPending, startTransition] = useTransition();

  function confirm() {
    setFailed(false);
    startTransition(async () => {
      const result = await onDelete();
      if (!result.ok) setFailed(true);
    });
  }

  if (!isAsking) {
    return compact ? (
      <button
        type="button"
        onClick={() => setIsAsking(true)}
        aria-label={label}
        className="border-ink flex size-9 shrink-0 items-center justify-center rounded-full border-2 bg-white text-lg leading-none font-extrabold"
      >
        ×
      </button>
    ) : (
      <button
        type="button"
        onClick={() => setIsAsking(true)}
        className="border-ink bg-coral h-14.5 rounded-[18px] border-2 text-[17px] font-extrabold"
      >
        {label}
      </button>
    );
  }

  return (
    <div className="border-ink bg-coral flex w-full flex-col gap-3 rounded-[18px] border-2 p-4">
      <p className="text-[15px] font-extrabold">{question}</p>
      {failed && (
        <p role="alert" className="text-[15px] font-semibold">
          Couldn&apos;t delete. Check your connection and try again.
        </p>
      )}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={() => setIsAsking(false)}
          disabled={isPending}
          className="border-ink h-12 rounded-[14px] border-2 bg-white font-extrabold"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={confirm}
          disabled={isPending}
          className="border-ink bg-ink h-12 rounded-[14px] border-2 font-extrabold text-white disabled:opacity-60"
        >
          {isPending ? "Deleting…" : "Yes, delete"}
        </button>
      </div>
    </div>
  );
}
