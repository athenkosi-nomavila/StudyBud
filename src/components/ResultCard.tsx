import Link from "next/link";
import { scoreBgClass } from "@/lib/colors";

type Props = {
  correct: number;
  total: number;
  onRetry: () => void;
  exitHref: string;
  /** The score text. */
  children: React.ReactNode;
};

/** The end of a quiz or flashcard round: score in green, amber or red, then Try again or Back. */
export function ResultCard({ correct, total, onRetry, exitHref, children }: Props) {
  return (
    <div
      className={`border-ink shadow-pop flex flex-col items-center gap-4 rounded-[28px] border-2 p-7 text-center ${scoreBgClass(correct, total)}`}
    >
      {children}
      <div className="flex w-full flex-col gap-2.5 pt-2">
        <button
          type="button"
          onClick={onRetry}
          className="border-ink bg-ink h-14 w-full rounded-2xl border-2 text-[17px] font-extrabold text-white"
        >
          Try again
        </button>
        <Link
          href={exitHref}
          className="border-ink flex h-14 w-full items-center justify-center rounded-2xl border-2 bg-white text-[17px] font-extrabold"
        >
          Back
        </Link>
      </div>
    </div>
  );
}
