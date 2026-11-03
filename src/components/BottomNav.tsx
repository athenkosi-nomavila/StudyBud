"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CardsIcon, HomeIcon, UploadIcon } from "./icons";

const items = [
  { href: "/", label: "Home", Icon: HomeIcon },
  { href: "/review", label: "Review", Icon: CardsIcon },
  { href: "/upload", label: "Upload", Icon: UploadIcon },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-5 bottom-5 mx-auto flex h-16 max-w-md items-center justify-around rounded-full bg-ink">
      {items.map(({ href, label, Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-label={label}
            aria-current={active ? "page" : undefined}
            className={`flex h-11 w-14 items-center justify-center rounded-full ${
              active ? "bg-white text-ink" : "text-white"
            }`}
          >
            <Icon />
          </Link>
        );
      })}
    </nav>
  );
}
