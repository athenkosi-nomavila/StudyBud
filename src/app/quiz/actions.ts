"use server";

import { logStudy, type QuizAnswer } from "@/lib/db/history";
import { getQuiz } from "@/lib/db/study";

/** The option she picked for one question. */
export type QuizPick = { questionId: string; picked: string };

/** Saves her score and answers when she finishes a quiz. The score is worked out here from her picks. */
export async function saveQuizResult(
  moduleId: string,
  picks: QuizPick[],
): Promise<{ ok: boolean }> {
  if (!Array.isArray(picks) || picks.length === 0) return { ok: false };
  try {
    const questions = new Map((await getQuiz(moduleId)).map((question) => [question.id, question]));
    const answers: QuizAnswer[] = [];
    for (const { questionId, picked } of picks) {
      const question = questions.get(questionId);
      if (!question || !question.options.includes(picked)) return { ok: false };
      answers.push({
        question: question.question,
        picked,
        answer: question.options[question.answerIndex],
        explanation: question.explanation,
      });
    }
    const correct = answers.filter(({ picked, answer }) => picked === answer).length;
    await logStudy(moduleId, "quiz", correct, answers.length, answers);
    return { ok: true };
  } catch {
    return { ok: false };
  }
}
