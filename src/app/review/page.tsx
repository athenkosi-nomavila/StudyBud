import { CardReview } from "@/components/cards/CardReview";
import { getSampleCards } from "@/lib/sample-data";

export default function ReviewPage() {
  return (
    <main className="mx-auto max-w-md px-5 pt-5 pb-10">
      <CardReview cards={getSampleCards()} exitHref="/" />
    </main>
  );
}
