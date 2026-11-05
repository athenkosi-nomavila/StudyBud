"use client";

import Link from "next/link";
import { useState } from "react";
import { CloseIcon } from "../icons";
import { ProgressBar } from "../ProgressBar";
import { RATINGS, type Rating } from "@/lib/review";
import type { Flashcard } from "@/lib/types";

type Props = {
  cards: Flashcard[];
  /** Shown under the "Flashcards" title, e.g. "Due today" or the module name. */
  subtitle: string;
  exitHref: string;
};

export function CardReview({ cards, subtitle, exitHref }: Props) {
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [gotCount, setGotCount] = useState(0);

  const isFinished = index >= cards.length;
  const card = cards[index];

  // The AI flashcards step will also save the rating and schedule the card's next review.
  function rate(rating: Rating) {
    if (rating === "got") setGotCount((count) => count + 1);
    setIsFlipped(false);
    setIndex((i) => i + 1);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Link
          href={exitHref}
          aria-label="Close flashcards"
          className="border-ink flex size-11 shrink-0 items-center justify-center rounded-full border-2 bg-white"
        >
          <CloseIcon size={18} />
        </Link>
        <ProgressBar value={index} max={cards.length} color="bg-coral" label="Progress" />
        <span className="text-[15px] font-extrabold">
          {Math.min(index + 1, cards.length)}/{cards.length}
        </span>
      </div>

      <header>
        <h1 className="text-[30px] leading-none font-extrabold tracking-tight">Flashcards</h1>
        <p className="text-ink-soft pt-1.5 text-[15px] font-semibold">{subtitle}</p>
        <p className="pt-3 text-[17px] font-semibold">
          Test your memory. Say or write down your answer, then flip to check if it&apos;s right.
        </p>
      </header>

      {isFinished ? (
        <Results got={gotCount} total={cards.length} exitHref={exitHref} />
      ) : (
        <>
          <div className="relative h-[400px]">
            <div className="border-ink bg-sky absolute inset-0 translate-x-3.5 translate-y-3.5 rounded-[30px] border-2" />
            <div className="border-ink bg-lime absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-[30px] border-2" />
            <button
              type="button"
              onClick={() => setIsFlipped((f) => !f)}
              aria-label={isFlipped ? "Card answer. Tap to see question" : "Tap to flip card"}
              className="border-ink absolute inset-0 flex flex-col justify-between rounded-[30px] border-2 bg-white p-6 text-left"
            >
              <span className="flex flex-col gap-2">
                <CardLabel>Question</CardLabel>
                <span className="text-[28px] leading-tight font-extrabold tracking-tight">
                  {card.front}
                </span>
              </span>
              {isFlipped ? (
                <span className="border-ink flex flex-col gap-2 border-t-2 border-dashed pt-4">
                  <CardLabel>Answer</CardLabel>
                  <span className="text-[22px] leading-snug font-semibold">{card.back}</span>
                  <span className="text-ink-soft text-[13px] font-semibold">{card.source}</span>
                </span>
              ) : (
                <span className="text-ink-soft text-[15px] font-semibold">Tap to flip</span>
              )}
            </button>
          </div>

          {isFlipped ? (
            <div className="flex flex-col gap-3">
              <p className="text-center text-lg font-extrabold">Did you know it?</p>
              <div className="grid grid-cols-2 gap-2.5">
                {RATINGS.map(({ value, label, color }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => rate(value)}
                    className={`border-ink h-15 rounded-[18px] border-2 text-lg font-extrabold ${color}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsFlipped(true)}
              className="border-ink bg-ink h-15 rounded-[18px] border-2 text-lg font-extrabold text-white"
            >
              Show answer
            </button>
          )}
        </>
      )}
    </div>
  );
}

function CardLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-ink-soft text-[13px] font-extrabold tracking-wide uppercase">
      {children}
    </span>
  );
}

function Results({ got, total, exitHref }: { got: number; total: number; exitHref: string }) {
  const missed = total - got;

  return (
    <div className="border-ink bg-lime shadow-pop flex flex-col items-center gap-4 rounded-[28px] border-2 p-7 text-center">
      <p className="text-4xl font-extrabold tracking-tight">All done</p>
      <p className="text-lg font-extrabold">
        You knew {got} of {total}
      </p>
      {missed > 0 && <p className="text-[15px] font-semibold">{missed} to practise again</p>}
      <Link
        href={exitHref}
        className="border-ink bg-ink flex h-14 w-full items-center justify-center rounded-2xl border-2 text-[17px] font-extrabold text-white"
      >
        Back
      </Link>
    </div>
  );
}
