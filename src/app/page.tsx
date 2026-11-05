import { BottomNav } from "@/components/BottomNav";
import { FlameIcon } from "@/components/icons";
import { ModuleList } from "@/components/home/ModuleList";
import { TodayReviewCard } from "@/components/home/TodayReviewCard";
import { getStreak } from "@/lib/db/history";
import { getModules } from "@/lib/db/modules";
import { WIDE_PAGE } from "@/lib/layout";

// Always read fresh data instead of building the page once.
export const dynamic = "force-dynamic";

export default async function Home() {
  const [modules, streak] = await Promise.all([getModules(), getStreak()]);
  const cardsDue = modules.reduce((total, m) => total + m.cardsDue, 0);

  return (
    <>
      <main className={`mx-auto flex flex-col gap-7 px-5 pt-7 pb-32 ${WIDE_PAGE}`}>
        <header className="flex items-center justify-between">
          <h1 className="text-[26px] font-extrabold tracking-tight">StudyBud</h1>
          <span
            className="border-ink flex h-10 items-center gap-1.5 rounded-full border-2 bg-white px-3.5 text-[15px] font-extrabold"
            aria-label={`${streak} day streak`}
          >
            <FlameIcon />
            {streak}
          </span>
        </header>

        <div className="flex flex-col gap-7 md:grid md:grid-cols-[2fr_3fr] md:items-start">
          <TodayReviewCard cardsDue={cardsDue} />
          <ModuleList modules={modules} />
        </div>
      </main>
      <BottomNav />
    </>
  );
}
