"use client";

import Link from "next/link";
import { useState } from "react";
import { CloseIcon } from "../icons";
import { ProgressBar } from "../ProgressBar";
import { RATINGS } from "@/lib/review";
import type { Flashcard } from "@/lib/types";

type Props = {
  cards: Flashcard[];
  exitHref: string;
};

export function CardReview({ cards, exitHref }: Props) {
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const isFinished = index >= cards.length;
  const card = cards[index];

  // Step 10 will also save the rating and schedule the card's next review.
  function next() {
    setIsFlipped(false);
    setIndex((i) => i + 1);
  }

  return (
    <div className="flex flex-col gap-7">
      <div className="flex items-center gap-3">
        <Link
          href={exitHref}
          aria-label="Close review"
          className="border-ink flex size-11 shrink-0 items-center justify-center rounded-full border-2 bg-white"
        >
          <CloseIcon size={18} />
        </Link>
        <ProgressBar value={index} max={cards.length} color="bg-coral" label="Review progress" />
        <span className="text-[15px] font-extrabold">
          {Math.min(index + 1, cards.length)}/{cards.length}
        </span>
      </div>

      {isFinished ? (
        <div className="border-ink bg-lime shadow-pop flex flex-col items-center gap-4 rounded-[28px] border-2 p-7 text-center">
          <p className="text-4xl font-extrabold tracking-tight">All done for today</p>
          <p className="text-[15px] font-semibold">{cards.length} cards reviewed</p>
          <Link
            href={exitHref}
            className="border-ink bg-ink flex h-14 w-full items-center justify-center rounded-2xl border-2 text-[17px] font-extrabold text-white"
          >
            Back
          </Link>
        </div>
      ) : (
        <>
          <div className="relative h-[430px]">
            <div className="border-ink bg-sky absolute inset-0 translate-x-3.5 translate-y-3.5 rounded-[30px] border-2" />
            <div className="border-ink bg-lime absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-[30px] border-2" />
            <button
              type="button"
              onClick={() => setIsFlipped((f) => !f)}
              aria-label={isFlipped ? "Card answer. Tap to see question" : "Tap to flip card"}
              className="border-ink absolute inset-0 flex flex-col justify-between rounded-[30px] border-2 bg-white p-6 text-left"
            >
              <span className="text-[30px] leading-tight font-extrabold tracking-tight">
                {card.front}
              </span>
              {isFlipped ? (
                <span className="border-ink flex flex-col gap-2 border-t-2 border-dashed pt-4">
                  <span className="text-[22px] leading-snug font-semibold">{card.back}</span>
                  <span className="text-ink-soft text-[13px] font-semibold">{card.source}</span>
                </span>
              ) : (
                <span className="text-ink-soft text-[15px] font-semibold">Tap to flip</span>
              )}
            </button>
          </div>

          {isFlipped ? (
            <div className="grid grid-cols-4 gap-2" aria-label="How well did you remember?">
              {RATINGS.map(({ value, label, hint, color }) => (
                <button
                  key={value}
                  type="button"
                  onClick={next}
                  className={`border-ink flex h-19 flex-col items-center justify-center gap-0.5 rounded-[18px] border-2 text-base font-extrabold ${color}`}
                >
                  {label}
                  <span className="text-xs font-semibold">{hint}</span>
                </button>
              ))}
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
