import { BottomNav } from "@/components/BottomNav";
import { FlameIcon } from "@/components/icons";
import { getProgress } from "@/lib/db/history";
import { moduleBgClass, scoreBgClass } from "@/lib/colors";
import { WIDE_PAGE } from "@/lib/layout";

export const dynamic = "force-dynamic";

const WEEKDAY = new Intl.DateTimeFormat("en-ZA", { weekday: "narrow", timeZone: "UTC" });

export default async function ProgressPage() {
  const progress = await getProgress();
  const { memory, cardsThisWeek } = progress;
  const cardsTotal = memory.lockedIn + memory.gettingThere + memory.stillLearning;
  const memoryGroups = [
    { label: "Locked in", hint: "a week or more", count: memory.lockedIn, color: "bg-lime" },
    { label: "Getting there", hint: "1 to 3 days", count: memory.gettingThere, color: "bg-butter" },
    {
      label: "Still learning",
      hint: "new or missed",
      count: memory.stillLearning,
      color: "bg-white",
    },
  ];

  return (
    <>
      <main className={`mx-auto flex flex-col gap-7 px-5 pt-7 pb-32 ${WIDE_PAGE}`}>
        <header>
          <h1 className="text-[30px] leading-none font-extrabold tracking-tight">Progress</h1>
          <p className="text-ink-soft pt-1.5 text-[15px] font-semibold">
            How your studying is going. Keep the streak alive.
          </p>
        </header>

        <div className="flex flex-col gap-7 md:grid md:grid-cols-2 md:items-start">
          <section className="border-ink bg-butter shadow-pop flex flex-col gap-4 rounded-[28px] border-2 p-6">
            <p className="flex items-center gap-2 font-extrabold tracking-tight">
              <FlameIcon size={36} />
              <span className="text-[52px] leading-none">{progress.streak}</span>
              <span className="text-2xl leading-none">
                {progress.streak === 1 ? "day" : "days"} in a row
              </span>
            </p>
            <ol className="grid grid-cols-7 gap-1.5" aria-label="The last 7 days">
              {progress.week.map(({ day, studied }) => (
                <li key={day} className="flex flex-col items-center gap-1">
                  <span
                    className={`border-ink size-8 rounded-full border-2 ${studied ? "bg-ink" : "bg-white"}`}
                    aria-label={`${day}: ${studied ? "studied" : "no study"}`}
                  />
                  <span className="text-[13px] font-extrabold">
                    {WEEKDAY.format(new Date(`${day}T00:00:00Z`))}
                  </span>
                </li>
              ))}
            </ol>
          </section>

          <section className="border-ink bg-sky shadow-pop flex flex-col gap-4 rounded-[28px] border-2 p-6">
            <h2 className="text-xl font-extrabold">How well you remember</h2>
            <div
              className="border-ink flex h-5 overflow-hidden rounded-full border-2 bg-white"
              aria-hidden="true"
            >
              {cardsTotal > 0 &&
                memoryGroups.map(({ label, count, color }) => (
                  <div
                    key={label}
                    className={`border-ink h-full not-last:border-r-2 ${color}`}
                    style={{
                      width: `${(count / cardsTotal) * 100}%`,
                      display: count ? undefined : "none",
                    }}
                  />
                ))}
            </div>
            <ul className="flex flex-col gap-2">
              {memoryGroups.map(({ label, hint, count, color }) => (
                <li key={label} className="flex items-center gap-3">
                  <span className={`border-ink size-4 shrink-0 rounded-full border-2 ${color}`} />
                  <span className="flex-1 text-[15px] font-extrabold">
                    {label} <span className="font-semibold">· {hint}</span>
                  </span>
                  <span className="text-lg font-extrabold">{count}</span>
                </li>
              ))}
            </ul>
            <p className="border-ink border-t-2 border-dashed pt-3 text-[15px] font-semibold">
              {cardsThisWeek.practised === 0
                ? "No cards practised this week yet."
                : `This week: ${cardsThisWeek.practised} ${cardsThisWeek.practised === 1 ? "card" : "cards"} practised, ${cardsThisWeek.remembered} remembered.`}
            </p>
          </section>
        </div>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-extrabold">Quiz scores</h2>
          {progress.quizzes.length === 0 ? (
            <p className="text-ink-soft text-[15px] font-semibold">No quizzes yet.</p>
          ) : (
            <ul className="flex flex-col gap-3 md:grid md:grid-cols-2">
              {progress.quizzes.map((quiz) => (
                <li
                  key={quiz.moduleId}
                  className="border-ink flex items-center gap-4 rounded-[22px] border-2 bg-white p-4"
                >
                  <span
                    className={`border-ink size-4 shrink-0 rounded-full border-2 ${moduleBgClass[quiz.color]}`}
                  />
                  <span className="flex flex-1 flex-col">
                    <span className="text-lg leading-tight font-extrabold">{quiz.moduleName}</span>
                    <span className="text-ink-soft text-[13px] font-semibold">
                      {trendLabel(quiz.correct / quiz.total, quiz.previousRatio)}
                    </span>
                  </span>
                  <span
                    className={`border-ink rounded-full border-2 px-3 py-1 text-[15px] font-extrabold ${scoreBgClass(quiz.correct, quiz.total)}`}
                  >
                    {quiz.correct}/{quiz.total}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
      <BottomNav />
    </>
  );
}

function trendLabel(ratio: number, previous: number | null): string {
  if (previous === null) return "First try";
  if (ratio > previous) return "Up from last time";
  if (ratio < previous) return "Down from last time";
  return "Same as last time";
}
