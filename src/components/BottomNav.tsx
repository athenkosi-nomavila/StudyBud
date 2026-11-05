"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChartIcon, HomeIcon, PlusIcon } from "./icons";

export function BottomNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isUpload = pathname === "/upload";
  const isProgress = pathname === "/progress";

  return (
    <nav className="bg-ink fixed inset-x-5 bottom-5 mx-auto flex h-16 max-w-md items-center justify-between rounded-full px-2">
      <Link
        href="/"
        aria-current={isHome ? "page" : undefined}
        className={`flex h-13 flex-col items-center justify-center gap-0.5 rounded-full px-4 text-[12px] font-extrabold whitespace-nowrap md:h-12 md:flex-row md:gap-2 md:px-5 md:text-[15px] ${
          isHome ? "text-ink bg-white" : "text-white"
        }`}
      >
        <HomeIcon size={20} />
        Home
      </Link>

      {/* The main action: a raised coral button. */}
      <Link
        href="/upload"
        aria-current={isUpload ? "page" : undefined}
        className={`flex h-13 flex-col items-center justify-center gap-0.5 rounded-full px-4 text-[12px] font-extrabold whitespace-nowrap md:h-12 md:flex-row md:gap-2 md:px-5 md:text-[15px] ${
          isUpload ? "text-ink bg-white" : "text-white"
        }`}
      >
        <span className="border-ink bg-coral text-ink shadow-pop-sm flex size-7 items-center justify-center rounded-full border-2 md:size-9">
          <PlusIcon size={16} />
        </span>
        Add notes
      </Link>

      <Link
        href="/progress"
        aria-current={isProgress ? "page" : undefined}
        className={`flex h-13 flex-col items-center justify-center gap-0.5 rounded-full px-4 text-[12px] font-extrabold whitespace-nowrap md:h-12 md:flex-row md:gap-2 md:px-5 md:text-[15px] ${
          isProgress ? "text-ink bg-white" : "text-white"
        }`}
      >
        <ChartIcon size={20} />
        Progress
      </Link>
    </nav>
  );
}
