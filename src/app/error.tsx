"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";
import { StatusScreen } from "@/components/StatusScreen";

// Shown instead of a blank error page when a page fails to load, e.g. the database is unreachable.
export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  function tryAgain() {
    // Fetch the page from the server again, then redraw it.
    startTransition(() => {
      router.refresh();
      reset();
    });
  }

  return (
    <StatusScreen
      title="Something went wrong"
      message="This page didn't load. Check your connection and try again."
      action={
        <button
          type="button"
          onClick={tryAgain}
          className="border-ink bg-ink h-14 w-full rounded-2xl border-2 text-[17px] font-extrabold text-white"
        >
          Try again
        </button>
      }
    />
  );
}
