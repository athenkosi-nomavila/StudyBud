import { BackLink } from "@/components/BackLink";
import { CardReview } from "@/components/cards/CardReview";
import { getDueCards } from "@/lib/db/study";

// Always read fresh data so newly due cards show up.
export const dynamic = "force-dynamic";

export default async function ReviewPage() {
  const cards = await getDueCards();

  return (
    <main className="mx-auto flex max-w-md flex-col gap-5 px-5 pt-5 pb-10">
      {cards.length > 0 ? (
        <CardReview cards={cards} exitHref="/" />
      ) : (
        <>
          <BackLink href="/" />
          <p className="text-ink-soft text-[15px] font-semibold">Nothing due right now.</p>
        </>
      )}
    </main>
  );
}
