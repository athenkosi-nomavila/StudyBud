import Link from "next/link";
import { BackLink } from "../BackLink";
import { PencilIcon } from "../icons";
import { moduleBgClass } from "@/lib/colors";
import { examCountdownLabel } from "@/lib/dates";
import { WIDE_PAGE } from "@/lib/layout";
import type { StudyModule } from "@/lib/types";

export function ModuleHeader({ module }: { module: StudyModule }) {
  return (
    <header className={`border-ink border-b-2 pt-5 pb-6 ${moduleBgClass[module.color]}`}>
      <div className={`mx-auto flex flex-col gap-3.5 px-5 ${WIDE_PAGE}`}>
        <div className="flex items-center justify-between">
          <BackLink href="/" label="Back to home" />
          <div className="flex items-center gap-2">
            {module.examDate && (
              <span className="bg-ink flex h-9 items-center rounded-full px-3.5 text-sm font-extrabold text-white">
                {examCountdownLabel(module.examDate)}
              </span>
            )}
            <Link
              href={`/modules/${module.id}/edit`}
              aria-label="Edit module"
              className="border-ink flex size-11 items-center justify-center rounded-full border-2 bg-white"
            >
              <PencilIcon size={18} />
            </Link>
          </div>
        </div>
        <h1 className="text-[40px] leading-none font-extrabold tracking-tight">{module.name}</h1>
        <p className="text-[17px] font-semibold">Study with notes, a quiz or flashcards.</p>
      </div>
    </header>
  );
}
