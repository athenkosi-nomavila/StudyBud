import Link from "next/link";

// Rough guide: about 20 seconds per card.
const SECONDS_PER_CARD = 20;

export function TodayReviewCard({ cardsDue }: { cardsDue: number }) {
  const minutes = Math.max(1, Math.round((cardsDue * SECONDS_PER_CARD) / 60));

  return (
    <section className="flex flex-col gap-1.5 rounded-[28px] border-2 border-ink bg-coral p-6 shadow-pop">
      <h2 className="text-[15px] font-semibold">Today&apos;s review</h2>
      <p className="text-[52px] font-extrabold leading-none tracking-tight">
        {cardsDue} cards
      </p>
      <p className="text-[15px] font-semibold">≈ {minutes} minutes</p>
      <Link
        href="/review"
        className="mt-3.5 flex h-14 items-center justify-center rounded-2xl border-2 border-ink bg-ink text-[17px] font-extrabold text-white"
      >
        Let&apos;s go
      </Link>
    </section>
  );
}
