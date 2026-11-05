import type { KeyIdea } from "@/lib/types";

// Badge colours cycle through the Pop palette.
const BADGE_COLORS = ["bg-lime", "bg-sky", "bg-coral", "bg-butter"];

export function KeyIdeaList({ ideas }: { ideas: KeyIdea[] }) {
  return (
    <ol className="flex flex-col gap-3 md:grid md:grid-cols-2">
      {ideas.map((idea, index) => (
        <li
          key={idea.heading}
          className="border-ink flex gap-3.5 rounded-[20px] border-2 bg-white px-4 py-3.5"
        >
          <span
            aria-hidden="true"
            className={`border-ink flex size-8.5 shrink-0 items-center justify-center rounded-full border-2 font-extrabold ${BADGE_COLORS[index % BADGE_COLORS.length]}`}
          >
            {index + 1}
          </span>
          <span className="flex flex-col gap-1">
            <span className="text-lg font-extrabold">{idea.heading}</span>
            <span className="text-ink/85 text-[15px] leading-snug">{idea.body}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}
