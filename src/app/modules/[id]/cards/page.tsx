import { notFound } from "next/navigation";
import { BackLink } from "@/components/BackLink";
import { CardReview } from "@/components/cards/CardReview";
import { getModule } from "@/lib/db/modules";
import { getModuleCards } from "@/lib/db/study";

export default async function ModuleCardsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!(await getModule(id))) notFound();

  const cards = await getModuleCards(id);

  return (
    <main className="mx-auto flex max-w-md flex-col gap-5 px-5 pt-5 pb-10">
      {cards.length > 0 ? (
        <CardReview cards={cards} exitHref={`/modules/${id}`} />
      ) : (
        <>
          <BackLink href={`/modules/${id}`} />
          <p className="text-ink-soft text-[15px] font-semibold">No cards yet.</p>
        </>
      )}
    </main>
  );
}
