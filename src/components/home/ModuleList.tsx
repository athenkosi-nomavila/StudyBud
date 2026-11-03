import Link from "next/link";
import type { ModuleColor, StudyModule } from "@/lib/types";
import { ArrowRightIcon } from "../icons";

const colorClasses: Record<ModuleColor, string> = {
  lime: "bg-lime",
  sky: "bg-sky",
  butter: "bg-butter",
  coral: "bg-coral",
};

export function ModuleList({ modules }: { modules: StudyModule[] }) {
  return (
    <section>
      <div className="flex items-center justify-between pb-3">
        <h2 className="text-xl font-extrabold">Modules</h2>
        <button
          type="button"
          className="border-ink h-11 rounded-full border-2 bg-white px-4 text-[15px] font-extrabold"
        >
          + Add
        </button>
      </div>

      <ul className="flex flex-col gap-3">
        {modules.map((module) => (
          <li key={module.id}>
            <Link
              href={`/modules/${module.id}`}
              className={`border-ink flex items-center justify-between rounded-[22px] border-2 px-[18px] py-4 ${colorClasses[module.color]}`}
            >
              <span className="flex flex-col gap-0.5">
                <span className="text-[19px] font-extrabold">{module.name}</span>
                <span className="text-sm font-semibold">{module.cardsDue} due</span>
              </span>
              <ArrowRightIcon size={24} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
