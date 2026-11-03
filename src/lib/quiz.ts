import { shuffle } from "./shuffle";
import type { QuizQuestion } from "./types";

/** Shuffles question order and each question's options, keeping the right answer tracked. */
export function shuffleQuiz(questions: QuizQuestion[]): QuizQuestion[] {
  return shuffle(questions).map((question) => {
    const correct = question.options[question.answerIndex];
    const options = shuffle(question.options);
    return { ...question, options, answerIndex: options.indexOf(correct) };
  });
}
