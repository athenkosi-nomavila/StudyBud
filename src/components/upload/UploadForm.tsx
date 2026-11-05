"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createUploadTarget, saveUpload } from "@/app/upload/actions";
import type { StudyModule } from "@/lib/types";
import { CameraIcon, UploadIcon } from "../icons";

const DOCUMENT_TYPES = ".pdf,.doc,.docx,.ppt,.pptx";

type Props = {
  modules: StudyModule[];
  defaultModuleId?: string;
};

export function UploadForm({ modules, defaultModuleId }: Props) {
  const [moduleId, setModuleId] = useState(defaultModuleId ?? modules[0]?.id ?? "");
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  function handleFiles(event: React.ChangeEvent<HTMLInputElement>) {
    setFiles(Array.from(event.target.files ?? []));
    setError("");
  }

  async function handleUpload() {
    setIsUploading(true);
    setError("");
    for (const file of files) {
      // A dropped connection throws instead of returning a message.
      const message = await uploadFile(moduleId, file).catch(
        () => "Couldn't upload. Check your connection and try again.",
      );
      if (message) {
        setError(message);
        setIsUploading(false);
        return;
      }
    }
    router.push(`/modules/${moduleId}`);
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="module" className="text-[15px] font-extrabold">
          Module
        </label>
        <select
          id="module"
          value={moduleId}
          onChange={(event) => setModuleId(event.target.value)}
          className="border-ink bg-lime h-13 rounded-2xl border-2 px-3.5 text-[17px] font-extrabold"
        >
          {modules.map((module) => (
            <option key={module.id} value={module.id}>
              {module.name}
            </option>
          ))}
        </select>
      </div>

      <label className="border-ink focus-within:outline-ink flex h-60 cursor-pointer flex-col items-center justify-center gap-3.5 rounded-[28px] border-2 border-dashed bg-white focus-within:outline-2 focus-within:outline-offset-2">
        <span className="border-ink bg-butter shadow-pop-sm flex size-18 items-center justify-center rounded-full border-2">
          <UploadIcon size={32} />
        </span>
        <span className="text-[22px] font-extrabold">Choose a file</span>
        <span className="text-ink-soft text-[15px] font-semibold">PDF · Word · PowerPoint</span>
        <input type="file" accept={DOCUMENT_TYPES} onChange={handleFiles} className="sr-only" />
      </label>

      <label className="border-ink focus-within:outline-ink bg-sky shadow-pop-sm flex h-16 cursor-pointer items-center justify-center gap-3 rounded-[20px] border-2 text-lg font-extrabold focus-within:outline-2 focus-within:outline-offset-2">
        <CameraIcon size={24} />
        Snap your notes
        <input
          type="file"
          accept="image/*"
          capture="environment"
          multiple
          onChange={handleFiles}
          className="sr-only"
        />
      </label>

      {files.length > 0 && (
        <ul className="flex flex-col gap-2" aria-label="Selected files">
          {files.map((file) => (
            <li
              key={file.name}
              className="border-ink truncate rounded-2xl border-2 bg-white px-4 py-3 text-[15px] font-semibold"
            >
              {file.name}
            </li>
          ))}
        </ul>
      )}

      {error && (
        <p
          role="alert"
          className="border-ink bg-coral rounded-2xl border-2 px-4 py-3 text-[15px] font-extrabold"
        >
          {error}
        </p>
      )}

      {files.length > 0 && (
        <button
          type="button"
          onClick={handleUpload}
          disabled={isUploading || !moduleId}
          className="border-ink bg-ink h-14.5 rounded-[18px] border-2 text-[17px] font-extrabold text-white disabled:opacity-60"
        >
          {isUploading ? "Uploading…" : "Upload"}
        </button>
      )}
    </div>
  );
}

/** Uploads one file straight to storage, then saves it. Returns an error message, if any. */
async function uploadFile(moduleId: string, file: File): Promise<string | undefined> {
  const info = { moduleId, fileName: file.name, mimeType: file.type, size: file.size };
  const target = await createUploadTarget(info);
  if (!target.ok) return target.message;

  const response = await fetch(target.signedUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type || "application/octet-stream" },
    body: file,
  });
  if (!response.ok) return `Couldn't upload ${file.name}. Try again.`;

  const saved = await saveUpload({ ...info, uploadId: target.uploadId, path: target.path });
  return saved.ok ? undefined : `Couldn't save ${file.name}. Try again.`;
}
