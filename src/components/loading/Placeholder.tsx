import { WIDE_PAGE } from "@/lib/layout";

/** A grey block that stands in for content while a page loads. */
export function Placeholder({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`bg-ink/10 animate-pulse rounded-[20px] ${className}`} />;
}

/** Wraps a page's placeholders and tells screen readers the page is loading. */
export function LoadingPage({ children }: { children: React.ReactNode }) {
  return (
    <main
      role="status"
      aria-label="Loading"
      className={`mx-auto flex flex-col gap-5 px-5 pt-5 pb-10 ${WIDE_PAGE}`}
    >
      {children}
    </main>
  );
}
