"use client";

import Link from "next/link";
import { useState } from "react";
import { CloseIcon } from "../icons";
import { ProgressBar } from "../ProgressBar";
import { AnswerOption, type AnswerState } from "./AnswerOption";
import { shuffleQuiz } from "@/lib/quiz";
import type { QuizQuestion } from "@/lib/types";

type Props = {
  questions: QuizQuestion[];
  /** Shown under the "Quiz" title: the module name. */
  subtitle: string;
  exitHref: string;
};

export function QuizRunner({ questions: initialQuestions, subtitle, exitHref }: Props) {
  const [questions, setQuestions] = useState(initialQuestions);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const isFinished = index >= questions.length;
  const question = questions[index];
  const hasAnswered = picked !== null;

  function pick(optionIndex: number) {
    setPicked(optionIndex);
    if (optionIndex === question.answerIndex) setScore((s) => s + 1);
  }

  function next() {
    setPicked(null);
    setIndex((i) => i + 1);
  }

  function restart() {
    setQuestions(shuffleQuiz(initialQuestions));
    setIndex(0);
    setPicked(null);
    setScore(0);
  }

  function optionState(optionIndex: number): AnswerState {
    if (!hasAnswered) return "idle";
    if (optionIndex === question.answerIndex) return "correct";
    if (optionIndex === picked) return "wrong";
    return "faded";
  }

  return (
    <div className="flex flex-col gap-7">
      <div className="flex items-center gap-3">
        <Link
          href={exitHref}
          aria-label="Close quiz"
          className="border-ink flex size-11 shrink-0 items-center justify-center rounded-full border-2 bg-white"
        >
          <CloseIcon size={18} />
        </Link>
        <ProgressBar value={index} max={questions.length} label="Quiz progress" />
        <span className="text-[15px] font-extrabold">
          {Math.min(index + 1, questions.length)}/{questions.length}
        </span>
      </div>

      <header>
        <h1 className="text-[30px] leading-none font-extrabold tracking-tight">Quiz</h1>
        <p className="text-ink-soft pt-1.5 text-[15px] font-semibold">{subtitle}</p>
        <p className="pt-3 text-[17px] font-semibold">
          Pick an answer to find out if it&apos;s correct.
        </p>
      </header>

      {isFinished ? (
        <div className="border-ink bg-butter shadow-pop flex flex-col items-center gap-4 rounded-[28px] border-2 p-7 text-center">
          <p className="text-[15px] font-semibold">Your score</p>
          <p className="text-6xl font-extrabold tracking-tight">
            {score}/{questions.length}
          </p>
          <button
            type="button"
            onClick={restart}
            className="border-ink bg-ink h-14 w-full rounded-2xl border-2 text-[17px] font-extrabold text-white"
          >
            Try again
          </button>
        </div>
      ) : (
        <>
          <h2 className="text-[26px] leading-tight font-extrabold tracking-tight">
            {question.question}
          </h2>

          <div className="flex flex-col gap-2.5 md:grid md:grid-cols-2">
            {question.options.map((option, optionIndex) => (
              <AnswerOption
                key={option}
                text={option}
                state={optionState(optionIndex)}
                disabled={hasAnswered}
                onSelect={() => pick(optionIndex)}
              />
            ))}
          </div>

          {hasAnswered && (
            <>
              <div
                aria-live="polite"
                className="border-ink flex flex-col gap-1.5 rounded-[22px] border-2 bg-white px-4.5 py-4"
              >
                <p className="text-lg font-extrabold">
                  {picked === question.answerIndex ? "Nailed it!" : "So close!"}
                </p>
                <p className="text-ink/85 text-[15px] leading-snug">{question.explanation}</p>
                <p className="text-ink-soft text-[13px] font-semibold">{question.source}</p>
              </div>
              <button
                type="button"
                onClick={next}
                className="border-ink bg-ink h-15 rounded-[18px] border-2 text-lg font-extrabold text-white"
              >
                {index === questions.length - 1 ? "See score" : "Next"}
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}
