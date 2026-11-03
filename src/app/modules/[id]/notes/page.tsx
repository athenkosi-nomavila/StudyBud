import Link from "next/link";
import { notFound } from "next/navigation";
import { BackLink } from "@/components/BackLink";
import { KeyIdeaList } from "@/components/notes/KeyIdeaList";
import { getSampleModule, getSampleNotes } from "@/lib/sample-data";

export default async function NotesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const studyModule = getSampleModule(id);
  if (!studyModule) notFound();

  const notes = getSampleNotes(id);

  return (
    <>
      <main className="mx-auto flex max-w-md flex-col gap-5 px-5 pt-5 pb-32">
        <div className="flex items-center gap-3">
          <BackLink href={`/modules/${id}`} />
          <span className="text-ink-soft text-[15px] font-semibold">{studyModule.name}</span>
        </div>

        {notes ? (
          <>
            <h1 className="text-[44px] leading-none font-extrabold tracking-tight">
              {notes.title}
            </h1>
            <p className="border-ink bg-butter shadow-pop-sm rounded-[22px] border-2 px-4.5 py-4 text-lg leading-snug font-extrabold">
              {notes.summary}
            </p>
            <KeyIdeaList ideas={notes.keyIdeas} />
            <p className="text-ink-soft text-[13px] font-semibold">From {notes.source}</p>
          </>
        ) : (
          <p className="text-ink-soft text-[15px] font-semibold">No notes yet.</p>
        )}
      </main>

      {notes && (
        <div className="fixed inset-x-5 bottom-5 mx-auto flex max-w-md gap-2.5">
          <Link
            href={`/modules/${id}/quiz`}
            className="border-ink bg-ink flex h-14.5 flex-1 items-center justify-center rounded-[18px] border-2 text-[17px] font-extrabold text-white"
          >
            Quiz me
          </Link>
          <Link
            href={`/modules/${id}/cards`}
            className="border-ink shadow-pop-sm flex h-14.5 flex-1 items-center justify-center rounded-[18px] border-2 bg-white text-[17px] font-extrabold"
          >
            Cards
          </Link>
        </div>
      )}
    </>
  );
}
