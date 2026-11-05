import Link from "next/link";
import { moduleBgClass } from "@/lib/colors";
import type { StudyModule } from "@/lib/types";
import { ArrowRightIcon } from "../icons";

export function ModuleList({ modules }: { modules: StudyModule[] }) {
  return (
    <section>
      <div className="flex items-center justify-between pb-3">
        <h2 className="text-xl font-extrabold">Modules</h2>
        <Link
          href="/modules/new"
          className="border-ink flex h-11 items-center rounded-full border-2 bg-white px-4 text-[15px] font-extrabold"
        >
          + Add
        </Link>
      </div>

      <ul className="flex flex-col gap-3 lg:grid lg:grid-cols-2">
        {modules.map((module) => (
          <li key={module.id}>
            <Link
              href={`/modules/${module.id}`}
              className={`border-ink flex items-center justify-between rounded-[22px] border-2 px-[18px] py-4 ${moduleBgClass[module.color]}`}
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
