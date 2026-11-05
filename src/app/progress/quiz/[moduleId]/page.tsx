import Link from "next/link";
import { notFound } from "next/navigation";
import { BackLink } from "@/components/BackLink";
import { CheckIcon, CloseIcon } from "@/components/icons";
import { getLatestQuiz } from "@/lib/db/history";
import { scoreBgClass } from "@/lib/colors";
import { FOCUSED_PAGE } from "@/lib/layout";

export const dynamic = "force-dynamic";

/** Her latest quiz in a module: each question, what she picked and the right answer. */
export default async function QuizResultPage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const quiz = await getLatestQuiz(moduleId);
  if (!quiz) notFound();

  return (
    <main className={`mx-auto flex flex-col gap-6 px-5 pt-5 pb-10 ${FOCUSED_PAGE}`}>
      <BackLink href="/progress" />
      <header className="flex items-center gap-4">
        <div className="flex-1">
          <h1 className="text-[30px] leading-none font-extrabold tracking-tight">
            {quiz.moduleName}
          </h1>
          <p className="text-ink-soft pt-1.5 text-[15px] font-semibold">Your last quiz</p>
        </div>
        <span
          className={`border-ink rounded-full border-2 px-4 py-1.5 text-xl font-extrabold ${scoreBgClass(quiz.correct, quiz.total)}`}
        >
          {quiz.correct}/{quiz.total}
        </span>
      </header>

      {quiz.answers ? (
        <ol className="flex flex-col gap-3">
          {quiz.answers.map((answer, index) => {
            const isRight = answer.picked === answer.answer;
            return (
              <li
                key={index}
                className="border-ink flex flex-col gap-2.5 rounded-[22px] border-2 bg-white p-4"
              >
                <p className="text-lg leading-tight font-extrabold">{answer.question}</p>
                <p
                  className={`border-ink flex items-center gap-2 rounded-2xl border-2 px-3.5 py-2.5 text-[15px] font-extrabold ${isRight ? "bg-lime" : "bg-coral"}`}
                >
                  <span className="flex-1">{answer.picked}</span>
                  <span aria-label={isRight ? "Correct" : "Wrong"}>
                    {isRight ? <CheckIcon /> : <CloseIcon />}
                  </span>
                </p>
                {!isRight && (
                  <p className="border-ink bg-lime flex items-center gap-2 rounded-2xl border-2 px-3.5 py-2.5 text-[15px] font-extrabold">
                    <span className="flex-1">{answer.answer}</span>
                    <span aria-label="Right answer">
                      <CheckIcon />
                    </span>
                  </p>
                )}
                <p className="text-ink/85 text-[15px] leading-snug">{answer.explanation}</p>
              </li>
            );
          })}
        </ol>
      ) : (
        <p className="text-ink-soft text-[15px] font-semibold">
          Answers show for quizzes taken from now on.
        </p>
      )}

      <Link
        href={`/modules/${moduleId}/quiz`}
        className="border-ink bg-ink flex h-15 items-center justify-center rounded-[18px] border-2 text-lg font-extrabold text-white"
      >
        Try again
      </Link>
    </main>
  );
}
