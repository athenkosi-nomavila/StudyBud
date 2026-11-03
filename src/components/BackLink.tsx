import Link from "next/link";
import { BackIcon } from "./icons";

export function BackLink({ href, label = "Back" }: { href: string; label?: string }) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="border-ink flex size-11 items-center justify-center rounded-full border-2 bg-white"
    >
      <BackIcon size={20} />
    </Link>
  );
}
