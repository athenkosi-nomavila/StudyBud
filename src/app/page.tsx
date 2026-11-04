import { BottomNav } from "@/components/BottomNav";
import { FlameIcon } from "@/components/icons";
import { ModuleList } from "@/components/home/ModuleList";
import { TodayReviewCard } from "@/components/home/TodayReviewCard";
import { getModules } from "@/lib/db/modules";

// Always read fresh data instead of building the page once.
export const dynamic = "force-dynamic";

// Placeholder until study history is saved.
const STREAK_DAYS = 5;

export default async function Home() {
  const modules = await getModules();
  const cardsDue = modules.reduce((total, m) => total + m.cardsDue, 0);

  return (
    <>
      <main className="mx-auto flex max-w-md flex-col gap-7 px-5 pt-7 pb-32">
        <header className="flex items-center justify-between">
          <h1 className="text-[26px] font-extrabold tracking-tight">StudyBud</h1>
          <span
            className="border-ink flex h-10 items-center gap-1.5 rounded-full border-2 bg-white px-3.5 text-[15px] font-extrabold"
            aria-label={`${STREAK_DAYS} day streak`}
          >
            <FlameIcon />
            {STREAK_DAYS}
          </span>
        </header>

        <TodayReviewCard cardsDue={cardsDue} />
        <ModuleList modules={modules} />
      </main>
      <BottomNav />
    </>
  );
}
