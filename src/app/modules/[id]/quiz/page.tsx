import { notFound } from "next/navigation";
import { BackLink } from "@/components/BackLink";
import { QuizRunner } from "@/components/quiz/QuizRunner";
import { shuffleQuiz } from "@/lib/quiz";
import { getModule } from "@/lib/db/modules";
import { getQuiz } from "@/lib/db/study";

export default async function QuizPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [studyModule, quiz] = await Promise.all([getModule(id), getQuiz(id)]);
  if (!studyModule) notFound();

  // Shuffled per visit so she can't just remember answer positions.
  const questions = shuffleQuiz(quiz);

  return (
    <main className="mx-auto flex max-w-md flex-col gap-5 px-5 pt-5 pb-10">
      {questions.length > 0 ? (
        <QuizRunner questions={questions} exitHref={`/modules/${id}`} />
      ) : (
        <>
          <BackLink href={`/modules/${id}`} />
          <p className="text-ink-soft text-[15px] font-semibold">No quiz yet.</p>
        </>
      )}
    </main>
  );
}
