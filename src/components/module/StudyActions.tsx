import Link from "next/link";
import { CardsIcon, NotesIcon, QuizIcon } from "../icons";

const actions = [
  { path: "notes", label: "Notes", Icon: NotesIcon, accent: "bg-butter" },
  { path: "quiz", label: "Quiz", Icon: QuizIcon, accent: "bg-sky" },
  { path: "cards", label: "Cards", Icon: CardsIcon, accent: "bg-coral" },
];

export function StudyActions({ moduleId }: { moduleId: string }) {
  return (
    <nav aria-label="Study this module" className="grid grid-cols-3 gap-2.5">
      {actions.map(({ path, label, Icon, accent }) => (
        <Link
          key={path}
          href={`/modules/${moduleId}/${path}`}
          className="border-ink shadow-pop-sm flex h-24 flex-col items-center justify-center gap-2 rounded-[20px] border-2 bg-white text-base font-extrabold"
        >
          <span
            className={`border-ink flex size-10 items-center justify-center rounded-full border-2 ${accent}`}
          >
            <Icon size={20} />
          </span>
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
}
