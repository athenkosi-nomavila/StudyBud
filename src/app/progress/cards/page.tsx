import { BackLink } from "@/components/BackLink";
import { getCardsThisWeek, type CardSeen } from "@/lib/db/history";
import { FOCUSED_PAGE } from "@/lib/layout";

export const dynamic = "force-dynamic";

/** The cards she practised in the last 7 days, split into remembered and missed. */
export default async function CardsWeekPage() {
  const week = await getCardsThisWeek();
  const isEmpty = week.remembered.length + week.missed.length === 0;

  return (
    <main className={`mx-auto flex flex-col gap-6 px-5 pt-5 pb-10 ${FOCUSED_PAGE}`}>
      <BackLink href="/progress" />
      <header>
        <h1 className="text-[30px] leading-none font-extrabold tracking-tight">
          This week&apos;s cards
        </h1>
        <p className="text-ink-soft pt-1.5 text-[15px] font-semibold">The last 7 days</p>
      </header>

      {isEmpty ? (
        <p className="text-ink-soft text-[15px] font-semibold">
          {week.unlisted > 0
            ? "Cards show here from your next practice."
            : "No cards practised this week yet."}
        </p>
      ) : (
        <>
          <CardGroup title="Missed" cards={week.missed} color="bg-coral" />
          <CardGroup title="Remembered" cards={week.remembered} color="bg-lime" />
          {week.unlisted > 0 && (
            <p className="text-ink-soft text-[13px] font-semibold">
              {week.unlisted} earlier {week.unlisted === 1 ? "rating isn't" : "ratings aren't"}{" "}
              listed.
            </p>
          )}
        </>
      )}
    </main>
  );
}

function CardGroup({ title, cards, color }: { title: string; cards: CardSeen[]; color: string }) {
  if (cards.length === 0) return null;
  return (
    <section className="flex flex-col gap-3">
      <h2 className="flex items-center gap-2 text-xl font-extrabold">
        <span className={`border-ink size-4 shrink-0 rounded-full border-2 ${color}`} />
        {title} <span className="text-ink-soft">· {cards.length}</span>
      </h2>
      <ul className="flex flex-col gap-2.5">
        {cards.map((card) => (
          <li
            key={card.front}
            className={`border-ink flex flex-col gap-1 rounded-[22px] border-2 p-4 ${color}`}
          >
            <p className="text-[17px] leading-tight font-extrabold">{card.front}</p>
            <p className="text-ink/85 text-[15px] leading-snug">{card.back}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
