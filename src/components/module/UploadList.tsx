import Link from "next/link";
import type { Upload, UploadKind } from "@/lib/types";

const kindBadge: Record<UploadKind, { label: string; bg: string }> = {
  pdf: { label: "PDF", bg: "bg-coral" },
  word: { label: "DOC", bg: "bg-lime" },
  slides: { label: "PPT", bg: "bg-butter" },
  photo: { label: "IMG", bg: "bg-sky" },
};

export function UploadList({ moduleId, uploads }: { moduleId: string; uploads: Upload[] }) {
  return (
    <section>
      <div className="flex items-center justify-between pb-3">
        <h2 className="text-xl font-extrabold">Uploads</h2>
        <Link
          href={`/upload?module=${moduleId}`}
          className="border-ink bg-ink flex h-11 items-center rounded-full border-2 px-4 text-[15px] font-extrabold text-white"
        >
          + Add
        </Link>
      </div>

      {uploads.length === 0 ? (
        <p className="text-ink-soft text-[15px] font-semibold">No notes yet.</p>
      ) : (
        <ul className="flex flex-col gap-2.5">
          {uploads.map((upload) => (
            <UploadRow key={upload.id} upload={upload} />
          ))}
        </ul>
      )}
    </section>
  );
}

function UploadRow({ upload }: { upload: Upload }) {
  const badge = kindBadge[upload.kind];
  const isProcessing = upload.status === "processing";

  return (
    <li className="border-ink flex items-center gap-3 rounded-[18px] border-2 bg-white p-3.5">
      <span
        className={`border-ink flex size-11 shrink-0 items-center justify-center rounded-xl border-2 text-[11px] font-extrabold ${badge.bg}`}
      >
        {badge.label}
      </span>
      <span className="flex flex-1 flex-col gap-1">
        <span className="text-base font-extrabold">{upload.name}</span>
        {isProcessing ? (
          <span
            className="border-ink h-2.5 overflow-hidden rounded-full border-2 bg-white"
            role="progressbar"
            aria-label="Processing"
          >
            <span className="bg-lime block h-full w-1/2 animate-pulse" />
          </span>
        ) : (
          <span className="text-ink-soft text-[13px] font-semibold">{upload.cardCount} cards</span>
        )}
      </span>
    </li>
  );
}
