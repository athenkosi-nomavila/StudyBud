import Link from "next/link";

// Rough guide: about 20 seconds per card.
const SECONDS_PER_CARD = 20;

export function TodayReviewCard({ cardsDue }: { cardsDue: number }) {
  const minutes = Math.max(1, Math.round((cardsDue * SECONDS_PER_CARD) / 60));
  const hasCards = cardsDue > 0;

  return (
    <section>
      <h2 className="pb-3 text-xl font-extrabold">Flashcards</h2>
      <div className="border-ink bg-coral shadow-pop flex flex-col gap-1.5 rounded-[28px] border-2 p-6">
        <p className="text-[52px] leading-none font-extrabold tracking-tight">
          {hasCards ? `${cardsDue} ${cardsDue === 1 ? "card" : "cards"} due` : "All caught up"}
        </p>
        {hasCards && (
          <>
            <p className="text-[15px] font-semibold">
              ≈ {minutes} {minutes === 1 ? "minute" : "minutes"}
            </p>
            <Link
              href="/review"
              className="border-ink bg-ink mt-3.5 flex h-14 items-center justify-center rounded-2xl border-2 text-[17px] font-extrabold text-white"
            >
              Test my memory
            </Link>
          </>
        )}
      </div>
    </section>
  );
}
