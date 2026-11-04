import Link from "next/link";

// Rough guide: about 20 seconds per card.
const SECONDS_PER_CARD = 20;

export function TodayReviewCard({ cardsDue }: { cardsDue: number }) {
  const minutes = Math.max(1, Math.round((cardsDue * SECONDS_PER_CARD) / 60));

  return (
    <section className="border-ink bg-coral shadow-pop flex flex-col gap-1.5 rounded-[28px] border-2 p-6">
      <h2 className="text-[15px] font-semibold">Today&apos;s review</h2>
      <p className="text-[52px] leading-none font-extrabold tracking-tight">{cardsDue} cards</p>
      <p className="text-[15px] font-semibold">
        ≈ {minutes} {minutes === 1 ? "minute" : "minutes"}
      </p>
      <Link
        href="/review"
        className="border-ink bg-ink mt-3.5 flex h-14 items-center justify-center rounded-2xl border-2 text-[17px] font-extrabold text-white"
      >
        Let&apos;s go
      </Link>
    </section>
  );
}
