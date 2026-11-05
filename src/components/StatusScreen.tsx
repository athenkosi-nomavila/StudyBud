import Link from "next/link";

type Props = {
  title: string;
  message: string;
  /** An extra button shown before Home, like "Try again". */
  action?: React.ReactNode;
};

/** A full-page message for when something goes wrong, with a way back home. */
export function StatusScreen({ title, message, action }: Props) {
  return (
    <main className="mx-auto flex max-w-md flex-col px-5 pt-16 pb-10">
      <div className="border-ink bg-butter shadow-pop flex flex-col items-center gap-4 rounded-[28px] border-2 p-7 text-center">
        <p className="text-4xl font-extrabold tracking-tight">{title}</p>
        <p className="text-lg font-semibold">{message}</p>
        <div className="flex w-full flex-col gap-2.5 pt-2">
          {action}
          <Link
            href="/"
            className="border-ink flex h-14 w-full items-center justify-center rounded-2xl border-2 bg-white text-[17px] font-extrabold"
          >
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
