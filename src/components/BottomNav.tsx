"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, PlusIcon } from "./icons";

export function BottomNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isUpload = pathname === "/upload";

  return (
    <nav className="bg-ink fixed inset-x-5 bottom-5 mx-auto flex h-16 max-w-md items-center justify-around rounded-full px-2">
      <Link
        href="/"
        aria-current={isHome ? "page" : undefined}
        className={`flex h-12 items-center gap-2 rounded-full px-5 text-[15px] font-extrabold ${
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
        className={`flex h-12 items-center gap-2 rounded-full px-5 text-[15px] font-extrabold ${
          isUpload ? "text-ink bg-white" : "text-white"
        }`}
      >
        <span className="border-ink bg-coral text-ink shadow-pop-sm flex size-9 items-center justify-center rounded-full border-2">
          <PlusIcon size={18} />
        </span>
        Add notes
      </Link>
    </nav>
  );
}
