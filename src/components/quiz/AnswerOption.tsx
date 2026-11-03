import { CheckIcon, CloseIcon } from "../icons";

export type AnswerState = "idle" | "correct" | "wrong" | "faded";

const stateClasses: Record<AnswerState, string> = {
  idle: "bg-white font-semibold",
  correct: "bg-lime font-extrabold shadow-pop-sm",
  wrong: "bg-coral font-extrabold",
  faded: "bg-white font-semibold opacity-60",
};

type Props = {
  text: string;
  state: AnswerState;
  disabled: boolean;
  onSelect: () => void;
};

export function AnswerOption({ text, state, disabled, onSelect }: Props) {
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      className={`border-ink flex min-h-14.5 w-full items-center justify-between rounded-[18px] border-2 px-4.5 py-3 text-left text-[17px] ${stateClasses[state]}`}
    >
      <span>{text}</span>
      {state === "correct" && (
        <span aria-label="Correct">
          <CheckIcon />
        </span>
      )}
      {state === "wrong" && (
        <span aria-label="Wrong">
          <CloseIcon />
        </span>
      )}
    </button>
  );
}
