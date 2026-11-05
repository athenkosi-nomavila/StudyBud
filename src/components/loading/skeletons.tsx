import { LoadingPage, Placeholder } from "./Placeholder";

// Page outlines shown the moment a link is tapped, while the page's data loads.

export function HomeSkeleton() {
  return (
    <LoadingPage>
      <div className="flex items-center justify-between pt-2">
        <Placeholder className="h-8 w-36" />
        <Placeholder className="h-10 w-16 rounded-full" />
      </div>
      <Placeholder className="h-6 w-28" />
      <Placeholder className="h-56 rounded-[28px]" />
      <Placeholder className="h-6 w-24" />
      <Placeholder className="h-20" />
      <Placeholder className="h-20" />
    </LoadingPage>
  );
}

export function ModuleSkeleton() {
  return (
    <LoadingPage>
      <Placeholder className="size-11 rounded-full" />
      <Placeholder className="h-10 w-3/4" />
      <div className="grid grid-cols-3 gap-2.5 pt-2">
        <Placeholder className="h-24" />
        <Placeholder className="h-24" />
        <Placeholder className="h-24" />
      </div>
      <Placeholder className="h-6 w-28" />
      <Placeholder className="h-16" />
      <Placeholder className="h-16" />
    </LoadingPage>
  );
}

/** For the notes, quiz, flashcard and upload pages. */
export function StudySkeleton() {
  return (
    <LoadingPage>
      <Placeholder className="size-11 rounded-full" />
      <Placeholder className="h-9 w-2/3" />
      <Placeholder className="h-80 rounded-[30px]" />
      <Placeholder className="h-15 rounded-[18px]" />
    </LoadingPage>
  );
}
