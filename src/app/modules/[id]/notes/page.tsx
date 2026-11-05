import Link from "next/link";
import { notFound } from "next/navigation";
import { BackLink } from "@/components/BackLink";
import { KeyIdeaList } from "@/components/notes/KeyIdeaList";
import { getModule } from "@/lib/db/modules";
import { WIDE_PAGE } from "@/lib/layout";
import { getNotes } from "@/lib/db/study";

export default async function NotesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [studyModule, notes] = await Promise.all([getModule(id), getNotes(id)]);
  if (!studyModule) notFound();

  return (
    <>
      <main className={`mx-auto flex flex-col gap-5 px-5 pt-5 pb-32 ${WIDE_PAGE}`}>
        <div className="flex items-center gap-3">
          <BackLink href={`/modules/${id}`} />
          <span className="text-ink-soft text-[15px] font-semibold">{studyModule.name}</span>
        </div>

        <header>
          <h1 className="text-[44px] leading-none font-extrabold tracking-tight">Notes</h1>
          <p className="pt-3 text-[17px] font-semibold">
            The key ideas from your uploads. Read them, then test yourself.
          </p>
        </header>

        {notes.length > 0 ? (
          notes.map((note) => (
            <article key={note.id} className="flex flex-col gap-4 pt-2">
              <h2 className="text-[30px] leading-tight font-extrabold tracking-tight">
                {note.title}
              </h2>
              <p className="border-ink bg-butter shadow-pop-sm rounded-[22px] border-2 px-4.5 py-4 text-lg leading-snug font-extrabold">
                {note.summary}
              </p>
              <KeyIdeaList ideas={note.keyIdeas} />
              <p className="text-ink-soft text-[13px] font-semibold">From {note.source}</p>
            </article>
          ))
        ) : (
          <p className="text-ink-soft text-[15px] font-semibold">No notes yet.</p>
        )}
      </main>

      {notes.length > 0 && (
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
